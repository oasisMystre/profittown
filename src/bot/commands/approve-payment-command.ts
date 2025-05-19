import moment from "moment";
import { readFileSync } from "fs";
import { Context, Markup, Telegraf, TelegramError } from "telegraf";

import { getEnv } from "../../env";
import { db, rate } from "../../instances";
import { cleanText, format } from "../../utils/format";
import { updatePaymentById } from "../../controllers/payments.controller";
import {
  getLastSubscriptionByUser,
  getSubscriptionById,
  updateSubscriptionById,
} from "../../controllers/subscription.controller";

export const approvePaymentCommand = (telegraf: Telegraf) => {
  const onApprove = async (context: Context) => {
    const text =
      context.message && "text" in context.message
        ? context.message.text
        : context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;

    if (text) {
      const [, subscriptionId] = text.split(/\s|-/g);
      const subscription = await getSubscriptionById(
        db,
        Number(subscriptionId)
      );

      if (subscription) {
        const [lastSubscription] = await getLastSubscriptionByUser(
          db,
          subscription.payment.user.id
        );

        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: subscription.payment.plan.price.currency,
        });
        const recurring = subscription.payment.plan.recurring;
        const localAmount = subscription.payment.plan.price.amount * rate;

        const expiresAt = (() => {
          const date = moment(lastSubscription?.expiresAt);
          switch (recurring) {
            case "monthly":
              return date.add(1, "month");
            case "quarterly":
              return date.add(3, "month");
            case "semi-annually":
              return date.add(6, "month");
            case "annually":
              return date.add(12, "month");
            default:
              return null;
          }
        })();

        return Promise.all([
          updateSubscriptionById(db, subscription.id, {
            status: "active",
            expiresAt: expiresAt?.toDate(),
          }),
          updatePaymentById(db, subscription.payment.id, {
            status: "successful",
          }),
          await context.telegram
            .unbanChatMember(
              getEnv("PREMIUM_CHANNEL"),
              Number(subscription.payment.user.id)
            )
            .catch(() => null),
          context.telegram
            .approveChatJoinRequest(
              getEnv("PREMIUM_CHANNEL"),
              Number(subscription.payment.user.id)
            )
            .then(() => null)
            .catch((error) => {
              if (error instanceof TelegramError) {
                if (error.description.includes("USER_ALREADY_PARTICIPANT"))
                  return;
              }
              return null;
            }),
          context.replyWithMarkdownV2(
            readFileSync("locale/en/payments/successful.md", "utf-8")
          ),
          context.telegram.sendMessage(
            subscription.payment.user.id,
            readFileSync("locale/en/subscriptions/successful.md", "utf-8")
              .replace(
                "%subscriptionId%",
                cleanText(subscription.id.toString())
              )
              .replace(
                "%expires_at%",
                expiresAt ? expiresAt.format("MMMM Do, YYYY") : "Lifetime"
              )
              .replace("%plan_name%", cleanText(subscription.payment.plan.name))
              .replace(
                "%amount%",
                cleanText(intl.format(subscription.payment.plan.price.amount))
              )
              .replace(
                "%local_amount%",
                cleanText(format("N%s", localAmount.toLocaleString()))
              ),
            {
              parse_mode: "MarkdownV2",
              reply_markup: Markup.inlineKeyboard([
                subscription.payment.plan.type === "one-off"
                  ? Markup.button.url(
                      "Contact Support",
                      getEnv("SUPPORT_CONTACT")
                    )
                  : Markup.button.url(
                      "Open Premium Group",
                      getEnv("PREMIUM_CHANNEL_LINK")
                    ),
              ]).reply_markup,
            }
          ),
        ]);
      }
    }
  };

  telegraf.command("approve", onApprove);
  telegraf.action(/^approve/, onApprove);
};

import moment from "moment";
import { readFileSync } from "fs";
import { Markup, Telegraf } from "telegraf";

import { db } from "../../instances";
import { getEnv } from "../../env";
import { getLastSubscriptionByUserAndPlanType } from "../../controllers/subscription.controller";

export const subscriptionStatusAction = (bot: Telegraf) => {
  bot.action(/subscription-status/, async (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;
    let type: "subscription" | "one-off" | undefined;

    if (data)
      [, type] = data.split(/_/) as unknown as ("subscription" | "one-off")[];

    const [subscription] = await getLastSubscriptionByUserAndPlanType(
      db,
      context.user.id,
      type
    );
    if (subscription)
      return context.editMessageText(
        readFileSync("locale/en/subscriptions/status.md", "utf-8")
          .replace("%plan%", subscription.plan.name)
          .replace("%status%", subscription.status)
          .replace("%payment_type%", subscription.payment.type)
          .replace(
            "%expires_at%",
            moment(subscription.expiresAt).format("MMMM Do, YYYY")
          ),
        {
          parse_mode: "MarkdownV2",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.button.url(
                "💬 Contact Support",
                getEnv("SUPPORT_CONTACT")
              ),
            ],
            [
              Markup.button.callback("Go back", "vip-signal"),
              Markup.button.callback("Main Menu", "main-menu"),
            ],
          ]).reply_markup,
        }
      );
    else return context.reply("No subscription found.");
  });
};

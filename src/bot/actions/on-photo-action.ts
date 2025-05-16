import { readFileSync } from "fs";
import { Input, Markup } from "telegraf";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { getEnv } from "../../env";
import { db, rate } from "../../instances";
import { cleanText, format } from "../../utils/format";
import { createSubscription } from "../../controllers/subscription.controller";
import {
  getLastPaymentByUser,
  updatePaymentById,
} from "../../controllers/payments.controller";

export const onPhotoAction = (bot: Telegraf) => {
  bot.on(message("photo"), async (context) => {
    const photos = context.message.photo;

    for (const photo of photos) {
      const payment = await getLastPaymentByUser(db, context.user.id);
      if (payment) {
        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: payment.plan.price.currency,
        });
        const localAmount = payment.plan.price.amount * rate;
        const [subscription] = await createSubscription(db, {
          payment: payment.id,
          status: "pending",
        });

        return Promise.all([
          updatePaymentById(db, payment.id, {
            proof: { receipt: photo.file_id },
          }),
          context.telegram.sendPhoto(
            getEnv("SUPPORT"),
            Input.fromFileId(photo.file_id),
            {
              parse_mode: "MarkdownV2",
              caption: readFileSync("locale/en/payments/detail.md", "utf-8")
                .replace("%user_id%", cleanText(context.user.id))
                .replace(
                  "%subscription_id%",
                  cleanText(String(subscription.id))
                )
                .replace("%payment_type%", cleanText(payment.type))
                .replace(
                  "%amount%",
                  cleanText(intl.format(payment.plan.price.amount))
                )
                .replace(
                  "%local_amount%",
                  format("N%s", cleanText(localAmount.toLocaleString()))
                ),
              reply_markup: Markup.inlineKeyboard([
                Markup.button.callback(
                  "Approve",
                  format("approve-%s", subscription.id)
                ),
              ]).reply_markup,
            }
          ),
          context.replyWithMarkdownV2(
            readFileSync(
              "locale/en/payments/pending-payment.md",
              "utf-8"
            ).replace("%subscriptionId%", String(subscription.id)),
            Markup.inlineKeyboard([
              Markup.button.url("Contact Support", getEnv("SUPPORT_CONTACT")),
            ])
          ),
        ]);
      }
    }
  });
};

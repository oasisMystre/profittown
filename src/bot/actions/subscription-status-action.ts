import moment from "moment";
import { readFileSync } from "fs";
import { Markup, Telegraf } from "telegraf";

import { db } from "../../instances";
import { getEnv } from "../../env";
import { getLastSubscriptionByUser } from "../../controllers/subscription.controller";

export const subscriptionStatusAction = (bot: Telegraf) => {
  bot.action("subscription-status", async (context) => {
    const [subscription] = await getLastSubscriptionByUser(db, context.user.id);

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
          [Markup.button.url("💬 Contact Support", getEnv("SUPPORT_CONTACT"))],
          [
            Markup.button.callback("Go back", "vip-signal"),
            Markup.button.callback("Main Menu", "main-menu"),
          ],
        ]).reply_markup,
      }
    );
  });
};

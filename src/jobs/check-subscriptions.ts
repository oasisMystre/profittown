import moment from "moment";
import { readFileSync } from "fs";
import { and, eq, gte, or } from "drizzle-orm";
import { Markup, TelegramError, type Telegraf } from "telegraf";

import { getEnv } from "../env";
import type { Database } from "../db";
import { format } from "../utils/format";
import { subscriptions } from "../db/schema";
import {
  getSubscriptionById,
  updateSubscriptionById,
} from "../controllers/subscription.controller";

const onJoin = async (
  db: Database,
  bot: Telegraf,
  subscription: NonNullable<Awaited<ReturnType<typeof getSubscriptionById>>>
) => [
  updateSubscriptionById(db, subscription.id, { joined: true }),
  await bot.telegram.sendMessage(
    subscription.payment.user.id,
    readFileSync("locale/en/joined-group.md", "utf-8"),
    { parse_mode: "MarkdownV2" }
  ),
];

export const checkSubscriptions = async (db: Database, bot: Telegraf) => {
  const now = moment().subtract(2, "days").add(4, "days");

  const unjoinedUsers = await db.query.subscriptions
    .findMany({
      with: {
        payment: {
          with: { user: true, plan: true },
          columns: { user: false, plan: false },
        },
      },
      columns: { payment: false },
      where: or(
        and(
          eq(subscriptions.status, "active"),
          eq(subscriptions.joined, false)
        ),
        gte(subscriptions.expiresAt, now.toDate())
      ),
    })
    .execute();

  return Promise.allSettled(
    unjoinedUsers.flatMap(async (subscription) => {
      if (subscription.status === "active" && subscription.joined === false) {
        return bot.telegram
          .approveChatJoinRequest(
            getEnv("PREMIUM_CHANNEL"),
            Number(subscription.payment.user.id)
          )
          .then(() => onJoin(db, bot, subscription))
          .catch((error) => {
            if (error instanceof TelegramError) {
              if (error.description.includes("USER_ALREADY_PARTICIPANT"))
                return onJoin(db, bot, subscription);
              return Promise.reject(error);
            }
          });
      } else if (moment().isSameOrAfter(subscription.expiresAt)) {
        return Promise.all([
          bot.telegram.sendMessage(
            subscription.payment.user.id,
            readFileSync("locale/en/subscriptions/expired.md", "utf-8"),
            {
              parse_mode: "MarkdownV2",
              reply_markup: Markup.inlineKeyboard([
                Markup.button.callback(
                  "🔁 Renew Now",
                  format("plan_%s", subscription.payment.plan.id)
                ),
              ]).reply_markup,
            }
          ),
          bot.telegram.banChatMember(
            getEnv("PREMIUM_CHANNEL"),
            Number(subscription.payment.user.id)
          ),
        ]);
      } else {
        return bot.telegram.sendMessage(
          subscription.payment.user.id,
          readFileSync(
            "locale/en/subscriptions/almost-expired.md",
            "utf-8"
          ).replace(
            "%date%",
            moment(subscription.expiresAt).format("MMMM Do, YYYY")
          ),
          {
            parse_mode: "MarkdownV2",
            reply_markup: Markup.inlineKeyboard([
              Markup.button.callback(
                "🔁 Renew Now",
                format("plan_%s", subscription.payment.plan.id)
              ),
            ]).reply_markup,
          }
        );
      }
    })
  );
};

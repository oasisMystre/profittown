import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

import { getEnv } from "../../env";
import { db, rate } from "../../instances";
import { cleanText, format } from "../../utils/format";
import { getPlansById } from "../../controllers/plan.controller";
import { createPayment } from "../../controllers/payments.controller";
import { insertPaymentSchema } from "../../db/zod";

export const paymentAction = (bot: Telegraf) => {
  bot.action(/^payment/, async (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;

    if (data) {
      const [newData, ...previousData] = data.split(/\|/g);
      const [, planId, paymentType] = newData.split(/_|-/g);

      const plan = await getPlansById(db, Number(planId));

      if (plan) {
        const button = Markup.inlineKeyboard([
          Markup.button.callback("Go Back", previousData.join("|")),
          Markup.button.callback("Main Menu", "mainmenu"),
        ]).reply_markup;

        const intl = Intl.NumberFormat("en-US", {
          currency: plan.price.currency,
          style: "currency",
        });
        const localAmount = rate * plan.price.amount;

        const data: Zod.infer<typeof insertPaymentSchema> = {
          user: context.user.id,
          plan: plan.id,
          type: paymentType as "usdt" | "btc" | "naira",
        };

        if (context.session.coupon) data.coupon = context.session.coupon.id;

        if (paymentType === "usdt") {
          return Promise.all([
            createPayment(db, data),
            context.editMessageText(
              readFileSync("locale/en/payments/usdt.md", "utf-8")
                .replace("%erc20%", getEnv("WALLET_USDT_ERC20"))
                .replace("%trc20%", getEnv("WALLET_USDT_TRC20"))
                .replace("%amount%", cleanText(intl.format(plan.price.amount)))
                .replace(
                  "%local_amount%",
                  cleanText(format("N%s", localAmount.toLocaleString()))
                ),
              { parse_mode: "MarkdownV2", reply_markup: button }
            ),
          ]);
        } else if (paymentType === "btc") {
          return Promise.all([
            createPayment(db, data),
            context.editMessageText(
              readFileSync("locale/en/payments/btc.md", "utf-8")
                .replace("%btc%", getEnv("WALLET_BTC"))
                .replace("%amount%", cleanText(intl.format(plan.price.amount)))
                .replace(
                  "%local_amount%",
                  cleanText(format("N%s", localAmount.toLocaleString()))
                ),
              { parse_mode: "MarkdownV2", reply_markup: button }
            ),
          ]);
        } else if (paymentType === "naira") {
          return Promise.all([
            createPayment(db, data),
            context.editMessageText(
              readFileSync("locale/en/payments/naira.md", "utf-8")
                .replace("%name%", getEnv("NAME"))
                .replace("%account_number%", getEnv("ACC_NO"))
                .replace("%bank_name%", getEnv("BANK_NAME"))
                .replace("%amount%", cleanText(intl.format(plan.price.amount)))
                .replace(
                  "%local_amount%",
                  cleanText(format("N%s", localAmount.toLocaleString()))
                ),
              { parse_mode: "MarkdownV2", reply_markup: button }
            ),
          ]);
        }
      }
    }
  });
};

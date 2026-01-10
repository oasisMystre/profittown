import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

import { db, rate } from "../../instances";
import { cleanText, format } from "../../utils/format";
import { getPlansById } from "../../controllers/plan.controller";

export const planAction = (bot: Telegraf) => {
  bot.action(/^plan/, async (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;
    if (data) {
      const [newCommand, ...previousCommand] = data.split(/\|/g);
      const [, id] = newCommand.split(/_/);

      const plan = await getPlansById(db, Number(id));
      const buttons = [];
      const extra = [];

      if (plan?.paymentLink)
        extra.push([Markup.button.url("Pay with paystack", plan.paymentLink)]);
      if (previousCommand)
        buttons.push(
          Markup.button.callback("Go Back", previousCommand.join("|")),
        );
      buttons.push(Markup.button.callback("Main Menu", "mainmenu"));

      const { coupon } = await context.session;

      if (plan) {
        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: plan.price.currency,
        });
        const amount = coupon
          ? plan.price.amount * (1 - Number(coupon.discount))
          : plan?.price.amount;

        return context.editMessageText(
          readFileSync("locale/en/plan.md", "utf-8")
            .replace("%plan%", cleanText(plan.name))
            .replace(
              "%coupon%",
              coupon
                ? cleanText(
                    format(
                      "%s Applied %s% Discount",
                      coupon.code,
                      Number(coupon.discount) * 100,
                    ),
                  )
                : "No coupon applied",
            )
            .replace("%amount%", cleanText(intl.format(amount)))
            .replace(
              "%duration%",
              cleanText(plan.recurring ? plan.recurring : "Lifetime"),
            )
            .replace(
              "%local_currency%",
              format("N%s", cleanText((amount * rate).toLocaleString())),
            ),
          {
            parse_mode: "MarkdownV2",
            reply_markup: Markup.inlineKeyboard([
              [
                Markup.button.callback(
                  "USDT",
                  format("payment_%s_usdt|%s", id, data),
                ),

                Markup.button.callback(
                  "BTC",
                  format("payment_%s_btc|%s", id, data),
                ),
              ],
              [
                Markup.button.callback(
                  "Naira Payment",
                  format("payment_%s_naira|%s", id, data),
                ),
              ],
              ...extra,
              buttons,
            ]).reply_markup,
          },
        );
      }
    }
  });
};

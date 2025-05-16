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
      const [, id, previousCommand] = data.split(/_/);
      const plan = await getPlansById(db, Number(id));
      const buttons = [];

      if (previousCommand)
        buttons.push(Markup.button.callback("Go Back", previousCommand));
      buttons.push(Markup.button.callback("Main Menu", "mainmenu"));

      if (plan) {
        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: plan.price.currency,
        });
        return context.editMessageText(
          readFileSync("locale/en/plan.md", "utf-8")
            .replace("%plan%", plan.name)
            .replace("%amount%", cleanText(intl.format(plan.price.amount)))
            .replace(
              "%duration%",
              cleanText(plan.recurring ? plan.recurring : "Lifetime")
            )
            .replace(
              "%local_currency%",
              format(
                "N%s",
                cleanText((plan.price.amount * rate).toLocaleString())
              )
            ),
          {
            parse_mode: "MarkdownV2",
            reply_markup: Markup.inlineKeyboard([
              [
                Markup.button.callback(
                  "USDT",
                  format("payment_%s_usdt|%s", id, data)
                ),
              ],
              [
                Markup.button.callback(
                  "BTC",
                  format("payment_%s_btc|%s", id, data)
                ),
              ],
              [
                Markup.button.callback(
                  "Naira Payment",
                  format("payment_%s_naira|%s", id, data)
                ),
              ],
              buttons,
            ]).reply_markup,
          }
        );
      }
    }
  });
};

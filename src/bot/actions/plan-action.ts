import { readFileSync } from "fs";
import { Context, Markup, Telegraf } from "telegraf";

import { db } from "../../instances";
import { cleanText, format } from "../../utils/format";
import { getPlansById } from "../../controllers/plan.controller";

export const planAction = (bot: Telegraf) => {
  bot.action(/plan/, async (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;
    if (data) {
      const [, id, previousCommand] = data.split(/_/);
      const plan = await getPlansById(db, Number(id));

      if (plan) {
        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: plan.price.currency,
        });
        return context.replyWithMarkdownV2(
          readFileSync("locale/en/plan.md", "utf-8")
            .replace("%plan%", plan.name)
            .replace("%amount%", cleanText(intl.format(plan.price.amount)))
            .replace(
              "%duration%",
              cleanText(plan.recurring ? plan.recurring : "one-off")
            )
            .replace(
              "%local_currency%",
              format(
                "N%s",
                cleanText((plan.price.amount * 1550).toLocaleString())
              )
            ),
          Markup.inlineKeyboard([
            [
              Markup.button.callback(
                "USDT",
                format("payment_%s_usdt_%s", id, data)
              ),
            ],
            [
              Markup.button.callback(
                "BTC",
                format("payment_%s_btc_%s", id, data)
              ),
            ],
            [
              Markup.button.callback(
                "Naira Payment",
                format("payment_%s_naira_%s", id, data)
              ),
            ],
            [
              Markup.button.callback(
                "Foreign Payment",
                format("payment_%s_foreign_%s", id, data)
              ),
            ],
            [
              Markup.button.callback("Go Back", previousCommand),
              Markup.button.callback("Main Menu", "mainmenu"),
            ],
          ])
        );
      }
    }
  });
};

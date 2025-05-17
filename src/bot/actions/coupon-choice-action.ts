import { Markup, Telegraf } from "telegraf";
import { format } from "../../utils/format";
import { readFileSync } from "fs";

export const couponChoiceAction = (bot: Telegraf) => {
  bot.action(/^couponChoice/, (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;
    if (data) {
      const [newCommand, ...previousCommand] = data.split(/\|/g);
      const [, id] = newCommand.split(/_/);

      return context.editMessageText(
        readFileSync("locale/en/coupons/coupon-choice.md", "utf-8"),
        {
          parse_mode: "MarkdownV2",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.button.callback(
                "Yes, I have a coupon",
                format("couponScene_%s|%s", id, data)
              ),
            ],
            [
              Markup.button.callback(
                "No, proceed with payment",
                format("plan_%s|%s", id, data)
              ),
            ],
            [
              Markup.button.callback("Go back", previousCommand.join('|')),
              Markup.button.callback("Main Menu", "mainmenu"),
            ],
          ]).reply_markup,
        }
      );
    }
  });
};

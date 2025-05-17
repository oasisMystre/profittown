import { readFileSync } from "fs";
import { Markup, Telegraf } from "telegraf";

import { db } from "../../instances";
import { format } from "../../utils/format";
import { getPlansById } from "../../controllers/plan.controller";

export const mentorshipDetailAction = (bot: Telegraf) => {
  bot.action(/^mentorshipDetail/, async (context) => {
    const text =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;
    if (text) {
      const [, id] = text.split(/_|-/g);
      const plan = await getPlansById(db, Number(id));
      if (plan) {
        const intl = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: plan.price.currency,
        });

        return context.editMessageText(
          readFileSync(
            format("locale/en/mentorships/%s.md", plan.name),
            "utf-8"
          ),
          {
            parse_mode: "MarkdownV2",
            reply_markup: Markup.inlineKeyboard([
              [
                Markup.button.callback(
                  format("%s - %s", plan.name, intl.format(plan.price.amount)),
                  format("couponChoice_%s|%s", plan.id, text)
                ),
              ],
              [
                Markup.button.callback("Go Back", "mentorship"),
                Markup.button.callback("Main Menu", "mainmenu"),
              ],
            ]).reply_markup,
          }
        );
      }
    }
  });
};

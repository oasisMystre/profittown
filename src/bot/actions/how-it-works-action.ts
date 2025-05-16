import { readFileSync } from "fs";
import { Markup, Telegraf } from "telegraf";

import { getEnv } from "../../env";

export const howItWorksAction = (bot: Telegraf) => {
  bot.action("how-it-works", (context) =>
    context.editMessageText(
      readFileSync("locale/en/flows/flow-8.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url("Contact Admin", getEnv("SUPPORT_CONTACT"))],
          [
            Markup.button.callback("Go Back", "account-management"),
            Markup.button.callback("Main Menu", "mainmenu"),
          ],
        ]).reply_markup,
      }
    )
  );
};

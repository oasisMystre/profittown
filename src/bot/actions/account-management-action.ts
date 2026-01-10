import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

import { getEnv } from "../../env";

export const accountManagementAction = (bot: Telegraf) => {
  bot.action("account-management", (context) =>
    context.editMessageText(
      readFileSync("locale/en/flows/flow-7.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url("Contact Admin", getEnv("SUPPORT_CONTACT"))],
          [Markup.button.callback("How Does it Work?", "how-it-works")],
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      },
    ),
  );
};

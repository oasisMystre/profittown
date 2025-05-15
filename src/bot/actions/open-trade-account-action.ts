import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

export const openTradeAccountAction = (telegraf: Telegraf) => {
  telegraf.action("open-trade-account", (context) =>
    context.editMessageText(
      readFileSync("locale/en/flows/flow-4.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      }
    )
  );
};

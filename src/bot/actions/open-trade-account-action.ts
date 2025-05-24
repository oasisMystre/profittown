import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

import { getEnv } from "../../env";

export const openTradeAccountAction = (telegraf: Telegraf) => {
  telegraf.action("open-trade-account", (context) =>
    context.editMessageText(
      readFileSync("locale/en/flows/flow-4.md", "utf-8").replace(
        "%link%",
        getEnv("TRADE_ACCOUNT_LINK")
      ),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.url(
              "＋ Create Your Trading Account",
              getEnv("TRADE_ACCOUNT_LINK")
            ),
          ],
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      }
    )
  );
};

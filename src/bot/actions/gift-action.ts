import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";
import { getEnv } from "../../env";

export const giftAction = (bot: Telegraf) => {
  bot.action("gift", (context) => {
    return context.editMessageText(
      readFileSync("locale/en/flows/flow-3.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url("📥 Download the PDF", getEnv("GIFT_PDF_LINK"))],
          [
            Markup.button.url(
              "▶️ Watch the Beginner Playlist",
              getEnv("GIFT_YOUTUBE_LINK"),
            ),
          ],
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      },
    );
  });
};

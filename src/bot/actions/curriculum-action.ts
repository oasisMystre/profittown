import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

export const curriculumAction = (bot: Telegraf) => {
  bot.action("curriculum", (context) => {
    return context.editMessageText(
      readFileSync("locale/en/curriculum.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback(
              "📥 Dowload Curriculum",
              "download_curriculum"
            ),
          ],
          [
            Markup.button.callback("Go Back", "mentorship"),
            Markup.button.callback("Main Menu", "mainmenu"),
          ],
        ]).reply_markup,
      }
    );
  });
};

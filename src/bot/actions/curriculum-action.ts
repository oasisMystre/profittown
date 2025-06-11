import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

export const curriculumAction = (bot: Telegraf) => {
  bot.action("curriculum", (context) => {
    return context.replyWithMarkdownV2(
      readFileSync("locale/en/curriculum.md", "utf-8"),
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "📥 Dowload Curriculum",
            "download_curriculum"
          ),
        ],
        [Markup.button.callback("Main Menu", "mainmenu")],
      ])
    );
  });
};

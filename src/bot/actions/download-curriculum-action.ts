import { Input, type Telegraf } from "telegraf";

export const downloadCurriculumAction = (bot: Telegraf) => {
  bot.action("download_curriculum", (context) =>
    context.replyWithDocument(Input.fromLocalFile("assets/curriculum.docx")),
  );
};

import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

export const mentorshipAction = (telegraf: Telegraf) => {
  telegraf.action("mentorship", (context) =>
    context.editMessageText(
      readFileSync("locale/en/flows/flow-2.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("Group Mentorship", "group-mentorship")],
          [Markup.button.callback("1 on 1", "one-one-one")],
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      }
    )
  );
};

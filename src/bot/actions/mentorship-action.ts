import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";
import { getPlansByType } from "../../controllers/plan.controller";
import { db } from "../../instances";
import { format } from "../../utils/format";

export const mentorshipAction = (telegraf: Telegraf) => {
  telegraf.action("mentorship", async (context) => {
    const plans = await getPlansByType(db, "one-off");

    return context.editMessageText(
      readFileSync("locale/en/flows/flow-2.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [
            ...plans.map((plan) =>
              Markup.button.callback(
                plan.name,
                format("mentorshipDetail-%s", plan.id)
              )
            ),
          ],
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      }
    );
  });
};


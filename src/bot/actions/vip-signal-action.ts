import { chunk } from "lodash";
import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";

import { db } from "../../instances";
import { format } from "../../utils/format";
import { getPlansByType } from "../../controllers/plan.controller";

export const vipSignalAction = (telegraf: Telegraf) => {
  telegraf.action("vip-signal", async (context) => {
    const plans = await getPlansByType(db, "subscription");

    return context.editMessageText(
      readFileSync("locale/en/flows/flow-1.md", "utf-8"),
      {
        parse_mode: "MarkdownV2",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback(
              "Check Subscription Status",
              "subscription-status"
            ),
          ],
          ...chunk(
            plans.map((plan) => {
              const intl = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: plan.price.currency,
              });
              return Markup.button.callback(
                format("%s - %s", plan.name, intl.format(plan.price.amount)),
                format("couponChoice_%s|%s", plan.id, "vip-signal")
              );
            }),
            2
          ),
          [Markup.button.callback("Main Menu", "mainmenu")],
        ]).reply_markup,
      }
    );
  });
};

import type { Telegraf } from "telegraf";

import { db } from "../../instances";
import { couponSceneId } from "../scenes/coupon-scene";
import { getPlansById } from "../../controllers/plan.controller";

export const couponSceneAction = (bot: Telegraf) => {
  bot.action(/^couponScene/, async (context) => {
    const data =
      context.callbackQuery && "data" in context.callbackQuery
        ? context.callbackQuery.data
        : undefined;

    if (data) {
      const [newCommand, ...previousCommand] = data.split(/\|/g);
      const [, id] = newCommand.split(/_/);
      context.session.previousCommand = previousCommand.join("|");

      context.session.plan = await getPlansById(db, Number(id));
      return context.scene.enter(couponSceneId);
    }
  });
};

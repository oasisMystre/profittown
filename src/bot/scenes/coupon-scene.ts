import { readFileSync } from "fs";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";

import { db } from "../../instances";
import { format } from "../../utils/format";
import { authenticateUser } from "../middlewares/authenticate-user";
import { getCouponByCode } from "../../controllers/coupon.controller";
import { getPaymentWithCouponAndUser } from "../../controllers/payments.controller";

export const couponSceneId = "coupon-scene";
export const couponScene = new Scenes.WizardScene(
  couponSceneId,
  async (context) => {
    await context.replyWithMarkdownV2(
      readFileSync("locale/en/coupons/input-coupon.md", "utf-8"),
      Markup.forceReply()
    );
  }
);

couponScene.command("skip", (context) => context.scene.leave());
couponScene.use(authenticateUser).on(message("text"), async (context) => {
  const text =
    context.message && "text" in context.message
      ? context.message.text
      : undefined;
  if (text && text === "skip") return context.scene.leave();
  if (text) {
    const coupon = await getCouponByCode(db, text);
    if (coupon) {
      const payment = await getPaymentWithCouponAndUser(
        db,
        coupon.id,
        context.user.id
      );
      if (payment)
        return context.replyWithMarkdownV2(
          readFileSync("locale/en/coupons/already-used.md", "utf-8")
        );

      context.session.coupon = coupon;
      await context.replyWithMarkdownV2(
        readFileSync("locale/en/coupons/coupon-applied.md", "utf-8").replace(
          "%percentage%",
          (parseFloat(coupon.discount) * 100).toString()
        ),
        Markup.inlineKeyboard([
          Markup.button.callback(
            "Continue with payment",
            format(
              "plan_%s|%",
              context.session.plan!.id,
              context.session.previousCommand
                ? context.session.previousCommand
                : "mainmenu"
            )
          ),
        ])
      );
      return context.scene.leave();
    }

    return context.replyWithMarkdownV2(
      readFileSync("locale/en/coupons/invalid-coupon.md", "utf-8"),
      Markup.forceReply()
    );
  }
});

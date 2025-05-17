import type { Telegraf } from "telegraf";
import { faqAction } from "./faq-action";
import { giftAction } from "./gift-action";
import { planAction } from "./plan-action";
import { startAction } from "./start-action";
import { paymentAction } from "./payment-action";
import { onPhotoAction } from "./on-photo-action";
import { vipSignalAction } from "./vip-signal-action";
import { mentorshipAction } from "./mentorship-action";
import { couponSceneAction } from "./coupon-scene-action";
import { couponChoiceAction } from "./coupon-choice-action";
import { howItWorksAction } from "./how-it-works-action";
import { openTradeAccountAction } from "./open-trade-account-action";
import { mentorshipDetailAction } from "./mentorship-detail-action";
import { accountManagementAction } from "./account-management-action";
import { subscriptionStatusAction } from "./subscription-status-action";



export const registerActions = (bot: Telegraf) => {
  faqAction(bot);
  planAction(bot);
  giftAction(bot);
  paymentAction(bot);
  startAction(bot);
  onPhotoAction(bot);
  vipSignalAction(bot);
  howItWorksAction(bot);
  mentorshipAction(bot);
  couponChoiceAction(bot);
  couponSceneAction(bot);
  accountManagementAction(bot);
  mentorshipDetailAction(bot);
  openTradeAccountAction(bot);
  subscriptionStatusAction(bot);
};

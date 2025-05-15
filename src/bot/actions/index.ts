import type { Telegraf } from "telegraf";
import { faqAction } from "./faq-action";
import { giftAction } from "./gift-action";
import { startAction } from "./start-action";
import { vipSignalAction } from "./vip-signal-action";
import { mentorshipAction } from "./mentorship-action";
import { openTradeAccountAction } from "./open-trade-account-action";
import { planAction } from "./plan-action";

export const registerActions = (bot: Telegraf) => {
  faqAction(bot);
  planAction(bot);
  giftAction(bot);
  startAction(bot);
  vipSignalAction(bot);
  mentorshipAction(bot);
  openTradeAccountAction(bot);
};

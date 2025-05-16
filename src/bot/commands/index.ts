import { Telegraf } from "telegraf";
import { approvePaymentCommand } from "./approve-payment-command";

export const registerCommands = (bot: Telegraf) => {
  approvePaymentCommand(bot);
};

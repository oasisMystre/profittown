import type { Telegraf } from "telegraf";
import { registerActions } from "./actions";

const registerBot = (bot: Telegraf) => {
  registerActions(bot);
};

export default registerBot;

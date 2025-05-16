import type { Telegraf } from "telegraf";
import { registerActions } from "./actions";
import { registerCommands } from "./commands";
import { authenticateUser } from "./middlewares/authenticate-user";

const registerBot = (bot: Telegraf) => {
  bot.use(authenticateUser);
  
  registerActions(bot);
  registerCommands(bot);
};

export default registerBot;

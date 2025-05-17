import { Scenes, session, type Telegraf } from "telegraf";

import { scenes } from "./scenes"; 
import { registerActions } from "./actions";
import { registerCommands } from "./commands";
import { authenticateUser } from "./middlewares/authenticate-user";

const registerBot = (bot: Telegraf) => {
 scenes.forEach((scene) => scene.use(authenticateUser));

  const stage = new Scenes.Stage<any>(scenes);

  bot.use(session());
  bot.use(stage.middleware());
  bot.use(authenticateUser);

  registerActions(bot);
  registerCommands(bot);
};

export default registerBot;

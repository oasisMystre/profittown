import "dotenv/config";
import { Telegraf } from "telegraf";
import fastify, { type FastifyInstance } from "fastify";

import { getEnv } from "./env";
import registerBot from "./bot";
import { format } from "./utils/format";

export const main = (bot: Telegraf) => {
  async function main(server: FastifyInstance, bot: Telegraf) {
    registerBot(bot);

    const promises = [];

    bot.catch((error) => console.error(error));
    if (process.env.DOMAIN) {
      server.post(
        format("/telegraf/%", bot.secretPathComponent()),
        (await bot.createWebhook({ domain: process.env.DOMAIN! })) as any
      );
    } else
      promises.push(
        bot.launch().then(() => console.log("bot running in background"))
      );

    promises.push(
      server.listen({
        host: process.env.HOST ? process.env.HOST : "0.0.0.0",
        port: process.env.PORT ? Number(process.env.PORT!) : 10004,
      })
    );

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));

    return Promise.all(promises);
  }

  const server = fastify({ logger: true, ignoreTrailingSlash: true });

  main(server, bot);
};

const bot = new Telegraf(getEnv("TELEGRAM_ACCESS_TOKEN"));
main(bot);

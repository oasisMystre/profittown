import { readFileSync } from "fs";
import { Markup, type Telegraf } from "telegraf";
import { getEnv } from "../../env";

export const startAction = (telegraf: Telegraf) => {
  const mainMenu = [
    ["⚡️ VIP Signal", "vip-signal"],
    ["☘️ Mentorship", "mentorship"],
    ["＋ Create Account", "open-trade-account"],
    ["🔑 Account Management", "account-management"],
    ["🎁 Beginners Blueprint", "gift"],
    ["❓ FAQ", "faq"],
    ["📞 Contact Support", getEnv("SUPPORT_CONTACT"), "url"],
  ] as const;

  telegraf.start((context) => {
    return context.replyWithMarkdownV2(
      readFileSync("locale/en/start.md", "utf-8"),
      Markup.inlineKeyboard([
        ...mainMenu.map(([name, data, type]) => [
          type
            ? Markup.button.url(name, data)
            : Markup.button.callback(name, data),
        ]),
      ])
    );
  });

  telegraf.action("mainmenu", (context) =>
    context.editMessageText(readFileSync("locale/en/start.md", "utf-8"), {
      parse_mode: "MarkdownV2",
      reply_markup: Markup.inlineKeyboard([
        ...mainMenu.map(([name, data, type]) => [
          type
            ? Markup.button.url(name, data)
            : Markup.button.callback(name, data),
        ]),
      ]).reply_markup,
    })
  );
};

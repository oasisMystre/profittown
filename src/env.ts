import "dotenv/config";

import { format } from "./utils/format";

type Env =
  | "RATE"
  | "ACC_NO"
  | "SUPPORT"
  | "ACC_NO_1"
  | "BANK_NAME_1"
  | "GIFT_LINK"
  | "NAME"
  | "BANK_NAME"
  | "PREMIUM_CHANNEL"
  | "GIFT_PDF_LINK"
  | "DATABASE_URL"
  | "SUPPORT_CONTACT"
  | "WALLET_BTC"
  | "WALLET_USDT_TRC20"
  | "PREMIUM_CHANNEL_LINK"
  | "TELEGRAM_ACCESS_TOKEN"
  | "WALLET_USDT_ERC20"
  | "TRADE_ACCOUNT_LINK"
  | "GIFT_YOUTUBE_LINK";

export const getEnv = <T extends object | number | string | null = string>(
  name: Env,
  refine?: <K>(value: K) => T,
) => {
  const value = process.env["APP_" + name] || process.env[name];
  if (value)
    try {
      const parsed = JSON.parse(value) as T;
      return refine ? (refine(parsed) as T) : parsed;
    } catch {
      return (refine ? refine(value) : value) as T;
    }
  throw new Error(format("%s not found in env file", name));
};

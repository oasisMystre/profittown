import "dotenv/config";

import { format } from "./utils/format";

type Env = "RATE"|"SUPPORT"|"ACC_NO"|"ACC_NO_1"|"BANK_NAME_1"|"NAME"|"BANK_NAME"|"PREMIUM_CHANNEL"|"GIFT_LINK"|"SUPPORT_CONTACT"|"DATABASE_URL"|"WALLET_BTC"|"PREMIUM_CHANNEL_LINK"|"WALLET_USDT_TRC20"|"WALLET_USDT_ERC20"|"TELEGRAM_ACCESS_TOKEN"|"TRADE_ACCOUNT_LINK";

export const getEnv = <T extends object | number | string | null = string>(
  name: Env,
  refine?: <K extends unknown>(value: K) => T
) => {
  const value = process.env["APP_" + name] || process.env[name] ;
  if (value)
    try {
      const parsed = JSON.parse(value) as T;
      return refine ? (refine(parsed) as T) : parsed;
    } catch {
      return (refine ? refine(value) : value) as T;
    }
  throw new Error(format("% not found in env file", name));
};

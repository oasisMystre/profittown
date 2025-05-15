import "dotenv/config";

import { format } from "./utils/format";

type Env = "SUPPORT_CONTACT"|"DATABASE_URL"|"TELEGRAM_ACCESS_TOKEN"|"GIFT_LINK";

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

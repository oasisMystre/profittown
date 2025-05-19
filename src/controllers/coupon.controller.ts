import type { z } from "zod";
import { and, eq, gte, isNull, or } from "drizzle-orm";

import { Database } from "../db";
import { coupons } from "../db/schema";
import { selectCouponSchema } from "../db/zod";

export const getCouponByCode = (
  db: Database,
  code: z.infer<typeof selectCouponSchema>["code"]
) =>
  db.query.coupons.findFirst({
    where: and(
      eq(coupons.code, code),
      or(gte(coupons.expiresAt, new Date()), isNull(coupons.expiresAt))
    ),
  });

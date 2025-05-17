import { and, eq, isNull, lte, or } from "drizzle-orm";

import { Database } from "../db";
import { coupons } from "../db/schema";
import { selectCouponSchema } from "../db/zod";

export const getCouponByCode = (
  db: Database,
  code: Zod.infer<typeof selectCouponSchema>["code"]
) =>
  db.query.coupons.findFirst({
    where: and(
      eq(coupons.code, code),
      or(lte(coupons.expiresAt, new Date()), isNull(coupons.expiresAt))
    ),
  });

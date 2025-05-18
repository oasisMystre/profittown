import { and, desc, eq } from "drizzle-orm";

import { payments } from "../db/schema";
import type { Database } from "../db";
import type {
  insertPaymentSchema,
  selectCouponSchema,
  selectPaymentSchema,
  selectUserSchema,
} from "../db/zod";

export const createPayment = (
  db: Database,
  value: Zod.infer<typeof insertPaymentSchema>
) =>
  db
    .insert(payments)
    .values(value)
    .returning()
    .onConflictDoUpdate({
      target: [
        payments.user,
        payments.coupon,
        payments.plan,
        payments.type,
        payments.status,
      ],
      set: value,
    })
    .execute();

export const updatePaymentById = (
  db: Database,
  id: Zod.infer<typeof selectPaymentSchema>["id"],
  value: Partial<Zod.infer<typeof insertPaymentSchema>>
) =>
  db
    .update(payments)
    .set(value)
    .where(eq(payments.id, id))
    .returning()
    .execute();

export const getLastPaymentByUser = (
  db: Database,
  user: Zod.infer<typeof selectUserSchema>["id"]
) =>
  db.query.payments
    .findFirst({
      with: {
        plan: true,
      },
      columns: {
        id: true,
        status: true,
        type: true,
        plan: true,
      },
      where: eq(payments.user, user),
      orderBy: desc(payments.createdAt),
    })
    .execute();

export const getPaymentWithCouponAndUser = (
  db: Database,
  coupon: Zod.infer<typeof selectCouponSchema>["id"],
  user: Zod.infer<typeof selectUserSchema>["id"]
) =>
  db.query.payments
    .findFirst({
      with: {
        plan: true,
      },
      columns: {
        id: true,
        status: true,
        type: true,
        plan: true,
      },
      where: and(
        eq(payments.user, user),
        eq(payments.coupon, coupon),
        eq(payments.status, "successful")
      ),
      orderBy: desc(payments.createdAt),
    })
    .execute();

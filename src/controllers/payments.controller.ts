import { eq } from "drizzle-orm";

import { payments } from "../db/schema";
import type { Database } from "../db";
import type { insertPaymentSchema, selectPaymentSchema } from "../db/zod";

export const createPayment = (
  db: Database,
  value: Zod.infer<typeof insertPaymentSchema>
) =>
  db
    .insert(payments)
    .values(value)
    .returning()
    .onConflictDoUpdate({ target: payments.id, set: value })
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

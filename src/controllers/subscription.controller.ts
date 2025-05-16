import { and, desc, eq, getTableColumns } from "drizzle-orm";

import { payments, subscriptions } from "../db/schema";
import type { Database } from "../db";
import type {
  insertSubscriptionSchema,
  selectSubscriptionSchema,
  selectUserSchema,
} from "../db/zod";

export const createSubscription = (
  db: Database,
  value: Zod.infer<typeof insertSubscriptionSchema>
) =>
  db
    .insert(subscriptions)
    .values(value)
    .returning()
    .onConflictDoUpdate({ target: subscriptions.id, set: value })
    .execute();

export const updateSubscriptionById = (
  db: Database,
  id: Zod.infer<typeof selectSubscriptionSchema>["id"],
  value: Partial<Zod.infer<typeof insertSubscriptionSchema>>
) =>
  db
    .update(subscriptions)
    .set(value)
    .where(eq(subscriptions.id, id))
    .returning()
    .execute();

export const getSubscriptionById = (
  db: Database,
  id: Zod.infer<typeof selectSubscriptionSchema>["id"]
) =>
  db.query.subscriptions
    .findFirst({
      where: eq(subscriptions.id, id),
      with: {
        payment: {
          with: {
            plan: true,
            user: true,
          },
          columns: {
            plan: false,
            user: false,
          },
        },
      },
      columns: {
        payment: false,
      },
    })
    .execute();

export const getLastSubscriptionByUser = (
  db: Database,
  user: Zod.infer<typeof selectUserSchema>["id"]
) =>
  db
    .select({ ...getTableColumns(subscriptions) })
    .from(subscriptions)
    .innerJoin(
      payments,
      and(eq(subscriptions.payment, payments.id), eq(payments.user, user))
    )
    .where(eq(subscriptions.status, "active"))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1)
    .execute();

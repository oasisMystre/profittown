import type { z } from "zod";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

import { payments, plans, subscriptions } from "../db/schema";
import type { Database } from "../db";
import type {
  insertSubscriptionSchema,
  selectPlanSchema,
  selectSubscriptionSchema,
  selectUserSchema,
} from "../db/zod";

export const createSubscription = async (
  db: Database,
  value: z.infer<typeof insertSubscriptionSchema>,
) => {
  const [subscription] = await db
    .insert(subscriptions)
    .values(value)
    .returning()
    .onConflictDoUpdate({ target: subscriptions.id, set: value })
    .execute();

  return getSubscriptionById(db, subscription.id);
};

export const updateSubscriptionById = (
  db: Database,
  id: z.infer<typeof selectSubscriptionSchema>["id"],
  value: Partial<z.infer<typeof insertSubscriptionSchema>>,
) =>
  db
    .update(subscriptions)
    .set(value)
    .where(eq(subscriptions.id, id))
    .returning()
    .execute();

export const getSubscriptionById = (
  db: Database,
  id: z.infer<typeof selectSubscriptionSchema>["id"],
) =>
  db.query.subscriptions
    .findFirst({
      where: eq(subscriptions.id, id),
      with: {
        payment: {
          with: {
            plan: true,
            user: true,
            coupon: true,
          },
          columns: {
            plan: false,
            user: false,
            coupon: false,
          },
        },
      },
      columns: {
        payment: false,
      },
    })
    .execute();

export const getLastSubscriptionByUserAndPlanType = (
  db: Database,
  user: z.infer<typeof selectUserSchema>["id"],
  planType?: z.infer<typeof selectPlanSchema>["type"],
) => {
  return db
    .select({
      ...getTableColumns(subscriptions),
      plan: getTableColumns(plans),
      payment: getTableColumns(payments),
    })
    .from(subscriptions)
    .innerJoin(
      payments,
      and(eq(subscriptions.payment, payments.id), eq(payments.user, user)),
    )
    .innerJoin(
      plans,
      and(
        eq(payments.plan, plans.id),
        planType ? eq(plans.type, planType) : undefined,
      ),
    )
    .where(eq(subscriptions.status, "active"))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1)
    .execute();
};

import { eq } from "drizzle-orm";

import { subscriptions } from "../db/schema";
import type { Database } from "../db";
import type {
  insertSubscriptionSchema,
  selectSubscriptionSchema,
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

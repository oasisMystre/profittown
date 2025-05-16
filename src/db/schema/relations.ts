import { relations } from "drizzle-orm";

import { users } from "./users";
import { plans } from "./plans";
import { payments } from "./payments";
import { subscriptions } from "./subscriptions";

export const userRelations = relations(users, ({ one, many }) => ({
  payments: many(payments),
  subscriptions: many(subscriptions),
}));

export const paymentRelations = relations(payments, ({ one }) => ({
  user: one(users, { references: [users.id], fields: [payments.user] }),
  plan: one(plans, { references: [plans.id], fields: [payments.plan] }),
}));

export const subscriptionRelations = relations(subscriptions, ({ one }) => ({
  payment: one(payments, {
    references: [payments.id],
    fields: [subscriptions.payment],
  }),
}));

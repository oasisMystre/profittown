import { relations } from "drizzle-orm";

import { users } from "./users";
import { plans } from "./plans";
import { coupons } from "./coupons";
import { payments } from "./payments";
import { subscriptions } from "./subscriptions";

export const userRelations = relations(users, ({ many }) => ({
  payments: many(payments),
}));

export const planRelations = relations(plans, ({ many }) => ({
  payments: many(payments)
}));

export const paymentRelations = relations(payments, ({ one }) => ({
  user: one(users, { references: [users.id], fields: [payments.user] }),
  plan: one(plans, { references: [plans.id], fields: [payments.plan] }),
  coupon: one(coupons, { references: [coupons.id], fields: [payments.coupon] }),
}));

export const subscriptionRelations = relations(subscriptions, ({ one }) => ({
  payment: one(payments, {
    references: [payments.id],
    fields: [subscriptions.payment],
  }),
}));

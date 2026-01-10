import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { coupons, payments, plans, subscriptions, users } from "./schema";

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const selectPlanSchema = createSelectSchema(plans);
export const insertPlanSchema = createInsertSchema(plans);

export const selectPaymentSchema = createSelectSchema(payments);
export const insertPaymentSchema = createInsertSchema(payments, {
  paymentLink: z.url().optional().nullable(),
});

export const selectSubscriptionSchema = createSelectSchema(subscriptions);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);

export const selectCouponSchema = createSelectSchema(coupons);

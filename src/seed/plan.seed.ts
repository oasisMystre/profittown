import type { z } from "zod";

import { plans } from "../db/schema";
import type { Database } from "../db";
import type { insertPlanSchema } from "../db/zod";

const seedPlans: z.infer<typeof insertPlanSchema>[] = [
  {
    name: "Monthly",
    type: "subscription",
    price: { amount: 50, currency: "USD" },
    recurring: "monthly",
    paymentLink: "https://paystack.com/buy/profitvip-signals-aufhxe",
  },
  {
    name: "3 Months",
    type: "subscription",
    price: { amount: 135, currency: "USD" },
    recurring: "quarterly",
    paymentLink: "https://paystack.com/buy/profitvip-signals-aufhxe",
  },
  {
    name: "6 Months",
    type: "subscription",
    price: { amount: 240, currency: "USD" },
    recurring: "semi-annually",
    paymentLink: "https://paystack.com/buy/profitvip-signals-aufhxe",
  },
  {
    name: "12 Month",
    type: "subscription",
    price: { amount: 400, currency: "USD" },
    recurring: "annually",
    paymentLink: "https://paystack.com/buy/profitvip-signals-aufhxe",
  },
  {
    name: " 3 Months Mentorship + 6 Months Signals",
    type: "one-off",
    recurring: "quarterly",
    price: { amount: 500, currency: "USD" },
    paymentLink: "https://paystack.com/buy/profitvip-1on1-mentorship-vglvjq",
  },
  {
    name: "6 Months Mentorship + Lifetime Signals",
    type: "one-off",
    recurring: "semi-annually",
    price: { amount: 750, currency: "USD" },
    paymentLink: "https://paystack.com/buy/profitvip-1on1-mentorship-vglvjq",
  },
];

export const runSeedPlans = (db: Omit<Database, "$client">) =>
  db
    .insert(plans)
    .values(seedPlans)
    .onConflictDoUpdate({
      target: [plans.name, plans.price, plans.type],
      set: {
        name: plans.name,
        type: plans.type,
        price: plans.price,
        recurring: plans.recurring,
        paymentLink: plans.paymentLink,
      },
    })
    .returning();

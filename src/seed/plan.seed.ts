import { plans } from "../db/schema";
import type { Database } from "../db";
import { insertPlanSchema } from "../db/zod";

const seedPlans: Zod.infer<typeof insertPlanSchema>[] = [
  {
    name: "Monthly",
    type: "subscription",
    price: { amount: 50, currency: "USD" },
    recurring: "monthly",
  },
  {
    name: "3 Months",
    type: "subscription",
    price: { amount: 135, currency: "USD" },
    recurring: "quarterly",
  },
  {
    name: "6 Months",
    type: "subscription",
    price: { amount: 240, currency: "USD" },
    recurring: "semi-annually",
  },
  {
    name: "12 Month",
    type: "subscription",
    price: { amount: 400, currency: "USD" },
    recurring: "annually",
  },
  {
    name: "Group Mentorship",
    type: "one-off",
    price: { amount: 250, currency: "USD" },
  },
  {
    name: "1 on 1",
    type: "one-off",
    price: { amount: 450, currency: "USD" },
  },
];

export const runSeedPlans = (db: Omit<Database, "$client">) =>
  db
    .insert(plans)
    .values(seedPlans)
    .onConflictDoUpdate({
      target: [plans.name, plans.price, plans.type],
      set: { name: plans.name, type: plans.type, price: plans.price },
    })
    .returning();

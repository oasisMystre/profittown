import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { plans } from "./plans";
import { coupons } from "./coupons";

type PaymentProof = {
  receipt: string;
};

export const payments = pgTable(
  "payments",
  {
    id: serial().primaryKey(),
    user: text()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    proof: jsonb().$type<PaymentProof>(),
    plan: integer()
      .references(() => plans.id, { onDelete: "cascade" })
      .notNull(),
    coupon: integer().references(() => coupons.id, { onDelete: "set null" }),
    type: text({ enum: ["usdt", "btc", "naira"] }).notNull(),
    status: text({ enum: ["pending", "processing", "successful"] })
      .default("pending")
      .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (column) => ({
    unique_payment: unique()
      .on(column.user, column.coupon, column.plan, column.type, column.status)
      .nullsNotDistinct(),
  }),
);

import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { plans } from "./plans";

type PaymentProof = {
  receipt: string;
};

export const payments = pgTable("payments", {
  id: serial().primaryKey(),
  user: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  proof: jsonb().$type<PaymentProof>(),
  plan: serial()
    .references(() => plans.id, { onDelete: "cascade" })
    .notNull(),
  type: text({ enum: ["usdt", "btc", "naira"] }).notNull(),
  status: text({ enum: ["pending", "processing", "successful"] })
    .default("pending")
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

import { pgTable, serial, timestamp, uuid } from "drizzle-orm/pg-core";
import { payments } from "./payments";

export const subscriptions = pgTable("subscriptions", {
  id: serial().primaryKey(),
  payment: serial()
    .references(() => payments.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

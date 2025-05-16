import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { payments } from "./payments";

export const subscriptions = pgTable("subscriptions", {
  id: serial().primaryKey(),
  payment: serial()
    .references(() => payments.id, { onDelete: "cascade" })
    .notNull(),
  joined: boolean().default(false).notNull(),
  status: text({ enum: ["pending", "active", "expired"] })
    .default("pending")
    .notNull(),
  expiresAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});

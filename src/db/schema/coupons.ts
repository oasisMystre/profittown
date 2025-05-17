import { decimal, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const coupons = pgTable("coupons", {
  id: serial().primaryKey(),
  code: text().unique().notNull(),
  discount: decimal().notNull(),
  expiresAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});

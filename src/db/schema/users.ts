import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  lastLogin: timestamp().defaultNow().notNull(),
});

import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const plans = pgTable(
  "plans",
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    type: text({ enum: ["subscription", "one-off"] }).notNull(),
    recurring: text({
      enum: ["monthly", "quarterly", "semi-annually", "annually"],
    }),
    paymentLink: text(),
    price: jsonb()
      .$type<{ amount: number; currency: "USD" | "NGN" }>()
      .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (column) => ({
    uniquePlan: unique().on(column.name, column.price, column.type),
  }),
);

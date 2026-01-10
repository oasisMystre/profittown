import type { z } from "zod";
import { eq } from "drizzle-orm";

import { users } from "../db/schema";
import type { Database } from "../db";
import type { insertUserSchema, selectUserSchema } from "../db/zod";

export const createUser = async (
  db: Database,
  value: z.infer<typeof insertUserSchema>,
) => {
  const [user] = await db
    .insert(users)
    .values(value)
    .returning()
    .onConflictDoUpdate({ target: users.id, set: value })
    .execute();

  return user;
};

export const updateUserById = (
  db: Database,
  id: z.infer<typeof selectUserSchema>["id"],
  value: Partial<z.infer<typeof insertUserSchema>>,
) => db.update(users).set(value).where(eq(users.id, id)).returning().execute();

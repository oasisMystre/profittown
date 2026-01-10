import type { z } from "zod";

import { and, eq, type SQL } from "drizzle-orm";
import type { Database } from "../db";
import { plans } from "../db/schema";
import type { selectPlanSchema } from "../db/zod";

export const getPlansByType = (
  db: Database,
  type: z.infer<typeof selectPlanSchema>["type"],
  where?: SQL,
) =>
  db.query.plans
    .findMany({
      where: and(eq(plans.type, type), where),
    })
    .execute();

export const getPlansById = (
  db: Database,
  id: z.infer<typeof selectPlanSchema>["id"],
) =>
  db.query.plans
    .findFirst({
      where: eq(plans.id, id),
    })
    .execute();

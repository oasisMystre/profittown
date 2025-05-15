import { eq } from "drizzle-orm";
import { Database } from "../db";
import { plans } from "../db/schema";
import { selectPlanSchema } from "../db/zod";

export const getPlansByType = (
  db: Database,
  type: Zod.infer<typeof selectPlanSchema>["type"]
) =>
  db.query.plans
    .findMany({
      where: eq(plans.type, type),
    })
    .execute();

export const getPlansById = (
  db: Database,
  id: Zod.infer<typeof selectPlanSchema>["id"]
) =>
  db.query.plans
    .findFirst({
      where: eq(plans.id, id),
    })
    .execute();

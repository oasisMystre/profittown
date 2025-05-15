import { db } from "../instances";
import type { Database } from "../db";
import { runSeedPlans } from "./plan.seed";

export const seed = (db: Database) =>
  db.transaction((db) => Promise.all([runSeedPlans(db)]));

seed(db);

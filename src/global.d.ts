import type { Context, Scenes } from "telegraf";

import type { selectCouponSchema, selectPlanSchema, userSelectSchema } from "./db/zod";
import { createUser } from "./controllers/users.controller";

type SessionData = {
  previousCommand?: string;
  plan?: Zod.infer<typeof selectPlanSchema>,
  coupon?: Zod.infer<typeof selectCouponSchema>;
};

type Session = SessionData;

declare module "telegraf" {
  interface Context {
    user: Awaited<ReturnType<typeof createUser>>;
    session: Session;
    scene: Scenes.SceneContext["scene"];
  }
}

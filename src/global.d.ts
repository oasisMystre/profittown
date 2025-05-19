import type { z } from "zod";
import type { Context, Scenes } from "telegraf";

import type {
  selectCouponSchema,
  selectPlanSchema,
  userSelectSchema,
} from "./db/zod";
import { createUser } from "./controllers/users.controller";

type SessionData = {
  previousCommand?: string;
  plan?: z.infer<typeof selectPlanSchema>;
  coupon?: z.infer<typeof selectCouponSchema>;
};

type Session = SessionData;

declare module "telegraf" {
  interface Context {
    user: Awaited<ReturnType<typeof createUser>>;
    session: Session;
    scene: Scenes.SceneContext["scene"];
  }
}

declare global {
  const Zod: typeof z;
}


type X = Zod
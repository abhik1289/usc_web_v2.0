import { Hono } from "hono";
import { handle } from "hono/vercel";
import { user } from "./user";
import { event } from "./event";
import testimonials from "./testimonials";
import champions from "./champions";
import domain from "./domain";
import { leads } from "./leads";
import mentor from "./mentor";
const app = new Hono().basePath("/api");



const _routePath = app
  .route("/user", user)
  .route("/event", event)
  .route("/testimonials", testimonials)
  .route("/champions", champions)
  .route("/domain", domain)
  .route("/leads", leads)
  .route("/mentor", mentor);
  // /api/testimonials/add
export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof _routePath;

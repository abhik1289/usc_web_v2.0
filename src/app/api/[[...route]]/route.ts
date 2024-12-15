import { Hono } from "hono";
import { handle } from "hono/vercel";
import { user } from "./user";
import { event } from "./event";
import testimonials from "./testimonials";
import champions from "./champions";
import domain from "./domain";
const app = new Hono().basePath("/api");

// app.use("/user/*", async (c: any, next) => {
//   try {
//     console.log(c.env.SIGNIN_TOKEN_KEY);
//     const jwtMiddleware = jwt({
//       secret: c.env.SIGNIN_TOKEN_KEY!,
//     });
//     await jwtMiddleware(c, next);
//   } catch (error) {
//     return c.json({ error: "Unauthorized or invalid token" }, 401);
//   }
// });

const _routePath = app
  .route("/user", user)
  .route("/event", event)
  .route("/testimonials", testimonials)
  .route("/champions", champions)
  .route("/domain", domain);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof _routePath;

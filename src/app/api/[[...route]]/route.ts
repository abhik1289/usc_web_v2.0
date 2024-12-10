import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";
import { user } from "./user";


export const db = new PrismaClient();
// export const runtime = 'edge'

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

const route = app.route("/user", user);

export const GET = handle(app);
export const POST = handle(app);


export type AppType = typeof route;
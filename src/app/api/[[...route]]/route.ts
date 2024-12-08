import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";
import { user } from "./user";

export const db = new PrismaClient();
// export const runtime = 'edge'

const app = new Hono().basePath("/api");
app.route("/user", user);

export const GET = handle(app);
export const POST = handle(app);

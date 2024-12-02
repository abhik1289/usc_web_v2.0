import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client for Edge Runtime
// const prisma = new PrismaClient();

// Define the runtime environment
export const runtime = "edge";

// Create the main Hono app instance
const app = new Hono().basePath("/api");

// Route: Hello World
app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

// Error Handling Middleware
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

// Not Found Handler
app.notFound((c) => {
  return c.json({ error: "Resource not found" }, 404);
});

// Import and register user routes
import userRoutes from "./user";
app.route("/user", userRoutes);

// Export the app for Next.js Edge Runtime
export const GET = handle(app);
export const POST = handle(app);

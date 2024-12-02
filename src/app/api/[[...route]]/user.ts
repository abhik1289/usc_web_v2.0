import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client";
import UserModel from "@/schema/user.model";
import { connect } from "@/db/connection";

// Initialize Prisma Client
// const prisma = new PrismaClient();

// Create a separate instance for user routes
const user = new Hono();

connect();
// Add a new user
user.post("/add-user", async (c) => {
  try {
    // Connect to the database

    // Parse the request body
    const { email, password, role = "user" } = await c.req.json();

    // Validate input data
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return c.json({ error: "Email already in use" }, 409);
    }

    // Create a new user
    const newUser = await UserModel.create({
      email,
      password,
      role, // Default role is "user" unless specified
    });

    return c.json(
      { message: "User created successfully!", user: newUser },
      201
    );
  } catch (error: any) {
    console.error(`Error adding user: ${error.message}`);
    return c.json({ error: "Failed to add user" }, 500);
  }
});

export default user;

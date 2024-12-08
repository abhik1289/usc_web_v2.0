import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/db";
import { User } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { addUser, signInUser } from "@/schemas/auth/user.schema";
import { setCookie } from "hono/cookie";
import {
  generateActiveToken,
  generateSignInToken,
} from "@/lib/authentication/token";
import { jwt, type JwtVariables } from "hono/jwt";
import { getUserByEmail } from "@/lib/helper/userHelper";
import axios from "axios";
type Variables = JwtVariables;
export const user = new Hono<{ Variables: Variables }>()
  .post("/sign-in", zValidator("json", signInUser), async (c) => {
    try {
      // Extract email and password from the validated request
      const { email, password } = await c.req.json();
      // Check if the user exists in the database
      const existingUser: User | null = await getUserByEmail(email);

      if (!existingUser) {
        return c.json({success: false, error: "Invalid email or password." }, 401);
      }

      // Verify the password against the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password!
      );
      if (!isPasswordValid) {
        return c.json({success: false, error: "Invalid email or password." }, 401);
      }

      // Generate a sign-in token
      const token = generateSignInToken(email, "1d");

      // Set the token in an HTTP-only secure cookie
      setCookie(c, "token", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: 86400, // 1 day in seconds
        expires: new Date(Date.now() + 86400 * 1000), // 1 day from now
      });

      // Return a success response with user details
      return c.json({
        success: true,
        message: "Sign-in successful.",
        user: {
          email: existingUser.email,
          name: existingUser.firstName,
          role: existingUser.role,
        },
      });
    } catch (error) {
      console.error("Sign-in error:", error);
      return c.json(
        {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        },
        500
      );
    }
  })
  .get(
    "/get-user",
    jwt({
      secret: process.env.SIGNIN_TOKEN_KEY!,
    }),
    async (c) => {
      try {
      } catch (error) {}
    }
  )
  .post("/add-user", zValidator("json", addUser), async (c) => {
    try {
      const { first_name, email, role } = await c.req.json();
      const existingUser: User | null = await getUserByEmail(email);

      if (existingUser) {
        return c.json(
          { success: false, error: "This email already exits" },
          409
        );
      }

      // Create a new user record in the database
      const token = generateActiveToken(email);
      const tokenExpiration = Date.now() + 60 * 60 * 1000;
      const savedUser = await db.user.create({
        data: {
          firstName: first_name,
          email: email,
          role: role,
          activeToken: token,
          activeTokenExpires: new Date(tokenExpiration),
        },
      });
      const setupUrl = `${process.env.CLIENT_URL}/set-up?token=${token}`;
      const status: {
        error?: any;
        data?: string;
      } = await axios.post(`${process.env.CLIENT_URL}/api/send`, {
        firstName: first_name,
        role,
        setupUrl,
        email,
      });
      if (status.error) {
        return c.json(
          { success: false, error: "Problem occurred" },
          { status: 401 }
        );
      }
      return c.json({ success: true, message: "User Invitation send" }, 200);
    } catch (error) {
      console.error("Sign-in error:", error);
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  });

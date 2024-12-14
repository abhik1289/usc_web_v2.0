import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/db";
import { User } from "@prisma/client";
// import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  addUser,
  setUpAccount,
  signInUser,
  changePWD,
} from "@/schemas/auth/user.schema";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import {
  decodeActiveToken,
  decodeSignInToken,
  generateActiveToken,
  generateSignInToken,
  SignInTokenPayload,
} from "@/lib/authentication/token";
import { getUserByEmail } from "@/lib/helper/userHelper";
import axios from "axios";
// import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
// import { JWTPayload } from "hono/utils/jwt/types";
type Variables = JwtVariables;

export const user = new Hono<{ Variables: Variables }>()
  .post("/sign-in", zValidator("json", signInUser), async (c) => {
    try {
      // Extract email and password from the validated request
      const { email, password } = await c.req.json();
      // console.log(email, password)
      // Check if the user exists in the database
      const existingUser: User | null = await getUserByEmail(email);
      console.log(existingUser);
      if (!existingUser) {
        return c.json(
          { success: false, error: "Invalid email or password." },
          401
        );
      }

      // Verify the password against the hashed password stored in the database
      if (!existingUser.password) {
        return c.json(
          { success: false, error: "Invalid email or password." },
          401
        );
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password!
      );
      if (!isPasswordValid) {
        return c.json(
          { success: false, error: "Invalid email or password." },
          401
        );
      }

      // Generate a sign-in token
      const payload = {
        email: email,
        role: existingUser.role,
        id: existingUser.id,
      };
      const token = generateSignInToken(payload, "1d");

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
          token,
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
  .post("/update-password", zValidator("json", changePWD), async (c) => {
    try {
      // Extract token from cookies
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      }

      // Parse request body
      const { oldPassword, newPassword } = await c.req.json();

      // Decode and validate the JWT
      let user: SignInTokenPayload;
      try {
        user = decodeSignInToken(token);
      } catch (error) {
        console.log(error);
        return c.json(
          { success: false, error: "Invalid or expired token" },
          401
        );
      }

      const email = user.payload.email!;

      // Retrieve the existing user from the database
      const existingUser: User | null = await getUserByEmail(email);
      if (!existingUser) {
        return c.json({ success: false, error: "User not found" }, 404);
      }

      // Validate the old password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        existingUser.password!
      );
      if (!isPasswordValid) {
        return c.json({ success: false, error: "Incorrect old password" }, 401);
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return c.json(
        { success: true, message: "Password changed successfully" },
        200
      );
    } catch (error) {
      console.error("Error updating password:", error); // Log the error for debugging
      return c.json(
        { success: false, error: "An unexpected error occurred" },
        500
      );
    }
  })
  .post("/add-user", zValidator("json", addUser), async (c) => {
    try {
      const SignInToken = getCookie(c, "token");
      if (!SignInToken) {
        return c.json({ success: false, error: "Token not found" }, 401);
      }
      const decodeToken = decodeSignInToken(SignInToken);
      if (decodeToken.payload.role != "SUPERADMIN") {
        return c.json(
          { success: false, error: "Super admin only add a new user" },
          409
        );
      }else{
      const { firstName, email, role } = await c.req.json();
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
      await db.user.create({
        data: {
          firstName: firstName,
          email: email,
          role: role,
          activeToken: token,
          activeTokenExpires: new Date(tokenExpiration),
        },
      });
      const setupUrl = `${process.env.CLIENT_URL}/set-up?token=${token}`;
      const status: {
        error?: string;
        data?: string;
      } = await axios.post(`${process.env.CLIENT_URL}/api/send`, {
        firstName: firstName,
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
    }
      return c.json({ success: true, message: "User Invitation send" }, 200);
    } catch (error) {
      console.error("Sign-in error:", error);
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  })
  .post("/set-up-profile", zValidator("json", setUpAccount), async (c) => {
    try {
      console.log("This is a test");
      const { last_name, first_name, password, token } = await c.req.json();
      console.log(last_name, first_name, password, token);
      const data: any = decodeActiveToken(token);
      const email = data.email!;
      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        return c.json(
          {
            error: "This email does not exist in our records.",
            success: false,
          },
          { status: 409 }
        );
      }

      // Check if the token has expired
      const currentTime = new Date();
      if (
        !existingUser.activeTokenExpires ||
        new Date(existingUser.activeTokenExpires) < currentTime
      ) {
        return c.json(
          {
            error: "Your token has expired. Please request a new one.",
            success: false,
          },
          { status: 401 }
        );
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.update({
        where: {
          email: email,
        },
        data: {
          lastName: last_name,
          firstName: first_name,
          password: hashedPassword,
          isActive: true,
          activeToken: null,
          activeTokenExpires: null,
        },
      });
      return c.json(
        { message: "User successfully updated.", success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error("Sign-in error:", error);
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  })
  .get("/get-user", async (c) => {
    try {
      const token = getCookie(c, "token");
      console.log(token);
      if (!token) {
        return c.json(
          {
            error: "token not found",
            success: false,
          },
          401
        );
      } else {
        const user: SignInTokenPayload = decodeSignInToken(token);
        const email = user.payload.email!;
        const infos = await getUserByEmail(email);
        console.log("------------------>", infos);
        return c.json(
          {
            infos,
          },
          201
        );
      }
    } catch (error) {
      console.log(error);
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  })
  .get("/logout", async (c) => {
    try {
      deleteCookie(c, "token");
      return c.json(
        {
          success: true,
          message: "Logout was successful",
        },
        201
      );
    } catch (error) {
      console.log(error);
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  })
  .get("/get-users", async (c) => {
    try {
      const token = getCookie(c, "token");
      console.log(token);
      if (!token) {
        return c.json(
          {
            error: "token not found",
            success: false,
          },
          401
        );
      } else {
        const users: User[] | null = await db.user.findMany();
        console.log(users);
        if (users && users.length === 0) {
          return c.json(
            {
              success: false,
              error: "No users found",
            },
            404
          );
        } else {
          return c.json(
            {
              success: true,
              users,
            },
            200
          );
        }
      }
    } catch (error) {
      console.log(error);

      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  })
  .post("/delete-user", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json(
          {
            error: "token not found",
            success: false,
          },
          401
        );
      } else {
        const { email } = await c.req.json();
        const user: SignInTokenPayload = decodeSignInToken(token);
        const role = user.payload.role!;
        if (role != "SUPERADMIN") {
          return c.json({ error: "You must be a super admin" }, 401);
        } else {
          await db.user.delete({
            where: {
              email: email,
            },
          });
          return c.json({ success: true, message: "Deleted account" });
        }
      }
    } catch (e) {
      return c.json(
        { error: "An unexpected error occurred. Please try again." },
        500
      );
    }
  });

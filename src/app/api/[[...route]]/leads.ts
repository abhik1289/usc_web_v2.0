import { Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { eventSchema } from "@/schemas/events/event.shema";
import { getCookie } from "hono/cookie";
import { Event } from "@prisma/client";
import { decodeSignInToken } from "@/lib/authentication/token";
import mongoose, { ObjectId } from "mongoose";

const leads = new Hono()
  .post("/add-lead", zValidator("json", eventSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        
      }
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
 


export { leads };

import { Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { eventSchema } from "@/schemas/events/event.shema";
import { getCookie } from "hono/cookie";
import { Event } from "@prisma/client";
import { decodeSignInToken } from "@/lib/authentication/token";
import mongoose, { ObjectId } from "mongoose";

const event = new Hono()
  .post("/add-event", zValidator("json", eventSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const {
          title,
          description,
          location,
          banner_url,
          eventType,
          startDate,
          endDate,
          startTime1,
          endTime1,
          startTime2,
          endTime2,
          displayType,
          socialMedia,
        } = c.req.valid("json");
        const userData = decodeSignInToken(token);

        const userId = userData.payload.id!;
        let id = new mongoose.Types.ObjectId(userId);
        console.log("User ID:", userId);
        console.log(id);
        const user = db.user.findUnique({
          where: { email: userData.payload.email },
        });
        await db.event.create({
          data: {
            title,
            description,
            location,
            banner_url,
            eventType,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            startTime1,
            endTime1,
            startTime2,
            endTime2,
            displayType,
            socialMedia,
          },
        });
      }
      return c.json(
        {
          success: true,
          message: "Event successfully added",
        },
        201
      );
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
  .get("/all-events", async (c) => {
    try {
      const events = await db.event.findMany();
      return c.json(
        {
          success: true,
          events,
        },
        200
      );
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
  .post("/edit-event/:id", zValidator("json", eventSchema), async (c) => {
    try {
      const id = c.req.param("id");
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const {
          title,
          description,
          location,
          banner_url,
          eventType,
          startDate,
          endDate,
          startTime1,
          endTime1,
          startTime2,
          endTime2,
          displayType,
          socialMedia,
        } = c.req.valid("json");
        await db.event.update({
          where: {
            id: id,
          },
          data: {
            title,
            description,
            location,
            banner_url,
            eventType,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            startTime1,
            endTime1,
            startTime2,
            endTime2,
            displayType,
            socialMedia,
          },
        });
        return c.json(
          {
            success: true,
            message: "Event modified successfully",
          },
          201
        );
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
  .get("/delete-event/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        await db.event.delete({
          where: {
            id: id,
          },
        });
        return c.json(
          {
            success: true,
            message: "successfully deleted ",
          },
          201
        );
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
  .get("/change-view/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const token = getCookie(c, "token");
      // console.log("HELLO");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const event = await db.event.findFirst({ where: { id: id } });
        if (event?.displayType == "PRIVATE") {
          //to make it public
          await db.event.update({
            where: {
              id: id,
            },
            data: {
              displayType: "PUBLIC",
            },
          });
          return c.json(
            {
              success: true,
              message: "Now it is public",
            },
            200
          );
        } else {
          await db.event.update({
            where: {
              id: id,
            },
            data: {
              displayType: "PRIVATE",
            },
          });
          return c.json(
            {
              success: true,
              message: "Now it is Private !",
            },
            200
          );
        }
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
  });

export { event };

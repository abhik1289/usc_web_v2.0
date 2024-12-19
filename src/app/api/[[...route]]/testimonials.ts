import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { testimonialSchema } from "@/schemas/testimonials/testimonials.shema";
import { getCookie } from "hono/cookie";
import { db } from "@/lib/db/db";
import { decodeSignInToken } from "@/lib/authentication/token";
import { request } from "node_modules/axios/index.cjs";
import { z } from "zod";
const testimonials = new Hono()
  .post("/add", zValidator("json", testimonialSchema), async (c) => {
    try {
      const { fullName, photoUrl, rolesId, text } = c.req.valid("json");

      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const testimonials = await db.testimonials.findMany();
        // console.log("-------------->", testimonials);
        let index;
        if (testimonials.length === 0) {
          index = 0;
        } else {
          index = testimonials[testimonials.length - 1].index + 1;
        }
        await db.testimonials.create({
          data: { fullName, photoUrl, rolesId, text, index, userId: id },
        });
        return c.json(
          {
            success: true,
            message: "Testimonials created successfully",
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
  .get("/", async (c) => {
    try {
      const testimonials = await db.testimonials.findMany({
        include: {
          position: {
            select: {
              title: true,
            },
          },
        },
      });
      return c.json(
        {
          success: true,
          message: testimonials,
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
  .get("/:id", async (c) => {
    try {
      const testimonial = await db.testimonials.findFirst({
        where: { id: c.req.param("id") },
        include: {
          position: {
            select: {
              title: true,
            },
          },
        },
      });
      return c.json(
        {
          success: true,
          message: testimonial,
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
  .get("/delete/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const id = c.req.param("id");
        await db.testimonials.delete({
          where: {
            id: id,
          },
        });
        return c.json(
          {
            success: true,
            message: "successfully deleted ",
          },
          200
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
  .post(
    "/edit-sequence/:id",
    zValidator(
      "json",
      z.object({
        index: z.number().nonnegative(),
      })
    ),
    async (c) => {
      try {
        const token = getCookie(c, "token");
        if (!token) {
          return c.json({ success: false, error: "Token not found" }, 401);
        } else {
          const userToken = decodeSignInToken(token);

          const { id } = userToken.payload;
          const { index } = c.req.valid("json");
          const Tid = c.req.param("id");
          await db.testimonials.update({
            where: { id: Tid },
            data: { index, userId: id },
          });
          return c.json(
            {
              success: true,
              message: "Sequence updated successfully",
            },
            200
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
    }
  )
  .post("/update/:id", zValidator("json", testimonialSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const Tid = c.req.param("id");
        const { fullName, photoUrl, rolesId, text } = c.req.valid("json");
        await db.testimonials.update({
          where: {
            id: Tid,
          },
          data: { fullName, photoUrl, rolesId, text, userId: id },
        });
        return c.json(
          {
            success: true,
            message: "updated successfully",
          },
          200
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
  });

export default testimonials;

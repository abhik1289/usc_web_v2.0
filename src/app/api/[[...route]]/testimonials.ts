import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { testimonialSchema } from "@/schemas/testimonials/testimonials.shema";
import { getCookie } from "hono/cookie";
import { db } from "@/lib/db/db";
import { decodeSignInToken } from "@/lib/authentication/token";

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
          data: { fullName, photoUrl, rolesId, text, index, userId: id, publicId: "" },
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
        orderBy: [
          {
            index: "asc",
          },
        ],
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
  .post("/update/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const Tid = c.req.param("id");
        const body = await c.req.parseBody();
        const { fullName, photoUrl, rolesId, text, index } = body;
        //convert into string
        const indexStr = index.toString();
        const fullNameStr = fullName.toString();
        const photoUrlStr = photoUrl.toString();
        const rolesIdStr = rolesId.toString();
        const textStr = text.toString();
        //convert into integer
        const sequence = parseInt(indexStr || '0');
        //for file upload
        const files = body.file;

        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {
          await db.testimonials.update({
            where: { id: Tid }, data: {
              fullName: fullNameStr, photoUrl: photoUrlStr, rolesId: rolesIdStr, text: textStr, index: sequence, userId: id
            }
          });
          return c.json(
            {
              success: true,
              message: "updated successfully",
            },
            200
          );
        } else {

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

export default testimonials;

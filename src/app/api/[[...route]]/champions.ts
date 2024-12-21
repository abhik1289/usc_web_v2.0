import { decodeSignInToken } from "@/lib/authentication/token";
import { db } from "@/lib/db/db";
import { championSchema } from "@/schemas/champions/champions.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { z } from "zod";

const champions = new Hono()
  .post("/add", zValidator("json", championSchema), async (c) => {
    try {
      const { profilePhoto, coverPhoto, fullName, description, rolesId } =
        c.req.valid("json");
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        let index;
        const champions = await db.champions.findMany();
        if (champions.length === 0) {
          index = 0;
        } else {
          index = champions[champions.length - 1].index + 1;
        }
        await db.champions.create({
          data: {
            profilePhoto,
            coverPhoto,
            fullName,
            description,
            rolesId,
            index,
            userId: id,
          },
        });
        return c.json(
          {
            success: true,
            message: "successfully added ",
          },
          201
        );
      }
    } catch (error) {
      console.error("error:", error);
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
      const champions = await db.champions.findMany();
      return c.json(
        {
          success: true,
          champions,
        },
        200
      );
    } catch (error) {
      console.error("error:", error);
      return c.json(
        {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        },
        500
      );
    }
  }).get("/:id", async (c) => {
    try {
      const champions = await db.champions.findFirst({
        where: {
          id: c.req.param("id")
        }
      });
      return c.json(
        {
          success: true,
          champions,
        },
        200
      );
    } catch (error) {
      console.error("error:", error);
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
        await db.champions.delete({
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
      console.error("error:", error);
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
          await db.champions.update({
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
        console.error("error:", error);
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
  .post("/update/:id", zValidator("json", championSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const Tid = c.req.param("id");
        const { profilePhoto, coverPhoto, fullName, description, rolesId } =
          c.req.valid("json");
        await db.champions.update({
          where: {
            id: Tid,
          },
          data: {
            profilePhoto,
            coverPhoto,
            fullName,
            description,
            rolesId,
            userId: id,
          },
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

export default champions;

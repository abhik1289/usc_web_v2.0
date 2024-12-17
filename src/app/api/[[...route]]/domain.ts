import { decodeSignInToken } from "@/lib/authentication/token";
import { db } from "@/lib/db/db";
import {
  addDomainGroupSchema,
  addRoleSchema,
  DomainDetailsSchema,
} from "@/schemas/domain/domain.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { z } from "zod";

const domain = new Hono()
  .post(
    "/add-domain-group",
    zValidator("json", addDomainGroupSchema),
    async (c) => {
      try {
        const token = getCookie(c, "token");
        if (!token) {
          return c.json({ success: false, error: "Token not found" }, 401);
        } else {
          const userToken = decodeSignInToken(token);
          const { id } = userToken.payload;
          const { title } = c.req.valid("json");
          await db.domainGroup.create({
            data: {
              title: title,
              userId: id,
            },
          });

          return c.json(
            {
              success: true,
              message: "Domain Group successfully added ",
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
  .post("/update/:id", zValidator("json", addDomainGroupSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const { title } = c.req.valid("json");
        const uId = c.req.param("id");
        await db.domainGroup.update({
          where: { id: uId },
          data: {
            title: title,
            userId: id,
          },
        });

        return c.json(
          {
            success: true,
            message: "modified successfully",
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
  .get("/get-domain-groups", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const domainGroups = await db.domainGroup.findMany({
          include: {
            createdBy: {
              select: {
                firstName: true,
              },
            },
          },
        });
        console.log(domainGroups);
        return c.json({ success: true, domainGroups: domainGroups });
      }
    } catch (error) {
      console.error("Error is", error);
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
        await db.domainGroup.delete({
          where: { id },
        });
        return c.json({ success: true, message: "Deleted" }, 200);
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
  .post("/add-role", zValidator("json", addRoleSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const { title } = c.req.valid("json");
        await db.roles.create({
          data: {
            title: title,
            userId: id,
          },
        });

        return c.json(
          {
            success: true,
            message: "Role added ",
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
  .get("/get-roles", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const roles = await db.roles.findMany();
        return c.json({ success: true, roles: roles }, 200);
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
  .get("/delete-role/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const id = c.req.param("id");
        await db.roles.delete({
          where: { id },
        });
        return c.json({ success: true, message: "Deleted" }, 200);
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
  .post("/update-role/:id", zValidator("json", addRoleSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const { title } = c.req.valid("json");
        const uId = c.req.param("id");
        await db.roles.update({
          where: { id: uId },
          data: {
            title: title,
            userId: id,
          },
        });

        return c.json(
          {
            success: true,
            message: "modified  successfully",
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
    "/add-domainDetails",
    zValidator("json", DomainDetailsSchema),
    async (c) => {
      try {
        const token = getCookie(c, "token");
        if (!token) {
          return c.json({ success: false, error: "Token not found" }, 401);
        } else {
          const { title, description, bannerUrl, url, groupOf } =
            c.req.valid("json");
          const userToken = decodeSignInToken(token);
          const { id } = userToken.payload;
          await db.domainDetails.create({
            data: {
              title,
              description,
              bannerUrl,
              url: url ? url : null,
              userId: id,
              domainGroupId: groupOf,
            },
          });
          return c.json({ success: true, message: "Successfully Added" }, 201);
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
  .get("/get-domains", async (c) => {
    try {
      const id = c.req.param("id");
      const domainsDetails = await db.domainDetails.findMany({
        include: {
          domainGroup: {
            select: {
              title: true,
            },
          },
        },
      });
      return c.json({ success: true, message: domainsDetails }, 200);
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
  .get("/delete-domain/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const id = c.req.param("id");
        await db.domainDetails.delete({
          where: { id },
        });
        return c.json({ success: true, roles: "Successfully deleted" }, 200);
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
    "/update-domainDetails/:id",
    zValidator("json", DomainDetailsSchema),
    async (c) => {
      try {
        const token = getCookie(c, "token");
        if (!token) {
          return c.json({ success: false, error: "Token not found" }, 401);
        } else {
          const { title, description, bannerUrl, url, groupOf } =
            c.req.valid("json");
          const userToken = decodeSignInToken(token);
          const { id } = userToken.payload;
          await db.domainDetails.update({
            where: { id: c.req.param("id") },
            data: {
              title,
              description,
              bannerUrl,
              url: url ? url : null,
              userId: id,
              domainGroupId: groupOf,
            },
          });
          return c.json(
            { success: true, message: "Successfully Modified" },
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
  .get("/domain-details/:id", async (c) => {
    try {
      const id = c.req.param("id");
      console.log(id)
      const domain = await db.domainDetails.findFirst({ where: { id: id },include:{
        domainGroup:{
          select:{
            title:true
          }
        }
      } });
      console.log(domain)
      if (!domain) {
        return c.json({ success: false, error: "Invalid Id" }, 400);
      } else {
        return c.json({ success: true, message: domain }, 200);
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
export default domain;

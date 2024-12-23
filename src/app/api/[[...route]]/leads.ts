import { Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { eventSchema } from "@/schemas/events/event.shema";
import { getCookie } from "hono/cookie";
import { Event } from "@prisma/client";
import { decodeSignInToken } from "@/lib/authentication/token";
import mongoose, { ObjectId } from "mongoose";
import { LeadsSchema } from "@/schemas/leads/leads.schema";

const leads = new Hono()
  .post("/add-lead", zValidator("json", LeadsSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        



        const {
          fullName,
          isCoreMember,
          coreMemberPositionId,
          isCurrent,
          profilePhoto,
          domainGroupId,
          domainNameId,
          Social,
        } = c.req.valid("json");
        console.log(fullName,
          isCoreMember,
          coreMemberPositionId,
          isCurrent,
          profilePhoto,
          domainGroupId,
          domainNameId,
          Social)
        const { githubUrl, instagramUrl, linkedinUrl, email, portfolioUrl } =
          Social;
        const leads = await db.leads.findMany();
        let index;
        if (leads.length === 0) {
          index = 0;
        } else {
          index = leads[leads.length - 1].index + 1;
        }
        const lead = await db.leads.create({
          data: {
            fullName,
            isCoreMember,
            coreMemberPositionId,
            isCurrent,
            profilePhoto,
            domainGroupId,
            domainNameId,
            userId: id,
            index,
          },
        });
        await db.social.create({
          data: {
            leadId: lead.id,
            githubUrl,
            instagramUrl,
            linkedinUrl,
            email,
            portfolioUrl,
          },
        });
        return c.json(
          {
            success: true,
            message: "Leads added ",
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
  .post("/update-lead/:id", zValidator("json", LeadsSchema), async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const leadId = c.req.param("id");
        const {
          fullName,
          isCoreMember,
          coreMemberPositionId,
          isCurrent,
          profilePhoto,
          domainGroupId,
          domainNameId,
          index,
          Social,
        } = c.req.valid("json");
        const { githubUrl, instagramUrl, linkedinUrl, email, portfolioUrl } =
          Social;
        const lead = await db.leads.update({
          where: { id: leadId },
          data: {
            fullName,
            isCoreMember,
            coreMemberPositionId,
            isCurrent,
            profilePhoto,
            domainGroupId,
            domainNameId,
            userId: id,
            index: parseInt(index!),
          },
        });
        await db.social.create({
          data: {
            leadId: lead.id,
            githubUrl,
            instagramUrl,
            linkedinUrl,
            email,
            portfolioUrl,
          },
        });
        return c.json(
          {
            success: true,
            message: "Leads Updates Success",
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
  .get("/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const lead = await db.leads.findFirst({
          where: {
            id: c.req.param("id"),
          },
          include: {
            Social: true,
            coreMemberPosition: {
              select: {
                title: true,
              },
            },
            createdBy: {
              select: {
                firstName: true,
              },
            },
            domainGroup: {
              select: {
                title: true,
              },
            },
            domainName: {
              select: {
                title: true,
              },
            },
          },
        });
        return c.json(
          {
            success: true,
            lead: lead,
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
  .get("/", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const leads = await db.leads.findMany({
          include: {
            Social: true,
            coreMemberPosition: {
              select: {
                title: true,
              },
            },
            createdBy: {
              select: {
                firstName: true,
              },
            },
            domainGroup: {
              select: {
                title: true,
              },
            },
            domainName: {
              select: {
                title: true,
              },
            },
          },
        });
        return c.json(
          {
            success: true,
            leads: leads,
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
    "/edit-current/:id",
    zValidator("json", LeadsSchema.pick({ isCurrent: true })),
    async (c) => {
      try {
        const token = getCookie(c, "token");
        if (!token) {
          return c.json({ success: false, error: "Token not found" }, 401);
        } else {
          const { isCurrent } = c.req.valid("json");
          const id = c.req.param("id");
          // const lead = await db.leads.findFirst({
          //   where: {
          //     id: c.req.param("id"),
          //   },
          // });
          // console.log(lead);
          // await db.leads.delete({
          //   where: { id },
          // });
          await db.leads.update({
            where: {
              id: id,
            },
            data: {
              isCurrent,
            },
          });
          return c.json(
            {
              success: true,
              message: "Successfully Modified",
            },
            200
          );
        }
      } catch (error) {
        console.log("Sign-in error:", error);
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
  .get("/delete-lead/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const leadId = c.req.param("id");
        const deletedLead = await db.leads.delete({
          where: { id: leadId },
        });

        console.log("Lead deleted:", deletedLead);
        return c.json(
          {
            success: true,
            lead: deletedLead,
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

export { leads };

import { Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { getCookie } from "hono/cookie";
import { decodeSignInToken } from "@/lib/authentication/token";
import { LeadsSchema } from "@/schemas/leads/leads.schema";
import { v4 as uuidv4 } from 'uuid';
import { uploadToCloudinary } from "@/lib/uploadCloudnary";


function cString(str: string | File): string {
  return str.toString();
}

const leads = new Hono()
  .post("/add-lead", async (c) => {
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
          githubUrl, instagramUrl, linkedinUrl, email, portfolioUrl,
        }: {
          fullName: string,
          isCoreMember: boolean,
          coreMemberPositionId: string,
          isCurrent: boolean,
          profilePhoto: string,
          domainGroupId: string,
          domainNameId: string,
          githubUrl: string,
          instagramUrl: string,
          linkedinUrl: string,
          email: string,
          portfolioUrl: string,
        } = await c.req.parseBody() as unknown as {
          fullName: string,
          isCoreMember: boolean,
          coreMemberPositionId: string,
          isCurrent: boolean,
          profilePhoto: string,
          domainGroupId: string,
          domainNameId: string,
          githubUrl: string,
          instagramUrl: string,
          linkedinUrl: string,
          email: string,
          portfolioUrl: string,
        };
        const files = portfolioUrl;
        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {
          return c.json({ success: false, error: "Please upload a profile image" }, 400);
        } else {
          //if photo is updated

          // if files is not an array, convert it to an array
          const fileArray = Array.isArray(files) ? files : [files];

          await Promise.all(
            fileArray.map(async (file) => {
              if (!(file instanceof File)) {
                return c.json(
                  {
                    message: "Invalid file type",
                    error: "Expected a file upload but received something else",
                    received: typeof file,
                  },
                  400
                );
              }
              //for file upload
              const buffer = await file.arrayBuffer();
              const mimeType = file.type;
              const encoding = "base64";
              const base64Data = Buffer.from(buffer).toString("base64");
              const randomId = uuidv4();
              const fileUri = "data:" + randomId + mimeType + ";" + encoding + "," + base64Data;
              // load into a buffer for later use
              const res = await uploadToCloudinary(fileUri, file.name, "testimonial");
              if (res.success && res.result) {

                const leads = await db.leads.findMany();
                let index;
                if (leads.length === 0) {
                  index = 0;
                } else {
                  index = leads.length + 1;
                }



                //upload new image urls
                const { secure_url, public_id } = res.result;



                const lead = await db.leads.create({
                  data: {
                    fullName,
                    isCoreMember: isCoreMember ? true : false,
                    coreMemberPositionId,
                    isCurrent,
                    profilePhoto: secure_url,
                    domainGroupId,
                    domainNameId,
                    userId: id,
                    index,
                    publicId: public_id,
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
              } else {
                console.log("This is error called");

                return c.json({ message: "File Upload Failed" }, 401);
              }
            })
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
        await db.social.update({
          where: { leadId: lead.id },
          data: {
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
      const leads = await db.leads.findMany({
        include: {
          Social: true,
          domainGroup: {
            select: {
              title: true
            }
          },
          coreMemberPosition: {
            select: {
              title: true
            }
          },
          domainName: {
            select: {
              title: true,
              id: true
            }
          }
        }
      });
      return c.json(
        {
          success: true,
          leads: leads,
        },
        200
      );

    } catch (error) {
      console.error("", error);
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

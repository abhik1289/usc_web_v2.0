import { Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { getCookie } from "hono/cookie";
import { decodeSignInToken } from "@/lib/authentication/token";
import { LeadsSchema } from "@/schemas/leads/leads.schema";
import { v4 as uuidv4 } from 'uuid';
import { uploadToCloudinary } from "@/lib/uploadCloudnary";
import { deleteImage } from "@/lib/deleteImage";


function cString(str: any) {
  return str ? str.toString() : "";
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

        const body = await c.req.parseBody();

        const {
          fullName,
          isCoreMember,
          coreMemberPositionId,
          isCurrent,
          profilePhoto,
          domainGroupId,
          domainNameId,
          githubUrl, instagramUrl, linkedinUrl, email,
        } = body;

        // console.log(body)
        const files = body.profilePhoto;

        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {
          return c.json({ success: false, error: "Please upload a profile image" }, 400);
        } else {



          //convert to string
          const fullNameStr = cString(body.fullName);
          const coreMemberPositionIdStr = cString(body.coreMemberPositionId);
          const domainGroupIdStr = cString(body.domainGroupId);
          const domainNameIdStr = cString(body.domainNameId);
          const githubUrlStr = cString(body.githubUrl);
          const instagramUrlStr = cString(body.instagramUrl);
          const linkedinUrlStr = cString(body.linkedinUrl);
          const emailStr = cString(body.email);
          const portfolioUrlStr = cString(body.portfolioUrl);
          const isCoreMemberStr = Boolean(body.isCoreMember);
          const isCurrentStr = Boolean(body.isCurrent);





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
              console.log("FILE URI IS", fileUri)
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
                    fullName: fullNameStr,
                    isCoreMember: isCoreMemberStr ? true : false,
                    coreMemberPositionId: coreMemberPositionIdStr,
                    isCurrent: isCurrentStr ? true : false,
                    profilePhoto: secure_url,
                    domainGroupId: domainGroupIdStr,
                    domainNameId: domainNameIdStr,
                    userId: id,
                    index,
                    publicId: public_id,
                  },
                });
                await db.social.create({
                  data: {
                    leadId: lead.id,
                    githubUrl: githubUrlStr,
                    instagramUrl: instagramUrlStr,
                    linkedinUrl: linkedinUrlStr,
                    email: emailStr,
                    portfolioUrl: portfolioUrlStr,
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
  .post("/update-lead/:id", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const leadId = c.req.param("id");
        const body = await c.req.parseBody();

        const {
          fullName,
          isCoreMember,
          coreMemberPositionId,
          isCurrent,
          profilePhoto,
          domainGroupId,
          domainNameId,
          githubUrl, instagramUrl, linkedinUrl, email, index
        } = body;


        const files = body.image;

        // console.log(fullName,
        //   isCoreMember,
        //   coreMemberPositionId,
        //   isCurrent,
        //   profilePhoto,
        //   domainGroupId,
        //   domainNameId,
        //   githubUrl, instagramUrl, linkedinUrl, email, index)

        const fullNameStr = fullName as string;
        const coreMemberPositionIdStr = coreMemberPositionId as string;
        const domainGroupIdStr = domainGroupId as string;
        const domainNameIdStr = domainNameId as string;
        const githubUrlStr = githubUrl as string;
        const instagramUrlStr = instagramUrl as string;
        const linkedinUrlStr = linkedinUrl as string;
        const emailStr = email as string;
        const portfolioUrlStr = email as string;
        const isCoreMemberStr = isCoreMember as string;
        const isCurrentStr = isCurrent as string;
        const indexINT = parseInt(index as string);
        console.log("R1------->", isCoreMember, isCurrent)
        console.log("R2------->", isCoreMemberStr, isCurrentStr)

        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {

          //image is not updated
          const lead = await db.leads.update({
            where: { id: leadId },
            data: {
              fullName: fullNameStr,
              isCoreMember: isCoreMemberStr === 'true' ? true : false,
              coreMemberPositionId: coreMemberPositionIdStr,
              isCurrent: isCurrentStr === 'true' ? true : false,
              domainGroupId: domainGroupIdStr,
              domainNameId: domainNameIdStr,
              userId: id,
              index: indexINT,
            },
          });
          await db.social.update({
            where: { leadId: lead.id },
            data: {
              githubUrl: githubUrlStr,
              instagramUrl: instagramUrlStr,
              linkedinUrl: linkedinUrlStr,
              email: emailStr,
              portfolioUrl: portfolioUrlStr,
            },
          });
          return c.json(
            {
              success: true,
              message: "Leads Updates Success",
            },
            200
          );
        } else {


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



                //delete previous image
                const leadInfo = await db.leads.findFirst({ where: { id: leadId } });
                if (!leadInfo) {
                  return c.json({ success: false, error: "Lead not found" }, 404);
                }
                const { error } = await deleteImage(leadInfo.publicId!);
                if (error) {
                  return c.json({ success: false, error: "Image not deleted" }, 404);
                }

                //upload new image urls
                const { secure_url, public_id } = res.result;



                const lead = await db.leads.create({
                  data: {
                    fullName: fullNameStr,
                    isCoreMember: isCoreMemberStr ? true : false,
                    coreMemberPositionId: coreMemberPositionIdStr,
                    isCurrent: isCurrentStr ? true : false,
                    profilePhoto: secure_url,
                    domainGroupId: domainGroupIdStr,
                    domainNameId: domainNameIdStr,
                    userId: id,
                    index: indexINT,
                    publicId: public_id,
                  },
                });
                await db.social.create({
                  data: {
                    leadId: lead.id,
                    githubUrl: githubUrlStr,
                    instagramUrl: instagramUrlStr,
                    linkedinUrl: linkedinUrlStr,
                    email: emailStr,
                    portfolioUrl: portfolioUrlStr,
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

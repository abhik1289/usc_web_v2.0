import { Context, Hono } from "hono";
import { db } from "@/lib/db/db";
import { zValidator } from "@hono/zod-validator";
import { eventSchema } from "@/schemas/events/event.shema";
import { getCookie } from "hono/cookie";
import { decodeSignInToken } from "@/lib/authentication/token";
import mongoose from "mongoose";
import { E_Type } from "@prisma/client";
import { uploadToCloudinary } from "@/lib/uploadCloudnary";
import { v4 as uuidv4 } from 'uuid';
import { deleteImage } from "@/lib/deleteImage";



const event = new Hono()
  .post("/add-event", async (c) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const decodeToken = decodeSignInToken(token);
        const { id } = decodeToken.payload;
        const body = await c.req.parseBody();
        const {
          title,
          description,
          location,
          duration,
          startDate,
          startTime,
          endTime,
          startTime1,
          endTime1,
          startTime2,
          endTime2,
          startDate1,
          endDate1,
          startDate2,
          endDate2,
          instagramUrl,
          linkedinUrl,
          isPublic,
        } = body;



        let startTime1Str = "", endTime1Str = "", startTime2Str = "", endTime2Str = "", startDate1Str = "", endDate1Str = "", startDate2Str = "", endDate2Str = "", startDateStr = "", startTimeStr = "", endTimeStr = "";
        const titleStr = title as string;
        const descriptionStr = description as string;
        const locationStr = location as string;
        const eventTypeStr = duration as E_Type;
        if (eventTypeStr === "MULTIPLE") {
          startDate1Str = startDate1 as string
          endDate1Str = endDate1 as string
          startDate2Str = startDate2 as string;
          endDate2Str = endDate2 as string;
          startTime1Str = startTime1 as string;
          endTime1Str = endTime1 as string;
          startTime2Str = startTime2 as string;
          endTime2Str = endTime2 as string;
        } else {
          startDateStr = startDate as string;
          startTimeStr = startTime as string;
          endTimeStr = endTime as string;
        }

        const displayTypeStr = isPublic as string;
        const linkedinUrlStr = linkedinUrl as string;
        const instagramUrlStr = instagramUrl as string;
        const socialMediaStr = [linkedinUrlStr, instagramUrlStr];
        const files = body.profilePhoto;
        if (!files || (Array.isArray(files) && files.length === 0)) {
          return c.json({ messsage: "Please upload image" }, 401)
        }
        else {
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
                //upload new image urls
                const { secure_url, public_id } = res.result;
                const event = await db.event.create({
                  data: {
                    title: titleStr,
                    description: descriptionStr,
                    location: locationStr,
                    banner_url: secure_url,
                    publicId: public_id,
                    eventType: eventTypeStr,
                    displayType: displayTypeStr === 'true' ? "PUBLIC" : "PRIVATE",
                    socialMedia: socialMediaStr,
                    userId: id,
                  },
                });

                if (eventTypeStr === "SINGLE") {
                  await db.eventDateSingle.create({
                    data: {
                      startDate: new Date(startDateStr),
                      startTime: startTimeStr,
                      endTime: endTimeStr,
                      eventId: event.id,
                    }
                  })
                } else {
                  console.log("----------------->", endDate1, endDate2, event.id)
                  await db.eventDateMultitle.create({
                    data: {
                      startDate1: new Date(startDate1Str), // Example start date 1
                      startDate2: new Date(startDate2Str), // Example start date 2 // Example end date 2
                      startTime1: startTime1Str,                       // Example start time 1
                      endTime1: endTime1Str,                         // Example end time 1
                      startTime2: startTime2Str,                       // Example start time 2
                      endTime2: endTime2Str,
                      eventId: event.id,
                    }
                  })
                }

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
      const events = await db.event.findMany({
        include: {
          eventDateMultitle: {
            select: {
              startDate1: true,
              startDate2: true,
              endTime1: true,
              endTime2: true
            }
          },
          eventDateSingle: {
            select: {
              endTime: true,
              startDate: true,
              startTime: true,
            }
          }
        }
      })
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
        // await db.event.update({
        //   where: {
        //     id: id,
        //   },
        //   data: {
        //     title,
        //     description,
        //     location,
        //     banner_url,
        //     eventType,
        //     startDate: new Date(startDate),
        //     endDate: endDate ? new Date(endDate) : null,
        //     startTime1,
        //     endTime1,
        //     startTime2,
        //     endTime2,
        //     displayType,
        //     socialMedia,
        //   },
        // });
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
        //delete previous img
        const event = await db.event.findFirst({
          where: { id }
        });
        if (!event) {
          return c.json({ error: "Event not found" }, 401)
        }
        const { error } = await deleteImage(event.publicId!);
        if (error) {
          return c.json({ message: "Error Occured" }, 401)
        }
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
  })
  .get("/:id", async (c: Context) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const Eid = c.req.param("id");
        const event = await db.event.findFirst({
          where: {
            id: Eid,
          }
        });
        return c.json({
          success: true,
          event
        }, 200);
      }
    } catch (error) {

      return c.json(
        {
          success: false,
          error: "An unexpected error occurred. Please try again.",
        },
        500
      );
    }
  })

export { event };

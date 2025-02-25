import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { testimonialSchema } from "@/schemas/testimonials/testimonials.shema";
import { getCookie } from "hono/cookie";
import { db } from "@/lib/db/db";
import { decodeSignInToken } from "@/lib/authentication/token";
import { uploadToCloudinary } from "@/lib/uploadCloudnary";
import { v4 as uuidv4 } from 'uuid';
import { cloudinary } from "@/lib/configCloudnary";
import { deleteImage } from "@/lib/deleteImage";
import { z } from "zod";
const testimonials = new Hono()
  .post("/add", async (c) => {
    try {
      const body = await c.req.parseBody();
      const { fullName, rolesId, text } = body;

      const token = getCookie(c, "token");
      if (!token) {
        return c.json({ success: false, error: "Token not found" }, 401);
      } else {
        const userToken = decodeSignInToken(token);
        const { id } = userToken.payload;
        const testimonials = await db.testimonials.findMany();
        let index;
        if (testimonials.length === 0) {
          index = 1;
        } else {
          index = testimonials.length + 1;
        }
        //convert into string
        const fullNameStr = fullName.toString();
        const rolesIdStr = rolesId.toString();
        const textStr = text.toString();


        const files = body.file;

        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {
          return c.json({ success: false, error: "Please upload a file" }, 400);
        }

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

            const buffer = await file.arrayBuffer();
            const mimeType = file.type;
            const encoding = "base64";
            const base64Data = Buffer.from(buffer).toString("base64");
            const randomId = uuidv4();
            const fileUri = "data:" + randomId + mimeType + ";" + encoding + "," + base64Data;
            // load into a buffer for later use
            const res = await uploadToCloudinary(fileUri, file.name, "post-images");
            if (res.success && res.result) {
              const { secure_url, public_id } = res.result;

              await db.testimonials.create({
                data: { fullName: fullNameStr, photoUrl: secure_url, rolesId: rolesIdStr, text: textStr, index, userId: id, publicId: public_id },
              });
              return c.json(
                {
                  success: true,
                  message: "Testimonials created successfully",
                },
                201
              );
            } else {
              return c.json({ message: "File Upload Failed" }, 401);
            }
          })
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
        const indexStr = index!.toString();
        const fullNameStr = fullName.toString();

        const rolesIdStr = rolesId.toString();
        const textStr = text.toString();
        //convert into integer
        const sequence = parseInt(indexStr || '0');
        //for file upload
        const files = body.file;

        //if profile image is not updated
        if (!files || (Array.isArray(files) && files.length === 0)) {
          const photoUrlStr = photoUrl.toString();
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


                //delete previous image from cloudinary
                const testimonial = await db.testimonials.findFirst({
                  where: { id: Tid },
                });
                if (!testimonial) {
                  return c.json({ message: "Testimonial not found" }, 404);
                }
                //delete image from cloudinary
                const publicId = testimonial.publicId;
                const { error } = await deleteImage(publicId!);
                //if error occurs while deleting image
                if (error) {
                  return c.json({ message: "Image not deleted" }, 404);
                }
                //upload new image urls
                const { secure_url, public_id } = res.result;
                //update testimonial
                await db.testimonials.update({
                  where: { id: Tid },
                  data: {
                    fullName: fullNameStr,
                    photoUrl: secure_url,
                    rolesId: rolesIdStr,
                    text: textStr,
                    index: sequence,
                    userId: id,
                    publicId: public_id
                  }
                });
                return c.json({ message: "successfully updated" }, 200);
              } else {

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
  });

export default testimonials;

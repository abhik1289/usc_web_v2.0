
import { decodeSignInToken } from "@/lib/authentication/token";
import { db } from "@/lib/db/db";
import ImageUploadToDb from "@/lib/ImageUploadToDb";
import TeachersSchema from "@/schemas/mentor/mentor.schema";
import { zValidator } from "@hono/zod-validator";
import { MType } from "@prisma/client";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";


const mentor = new Hono()
    .post("/add-member", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const userToken = decodeSignInToken(token);
                const { id } = userToken.payload;

                const body = await c.req.parseBody();
                const { fullName, school, rolesId, customPosition, memberType } = body;

                //Type convertion
                let rolesIdString = "", customPositionString = "";
                const fullNameString = fullName as string;
                const schoolString = school as string;
                if (memberType === "Mentor") {
                    rolesIdString = rolesId as string;
                    customPositionString = customPosition as string;
                }
                const memberTypeString = memberType as MType;

                const mentors = await db.teachers.findMany({
                    where: {
                        memberType: memberTypeString
                    }
                });
                let index;
                if (mentors.length === 0) {
                    index = 0;
                } else {
                    index = mentors[mentors.length - 1].index + 1;
                }
                const { success, uploads, message, error } = await ImageUploadToDb(c, body.file);

                if (success) {
                    uploads!.forEach(({ secure_url, public_id }) => {
                        console.log("Uploaded file:", { secure_url, public_id });
                    });
                } else {
                    console.error("Upload failed:", message, error);
                }

                const mentor = await db.teachers.create({
                    data: {
                        fullName: fullNameString,
                        school: schoolString,
                        rolesId: rolesIdString,
                        customPosition: customPositionString,
                        index,
                        memberType: memberTypeString,
                        userId: id,
                        profilePhoto: "",
                        publicId: ""
                    },
                });
                return c.json({ success: true, mentor }, 201);
            }
        } catch (error) {
            console.log(error);
            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .get("/get-members", async (c) => {
        try {
            const mentors = await db.teachers.findMany({
                include: {
                    createdBy: {
                        select: {
                            firstName: true,
                        }
                    },
                    Roles: {
                        select: {
                            title: true
                        }
                    }
                }
            });
            return c.json({ success: true, mentors }, 200);
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .get("/:id", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const mentor = await db.teachers.findFirst({
                    where: {
                        id: c.req.param("id"),
                    },
                    include: {
                        createdBy: {
                            select: {
                                firstName: true,
                            }
                        },
                        Roles: {
                            select: {
                                title: true
                            }
                        }
                    }
                });
                return c.json({ success: true, mentor }, 200);
            }
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .get("/delete/:id", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const mentor = await db.teachers.delete({
                    where: {
                        id: c.req.param("id"),
                    },
                });
                return c.json({ success: true, mentor }, 200);
            }
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .post("/update/:id", zValidator("json", TeachersSchema), async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const { fullName, school, profilePhoto, rolesId, customPosition, memberType, index } = c.req.valid("json");
                const mentor = await db.teachers.update({
                    where: {
                        id: c.req.param("id"),
                    },
                    data: {
                        fullName,
                        school,
                        profilePhoto,
                        rolesId,
                        customPosition,
                        memberType,
                        index
                    },
                });
                return c.json({ success: true, mentor }, 200);
            }
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    });
export default mentor;

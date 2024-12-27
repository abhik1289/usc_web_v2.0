
import { decodeSignInToken } from "@/lib/authentication/token";
import { db } from "@/lib/db/db";
import TeachersSchema from "@/schemas/mentor/mentor.schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";


const mentor = new Hono()
    .post("/add-member", zValidator("json", TeachersSchema), async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const userToken = decodeSignInToken(token);
                const { id } = userToken.payload;
                const {
                    fullName,
                    school,
                    profilePhoto,
                    rolesId,
                    customPosition,
                    memberType,
                } = c.req.valid("json");

                const mentors = await db.teachers.findMany();
                let index;
                if (mentors.length === 0) {
                    index = 0;
                } else {
                    index = mentors[mentors.length - 1].index + 1;
                }

                const mentor = await db.teachers.create({
                    data: {
                        fullName,
                        school,
                        profilePhoto,
                        rolesId,
                        customPosition,
                        index,
                        memberType,
                        userId: id,
                    },
                });
                return c.json({ success: true, mentor }, 201);
            }
        } catch (error) {
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
            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    });
export default mentor;

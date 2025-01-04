
import { decodeSignInToken } from "@/lib/authentication/token";
import { db } from "@/lib/db/db";
import { deleteImage } from "@/lib/deleteImage";
import { uploadToCloudinary } from "@/lib/uploadCloudnary";
import { MType } from "@prisma/client";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";

import { v4 as uuidv4 } from "uuid";

const mentor: Hono = new Hono()
    .post("/add-member", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const userToken = decodeSignInToken(token);
                const { id } = userToken.payload;
                // console.log("id is", id);
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
                            if (memberTypeString === "Mentor") {
                                const mentor = await db.teachers.create({
                                    data: {
                                        fullName: fullNameString,
                                        school: schoolString,
                                        rolesId: rolesId.toString(),
                                        customPosition: customPosition.toString(),
                                        index,
                                        memberType: memberTypeString,
                                        userId: id,
                                        profilePhoto: secure_url,
                                        publicId: public_id
                                    },
                                });

                                return c.json({ success: true, mentor }, 201);
                            } else {
                                const mentor = await db.teachers.create({
                                    data: {
                                        fullName: fullNameString,
                                        school: schoolString,
                                        index,
                                        memberType: memberTypeString,
                                        userId: id,
                                        profilePhoto: secure_url,
                                        publicId: public_id
                                    },
                                });

                                return c.json({ success: true, mentor }, 201);
                            }


                        } else {
                            return c.json({ message: "File Upload Failed" }, 401);
                        }
                    })
                );




                return c.json({ success: true, mentor }, 201);



            }
        } catch (error) {
            console.log(error);
            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }








    })
    .get("/mentors", async (c) => {
        try {
            const mentors = await db.teachers.findMany({
                where: {
                    memberType: "Mentor"
                },
                include: {
                    Roles: {
                        select: {
                            title: true
                        }
                    }
                }
            });
            console.log(mentors)
            return c.json({ success: true, mentors }, 200);
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .get("/advisors", async (c) => {
        try {
            const advisors = await db.teachers.findMany({
                where: { memberType: "Advisor" },
                include: {

                }
            });
            console.log(advisors)
            return c.json({ success: true, advisors }, 200);
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

                const data = await db.teachers.findFirst({ where: { id: c.req.param("id") } })
                if (!data) {
                    return c.json({ success: false, error: "not found" }, 404);
                }
                const { error } = await deleteImage(data.publicId!);
                if (error) {
                    return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
                }

                await db.teachers.delete({
                    where: {
                        id: c.req.param("id"),
                    },
                });
                return c.json({ success: true, message: "Successfully Delted" }, 200);
            }
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .get("/mentor/:id", async (c) => {
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
    .get("/advisor/:id", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const advisor = await db.teachers.findFirst({
                    where: {
                        id: c.req.param("id"),
                    },
                });
                return c.json({ success: true, advisor }, 200);
            }
        } catch (error) {
            console.log(error);

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
    .post("/update-advisor/:id", async (c) => {
        try {
            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const userToken = decodeSignInToken(token);
                const { id } = userToken.payload;
                const body = await c.req.parseBody();
                const updateId = c.req.param("id");
                const { fullName, school, memberType, index } = body;

                const files = body.file;

                //if profile image is not updated
                if (!files || (Array.isArray(files) && files.length === 0)) {
                    const teacher = await db.teachers.findFirst({ where: { id: updateId } });
                    if (!teacher) {
                        return c.json({ success: false, error: "not found" }, 404);
                    } else {
                        //Type convertion
                        let rolesIdString = "", customPositionString = "";
                        const fullNameString = fullName as string;
                        const schoolString = school as string;
                        const memberTypeString = memberType as MType;
                        const indexINT = parseInt(index as string);

                        const updatedMentor = await db.teachers.update({
                            where: {
                                id: updateId,
                            },
                            data: {
                                fullName: fullNameString,
                                school: schoolString,
                                memberType: memberTypeString,
                                index: indexINT,
                                userId: id
                            },
                        });

                        return c.json({ success: true, updatedMentor }, 200);
                    }


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
                                const teacher = await db.teachers.findFirst({ where: { id: updateId } });
                                if (!teacher) {
                                    return c.json({ success: false, error: "not found" }, 404);
                                } else {

                                    //delete previous image
                                    const { error } = await deleteImage(teacher.publicId!);
                                    if (error) {
                                        return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
                                    }

                                    //Type convertion
                                    const fullNameString = fullName as string;
                                    const schoolString = school as string;
                                    const memberTypeString = memberType as MType;
                                    const indexINT = parseInt(index as string);

                                    const updatedMentor = await db.teachers.update({
                                        where: {
                                            id: updateId,
                                        },
                                        data: {
                                            fullName: fullNameString,
                                            school: schoolString,
                                            memberType: memberTypeString,
                                            index: indexINT,
                                            profilePhoto: secure_url,
                                            publicId: public_id,
                                            userId: id
                                        },
                                    });

                                    return c.json({ success: true, updatedMentor }, 200);
                                }

                            } else {
                                return c.json({ message: "File Upload Failed" }, 401);
                            }
                        })
                    );

                    return c.json({ success: true, mentor }, 201);
                }


            }
        } catch (error) {

            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    });

export default mentor;







// .post("/update/:id", zValidator("json", TeachersSchema), async (c) => {
//     try {
//         const token = getCookie(c, "token");
//         if (!token) {
//             return c.json({ success: false, error: "Token not found" }, 401);
//         } else {
//             const { fullName, school, rolesId, customPosition, memberType, index } = c.req.valid("json");
//             // const mentor = await db.teachers.update({
//             //     where: {
//             //         id: c.req.param("id"),
//             //     },
//             //     data: {
//             //         fullName,
//             //         school,
//             //         profilePhoto,
//             //         rolesId,
//             //         customPosition,
//             //         memberType,
//             //         index
//             //     },
//             // });
//             return c.json({ success: true, mentor }, 200);
//         }
//     } catch (error) {
//         console.log(error);

//
//     }
// });
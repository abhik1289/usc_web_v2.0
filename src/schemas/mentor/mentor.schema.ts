import { z } from "zod";

// Enum for MType
export const MType = ["Mentor", "Advisor"] as const;

// Zod schema for Teachers
const TeachersSchema = z.object({
    fullName: z.string(),
    school: z.string(),
    profilePhoto: z.string(),
    rolesId: z.string().nullable(),
    index: z.number().optional(),
    customPosition: z.string().nullable(),
    memberType: z.enum(MType),
}).refine(
    (data) =>
        data.memberType !== "Mentor" ||
        (data.rolesId !== null && data.customPosition !== null),
    {
        message: "rolesId and customPosition are required when memberType is 'Mentor'",
        path: ["rolesId", "customPosition"], // Points to the relevant fields
    }
);

export default TeachersSchema;

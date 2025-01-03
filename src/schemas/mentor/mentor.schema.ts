import { z } from "zod";

// Enum for MType
export const MType = ["Mentor", "Advisor"] as const;

// Zod schema for Teachers
const TeachersSchema = z.object({
    fullName: z.string(),
    school: z.string(),
    // profilePhoto: z.string(),
    rolesId: z.string().nullable(),
    index: z.number().optional(),
    customPosition: z.string().nullable(),
    memberType: z.enum(MType),
})

export default TeachersSchema;

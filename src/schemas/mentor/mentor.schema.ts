import { z } from "zod";

// Enum for MType
const MType = z.enum(["Mentor", "Advisor"]);

// Zod schema for Teachers
const TeachersSchema = z.object({
    fullName: z.string(),
    school: z.string(),
    profilePhoto: z.string(),
    rolesId: z.string().nullable(),
    index: z.number().optional().nullable(),
    customPosition: z.string().nullable(),
    memberType: MType,
});

export default TeachersSchema;

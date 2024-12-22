import { z } from "zod";

// Social Schema
const SocialSchema = z.object({
  githubUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  portfolioUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
});

// Leads Schema
const LeadsSchema = z.object({
  fullName: z.string().min(4, { message: "Full name must be at least 4 characters long." }).max(15, { message: "Full name cannot exceed 15 characters." }),
  isCoreMember: z.boolean(),
  coreMemberPositionId: z.string().optional(),
  isCurrent: z.boolean(),
  profilePhoto: z.string(),
  domainGroupId: z.string(),
  domainNameId: z.string(),
  index: z.string().optional(),
  Social: SocialSchema,
});

// Export schemas
export { LeadsSchema, SocialSchema };

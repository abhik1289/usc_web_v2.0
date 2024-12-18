import { z } from "zod";

// Social Schema
const SocialSchema = z.object({
  githubUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  email: z.string().email(),
  portfolioUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
});

// Leads Schema
const LeadsSchema = z.object({
  fullName: z.string().min(4).max(15),
  isCoreMember: z.boolean(),
  coreMemberPosition: z.string().optional(),
  isCurrent: z.boolean(),
  profilePhoto: z.string(),
  domainGroupId: z.string(),
  domainNameId: z.string(),
  index: z.number(),
});

// Export schemas
export { LeadsSchema, SocialSchema };

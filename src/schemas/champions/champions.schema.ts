import { z } from 'zod';

// Validation schema for the Champions model
const championSchema = z.object({
  profilePhoto: z
    .string()
    .url("Profile photo must be a valid URL.")
    .min(1, "Profile photo URL is required."),
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .max(15, "Full name must not exceed 15 characters."),
  role: z
    .string()
    .min(1, "Role is required.")
    .max(7, "Role must not exceed 7 characters."),
  coverPhoto: z
    .string()
    .url("Cover photo must be a valid URL.")
    .min(1, "Cover photo URL is required."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(1000, "Description must not exceed 1000 characters."),
});

export { championSchema };

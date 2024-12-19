import { z } from "zod";

const testimonialSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .max(100, "Full name must not exceed 100 characters."),
  photoUrl: z
    .string()
    .url("Photo URL must be a valid URL.")
    .min(1, "Photo URL is required."),
  position: z
    .string()
    .min(1, "Position is required.")
    .max(50, "Position must not exceed 50 characters."),
  text: z
    .string()
    .min(1, "Testimonial text is required.")
    .max(500, "Text must not exceed 500 characters."),
  index: z.number().optional(),
  // Auto-incremented, so not required
});

// Export the schema for use in validation
export { testimonialSchema };

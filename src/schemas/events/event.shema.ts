import * as z from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Venue is required"),
  eventType: z.enum(["SINGLE", "MULTIPLE"]),
  displayType: z.enum(["PUBLIC", "PRIVATE"]),
  startDate: z.string(),
  endDate: z.string().optional(),
  startTime1: z.string(),
  endTime1: z.string(),
  startTime2: z.string().optional(),
  endTime2: z.string().optional(),
  socialMedia: z.string().array().min(1).max(3),
  banner_url: z.string().url(),
});

export type EventFormValues = z.infer<typeof eventSchema>;

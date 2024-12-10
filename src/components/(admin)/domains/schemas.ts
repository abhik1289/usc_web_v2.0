import { z } from "zod"

export const domainSchema = z.object({
  type: z.enum(["tech", "nonTech"], {
    required_error: "Domain type is required",
    invalid_type_error: "Please select a valid domain type",
  }),
  name: z.string().min(2, "Domain name must be at least 2 characters"),
})

export const domainGroupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters"),
})

export const roleSchema = z.object({
  title: z.string().min(2, "Role title must be at least 2 characters"),
}) 
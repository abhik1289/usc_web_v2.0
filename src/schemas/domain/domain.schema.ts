import { z } from "zod";

const addDomainGroupSchema = z.object({
  title: z.string().min(3).max(10),
});
const addRoleSchema = z.object({
  title: z.string().min(3).max(30),
});

const DomainDetailsSchema = z.object({
  // id: z.string().nonempty(),
  title: z.string().nonempty("Title is required."),
  description: z.string().nonempty("Description is required."),
  bannerUrl: z.string().url("Banner URL must be a valid URL."),
  url: z.string().url("URL must be a valid URL.").optional(),
  groupOf: z.string().min(10),
});

// Export the schema for use in validation
export { addRoleSchema, addDomainGroupSchema, DomainDetailsSchema };

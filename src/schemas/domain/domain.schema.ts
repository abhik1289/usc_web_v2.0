import { z } from "zod";

const addDomainGroupSchema = z.object({
  title: z.string().min(3).max(10),
});
const addRoleSchema = z.object({
  title: z.string().min(3).max(30),
});

// Export the schema for use in validation
export { addRoleSchema, addDomainGroupSchema };

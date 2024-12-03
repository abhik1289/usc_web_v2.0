import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters." })
      .max(10, { message: "First name must be at most 10 characters." }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters." })
      .max(10, { message: "Last name must be at most 10 characters." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." })
      .max(10, { message: "Password must be at most 10 characters." }),
    cPassword: z.string().min(4, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Password and confirm password must match.",
    path: ["cPassword"],
  });
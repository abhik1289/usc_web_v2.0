import { z } from "zod";

export const setUpUserFront = z
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

export const setUpAccount = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters." })
    .max(10, { message: "First name must be at most 10 characters." }),
  last_name: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters." })
    .max(10, { message: "Last name must be at most 10 characters." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." })
    .max(10, { message: "Password must be at most 10 characters." }),
  token: z.string(),
});

export const signInUser = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const ROLES = ["ADMIN", "SUPERADMIN", "MODERATOR"] as const;
const Property = z.enum(ROLES);

// Define the schema for adding a user
export const addUser = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters." })
    .max(10, { message: "First name must be at most 10 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: Property,
});

export const changePWD = z.object({
  oldPassword: z.string(),
  newPassword: z
  .string()
  .min(4, { message: "Password must be at least 4 characters." })
  .max(10, { message: "Password must be at most 10 characters." }),
});

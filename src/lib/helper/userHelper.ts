import { User } from "@prisma/client";
import { db } from "../db/db";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser: User | null = await db.user.findUnique({
      where: { email },
    });
    return existingUser;
  } catch (error) {
    console.error("Error while fetching user by email:", error);
    throw new Error("Unable to fetch user by email. Please try again later.");
  }
};

"use server";
import axios from "axios";

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const response = await axios({
      url: "/api/auth/update-password",
      method: "PUT",
      data: {
        oldPassword,
        newPassword,
      },
    });
    console.log(response);
    if (response.status === 200) {
      return { success: true, data: response.data };
    }

    return {
      success: false,
      error: "Unexpected response from the server.",
    };
  } catch (error: Error | unknown) {
    const err = error as Error;
    return {
      success: false,
      error: err.message || "An unknown error occurred.",
    };
  }
}

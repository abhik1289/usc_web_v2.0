"use server";
import axios from "axios";

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    console.log("------------------------------->",oldPassword, newPassword);
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
  } catch (error: any) {
    console.error("Error updating password:", error);

    return {
      success: false,
      error: error.response?.data?.error || "An unknown error occurred.",
    };
  }
}

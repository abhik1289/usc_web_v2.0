import axios, { AxiosError } from "axios";

export interface LogoutResponse {
  success: boolean;
  error?: string;
}

export const logOutUser = async (): Promise<LogoutResponse> => {
  try {
    const response = await axios.get("/api/user/logout");

    // Assuming API response contains a `success` field
    if (response.status === 201 && response.data.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to log out",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  }
};

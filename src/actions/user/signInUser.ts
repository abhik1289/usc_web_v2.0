import axios, { AxiosError } from "axios";

export const SignInUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      email,
      password,
    });
    return response; // Return only the response data for simplicity
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || "An error occurred",
      };
    } else {
      console.error("Unexpected Error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  }
};

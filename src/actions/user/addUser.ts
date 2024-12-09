import axios, { AxiosError } from "axios";

export const AddUser = async (
  firstName: string,
  email: string,
  role: string
) => {
  try {
    console.log(firstName + " " + email + " " + role);
    const response = await axios.post("/api/user/add-user", {
      email,
      role,
      firstName: firstName,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    //   console.error("Axios Error:", error.response?.data || error.message);
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

import axios from "axios";

// Define a type for the input data (replace with the actual expected structure)
interface UserCredentials {
  first_name: string;
  last_name: string;
  isActive: boolean;
  password: string;
  cPassword: string;
  token: string;
}

export const updateUserCredentials = async (infos: UserCredentials) => {
  try {
    // Send the POST request
    const { data } = await axios.post("/api/user/set-up-profile", infos);
    return { success: true, data };
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      const message = error.response?.data?.error || "An error occurred";
      return { error: true, message, status: error.response?.status };
    }
    // Generic error handling
    return { error: true, message: "An unexpected error occurred" };
  }
};
import axios from "axios";

export const useSignIn = async (email: string, password: string) => {
  try {
    const res = await axios.post("/api/auth/sign-in", {
      email,
      password,
    });
    return res;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

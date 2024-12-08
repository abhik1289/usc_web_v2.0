import axios from "axios";

export const SignInUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/api/user/sign-in", {
      email,
      password,
    });
    return res;
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

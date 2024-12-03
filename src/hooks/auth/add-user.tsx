import axios from "axios";

export const updateUserCredentials = async (infos: any) => {
  try {
    const { data } = await axios.put("/api/auth/update-credential", { infos });
    return data;
  } catch (error) {
    return error;
  }
};

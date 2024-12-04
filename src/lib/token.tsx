import jwt, { JwtPayload } from "jsonwebtoken";

export const generateActiveToken = (
  email: string,
  duration?: string
): string => {
  if (!process.env.VERIFY_TOKEN_KEY) {
    throw new Error(
      "VERIFY_TOKEN_KEY is not defined in the environment variables."
    );
  }

  return jwt.sign({ email: email }, process.env.VERIFY_TOKEN_KEY, {
    expiresIn: duration ? duration : "1h",
  });
};
export const decodeActiveToken = (token: string): JwtPayload | string => {
  if (!process.env.VERIFY_TOKEN_KEY) {
    throw new Error(
      "VERIFY_TOKEN_KEY is not defined in the environment variables."
    );
  }
  // console.log("Eroro")
  return jwt.verify(token, process.env.VERIFY_TOKEN_KEY);
};

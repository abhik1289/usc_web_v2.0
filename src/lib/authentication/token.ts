import jwt, { JwtPayload } from "jsonwebtoken";

//active token

export const generateActiveToken = (
  email: string,
  duration?: string
): string => {
  if (!process.env.ACTIVE_TOKEN_KEY) {
    throw new Error(
      "VERIFY_TOKEN_KEY is not defined in the environment variables."
    );
  }

  return jwt.sign({ email: email }, process.env.ACTIVE_TOKEN_KEY, {
    expiresIn: duration ? duration : "1h",
  });
};
export const decodeActiveToken = (token: string): JwtPayload | string => {
  if (!process.env.ACTIVE_TOKEN_KEY) {
    throw new Error(
      "VERIFY_TOKEN_KEY is not defined in the environment variables."
    );
  }
  // console.log("Eroro")
  return jwt.verify(token, process.env.ACTIVE_TOKEN_KEY);
};

// sign In tokens


// Define the payload structure
export interface SignInPayload {
  email: string;
  role: string;
}

// Define the structure for the token payload
export interface SignInTokenPayload extends JwtPayload {
  payload: SignInPayload;
}

// Function to generate a JWT token
export const generateSignInToken = (
  payload: SignInPayload,
  duration: string = "1h" // Default duration is 1 hour
): string => {
  if (!process.env.SIGNIN_TOKEN_KEY) {
    throw new Error("SIGNIN_TOKEN_KEY is not defined in the environment variables.");
  }
  return jwt.sign({ payload }, process.env.SIGNIN_TOKEN_KEY, { expiresIn: duration });
};

// Function to decode and verify a JWT token
export const decodeSignInToken = (token: string): SignInTokenPayload => {
  if (!process.env.SIGNIN_TOKEN_KEY) {
    throw new Error("SIGNIN_TOKEN_KEY is not defined in the environment variables.");
  }

  try {
    return jwt.verify(token, process.env.SIGNIN_TOKEN_KEY) as SignInTokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

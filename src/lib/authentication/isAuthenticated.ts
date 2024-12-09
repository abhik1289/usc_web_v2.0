import { Context } from "hono";
import { getCookie } from "hono/cookie";

export const isAuthenticated = (c: Context, name: string) => {
  const token = getCookie(c, name);
  if (!token) {
    return false;
  }
  return token;
};

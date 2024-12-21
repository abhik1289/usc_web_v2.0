
import { Hono } from "hono";
import { getCookie } from "hono/cookie";


const mentor = new Hono()
    .post("/add-member", async (c) => {
        try {
            const token = getCookie(c, "token");
        } catch (error) {
            return c.json({ success: false, error: "An unexpected error occurred. Please try again." }, 500);
        }
    })
export default mentor;

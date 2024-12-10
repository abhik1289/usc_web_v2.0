import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";



export const client = hc<AppType>(process.env.CLIENT_URL!);

import { db } from "@/lib/db/db";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";


const basic = new Hono()
    .get("/", async (c) => {
        try {

            const token = getCookie(c, "token");
            if (!token) {
                return c.json({ success: false, error: "Token not found" }, 401);
            } else {
                const events = await db.event.findMany();
                const currentLeads = await db.leads.findMany({
                    where: {
                        isCurrent: true
                    }
                });
                const formertLeads = await db.leads.findMany({
                    where: {
                        isCurrent: false
                    }
                });
                const domains = await db.domainDetails.findMany();
                const textnimials = await db.testimonials.findMany();
                const champions = await db.champions.findMany();
                const mentors = await db.teachers.findMany({
                    where: {
                        memberType: "Mentor"
                    }
                });
                const advisors = await db.teachers.findMany({
                    where: {
                        memberType: "Advisor"
                    }
                });
                return c.json({
                    success: true,
                    data: {
                        events,
                        currentLeads,
                        formertLeads,
                        domains,
                        textnimials,
                        champions,
                        mentors,
                        advisors
                    }
                }, 200);
            }

        } catch (error) {
            console.error("error:", error);
            return c.json(
                {
                    success: false,
                    error: "An unexpected error occurred. Please try again.",
                },
                500
            );
        }
    })

export default basic;

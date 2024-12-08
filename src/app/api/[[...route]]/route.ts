import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();
// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.post('/hello', async (c) => {
    console.log("first")
    const user = await db.user.create({
        data:{
            email:"user22@example.com",
            role: "ADMIN"
        }
    })
    console.log(user)
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)
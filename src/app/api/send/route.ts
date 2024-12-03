import { EmailTemplate } from "@/components/email/add-user-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, role, setupUrl, email } = reqBody;
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Join as a Member",
      react: EmailTemplate({
        firstName,
        role,
        setupUrl,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

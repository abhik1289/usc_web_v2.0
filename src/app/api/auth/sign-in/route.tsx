import { connect } from "@/db/connection";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateActiveToken } from "@/lib/authentication/token";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate request body
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user?.password!);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    // Generate token and set as HTTP-only cookie
    const token = generateActiveToken(email, "1d");
    const response = NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Error during login process:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

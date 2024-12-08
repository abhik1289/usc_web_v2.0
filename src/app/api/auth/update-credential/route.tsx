import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { decodeActiveToken } from "@/lib/authentication/token";
import bcrypt from "bcryptjs";
connect();

export async function PUT(request: NextRequest) {
  try {
    // Parse request body
    const reqBody = await request.json();

    const { last_name, first_name, password, token } = reqBody.infos;

    // Decode the token to get the email or associated data
    // console.log("---------------->",token,reqBody)
    const data: any = decodeActiveToken(token);
    // console.log("---------------------------------------->",data)1
    const email = data.email;

    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "This email does not exist in our records." },
        { status: 409 }
      );
    }

    // Check if the token has expired
    const currentTime = new Date();
    if (
      !existingUser.activeTokenExpires ||
      new Date(existingUser.activeTokenExpires) < currentTime
    ) {
      return NextResponse.json(
        { error: "Your token has expired. Please request a new one." },
        { status: 401 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user record
    await UserModel.findByIdAndUpdate(existingUser._id, {
      last_name,
      first_name,
      password: hashedPassword,
      isActive: true,
      activeToken: null,
      activeTokenExpires: null, // Clear the token and expiration
    });

    return NextResponse.json(
      { success: "User successfully updated."},
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during the user registration process:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}

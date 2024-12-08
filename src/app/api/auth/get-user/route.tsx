import { connect } from "@/db/connection";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { decodeActiveToken, generateActiveToken } from "@/lib/authentication/token";
import { cookies } from "next/headers";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get("token");
    if (token) {
      const user: any = decodeActiveToken(token.value!);
      const infos = await UserModel.findOne({ email: user.email }).select('first_name last_name email profile_photo role createdAt');
      // console.log(infos)
      return NextResponse.json({ success: true, infos }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Unauthorized user" },
        { status: 401 }
      );
    }
    console.log(token);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    console.error("Error during login process:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

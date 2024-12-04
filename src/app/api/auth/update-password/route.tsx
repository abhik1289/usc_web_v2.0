import { connect } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { IUser } from "@/models/user.model";
import { decodeActiveToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

connect();



export async function PUT(request: NextRequest) {
  try {
    console.log("first")
    const reqBody = await request.json();
    const { oldPassword, newPassword } = reqBody;

    const token = (await cookies()).get("token");


    
    if (!token) {
      return NextResponse.json(
        { error: "Unauthenticated user" },
        { status: 401 }
      );
    }

    const data: any = decodeActiveToken(token.value);
    const infos: IUser | null = await UserModel.findOne({ email: data.email });

    if (!infos) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(infos)

    const isValid = await bcrypt.compare(oldPassword, infos.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const hashPwd = await bcrypt.hash(newPassword, 10);
    infos.password = hashPwd;
    await infos.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during the password update process:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}

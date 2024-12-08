// import { connect } from "@/db/connection";
// import { NextRequest, NextResponse } from "next/server";
// // import UserModel from "@/models/user.model";
// import { generateActiveToken } from "@/lib/authentication/token";
// import axios from "axios";
// connect();

// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const reqBody = await request.json();
//     const { first_name, email, role } = reqBody;

//     // Validate required fields
//     if (!first_name || !email || !role) {
//       return NextResponse.json(
//         { error: "All fields (first_name, email, role) are required." },
//         { status: 400 }
//       );
//     }

//     // Check if the user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User with this email already exists." },
//         { status: 409 }
//       );
//     }

//     // Create a new user record in the database
//     const token = generateActiveToken(email);
//     const tokenExpiration = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

//     const savedData = await UserModel.create({
//       email,
//       first_name,
//       role,
//       activeToken: token,
//       activeTokenExpires: tokenExpiration,
//     });
//     const setupUrl = `${process.env.CLIENT_URL}/set-up?token=${token}`;
//     const status: {
//       error?: any;
//       data?: string;
//     } = await axios.post(`${process.env.CLIENT_URL}/api/send`, {
//       firstName: first_name,
//       role,
//       setupUrl,
//       email,
//     });
//     // Return the saved data and token
//     if (status.error) {
//       return NextResponse.json({ error: "Problem occurred" }, { status: 401 });
//     }
//     return NextResponse.json({
//       message: "User registered successfully.",
//       savedData: {
//         email: savedData.email,
//         first_name: savedData.first_name,
//         role: savedData.role,
//       },
//       token,
//     });
//   } catch (error: any) {
//     console.error("Error during the user registration process:", error);
//     return NextResponse.json(
//       { error: error.message || "An unknown error occurred." },
//       { status: 500 }
//     );
//   }
// }

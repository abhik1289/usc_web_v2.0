import mongoose, { Schema, Document, Model } from "mongoose";

// Define an enum for roles
enum Role {
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  MODERATOR = "moderator",
}

// Define the interface for the User document
interface IUser extends Document {
  first_name?: string;
  last_name?: string;
  email: string;
  profile_photo?: string;
  role: Role;
  isActive: boolean;
  password?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  activeToken?: string;
  activeTokenExpires?: Date;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    profile_photo: { type: String, default: null },
    role: { type: String, enum: Object.values(Role), required: true },
    isActive: { type: Boolean, default: false },
    password: { type: String, required: true, minlength: 10 },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
    activeToken: { type: String, default: null },
    activeTokenExpires: { type: Date, default: null },
    token: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;

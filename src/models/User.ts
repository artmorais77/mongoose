import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "employee", "admin"],
      default: "customer",
    },
    storeId: { type: Schema.Types.ObjectId, ref: "Store" },
    isActive: { type: Boolean, default: true}
  },
  { timestamps: true }
);

export const User = model("User", UserSchema)
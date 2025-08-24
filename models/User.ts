// /models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }], // array of role IDs
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;

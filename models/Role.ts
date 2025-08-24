

import mongoose, { Schema, model, models } from "mongoose";

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // Admin, Editor, Viewer
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }], // permission references
  },
  { timestamps: true }
);

// ✅ Fix: reuse model if it already exists
const Role = models.Role || model("Role", roleSchema);
export default Role;

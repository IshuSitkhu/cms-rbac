

import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPermission extends Document {
  resource: string;
  action: string;
}

const PermissionSchema = new Schema<IPermission>({
  resource: { type: String, required: true },
  action: { type: String, required: true },
});

// Unique index on combination
PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

// ✅ Fix: use `models.Permission` to avoid re-registration errors
const Permission = models.Permission || model<IPermission>("Permission", PermissionSchema);

export default Permission;

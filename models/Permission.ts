// // // // // // /models/Permission.ts
// // // // // import mongoose, { Schema, model, models } from "mongoose";

// // // // // const permissionSchema = new Schema(
// // // // //   {
// // // // //     name: { type: String, required: true, unique: true }, // e.g., "Category Create"
// // // // //     action: {
// // // // //       type: String,
// // // // //       required: true,
// // // // //       enum: ["create", "read", "update", "delete"],
// // // // //     }, // type of action
// // // // //     resource: { type: String, required: true }, // e.g., "category", "content"
// // // // //   },
// // // // //   { timestamps: true }
// // // // // );

// // // // // const Permission = models.Permission || model("Permission", permissionSchema);
// // // // // export default Permission;
// // // // // models/Permission.ts
// // // // import mongoose, { Schema, Document } from "mongoose";

// // // // interface IPermission extends Document {
// // // //   resource: string;
// // // //   action: string;
// // // // }

// // // // const PermissionSchema = new Schema<IPermission>({
// // // //   resource: { type: String, required: true },
// // // //   action: { type: String, required: true },
// // // // });

// // // // export default mongoose.model<IPermission>("Permission", PermissionSchema);

// // // // models/Permission.ts
// // // import mongoose, { Schema, Document } from "mongoose";

// // // interface IPermission extends Document {
// // //   resource: string;
// // //   action: string;
// // // }

// // // const PermissionSchema = new Schema<IPermission>({
// // //   resource: { type: String, required: true },
// // //   action: { type: String, required: true },
// // // });

// // // // Unique index on combination
// // // PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

// // // export default mongoose.model<IPermission>("Permission", PermissionSchema);

// // import mongoose, { Schema, Document, model, models } from "mongoose";

// // interface IPermission extends Document {
// //   resource: string;
// //   action: string;
// // }

// // const PermissionSchema = new Schema<IPermission>({
// //   resource: { type: String, required: true },
// //   action: { type: String, required: true },
// // });

// // // Unique index on combination
// // PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

// // // ✅ Fix: reuse model if it already exists
// // const Permission = models.Permission || model<IPermission>("Permission", PermissionSchema);
// // export default Permission;


// // /models/Permission.ts
// import mongoose, { Schema, Document, model, models } from "mongoose";

// interface IPermission extends Document {
//   resource: string;
//   action: string;
// }

// const PermissionSchema = new Schema<IPermission>({
//   resource: { type: String, required: true },
//   action: { type: String, required: true },
// });

// // Unique index
// PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

// const Permission = models.Permission || model<IPermission>("Permission", PermissionSchema);
// export default Permission;

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

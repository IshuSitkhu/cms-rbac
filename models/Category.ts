import mongoose, { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  status: "active" | "inactive";
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  parent?: mongoose.Types.ObjectId;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeyword: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Category || model<ICategory>("Category", CategorySchema);

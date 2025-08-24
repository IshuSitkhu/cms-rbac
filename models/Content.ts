import mongoose, { Schema, Document } from "mongoose";

export interface IContent extends Document {
  title: string;
  body: string;
  category: mongoose.Schema.Types.ObjectId;
  status: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
}

const ContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  metaTitle: String,
  metaDescription: String,
  metaKeyword: String,
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);

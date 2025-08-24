// /app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectToMongoDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const { name, slug, status, parent, metaTitle, metaDescription, metaKeyword } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: "Name and slug are required" }, { status: 400 });
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, message: "Slug already exists" }, { status: 400 });
    }

    const category = await Category.create({
      name,
      slug,
      status: status || "active",
      parent: parent || null,
      metaTitle,
      metaDescription,
      metaKeyword,
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

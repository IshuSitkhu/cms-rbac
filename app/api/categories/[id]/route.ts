// /app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Category from "@/models/Category";

// GET single category by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update category
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const updated = await Category.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Remove category
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const deleted = await Category.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Permission from "@/models/Permission";

export async function GET() {
  try {
    await connectToMongoDB();
    const permissions = await Permission.find({});
    return NextResponse.json({ success: true, data: permissions });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { resource, action } = await req.json();

    if (!resource || !action) {
      return NextResponse.json({ success: false, message: "Resource and action are required" }, { status: 400 });
    }

    const existing = await Permission.findOne({ resource, action });
    if (existing) {
      return NextResponse.json({ success: false, message: "Permission already exists" }, { status: 400 });
    }

    const permission = await Permission.create({ resource, action });
    return NextResponse.json({ success: true, data: permission });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

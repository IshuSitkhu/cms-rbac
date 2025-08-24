import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Role from "@/models/Role";
import Permission from "@/models/Permission";

export async function GET() {
  try {
    await connectToMongoDB();
    const roles = await Role.find().populate("permissions").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: roles });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { name, permissions } = await req.json();
    if (!name) return NextResponse.json({ success: false, message: "Role name required" }, { status: 400 });

    const existing = await Role.findOne({ name });
    if (existing) return NextResponse.json({ success: false, message: "Role already exists" }, { status: 400 });

    const perms = permissions ? await Permission.find({ _id: { $in: permissions } }) : [];
    const role = await Role.create({ name, permissions: perms.map(p => p._id) });

    return NextResponse.json({ success: true, data: role }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

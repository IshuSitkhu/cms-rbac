import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Role from "@/models/Role";
import Permission from "@/models/Permission";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const role = await Role.findById(params.id).populate("permissions");
    if (!role) return NextResponse.json({ success: false, message: "Role not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: role });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const body = await req.json();

    if (body.permissions) {
      const perms = await Permission.find({ _id: { $in: body.permissions } });
      body.permissions = perms.map(p => p._id);
    }

    const updated = await Role.findByIdAndUpdate(params.id, body, { new: true }).populate("permissions");
    if (!updated) return NextResponse.json({ success: false, message: "Role not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const deleted = await Role.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ success: false, message: "Role not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import Role from "@/models/Role";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const user = await User.findById(params.id).populate("roles");
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const body = await req.json();

    // If updating password, hash it
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    if (body.role) {
      const roleDoc = await Role.findOne({ name: body.role });
      if (roleDoc) body.roles = [roleDoc._id];
      delete body.role;
    }

    const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).populate("roles");
    if (!updated) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

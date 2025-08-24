import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import Role from "@/models/Role";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToMongoDB();
    const users = await User.find().populate("roles").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password || !role)
      return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc)
      return NextResponse.json({ success: false, message: "Role not found" }, { status: 400 });

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [roleDoc._id],
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

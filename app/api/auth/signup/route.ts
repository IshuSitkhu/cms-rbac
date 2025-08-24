import connectToMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Import models **after** DB connection
    const Permission = (await import("@/models/Permission")).default;
    const Role = (await import("@/models/Role")).default;
    const User = (await import("@/models/User")).default;

    const { username, email, password, role } = await req.json();
    if (!username || !email || !password || !role)
      return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const roleDoc = await Role.findOne({ name: { $regex: `^${role.trim()}$`, $options: "i" } })
                              .populate("permissions");
    if (!roleDoc)
      return NextResponse.json({ success: false, message: "Role not found" }, { status: 400 });

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [roleDoc._id],
    });

    const permissions = roleDoc.permissions.map((p: any) => `${p.resource}:${p.action}`);
    const token = jwt.sign({ userId: user._id, roles: [roleDoc.name], permissions }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({ success: true, data: { user, token } }, { status: 201 });
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}

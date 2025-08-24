import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Import models after connection is ready
    const User = (await import("@/models/User")).default;
    const Role = (await import("@/models/Role")).default;
    const Permission = (await import("@/models/Permission")).default;

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user and populate roles & permissions
    const user = await User.findOne({ email }).populate({
      path: "roles",
      populate: { path: "permissions" },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const roles = user.roles.map((r: any) => r.name);
    const permissions = user.roles.flatMap((r: any) =>
      r.permissions.map((p: any) => `${p.resource}:${p.action}`)
    );

    const token = jwt.sign(
      { userId: user._id, roles, permissions },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { success: true, data: { user, token } },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Permission from "@/models/Permission";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const { id } = params;

    const permission = await Permission.findByIdAndDelete(id);
    if (!permission) {
      return NextResponse.json({ success: false, message: "Permission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Permission deleted" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

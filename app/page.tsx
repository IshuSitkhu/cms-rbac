"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-24 font-sans min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Welcome to CMS RBAC</h1>
      <div className="flex gap-4">
        <Link href="/auth/signup">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Signup
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

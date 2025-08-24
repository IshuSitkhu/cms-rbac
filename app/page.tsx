"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", fontFamily: "Arial" }}>
      <h1>Welcome to CMS RBAC</h1>
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <Link href="/auth/signup">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Signup</button>
        </Link>
        <Link href="/auth/login">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Login</button>
        </Link>
      </div>
    </div>
  );
}

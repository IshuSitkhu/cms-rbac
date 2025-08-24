

"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface UserRole {
  name: string;
  permissions: string[];
}

interface User {
  _id: string;
  username: string;
  email: string;
  roles: UserRole[];
}

interface DecodedToken {
  userId: string;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      // Fetch user data from backend if needed
      setUser({
        _id: decoded.userId,
        username: "User", // optionally fetch real username
        email: "",
        roles: decoded.roles.map((r, idx) => ({
          name: r,
          permissions: decoded.permissions, // optional: map permissions per role
        })),
      });
    } catch (err) {
      console.error(err);
      router.push("/auth/login");
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.roles.some((r) => r.name === "Admin");
  const isEditor = user.roles.some((r) => r.name === "Editor");
  const isViewer = user.roles.some((r) => r.name === "Viewer");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}</h1>

      {isAdmin && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Admin Section</h2>
          <p>Access to manage users, roles, and all categories.</p>
        </div>
      )}

      {isEditor && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Editor Section</h2>
          <p>Access to edit and create content or categories.</p>
        </div>
      )}

      {isViewer && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Viewer Section</h2>
          <p>Access to view content and categories only.</p>
        </div>
      )}
    </div>
  );
}

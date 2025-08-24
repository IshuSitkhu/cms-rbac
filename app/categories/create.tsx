
"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  userId: string;
  roles: string[];
  permissions: string[]; // e.g., ["category:create", "content:read"]
}

export default function Dashboard() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<UserPayload>(token);
      setPermissions(decoded.permissions || []);
      setRoles(decoded.roles || []);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard ({roles.join(", ")})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categories */}
        {permissions.includes("category:create") && (
          <button className="btn btn-primary">Create Category</button>
        )}
        {permissions.includes("category:read") && (
          <button className="btn btn-secondary">View Categories</button>
        )}

        {/* Content */}
        {permissions.includes("content:create") && (
          <button className="btn btn-primary">Create Content</button>
        )}
        {permissions.includes("content:read") && (
          <button className="btn btn-secondary">View Content</button>
        )}

        {/* Users (only for Admin) */}
        {permissions.includes("user:create") && (
          <button className="btn btn-primary">Create User</button>
        )}
        {permissions.includes("user:read") && (
          <button className="btn btn-secondary">View Users</button>
        )}
      </div>
    </div>
  );
}

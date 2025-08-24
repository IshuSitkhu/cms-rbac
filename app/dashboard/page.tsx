"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import CategoryTable from "@/components/CategoryTable";
import UsersTable from "@/components/UsersTable";
import RolesTable from "@/components/RolesTable";
import AddCategoryForm from "@/components/AddCategoryForm";
import AddUserForm from "@/components/AddUserForm";
import AddRoleForm from "@/components/AddRoleForm";

interface UserRole { name: string; permissions: string[]; }
interface User { _id: string; username: string; email: string; roles: UserRole[]; }
interface DecodedToken { userId: string; roles: string[]; permissions: string[]; iat: number; exp: number; }

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // for refreshing tables after add

  const refreshTables = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/auth/login"); return; }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser({
        _id: decoded.userId,
        username: "User",
        email: "",
        roles: decoded.roles.map((r) => ({ name: r, permissions: decoded.permissions })),
      });
    } catch { router.push("/auth/login"); }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.roles.some((r) => r.name === "Admin");
  const isEditor = user.roles.some((r) => r.name === "Editor");
  const isViewer = user.roles.some((r) => r.name === "Viewer");

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}</h1>

      {/* Admin Section */}
      {isAdmin && (
        <div className="p-4 border rounded space-y-6">
          <h2 className="text-xl font-semibold">Admin Section</h2>
          <p>Access to manage users, roles, and all categories.</p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <AddCategoryForm onAdded={refreshTables} />
            <CategoryTable key={refreshKey} canEdit={true} canDelete={true} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <AddUserForm onAdded={refreshTables} />
            <UsersTable key={refreshKey} canEdit={true} canDelete={true} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Roles</h3>
            <AddRoleForm onAdded={refreshTables} />
            <RolesTable key={refreshKey} canEdit={true} canDelete={true} />
          </div>
        </div>
      )}

      {/* Editor Section */}
      {isEditor && !isAdmin && (
        <div className="p-4 border rounded space-y-4">
          <h2 className="text-xl font-semibold">Editor Section</h2>
          <p>Access to edit and create content or categories.</p>
          <AddCategoryForm onAdded={refreshTables} />
          <CategoryTable key={refreshKey} canEdit={true} />
        </div>
      )}

      {/* Viewer Section */}
      {isViewer && !isAdmin && !isEditor && (
        <div className="p-4 border rounded space-y-4">
          <h2 className="text-xl font-semibold">Viewer Section</h2>
          <p>Access to view content and categories only.</p>
          <CategoryTable key={refreshKey} />
        </div>
      )}
    </div>
  );
}

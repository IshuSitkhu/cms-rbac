"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import AdminSection from "@/components/AdminSection";


import CategoryTable from "@/components/CategoryTable";
import UsersTable from "@/components/UsersTable";
import RolesTable from "@/components/RolesTable";
import AddCategoryForm from "@/components/AddCategoryForm";
import AddUserForm from "@/components/AddUserForm";
import AddRoleForm from "@/components/AddRoleForm";

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
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTables = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser({
        _id: decoded.userId,
        username: "User",
        email: "",
        roles: decoded.roles.map((r) => ({
          name: r,
          permissions: decoded.permissions,
        })),
      });
    } catch {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-800 text-lg animate-pulse">Loading...</p>
      </div>
    );

  const isAdmin = user.roles.some((r) => r.name === "Admin");
  const isEditor = user.roles.some((r) => r.name === "Editor");
  const isViewer = user.roles.some((r) => r.name === "Viewer");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-medium">{user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.username}</h2>

        {/* Admin Section */}
        {/* {isAdmin && (
          <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Admin Section</h3>
            <p className="text-gray-700">Access to manage users, roles, and all categories.</p>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-black">Categories</h4>
              <AddCategoryForm onAdded={refreshTables} />
              <CategoryTable key={refreshKey} canEdit={true} canDelete={true} />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-black">Users</h4>
              <AddUserForm onAdded={refreshTables} />
              <UsersTable key={refreshKey} canEdit={true} canDelete={true} />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-black">Roles</h4>
              <AddRoleForm onAdded={refreshTables} />
              <RolesTable key={refreshKey} canEdit={true} canDelete={true} />
            </div>
          </div>
        )} */}

        {isAdmin && <AdminSection refreshKey={refreshKey} refreshTables={refreshTables} />}

        {/* Editor Section */}
        {isEditor && !isAdmin && (
          <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-black">Editor Section</h3>
            <p className="text-black">Access to edit and create content or categories.</p>
            <AddCategoryForm onAdded={refreshTables} />
            <CategoryTable key={refreshKey} canEdit={true} />
          </div>
        )}

        {/* Viewer Section */}
        {isViewer && !isAdmin && !isEditor && (
          <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-black">Viewer Section</h3>
            <p className="text-black">Access to view content and categories only.</p>
            <CategoryTable key={refreshKey} />
          </div>
        )}
      </div>
    </div>
  );
}

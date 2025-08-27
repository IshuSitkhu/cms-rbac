"use client";
import AdminSidebar from "@/components/AdminSidebar";
import RolesTable from "@/components/RolesTable";
import AddRoleForm from "@/components/AddRoleForm";
import { useState } from "react";

export default function RolesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshTables = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 ml-64 pt-16 pr-60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Roles</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <AddRoleForm onAdded={refreshTables} />
          <RolesTable key={refreshKey} canEdit canDelete />
        </div>
      </main>
    </div>
  );
}

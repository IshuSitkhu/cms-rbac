
"use client";
import AdminSidebar from "@/components/AdminSidebar";
import RolesTable from "@/components/RolesTable";
import AddRoleForm from "@/components/AddRoleForm";
import { useState } from "react";

export default function RolesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editRole, setEditRole] = useState<any>(null);

  const refreshTables = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="flex min-h-screen  bg-gradient-to-r  via-indigo-600">
      <AdminSidebar />
      <main className="flex-1 ml-6 pt-16 px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Roles</h2>

        {/* Flex container for form and table */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Form section */}
          <div className="lg:w-1/3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
            <AddRoleForm
              onAdded={refreshTables}
              editRole={editRole}
              setEditRole={setEditRole}
            />
          </div>

          {/* Table section */}
          <div className="lg:w-2/3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 overflow-x-auto">
            <RolesTable
              key={refreshKey}
              canEdit
              canDelete
              setEditRole={setEditRole}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}

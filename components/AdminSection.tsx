"use client";

import AddCategoryForm from "@/components/AddCategoryForm";
import CategoryTable from "@/components/CategoryTable";
import AddUserForm from "@/components/AddUserForm";
import UsersTable from "@/components/UsersTable";
import AddRoleForm from "@/components/AddRoleForm";
import RolesTable from "@/components/RolesTable";

interface AdminSectionProps {
  refreshKey: number;
  refreshTables: () => void;
}

export default function AdminSection({ refreshKey, refreshTables }: AdminSectionProps) {
  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Admin Section</h3>
      <p className="text-gray-700">Access to manage users, roles, and all categories.</p>

      {/* Categories */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-black">Categories</h4>
        <AddCategoryForm onAdded={refreshTables} />
        <CategoryTable key={refreshKey} canEdit={true} canDelete={true} />
      </div>

      {/* Users */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-black">Users</h4>
        <AddUserForm onAdded={refreshTables} />
        <UsersTable key={refreshKey} canEdit={true} canDelete={true} />
      </div>

      {/* Roles */}
      <div>
        <h4 className="text-lg font-semibold mb-2 text-black">Roles</h4>
        <AddRoleForm onAdded={refreshTables} />
        <RolesTable key={refreshKey} canEdit={true} canDelete={true} />
      </div>
    </div>
  );
}

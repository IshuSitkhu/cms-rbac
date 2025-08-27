// "use client";

// import AddCategoryForm from "@/components/AddCategoryForm";
// import CategoryTable from "@/components/CategoryTable";
// import AddUserForm from "@/components/AddUserForm";
// import UsersTable from "@/components/UsersTable";
// import AddRoleForm from "@/components/AddRoleForm";
// import RolesTable from "@/components/RolesTable";

// interface AdminSectionProps {
//   refreshKey: number;
//   refreshTables: () => void;
//   activeSection: "categories" | "users" | "roles" | ""; 
// }

// export default function AdminSection({ refreshKey, refreshTables, activeSection }: AdminSectionProps) {
// return (
//     <div className="space-y-8 pt-10 pr-70 pt-10">
//       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h3>
//         <p className="text-gray-700 dark:text-gray-300 mt-1">
//           Access to manage users, roles, and all categories.
//         </p>
//       </div>

//       {activeSection === "categories" && (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
//           <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h4>
//           <AddCategoryForm onAdded={refreshTables} />
//           <CategoryTable key={refreshKey} canEdit canDelete />
//         </div>
//       )}

//       {activeSection === "users" && (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
//           <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h4>
//           <AddUserForm onAdded={refreshTables} />
//           <UsersTable key={refreshKey} canEdit canDelete />
//         </div>
//       )}

//       {activeSection === "roles" && (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
//           <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Roles</h4>
//           <AddRoleForm onAdded={refreshTables} />
//           <RolesTable key={refreshKey} canEdit canDelete />
//         </div>
//       )}
//     </div>
//   );
// }
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
  activeSection: "categories" | "users" | "roles" | ""; 
}

export default function AdminSection({ refreshKey, refreshTables, activeSection }: AdminSectionProps) {
  return (
    <div className="space-y-8 pt-24 pr-6"> {/* Add padding top to avoid navbar overlap */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-1">
          Access to manage users, roles, and all categories.
        </p>
      </div>

      {activeSection === "categories" && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h4>
          <AddCategoryForm onAdded={refreshTables} />
          <CategoryTable key={refreshKey} canEdit canDelete />
        </div>
      )}

      {activeSection === "users" && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Users</h4>
          <AddUserForm onAdded={refreshTables} />
          <UsersTable key={refreshKey} canEdit canDelete />
        </div>
      )}

      {activeSection === "roles" && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Roles</h4>
          <AddRoleForm onAdded={refreshTables} />
          <RolesTable key={refreshKey} canEdit canDelete />
        </div>
      )}
    </div>
  );
}

"use client";
import AdminSidebar from "@/components/AdminSidebar";
import UsersTable from "@/components/UsersTable";

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 bg-gradient-to-r  via-indigo-600 ">
      <AdminSidebar />

      <main className="flex-1 ml-45 pt-16 pr-60 ">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Users</h2>
        <UsersTable canEdit canDelete />
      </main>
    </div>
  );
}

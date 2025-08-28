"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { useState, useEffect } from "react";

interface Permission {
  _id: string;
  resource: string;
  action: string;
}

export default function PermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [resource, setResource] = useState("");
  const [action, setAction] = useState("");

  // Fetch permissions on mount
  const fetchPermissions = async () => {
    try {
      const res = await fetch("/api/permission");
      const data = await res.json();
      if (data.success) setPermissions(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Add permission
  const handleAddPermission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource || !action) return;

    try {
      const res = await fetch("/api/permission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource, action }),
      });
      const data = await res.json();
      if (data.success) {
        setPermissions(prev => [...prev, data.data]);
        setResource("");
        setAction("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete permission
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/permission/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPermissions(prev => prev.filter(p => p._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 bg-gradient-to-r  via-indigo-600 ">
      <AdminSidebar />
      <main className="flex-1 ml-58 pt-16 pr-60">
        <h2 className="text-2xl font-bold mb-4">Manage Permissions</h2>

        <form onSubmit={handleAddPermission} className="mb-12 flex gap-4">
          <input
            type="text"
            placeholder="Resource Name"
            value={resource}
            onChange={e => setResource(e.target.value)}
            className="border rounded px-3 py-2 flex-1 bg-white text-black"
          />
          <input
            type="text"
            placeholder="Action"
            value={action}
            onChange={e => setAction(e.target.value)}
            className="border rounded px-3 py-2 flex-1 bg-white text-black"
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Permission
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-black dark:bg-white rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-white text-black rounded-t-xl">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-widerr">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {permissions.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-black font-medium">
                    {p.resource}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-black dark:bg-black-600 text-gray-800 dark:text-gray-100  px-2 py-1 rounded-full">
                      {p.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 text-xs rounded-full transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

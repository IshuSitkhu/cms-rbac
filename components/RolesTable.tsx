"use client";

import { useEffect, useState } from "react";

interface Role {
  _id: string;
  name: string;
  permissions: { resource: string; action: string }[];
}

interface Props {
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function RolesTable({ canEdit = false, canDelete = false }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchRoles = async () => {
    const res = await fetch("/api/roles");
    const data = await res.json();
    if (data.success) setRoles(data.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    const res = await fetch(`/api/roles/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchRoles();
  };

   return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Roles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Permissions</th>
              {canEdit && <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Edit</th>}
              {canDelete && <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Delete</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {roles.map((role) => (
              <tr key={role._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{role.name}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {role.permissions.map((p) => (
                    <span key={`${p.resource}-${p.action}`} className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xs px-2 py-1 rounded mr-1 mb-1">
                      {p.resource}:{p.action}
                    </span>
                  ))}
                </td>
                {canEdit && (
                  <td className="px-6 py-4">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition"
                      onClick={() => alert(`Edit ${role.name}`)}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {canDelete && (
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                      onClick={() => handleDelete(role._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

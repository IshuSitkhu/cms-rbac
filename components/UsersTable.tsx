"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  roles: { name: string }[];
}

interface Props {
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function UsersTable({ canEdit = false, canDelete = false }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (data.success) setUsers(data.data);
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchUsers();
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Roles</th>
              {canEdit && <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Edit</th>}
              {canDelete && <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Delete</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {user.roles.map((r) => (
                    <span key={r.name} className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                      {r.name}
                    </span>
                  ))}
                </td>
                {canEdit && (
                  <td className="px-6 py-4">
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded-full transition"
                      onClick={() => alert(`Edit ${user.username}`)}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {canDelete && (
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition"
                      onClick={() => handleDelete(user._id)}
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

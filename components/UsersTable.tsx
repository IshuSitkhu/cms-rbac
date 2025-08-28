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
    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white tracking-wide">
      Users
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-black bg-white rounded-xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-white text-black rounded-t-xl">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Roles</th>
            {canEdit && <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Edit</th>}
            {canDelete && <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Delete</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-black font-medium">{user.username}</td>
              <td className="px-6 py-4 text-black dark:text-black-300">{user.email}</td>
              <td className="px-6 py-4">
                {user.roles.map((r) => (
                  <span
                    key={r.name}
                    className="inline-block bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-indigo-100 text-xs px-2 py-1 rounded-full mr-1 mb-1 font-medium"
                  >
                    {r.name}
                  </span>
                ))}
              </td>
              {canEdit && (
                <td className="px-6 py-4">
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded-full shadow-sm transition-all font-medium"
                    onClick={() => alert(`Edit ${user.username}`)}
                  >
                    Edit
                  </button>
                </td>
              )}
              {canDelete && (
                <td className="px-6 py-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow-sm transition-all font-medium"
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

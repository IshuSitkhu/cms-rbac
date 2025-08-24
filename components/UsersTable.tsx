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
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Roles</th>
            {canEdit && <th className="p-2 border">Edit</th>}
            {canDelete && <th className="p-2 border">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.roles.map((r) => r.name).join(", ")}</td>
              {canEdit && (
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => alert(`Edit ${user.username}`)}
                  >
                    Edit
                  </button>
                </td>
              )}
              {canDelete && (
                <td className="p-2 border">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
  );
}

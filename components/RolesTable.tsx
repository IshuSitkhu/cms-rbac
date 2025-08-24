"use client";

import { useEffect, useState } from "react";

interface Role {
  _id: string;
  name: string;
  permissions: string[];
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
      <h2 className="text-xl font-bold mb-4">Roles</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Role Name</th>
            <th className="p-2 border">Permissions</th>
            {canEdit && <th className="p-2 border">Edit</th>}
            {canDelete && <th className="p-2 border">Delete</th>}
          </tr>
        </thead>
        {/* <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td className="p-2 border">{role.name}</td>
              <td className="p-2 border">{role.permissions.join(", ")}</td>
              {canEdit && (
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => alert(`Edit ${role.name}`)}
                  >
                    Edit
                  </button>
                </td>
              )}
              {canDelete && (
                <td className="p-2 border">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(role._id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody> */}

        <tbody>
  {roles.map((role) => (
    <tr key={role._id}>
      <td className="p-2 border">{role.name}</td>
      <td className="p-2 border">
        {role.permissions.map((p: any) => `${p.resource}:${p.action}`).join(", ")}
      </td>
      {canEdit && (
        <td className="p-2 border">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => alert(`Edit ${role.name}`)}>Edit</button>
        </td>
      )}
      {canDelete && (
        <td className="p-2 border">
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(role._id)}>Delete</button>
        </td>
      )}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

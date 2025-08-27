"use client";

import { useState, useEffect } from "react";

interface Permission {
  _id: string;
  resource: string;
  action: string;
}

interface Props {
  onAdded: () => void;
}

export default function AddRoleForm({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [openResource, setOpenResource] = useState<string | null>(null);

  // Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await fetch("/api/permission");
        const data = await res.json();
        if (data.success) setPermissions(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPermissions();
  }, []);

  // Group permissions by resource
  const groupedPermissions = permissions.reduce((acc: any, perm) => {
    if (!acc[perm.resource]) acc[perm.resource] = [];
    acc[perm.resource].push(perm);
    return acc;
  }, {});

  const handleCheckboxChange = (id: string) => {
    setSelectedPermissions(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (resource: string) => {
    const allIds = groupedPermissions[resource].map((p: Permission) => p._id);
    const alreadySelected = allIds.every((id: string) => selectedPermissions.includes(id));

    if (alreadySelected) {
      // Deselect all
      setSelectedPermissions(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      // Select all
      setSelectedPermissions(prev => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Role name is required");

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, permissions: selectedPermissions }),
      });
      const data = await res.json();
      if (data.success) {
        setName("");
        setSelectedPermissions([]);
        onAdded();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Role</h3>

      {/* Role Name Input */}
      <input
        type="text"
        placeholder="Role Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        required
      />

      {/* Permissions Dropdowns */}
      <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 max-h-80 overflow-y-auto">
        {Object.keys(groupedPermissions).map(resource => (
          <div key={resource} className="mb-2">
            <button
              type="button"
              onClick={() => setOpenResource(openResource === resource ? null : resource)}
              className="w-full flex justify-between items-center px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
            >
              <span className="font-semibold text-gray-800 dark:text-gray-200">{resource}</span>
              <span>{openResource === resource ? "▲" : "▼"}</span>
            </button>
            {openResource === resource && (
              <div className="mt-2 pl-4 grid grid-cols-1 gap-1">
                {/* Select / Deselect All */}
                <button
                  type="button"
                  onClick={() => handleSelectAll(resource)}
                  className="text-sm text-blue-600 hover:underline mb-1"
                >
                  {groupedPermissions[resource].every((p: Permission) =>
                    selectedPermissions.includes(p._id)
                  )
                    ? "Deselect All"
                    : "Select All"}
                </button>

                {groupedPermissions[resource].map((perm: Permission) => (
                  <label
                    key={perm._id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm._id)}
                      onChange={() => handleCheckboxChange(perm._id)}
                      className="w-4 h-4 text-green-500 rounded focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300"
                    />
                    <span className="text-gray-800 dark:text-gray-200">{perm.action}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
      >
        Add Role
      </button>
    </form>
  );
}

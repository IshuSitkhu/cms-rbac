"use client";

import { useState } from "react";

interface Props {
  onAdded: () => void;
}

export default function AddRoleForm({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const permsArray = permissions.split(",").map((p) => p.trim());
    const res = await fetch("/api/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, permissions: permsArray }),
    });
    const data = await res.json();
    if (data.success) {
      setName("");
      setPermissions("");
      onAdded();
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Role Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-1 rounded dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        placeholder="Permissions (comma separated)"
        value={permissions}
        onChange={(e) => setPermissions(e.target.value)}
        className="border p-1 rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded transition"
      >
        Add Role
      </button>
    </form>
  );
}

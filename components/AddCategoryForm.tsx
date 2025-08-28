"use client";

import { useState } from "react";

interface Props {
  onAdded: () => void;
}

export default function AddCategoryForm({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, status }),
    });
    const data = await res.json();
    if (data.success) {
      setName("");
      setSlug("");
      setStatus("active");
      onAdded();
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-8 flex gap-2 flex-wrap bg-white">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
    className="border  text-gray-900 dark:text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
    className="border  text-gray-900 dark:text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    className="border  text-gray-900 dark:text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button
        type="submit"
    className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Add Category
      </button>
    </form>
  );
}

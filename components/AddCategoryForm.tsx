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
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-1 rounded" required />
      <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="border p-1 rounded" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-1 rounded">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Add Category</button>
    </form>
  );
}

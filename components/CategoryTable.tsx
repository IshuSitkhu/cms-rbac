"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
}

interface Props {
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function CategoryTable({ canEdit = false, canDelete = false }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (data.success) setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchCategories();
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;
    const res = await fetch(`/api/categories/${editingCategory._id}`, {
      method: "PUT",
      body: JSON.stringify({ name, slug }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setEditingCategory(null);
      setName("");
      setSlug("");
      fetchCategories();
    } else alert(data.message);
  };

  const handleAdd = async () => {
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, slug }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setName("");
      setSlug("");
      fetchCategories();
    } else alert(data.message);
  };

  return (
    <div className=" dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Categories</h2>

      {/* Add/Edit Form
      <div className="flex flex-wrap gap-2 items-center">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {editingCategory ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Add
          </button>
        )}
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 border rounded bg-white dark:bg-gray-700">
  <thead className="bg-gray-100 dark:bg-gray-600">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Slug</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
    {categories.map((cat) => (
      <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="px-6 py-3 text-gray-900 dark:text-white">{cat.name}</td>
        <td className="px-6 py-3 text-gray-900 dark:text-white">{cat.slug}</td>
        <td className="px-6 py-3">
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${cat.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white" : "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white"}`}>
            {cat.status}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

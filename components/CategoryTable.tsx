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
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-wide">Categories</h2>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-black bg-white rounded-xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700">
  <thead className="bg-gray-100 text-black rounded-t-xl">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Slug</th>
      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">Status</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
    {categories.map((cat) => (
      <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-200">
        <td className="px-6 py-3 text-gray-900 dark:text-black">{cat.name}</td>
        <td className="px-6 py-3 text-gray-900 dark:text-black">{cat.slug}</td>
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

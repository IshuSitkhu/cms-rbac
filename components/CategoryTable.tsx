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
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Categories</h2>

      {/* Add/Edit Form */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border text-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border text-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              {canEdit && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Edit</th>}
              {canDelete && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Delete</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length === 0 && (
              <tr>
                <td colSpan={canEdit && canDelete ? 5 : 3} className="px-6 py-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-800">{cat.name}</td>
                <td className="px-6 py-3 text-gray-800">{cat.slug}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>
                {canEdit && (
                  <td className="px-6 py-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {canDelete && (
                  <td className="px-6 py-3">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleDelete(cat._id)}
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

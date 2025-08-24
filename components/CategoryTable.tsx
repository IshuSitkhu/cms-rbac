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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Slug</th>
            <th className="p-2 border">Status</th>
            {canEdit && <th className="p-2 border">Edit</th>}
            {canDelete && <th className="p-2 border">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="p-2 border">{cat.name}</td>
              <td className="p-2 border">{cat.slug}</td>
              <td className="p-2 border">{cat.status}</td>
              {canEdit && (
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => alert(`Edit ${cat.name}`)}
                  >
                    Edit
                  </button>
                </td>
              )}
              {canDelete && (
                <td className="p-2 border">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
  );
}

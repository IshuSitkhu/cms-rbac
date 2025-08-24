"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  slug: string;
  status: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (data.success) setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (cat: Category) => router.push(`/categories/${cat._id}/edit`);
  const handleDelete = async (cat: Category) => {
    if (!confirm("Delete category?")) return;
    const res = await fetch(`/api/categories/${cat._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchCategories();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <button onClick={() => router.push("/categories/create")} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">
        Add Category
      </button>
      <DataTable data={categories} columns={[{ header: "Name", key: "name" }, { header: "Slug", key: "slug" }, { header: "Status", key: "status" }]} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

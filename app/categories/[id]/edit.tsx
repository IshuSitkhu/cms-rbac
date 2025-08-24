"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCategory() {
  const [form, setForm] = useState({ name: "", slug: "", status: "active" });
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api/categories/${params.id}`);
      const data = await res.json();
      if (data.success) setForm({ name: data.data.name, slug: data.data.slug, status: data.data.status });
    };
    fetchCategory();
  }, [params.id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/categories/${params.id}`, { method: "PUT", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    if (data.success) router.push("/categories");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 mb-2 w-full" />
      <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="border p-2 mb-2 w-full" />
      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="border p-2 mb-2 w-full">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
    </form>
  );
}

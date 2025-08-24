// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   status: string;
// }

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="text-center mt-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Categories</h1>
//       <Link href="/categories/create" className="px-4 py-2 bg-blue-600 text-white rounded">
//         Add Category
//       </Link>
//       <table className="w-full mt-4 border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Slug</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.length === 0 ? (
//             <tr>
//               <td colSpan={4} className="p-4 text-center">No categories found</td>
//             </tr>
//           ) : (
//             categories.map((cat) => (
//               <tr key={cat._id}>
//                 <td className="p-2 border">{cat.name}</td>
//                 <td className="p-2 border">{cat.slug}</td>
//                 <td className="p-2 border">{cat.status}</td>
//                 <td className="p-2 border">
//                   <Link href={`/categories/${cat._id}/edit`} className="text-blue-600 mr-2">
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(cat._id)}
//                     className="text-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   async function handleDelete(id: string) {
//     if (confirm("Are you sure you want to delete this category?")) {
//       await fetch(`/api/categories/${id}`, { method: "DELETE" });
//       setCategories(categories.filter((cat) => cat._id !== id));
//     }
//   }
// }

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

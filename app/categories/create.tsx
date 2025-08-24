// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateCategoryPage() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, description }),
//       });

//       if (res.ok) {
//         alert("Category created successfully!");
//         router.push("/categories"); // Redirect to category list page
//       } else {
//         alert("Error creating category");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create Category</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Category Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 w-full rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2 w-full rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }

// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  userId: string;
  roles: string[];
  permissions: string[]; // e.g., ["category:create", "content:read"]
}

export default function Dashboard() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<UserPayload>(token);
      setPermissions(decoded.permissions || []);
      setRoles(decoded.roles || []);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard ({roles.join(", ")})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categories */}
        {permissions.includes("category:create") && (
          <button className="btn btn-primary">Create Category</button>
        )}
        {permissions.includes("category:read") && (
          <button className="btn btn-secondary">View Categories</button>
        )}

        {/* Content */}
        {permissions.includes("content:create") && (
          <button className="btn btn-primary">Create Content</button>
        )}
        {permissions.includes("content:read") && (
          <button className="btn btn-secondary">View Content</button>
        )}

        {/* Users (only for Admin) */}
        {permissions.includes("user:create") && (
          <button className="btn btn-primary">Create User</button>
        )}
        {permissions.includes("user:read") && (
          <button className="btn btn-secondary">View Users</button>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi"; // <-- this is required

// interface AdminSidebarProps {
//   setActiveSection: (section: "categories" | "users" | "roles" | "") => void;
// }

// export default function AdminSidebar({ setActiveSection }: AdminSidebarProps) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <aside
//       className={`fixed top-16 left-0 min-h-[calc(100vh-4rem)] transition-all duration-300 
//                   ${isOpen ? "w-64" : "w-20"} 
//                   bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r dark:border-gray-700`}
//     >
//       <div className="flex items-center justify-between px-4 py-4">
//         <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>Admin</h2>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//         >
//           {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//         </button>
//       </div>

//       <nav className="mt-6 space-y-2">
//         <button
//           onClick={() => setActiveSection("")}
//           className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           Dashboard
//         </button>
//         <button
//           onClick={() => setActiveSection("users")}
//           className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           Users
//         </button>
//         <button
//           onClick={() => setActiveSection("roles")}
//           className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           Roles
//         </button>
//         <button
//           onClick={() => setActiveSection("categories")}
//           className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           Categories
//         </button>
//       </nav>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`fixed top-16 left-0 min-h-[calc(100vh-4rem)] transition-all duration-300 
                  ${isOpen ? "w-64" : "w-20"} 
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r dark:border-gray-700`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>Admin</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        <Link
          href="/admin"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Users
        </Link>
        <Link
          href="/admin/roles"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Roles
        </Link>
        <Link
          href="/admin/categories"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Categories
        </Link>
      </nav>
    </aside>
  );
}

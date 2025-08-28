"use client";

import Link from "next/link";
import { useState } from "react";
import { FiFolder, FiHome, FiLock, FiMenu, FiShield, FiUser, FiX } from "react-icons/fi";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // return (
  //   <aside
  //     className={`fixed top-16 left-0 min-h-[calc(100vh-4rem)] transition-all duration-300 
  //                 ${isOpen ? "w-64" : "w-20"} 
  //                 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r dark:border-gray-700`}
  //   >
  //     <div className="flex items-center justify-between px-4 py-4">
  //       <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>Admin</h2>
  //       <button
  //         onClick={() => setIsOpen(!isOpen)}
  //         className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
  //       >
  //         {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
  //       </button>
  //     </div>

  //     <nav className="mt-6 space-y-2">
  //       <Link
  //         href="/admin"
  //         className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
  //       >
  //         Dashboard
  //       </Link>
  //       <Link
  //         href="/admin/users"
  //         className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
  //       >
  //         Users
  //       </Link>
  //       <Link
  //         href="/admin/roles"
  //         className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
  //       >
  //         Roles
  //       </Link>
  //       <Link
  //         href="/admin/permission"
  //         className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
  //       >
  //         Permission
  //       </Link>

  //       <Link
  //         href="/admin/categories"
  //         className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
  //       >
  //         Categories
  //       </Link>
  //     </nav>
  //   </aside>
  // );
  return (
  <aside
    className={`fixed top-16 left-0 min-h-[calc(100vh-4rem)] transition-all duration-300
                ${isOpen ? "w-64" : "w-20"} 
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r dark:border-gray-700 shadow-lg`}
  >
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
      <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold tracking-wide`}>
        Admin
      </h2>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
    </div>

    {/* Navigation */}
    <nav className="mt-6 space-y-2">
      {[
        { name: "Dashboard", href: "/admin", icon: FiHome },
        { name: "Users", href: "/admin/users", icon: FiUser },
        { name: "Roles", href: "/admin/roles", icon: FiShield },
        { name: "Permission", href: "/admin/permission", icon: FiLock },
        { name: "Categories", href: "/admin/categories", icon: FiFolder },
      ].map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors 
                      hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600
                      ${isOpen ? "justify-start" : "justify-center"}`}
        >
          <Icon size={20} />
          <span className={`${isOpen ? "inline" : "hidden"} font-medium`}>{name}</span>
        </Link>
      ))}
    </nav>
  </aside>
);

}

"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white min-h-screen transition-all duration-300 fixed left-0 top-0`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-700">
          Users
        </Link>
        <Link href="/admin/roles" className="block px-4 py-2 hover:bg-gray-700">
          Roles
        </Link>
        <Link href="/admin/categories" className="block px-4 py-2 hover:bg-gray-700">
          Categories
        </Link>
        <Link href="/admin/settings" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </Link>
      </nav>
    </aside>
  );
}

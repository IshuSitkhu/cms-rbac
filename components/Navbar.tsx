"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("User");
 const [dark, setDark] = useState(false);  const [mounted, setMounted] = useState(false); // track client mount

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);

    const stored = localStorage.getItem("darkMode") === "true";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);

    setMounted(true); // mark component as mounted
  }, []);

  const toggle = () => {
    const newMode = !dark;
    setDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  // Prevent render until mounted to avoid hydration issues
  if (!mounted) return null;

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition-colors duration-500">
    
    {/* Logo / Brand */}
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
        Awesome Company
      </h1>
    </div>

    {/* Controls */}
    <div className="flex items-center gap-4">
      {/* Dark/Light Toggle */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow-sm font-medium"
      >
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* Username */}
      <span className="text-gray-900 dark:text-white font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm">
        {username}
      </span>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition-all font-semibold"
      >
        Logout
      </button>
    </div>
  </nav>
);

}

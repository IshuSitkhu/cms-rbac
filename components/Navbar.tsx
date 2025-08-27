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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Awesome Company</h1>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggle}>
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>

        <span className="text-gray-900 dark:text-white font-medium">{username}</span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

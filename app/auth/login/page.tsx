"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.data.token);

        // Normalize roles to lowercase
        const roles = data.data.user.roles.map((r: any) => r.name.toLowerCase());

        // Role-based redirection
        if (roles.includes("admin")) {
          router.push("/admin");
        } else if (roles.includes("editor")) {
          router.push("/editor");
        } else if (roles.includes("viewer")) {
          router.push("/viewer");
        } else {
          alert("No dashboard assigned for your role!");
        }

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Login failed. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r  via-indigo-600 ">
  <div className="w-full max-w-md rounded-3xl p-10 bg-white/90 backdrop-blur-md shadow-2xl border border-white/20">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
      Welcome Back
    </h1>

    <form onSubmit={handleLogin} className="space-y-6">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-400 transition-all shadow-md"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    <p className="mt-6 text-center text-gray-700">
      Don’t have an account?{" "}
      <span
        onClick={() => router.push("/auth/signup")}
        className="text-indigo-600 hover:underline cursor-pointer font-medium"
      >
        Register
      </span>
    </p>
  </div>
</div>

  );
}

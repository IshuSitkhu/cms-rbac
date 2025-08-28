"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  roles: string[];
}

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in
      router.push("/auth/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      // Normalize roles to lowercase
      const roles = decoded.roles.map((r) => r.toLowerCase());

      if (roles.includes("admin")) {
        router.push("/admin");
      } else if (roles.includes("editor")) {
        router.push("/editor");
      } else if (roles.includes("viewer")) {
        router.push("/viewer");
      } else {
        alert("No dashboard assigned for your role!");
      }
    } catch (err) {
      console.error("Token decode failed:", err);
      router.push("/auth/login");
    }
  }, [router]);

  return (
  <p className="mt-24 text-center text-lg font-medium text-gray-700 dark:text-gray-200 animate-pulse  ">
    Redirecting...
  </p>
);
}

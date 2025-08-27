// app/admin/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage categories, users, and roles from the admin panel",
  icons: {
    icon: "/favicon.ico", // must be in public folder
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    
      <main className="flex-1 ml-64 p-6">{children}</main>
    
  );
}

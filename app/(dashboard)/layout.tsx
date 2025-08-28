

import Navbar from "@/components/Navbar";



export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r  via-indigo-600">
      <Navbar /> {/* Shared for all roles */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

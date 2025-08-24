"use client";

import Navbar from "@/components/Navbar";
import AdminSection from "@/components/AdminSection";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
  <AdminSidebar />   {/* Left Sidebar */}
  <div className="flex-1 ml-64">
    <Navbar />      
    <main className="p-6"> 
      <AdminSection refreshKey={0} refreshTables={function (): void {
                      throw new Error("Function not implemented.");
                  } } />  
    </main>
  </div>
</div>

  );
}

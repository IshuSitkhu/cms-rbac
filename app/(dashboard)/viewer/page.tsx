"use client";
import CategoryTable from "@/components/CategoryTable";

export default function ViewerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Viewer Dashboard</h1>
      <p>Access to view content and categories only.</p>
      <CategoryTable key={0} />
    </div>
  );
}

"use client";
import AddCategoryForm from "@/components/AddCategoryForm";
import CategoryTable from "@/components/CategoryTable";

export default function EditorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editor Dashboard</h1>
      <p>Access to create and edit content or categories.</p>
      <AddCategoryForm onAdded={() => {}} />
      <CategoryTable key={0} canEdit={true} />
    </div>
  );
}

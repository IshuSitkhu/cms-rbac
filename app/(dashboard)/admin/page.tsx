// "use client"; // Client component because we use useState

// import { useState } from "react";
// import AdminSection from "@/components/AdminSection";
// import AdminSidebar from "@/components/AdminSidebar"; // optional if you want sidebar here

// export default function AdminDashboardPage() {
//   const [activeSection, setActiveSection] = useState<"categories" | "users" | "roles" | "">("");
//   const [refreshKey, setRefreshKey] = useState(0);

//   const refreshTables = () => setRefreshKey(prev => prev + 1);

//   return (
//     <div className="flex  min-h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Pass setActiveSection to sidebar */}
//       <AdminSidebar setActiveSection={setActiveSection} />
      

//       {/* Render selected section */}
//       <div className="flex-1 ml-64 pt-8 px-6 transition-all duration-300">
//         <AdminSection
//           refreshKey={refreshKey}
//           refreshTables={refreshTables}
//           activeSection={activeSection}
//         />
//       </div>
   
//     </div>
//   );
// }

"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r  via-indigo-600 pt-16">
      <AdminSidebar />
      <main className="flex-1 ml-6 pt-16">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p>Welcome to the admin panel. Use the sidebar to navigate.</p>
      </main>
    </div>
  );
}

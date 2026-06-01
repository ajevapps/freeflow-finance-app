import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
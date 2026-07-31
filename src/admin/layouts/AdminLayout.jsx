import { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="bg-[#F5F7FB] min-h-screen w-full overflow-hidden flex">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-[320px] w-full overflow-hidden">

        {/* HEADER */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* PAGE CONTENT */}
        <div className="w-full overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}
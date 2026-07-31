import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DoctorLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="min-h-screen bg-[#F4F6FA]">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div className="lg:ml-[280px] flex flex-col min-h-screen">

        {/* Mobile Top Bar */}

        <div className="lg:hidden flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >

            <Menu size={28} />

          </button>

          <h2 className="font-bold text-lg">

            Doctor Portal

          </h2>

          <div className="w-8"></div>

        </div>

        {/* Header */}

        <Header
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page */}

        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default DoctorLayout;
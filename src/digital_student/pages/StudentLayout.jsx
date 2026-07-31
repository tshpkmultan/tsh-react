import { useState } from "react";
import { Outlet } from "react-router-dom";

import StudentSidebar from "../components/StudentSidebar";
import StudentNavbar from "../components/StudentNavbar";

const StudentLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <StudentSidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <StudentSidebar closeSidebar={() => setSidebarOpen(false)} />
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        <StudentNavbar
          title="Overview Dashboard"
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default StudentLayout;
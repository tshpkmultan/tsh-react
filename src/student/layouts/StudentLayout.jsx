import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import StudentSidebar from "../components/StudentSidebar";
import StudentNavbar from "../components/StudentNavbar";

const StudentLayout = () => {

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titles = {
    "/student": "Overview Dashboard",
    "/student/courses": "My Courses",
    "/student/schedule": "Class Schedule",
    "/student/assignments": "Assignments",
    "/student/notices": "Official Notices",
    "/student/fee-status": "Fee Status",
    "/student/results": "Results",
    "/student/profile": "My Profile",
  };

  return (

    <div className="min-h-screen bg-[#F3F4F6]">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          transform
          transition-transform
          duration-300
          ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4 z-50">

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <StudentSidebar
          closeSidebar={() => setSidebarOpen(false)}
        />

      </div>

      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen flex flex-col">

        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#082B3A] text-2xl"
          >
            <FaBars />
          </button>

          <h2 className="font-bold text-[#082B3A]">
            Student Portal
          </h2>

          <div />

        </div>

        {/* Navbar */}
        <StudentNavbar
          title={titles[location.pathname] || "Overview Dashboard"}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default StudentLayout;
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherNavbar from "../components/TeacherNavbar";

const TeacherLayout = () => {

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titles = {
    "/teacher": "Teacher Dashboard",
    "/teacher/attendance": "Attendance Management",
    "/teacher/assignments": "Manage Assignments & Grading",
    "/teacher/notices": "Post Notice / Announcement",
    "/teacher/students": "Student Management",
    "/teacher/results": "Results & Performance",
    "/teacher/profile": "Teacher Profile",
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
          h-screen
          z-50
          transform
          transition-transform
          duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <TeacherSidebar />

      </div>

      {/* Main Content */}

      <div className="lg:ml-80 flex flex-col min-h-screen">

        {/* Mobile Header */}

        <div className="lg:hidden bg-white border-b px-4 py-3 sticky top-0 z-30">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#082B3A] text-2xl"
          >
            <FaBars />
          </button>

        </div>

        {/* Fixed Navbar */}

        <div className="sticky top-0 z-20 bg-white shadow-sm">

          <TeacherNavbar
            title={
              titles[location.pathname] ||
              "Teacher Dashboard"
            }
          />

        </div>

        {/* Scrollable Page */}

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default TeacherLayout;
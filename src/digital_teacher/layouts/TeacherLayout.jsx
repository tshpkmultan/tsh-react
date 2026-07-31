import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherNavbar from "../components/TeacherNavbar";

const TeacherLayout = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titles = {
    "/digital-teacher": "Digital Trainer Dashboard",
    "/digital-teacher/students": "Student Management",
    "/digital-teacher/student-profile": "Student Profile",
    "/digital-teacher/attendance": "Attendance Management",
    "/digital-teacher/assignments": "Manage Assignments",
    "/digital-teacher/results": "Results & Performance",
    "/digital-teacher/schedule": "Schedule Management",
    "/digital-teacher/courses": "My Courses",
    "/digital-teacher/fee-status": "Fee Status",
    "/digital-teacher/notices": "Notices",
    "/digital-teacher/profile": "My Profile",
  };

  const getTitle = () => {
    if (
      location.pathname.startsWith(
        "/digital-teacher/student-profile"
      )
    ) {
      return "Student Profile";
    }

    return (
      titles[location.pathname] ||
      "Digital Trainer Dashboard"
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex">

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
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        <TeacherSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main Content */}

      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">

        {/* Mobile Header */}

        <div className="lg:hidden sticky top-0 z-30 bg-white border-b shadow-sm px-4 py-3 flex items-center">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-[#082B3A]"
          >
            <FaBars />
          </button>

        </div>

        {/* Navbar */}

        <div className="sticky top-0 z-20 bg-white shadow-sm">

          <TeacherNavbar title={getTitle()} />

        </div>

        {/* Page */}

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default TeacherLayout;
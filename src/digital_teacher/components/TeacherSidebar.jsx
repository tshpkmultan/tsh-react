import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import {
  FaHome,
  FaClipboardCheck,
  FaBullhorn,
  FaUserGraduate,
  FaUserCircle,
} from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import logo from "../../assets/logo.png";

const TeacherSidebar = ({ setSidebarOpen }) => {

  const trainer = useMemo(() => {
    return JSON.parse(localStorage.getItem("trainer"));
  }, []);

  const initials = trainer?.name
    ? trainer.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "DT";

  const closeSidebar = () => {
    if (window.innerWidth < 1024 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-10 py-4 transition-all duration-300 ${
      isActive
        ? "bg-yellow-400 text-[#072B3A] font-bold border-r-4 border-white"
        : "text-white hover:bg-[#0F4258]"
    }`;

  return (
    <aside className="w-72 md:w-80 h-screen bg-[#072B3A] text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="border-b border-[#1f4656] p-5">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="TSH Logo"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400 bg-white shadow-lg"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Digital Trainer Portal
            </h2>

            <p className="text-yellow-400 text-sm mt-1">
              Taleem • Sehat • Hunar
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto py-6">

        <NavLink
          to="/digital-teacher"
          end
          className={menuClass}
          onClick={closeSidebar}
        >
          <FaHome size={22} />
          <span className="text-xl">Dashboard</span>
        </NavLink>

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">
          Class Management
        </div>

        <NavLink
          to="/digital-teacher/students"
          className={menuClass}
          onClick={closeSidebar}
        >
          <FaUserGraduate size={22} />
          <span className="text-xl">Students</span>
        </NavLink>

        <NavLink
          to="/digital-teacher/attendance"
          className={menuClass}
          onClick={closeSidebar}
        >
          <FaClipboardCheck size={22} />
          <span className="text-xl">Attendance</span>
        </NavLink>

        <NavLink
          to="/digital-teacher/assignments"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center justify-between px-10 py-4 transition-all duration-300 ${
              isActive
                ? "bg-yellow-400 text-[#072B3A] font-bold border-r-4 border-white"
                : "text-white hover:bg-[#0F4258]"
            }`
          }
        >
          <div className="flex items-center gap-4">
            <MdAssignment size={24} />
            <span className="text-xl">Assignments</span>
          </div>

          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
            12
          </span>
        </NavLink>

        <NavLink
          to="/digital-teacher/results"
          className={menuClass}
          onClick={closeSidebar}
        >
          <MdAssignment size={22} />
          <span className="text-xl">Results</span>
        </NavLink>

        <NavLink
          to="/digital-teacher/schedule"
          className={menuClass}
          onClick={closeSidebar}
        >
          <MdAssignment size={22} />
          <span className="text-xl">Schedule</span>
        </NavLink>

        <NavLink
          to="/digital-teacher/courses"
          className={menuClass}
          onClick={closeSidebar}
        >
          <MdAssignment size={22} />
          <span className="text-xl">Courses</span>
        </NavLink>

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">
          Communication
        </div>

        <NavLink
          to="/digital-teacher/notices"
          className={menuClass}
          onClick={closeSidebar}
        >
          <FaBullhorn size={20} />
          <span className="text-xl">Send Notice</span>
        </NavLink>

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">
          Account
        </div>

        <NavLink
          to="/digital-teacher/profile"
          className={menuClass}
          onClick={closeSidebar}
        >
          <FaUserCircle size={22} />
          <span className="text-xl">My Profile</span>
        </NavLink>

      </div>

      {/* Profile */}

      <NavLink
        to="/digital-teacher/profile"
        onClick={closeSidebar}
        className="border-t border-[#1f4656] p-5 hover:bg-[#0F4258] transition-all duration-300"
      >

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-400 text-[#072B3A] flex items-center justify-center text-xl font-bold shadow-lg">
            {initials}
          </div>

          <div>

            <h3 className="font-bold text-lg">
              {trainer?.name || "Digital Trainer"}
            </h3>

            <p className="text-gray-300 text-sm">
              {trainer?.email || "trainer@email.com"}
            </p>

          </div>

        </div>

      </NavLink>

    </aside>
  );
};

export default TeacherSidebar;
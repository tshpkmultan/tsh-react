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
const TeacherSidebar = () => {

  const teacher = useMemo(() => {
    return JSON.parse(localStorage.getItem("teacher"));
  }, []);

  const initials = teacher?.name
    ? teacher.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "T";

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-10 py-4 transition-all duration-300 ${
      isActive
        ? "bg-yellow-400 text-[#072B3A] font-bold border-r-4 border-white"
        : "text-white hover:bg-[#0F4258]"
    }`;

  return (
    <aside className="w-72 md:w-80 bg-[#072B3A] text-white min-h-screen flex flex-col shadow-2xl">

      {/* ============================
          Logo
      ============================ */}
<div className="border-b border-[#1f4656] p-5">

  <div className="flex items-center gap-4">

    {/* Logo */}

    <div className="flex-shrink-0">

      <img
        src={logo}
        alt="TSH Logo"
        className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400 bg-white shadow-lg"
      />

    </div>

    {/* Text */}

    <div className="flex flex-col">

      <h2 className="text-2xl font-bold text-white leading-none">

        Teacher Portal

      </h2>

      <p className="text-yellow-400 text-sm mt-1 font-medium">

        Taleem • Sehat • Hunar

      </p>

      

    </div>

  </div>

</div>

      {/* ============================
          Menu
      ============================ */}

      <div className="flex-1 py-6 overflow-y-auto">

        <NavLink
          to="/teacher"
          end
          className={menuClass}
        >
          <FaHome size={22} />
          <span className="text-xl">
            Dashboard
          </span>
        </NavLink>

        {/* Class Management */}

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">

          Class Management

        </div>

        <NavLink
          to="/teacher/attendance"
          className={menuClass}
        >
          <FaClipboardCheck size={22} />

          <span className="text-xl">

            Attendance

          </span>

        </NavLink>

        <NavLink
          to="/teacher/assignments"
          className={({ isActive }) =>
            `flex items-center justify-between px-10 py-4 transition-all duration-300 ${
              isActive
                ? "bg-yellow-400 text-[#072B3A] font-bold border-r-4 border-white"
                : "hover:bg-[#0F4258]"
            }`
          }
        >

          <div className="flex items-center gap-4">

            <MdAssignment size={24} />

            <span className="text-xl">

              Assignments

            </span>

          </div>

          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">

            12

          </span>

        </NavLink>

        {/* Communication */}

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">

          Communication

        </div>

        <NavLink
          to="/teacher/notices"
          className={menuClass}
        >

          <FaBullhorn size={20} />

          <span className="text-xl">

            Send Notice

          </span>

        </NavLink>

        {/* Account */}

        <div className="px-10 mt-8 mb-4 text-gray-400 uppercase tracking-wider text-sm font-semibold">

          Account

        </div>

        <NavLink
          to="/teacher/profile"
          className={menuClass}
        >

          <FaUserCircle size={22} />

          <span className="text-xl">

            My Profile

          </span>

        </NavLink>

      </div>

      {/* ============================
          Teacher Profile
      ============================ */}

      <NavLink
        to="/teacher/profile"
        className="border-t border-[#1f4656] p-5 hover:bg-[#0F4258] transition-all duration-300"
      >

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-400 text-[#072B3A] flex items-center justify-center text-xl font-bold shadow-lg">

            {initials}

          </div>

          <div>

            <h3 className="font-bold text-lg">

              {teacher?.name || "Teacher"}

            </h3>

            <p className="text-gray-300 text-sm">

              {teacher?.role_type || "Teacher"}

            </p>

          </div>

        </div>

      </NavLink>

    </aside>
  );

};

export default TeacherSidebar;
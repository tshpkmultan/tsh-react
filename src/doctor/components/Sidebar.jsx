import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Clock3,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import Logo from "../../assets/logo.png";

/* =========================================
   SIDEBAR
========================================= */

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  /* =========================================
     GET DOCTOR
  ========================================= */

  const doctorData = JSON.parse(
    localStorage.getItem("doctorData")
  );

  const doctorName =
    doctorData?.name ||
    "Doctor";

  const doctorRole =
    doctorData?.role_type ||
    "Doctor";

  /* =========================================
     INITIALS
  ========================================= */

  const initials = doctorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  /* =========================================
     ACTIVE MENU
  ========================================= */

  const menuClass = ({ isActive }) =>
    `group
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-[#FACC15] to-[#FB923C] text-[#032B38] shadow-lg shadow-yellow-500/30"
        : "text-white hover:bg-white/10 hover:translate-x-2"
    }`;

  return (
    <>
      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-all duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`

        fixed
        top-0
        left-0

        h-screen
        w-[280px]

        bg-gradient-to-b
        from-[#021B2B]
        via-[#063B52]
        to-[#021B2B]

        border-r
        border-cyan-500/20

        shadow-[0_20px_60px_rgba(0,0,0,.40)]

        flex
        flex-col

        overflow-hidden

        text-white

        z-50

        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0

      `}
      >

        {/* ================= HEADER ================= */}

        <div className="shrink-0 px-5 py-4 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl overflow-hidden">

              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />

            </div>

            <div>

              <h2 className="text-xl font-black">

                TSH Care

              </h2>

              <p className="text-xs tracking-wider text-yellow-400 font-semibold">

                Doctor Portal

              </p>

            </div>

          </div>

        </div>

        {/* ================= MENU ================= */}

        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2 custom-scrollbar">

          <NavLink
            to="/doctor/dashboard"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >

            <div className="group-hover:scale-110 transition-transform duration-300">

              <LayoutDashboard size={20} />

            </div>

            <span className="text-[16px]">

              Dashboard

            </span>

          </NavLink>

          <NavLink
            to="/doctor/appointments"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >

            <div className="group-hover:scale-110 transition-transform duration-300">

              <CalendarDays size={20} />

            </div>

            <span className="text-[16px]">

              Appointments

            </span>

          </NavLink>

          <NavLink
            to="/doctor/prescriptions"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >

            <div className="group-hover:scale-110 transition-transform duration-300">

              <FileText size={20} />

            </div>

            <span className="text-[16px]">

              Prescriptions

            </span>

          </NavLink>

          <NavLink
            to="/doctor/schedule"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >

            <div className="group-hover:scale-110 transition-transform duration-300">

              <Clock3 size={20} />

            </div>

            <span className="text-[16px]">

              My Schedule

            </span>

          </NavLink>

          <NavLink
            to="/doctor/profile"
            className={menuClass}
            onClick={() => setSidebarOpen(false)}
          >

            <div className="group-hover:scale-110 transition-transform duration-300">

              <User size={20} />

            </div>

            <span className="text-[16px]">

              Profile

            </span>

          </NavLink>

          <div className="border-t border-white/10 my-6"></div>


</div>

        {/* ================= DOCTOR PROFILE ================= */}

        <div className="shrink-0 border-t border-white/10 bg-white/5 backdrop-blur-xl">

          <div className="p-5">

            <div className="flex items-center gap-4">

              {/* Avatar */}

              <div className="relative">

                <div
                  className="
                  w-14
                  h-14
                  rounded-full
                  bg-gradient-to-r
                  from-yellow-400
                  to-orange-500
                  text-[#032B38]
                  flex
                  items-center
                  justify-center
                  font-black
                  text-lg
                  shadow-lg
                  ring-4
                  ring-yellow-400/20
                "
                >

                  {initials}

                </div>

                {/* Online Status */}

                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#063B52]"></span>

              </div>

              {/* Doctor Info */}

              <div className="flex-1">

                <h3 className="font-bold text-lg truncate">

                  {doctorName}

                </h3>

                <p className="text-cyan-200 text-sm capitalize">

                  {doctorRole.replace("_", " ")}

                </p>

              </div>

            </div>

            {/* Status */}

            <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#0B4B66] to-[#0F607A] p-4">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-xs text-cyan-100">

                    Status

                  </p>

                  <h3 className="font-bold mt-1">

                    Available

                  </h3>

                </div>

                <div className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">

                  Online

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t border-white/10 px-5 py-4">

            <h3 className="text-center text-xs text-gray-400">

              TSH Hospital Management System

            </h3>

            <p className="text-center text-[11px] text-cyan-300 mt-1">

              Version 1.0 • © 2026

            </p>

          </div>

        </div>

      </aside>

    </>

  );

};

export default Sidebar;
          
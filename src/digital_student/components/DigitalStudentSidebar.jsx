import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaHome,
  FaBookOpen,
  FaCalendarAlt,
  FaEdit,
  FaBell,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import logo from "../../assets/logo.png";

const DigitalStudentSidebar = ({ closeSidebar }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [student, setStudent] = useState({});

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/category", { replace: true });
        return;
      }

      if (user.category !== "digital") {
        localStorage.removeItem("user");
        navigate("/category", { replace: true });
        return;
      }

      const res = await axios.get(
        `https://800junkuae.online/tsh-api/API/digital_student/dashboard/index.php?user_id=${user.user_id}`
      );

      if (res.data.success) {
        setStudent(res.data.student);
      } else {
        localStorage.removeItem("user");
        navigate("/category", { replace: true });
      }

    } catch (err) {

      console.error(err);

      localStorage.removeItem("user");
      navigate("/category", { replace: true });

    }
  };

  const initials = student.full_name
    ? student.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "DS";

  const navClass = ({ isActive }) =>
    `group flex items-center gap-4 mx-4 my-1 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#062B3A] shadow-xl"
        : "text-white hover:bg-[#18485A] hover:text-yellow-300"
    }`;

  return (

    <aside className="w-72 md:w-80 h-screen bg-[#062B3A] text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="border-b border-[#1D4353] px-5 py-5">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="TSH Logo"
            className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-yellow-400 shadow-xl"
          />

          <div>

            <h2 className="text-2xl font-bold text-yellow-400">
              Digital Student
            </h2>

            <p className="text-xs text-gray-300">
              Taleem • Sehat • Hunar
            </p>

            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-400 text-[#062B3A] text-xs font-bold">
              DIGITAL
            </span>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto py-5">

        <NavLink to="/digital-student" end className={navClass}>
          <FaHome size={20} />
          Dashboard
        </NavLink>

        <div className="px-8 mt-6 mb-3 text-xs uppercase tracking-wider text-gray-400 font-semibold">
          Academics
        </div>

        <NavLink to="/digital-student/courses" className={navClass}>
          <FaBookOpen size={20} />
          My Course
        </NavLink>

        <NavLink to="/digital-student/schedule" className={navClass}>
          <FaCalendarAlt size={20} />
          Schedule
        </NavLink>

        <NavLink
          to="/digital-student/assignments"
          className={({ isActive }) =>
            `flex items-center justify-between mx-4 my-1 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#062B3A] shadow-xl"
                : "text-white hover:bg-[#18485A] hover:text-yellow-300"
            }`
          }
        >

          <div className="flex items-center gap-4">

            <FaEdit size={20} />

            Assignments

          </div>

          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              location.pathname === "/digital-student/assignments"
                ? "bg-[#062B3A] text-yellow-400"
                : "bg-red-500 text-white"
            }`}
          >
            0
          </span>

        </NavLink>

        <div className="px-8 mt-6 mb-3 text-xs uppercase tracking-wider text-gray-400 font-semibold">
          Communication
        </div>

        <NavLink to="/digital-student/notices" className={navClass}>
          <FaBell size={20} />
          Notices
        </NavLink>

        <NavLink to="/digital-student/fee-status" className={navClass}>
          <FaFileInvoiceDollar size={20} />
          Fee Status
        </NavLink>

      </div>

      {/* Footer */}

      <NavLink
        to="/digital-student/profile"
        className="border-t border-[#1D4353] bg-[#0D3949] p-5 hover:bg-[#18485A] transition duration-300"
      >

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-400 text-[#062B3A] flex items-center justify-center text-lg font-bold">
            {initials}
          </div>

          <div className="overflow-hidden">

            <h3 className="font-bold truncate">
              {student.full_name || "Student"}
            </h3>

            <p className="text-sm text-gray-300 truncate">
              {student.course_name || "No Course"}
            </p>

            <p className="text-xs text-yellow-400 truncate">
              {student.teacher_name || ""}
            </p>

          </div>

        </div>

      </NavLink>

    </aside>

  );
};

export default DigitalStudentSidebar;
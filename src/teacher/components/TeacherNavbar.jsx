import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeacherNavbar = ({ title }) => {
  const navigate = useNavigate();

  const teacher = JSON.parse(
    localStorage.getItem("teacher")
  );

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher/login");
  };

  const initials = teacher?.name
    ? teacher.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "T";

  return (
    <div className="bg-white border border-gray-200 rounded-t-2xl px-4 md:px-8 lg:px-12 py-4 md:py-6 flex items-center justify-between">

      {/* Page Title */}
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#082B3A]">
        {title}
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4 md:gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="text-2xl text-gray-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* Teacher Info */}
        <div className="hidden md:flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>
            <h4 className="font-semibold text-[#082B3A]">
              {teacher?.name || "Teacher"}
            </h4>

            <p className="text-xs text-gray-500">
              {teacher?.role_type === "islamic_teacher"
                ? "Islamic Teacher"
                : teacher?.role_type === "digital_teacher"
                ? "Digital Teacher"
                : teacher?.role_type}
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default TeacherNavbar;
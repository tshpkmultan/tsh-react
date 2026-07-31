import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TeacherNavbar = ({ title }) => {

  const navigate = useNavigate();

  // Get logged-in trainer
  const trainer = JSON.parse(
    localStorage.getItem("trainer")
  );

  const handleLogout = () => {

    localStorage.removeItem("trainer");

    navigate("/digital-teacher/login", {
      replace: true,
    });

  };

  const initials = trainer?.name
    ? trainer.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "DT";

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

        {/* Trainer Info */}
        <div className="hidden md:flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-yellow-400 text-[#082B3A] flex items-center justify-center font-bold text-lg">

            {initials}

          </div>

          <div>

            <h4 className="font-semibold text-[#082B3A]">
              {trainer?.name || "Digital Trainer"}
            </h4>

            <p className="text-xs text-gray-500">
              Digital Trainer
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

};

export default TeacherNavbar;
import { useNavigate } from "react-router-dom";

export default function Header({ setSidebarOpen }) {

  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  /* ======================================
     ROLE TITLE
  ====================================== */

  let adminTitle = "Admin";

  if (role === "super_admin") {
    adminTitle = "Super Admin";
  }

  else if (role === "islamic_admin") {
    adminTitle = "Madrasa Admin";
  }

  else if (role === "digital_admin") {
    adminTitle = "Digital Admin";
  }

  else if (role === "hospital_admin") {
    adminTitle = "Hospital Admin";
  }

  /* ======================================
     LOGOUT
  ====================================== */

  const handleLogout = () => {

    localStorage.removeItem("admin");

    navigate("/admin");

  };

  return (

    <div className="h-[80px] md:h-[90px] bg-white border-b flex items-center justify-between px-3 md:px-8">

      {/* LEFT */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">

        {/* MOBILE MENU */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-3xl"
        >
          ☰
        </button>

        {/* TITLE */}
        <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-black text-[#032B38] leading-tight truncate">
          Platform Management System
        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* NOTIFICATION */}
        <div className="relative">

          <span className="text-2xl md:text-3xl">
            🔔
          </span>

          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center">
            3
          </div>

        </div>

        {/* ADMIN PROFILE */}
        <div className="relative group">

          <div className="flex items-center gap-3 cursor-pointer">

            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#032B38] text-[#F1E67A] flex items-center justify-center font-black text-lg md:text-xl">
              AD
            </div>

            <div className="hidden md:block">

              <h2 className="text-lg md:text-2xl font-bold text-[#032B38]">
                {adminTitle}
              </h2>

            </div>

          </div>

          {/* DROPDOWN */}
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

            <button
              onClick={handleLogout}
              className="w-full text-left px-5 py-4 hover:bg-red-50 rounded-2xl text-red-600 font-bold"
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
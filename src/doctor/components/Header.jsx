import { Bell } from "lucide-react";

const Header = () => {

  return (

    <header className="hidden lg:flex bg-white px-8 py-6 items-center justify-between border-b border-gray-200 shadow-sm">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-black text-[#082C3B]">

          Overview Dashboard

        </h1>

        <p className="text-gray-500 mt-1">

          Welcome back, Doctor 👋

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <button className="relative hover:scale-110 transition">

          <Bell
            className="text-[#082C3B]"
            size={28}
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

            1

          </span>

        </button>

        {/* Logout */}

        <button
          onClick={() => {

            localStorage.removeItem("doctorAuth");
            localStorage.removeItem("doctorData");
            localStorage.removeItem("user");

            window.location.href = "/doctor-login";

          }}
          className="bg-gray-100 hover:bg-gray-200 transition-all px-6 py-3 rounded-2xl font-bold text-[#082C3B] text-lg"
        >

          Logout

        </button>

      </div>

    </header>

  );

};

export default Header;
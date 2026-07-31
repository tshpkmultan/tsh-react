import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaCog,
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";

export default function DashboardHeader() {
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-black text-[#032B38]">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

      </div>

      {/* Center */}

      <div className="relative w-full lg:w-96">

        <FaSearch className="absolute left-4 top-4 text-slate-400" />

        <input
          placeholder="Search..."
          className="w-full bg-slate-100 rounded-xl pl-12 pr-4 py-3 outline-none"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <div className="text-right hidden md:block">

          <h2 className="font-bold text-[#032B38]">
            {time.toLocaleTimeString()}
          </h2>

          <p className="text-slate-500 text-sm">
            Live Time
          </p>

        </div>

        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="relative w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

          <FaBell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>

        </button>

        <button className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
          <FaCog />
        </button>

        <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2">

          <FaUserCircle
            size={40}
            className="text-[#032B38]"
          />

          <div>

            <h3 className="font-bold text-[#032B38]">
              Admin
            </h3>

            <p className="text-sm text-slate-500">
              Super Administrator
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
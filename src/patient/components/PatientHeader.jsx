import { useEffect, useState } from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

export default function PatientHeader({
  setSidebarOpen
}) {
  /*
  =========================================
  NAVIGATION
  =========================================
  */

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /*
  =========================================
  STATES
  =========================================
  */

  const [pageTitle,
    setPageTitle] =
    useState("Overview Dashboard");

  /*
  =========================================
  PAGE TITLES
  =========================================
  */

  useEffect(() => {

    if (

      location.pathname ===
      "/patient/dashboard"

    ) {

      setPageTitle(
        "Overview Dashboard"
      );
    }

    else if (

      location.pathname ===
      "/patient/appointments"

    ) {

      setPageTitle(
        "My Appointments"
      );
    }

    else if (

      location.pathname ===
      "/patient/prescriptions"

    ) {

      setPageTitle(
        "My Prescriptions"
      );
    }

    else if (

      location.pathname ===
      "/patient/book-doctor"

    ) {

      setPageTitle(
        "Book Doctor"
      );
    }

    else if (

      location.pathname ===
      "/patient/medical-records"

    ) {

      setPageTitle(
        "Medical Records"
      );
    }

    else {

      setPageTitle(
        "Patient Dashboard"
      );
    }

  }, [location.pathname]);

  /*
  =========================================
  LOGOUT
  =========================================
  */

  const handleLogout = () => {

    /*
    =========================================
    CLEAR STORAGE
    =========================================
    */

    localStorage.removeItem(
      "patientAuth"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "category"
    );

    /*
    =========================================
    REDIRECT LOGIN
    =========================================
    */

    navigate("/login");
  };

  return (

  <header className="bg-white h-[80px] lg:h-[100px] border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm">

    {/* LEFT */}

    <div className="flex items-center gap-4">

      {/* Mobile Menu */}

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-3xl text-[#032B38]"
      >

        ☰

      </button>

      <div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#032B38]">

          {pageTitle}

        </h1>

      </div>

    </div>

    {/* RIGHT */}

    <div className="flex items-center gap-3 md:gap-5">

      {/* Notification */}

      <button className="text-2xl md:text-3xl hover:scale-110 transition">

        🔔

      </button>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="bg-[#032B38] text-white px-4 md:px-7 py-2 md:py-4 rounded-2xl font-black hover:bg-[#05445E] transition"
      >

        Logout

      </button>

    </div>

  </header>

);
}
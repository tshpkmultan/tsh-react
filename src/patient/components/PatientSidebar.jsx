import { Link,
useLocation,
useNavigate } from "react-router-dom";

import { useEffect,
useState } from "react";
import Logo from "../../assets/logo.png";
export default function PatientSidebar({
    sidebarOpen,
    setSidebarOpen
}) {

  /*
  =========================================
  LOCATION
  =========================================
  */

  const location =
    useLocation();

  const navigate =
    useNavigate();

  /*
  =========================================
  STATES
  =========================================
  */

  const [patient,
    setPatient] =
    useState(null);

  /*
  =========================================
  USER
  =========================================
  */

  /* =========================================
   USER
========================================= */

const auth = JSON.parse(
  localStorage.getItem("user")
);

console.log("SIDEBAR USER:", auth);

const patientId =
  auth?.user_id || auth?.id;

  /*
  =========================================
  MENUS
  =========================================
  */

  const menus = [

    {
        name: "Dashboard",
        icon: "🏠",
        path: "/patient/dashboard",
    },

    {
        name: "My Appointments",
        icon: "📅",
        path: "/patient/appointments",
    },

  
    {
        name: "Docot Appointments",
        icon: "🔄",
        path: "/patient/book-followup",
    },

    {
        name: "Prescriptions",
        icon: "📄",
        path: "/patient/prescriptions",
    },

    {
        name: "Medical Records",
        icon: "📂",
        path: "/patient/medical-records",
    },

];

  /*
  =========================================
  FETCH PATIENT
  =========================================
  */

  useEffect(() => {

    if (!patientId) return;

    fetchPatient();

  }, [patientId]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchPatient =
    async () => {

      try {

        const res =
          await fetch(

            `https://800junkuae.online/tsh-api/API/patient/get_patient_profile.php?patient_id=${patientId}`

          );

        const data =
          await res.json();

        if (data.status === "success") {

          setPatient(data.patient);
        }

      }

      catch (error) {

        console.log(error);
      }
    };

  /*
  =========================================
  GET INITIALS
  =========================================
  */

  const getInitials =
    (name) => {

      if (!name) return "PT";

      return name

        .split(" ")

        .map((word) =>
          word[0]
        )

        .join("")

        .substring(0, 2)

        .toUpperCase();
    };

  return (
  <>
    {/* Overlay */}
    <div
      onClick={() => setSidebarOpen(false)}
      className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
        sidebarOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      }`}
    />

    {/* Sidebar */}
    <aside
      className={`fixed top-0 left-0 h-screen w-[300px]
      bg-gradient-to-b
      from-[#021B2B]
      via-[#063B52]
      to-[#021B2B]
      text-white
      border-r border-cyan-500/20
      shadow-2xl
      flex flex-col
      z-50
      transition-transform duration-300
      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }
      lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src={Logo}
              alt="Hospital Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          <div>
            <h2 className="text-2xl font-black">
              TSH Care
            </h2>

            <p className="text-yellow-400 font-semibold mt-1">
              Patient Portal
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">

        {menus.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-4 px-5 py-5 rounded-3xl font-bold text-lg transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-yellow-400 text-[#032B38] shadow-xl"
                : "hover:bg-white/10"
            }`}
          >

            <span className="text-2xl">
              {item.icon}
            </span>

            {item.name}

          </Link>

        ))}

        <button
          onClick={() => {

            navigate("/patient/book-followup");

            setSidebarOpen(false);

          }}
          className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-[#032B38] py-5 rounded-3xl font-black text-xl transition"
        >

          ➕ Book Doctor

        </button>

      </div>

      {/* Profile */}
      <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-yellow-400 text-[#032B38] font-black flex items-center justify-center text-xl">

          {getInitials(patient?.full_name)}

        </div>

        <div>

          <h3 className="font-black text-xl capitalize">

            {patient?.full_name || "Patient"}

          </h3>

          <p className="text-slate-300 text-sm">

            ID: PT-{patient?.id || "0000"}

          </p>

        </div>
      </div>

    </aside>

  </>

);

}
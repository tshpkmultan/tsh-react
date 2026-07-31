import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const location = useLocation();

  /* =========================================
     GET ADMIN DATA
  ========================================= */

  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const role = admin?.role;

  let menu = [];

  /* =========================================
     SUPER ADMIN
  ========================================= */

  if (role === "super_admin") {

    menu = [

      {
        title: "Dashboard",
        icon: "🏠",
        path: "/admin/dashboard",
      },

      // {
      //   title: "Patients",
      //   icon: "🩺",
      //   path: "/admin/patients",
      // },

      {
        title: "Doctors",
        icon: "👨‍⚕️",
        path: "/admin/doctors",
      },

      {
        title: "Appointments",
        icon: "📅",
        path: "/admin/appointments",
      },

      // {
      //   title: "Medical Reports",
      //   icon: "📄",
      //   path: "/admin/reports",
      // },
{
  title: "Enrollments",
  icon: "📝",
  path: "/admin/enrollments",
},
      {
        title: "Islamic Courses",
        icon: "📖",
        path: "/admin/islamic-courses",
      },

      {
        title: "Islamic Students",
        icon: "🧑‍🎓",
        path: "/admin/islamic-students",
      },

      {
        title: "Islamic Teachers",
        icon: "👳",
        path: "/admin/islamic-teachers",
      },

      {
        title: "Islamic Batches",
        icon: "🕌",
        path: "/admin/islamic-batches",
      },

      {
        title: "Digital Courses",
        icon: "💻",
        path: "/admin/digital-courses",
      },

      {
        title: "Digital Students",
        icon: "🎓",
        path: "/admin/digital-students",
      },

      {
        title: "Digital Trainers",
        icon: "👨‍💻",
        path: "/admin/digital-trainers",
      },

      {
        title: "Digital Batches",
        icon: "🖥️",
        path: "/admin/digital-batches",
      },

      {
        title: "Admins Management",
        icon: "🛡️",
        path: "/admin/admins",
      },
{
  title: "staff Management",
  icon: "🧑‍⚕️",
  path: "/admin/doctor-management",
},
      {
        title: "Users",
        icon: "👥",
        path: "/admin/users",
      },

      // {
      //   title: "Settings",
      //   icon: "⚙️",
      //   path: "/admin/settings",
      // },

      // {
      //   title: "Analytics",
      //   icon: "📊",
      //   path: "/admin/analytics",
      // },

    ];
  }

  /* =========================================
     ISLAMIC ADMIN
  ========================================= */

  else if (role === "islamic_admin") {

    menu = [

      {
        title: "Dashboard",
        icon: "🏠",
        path: "/admin/dashboard",
      },
{
  title: "Enrollments",
  icon: "📝",
  path: "/admin/enrollments",
},
      {
        title: "Islamic Courses",
        icon: "📖",
        path: "/admin/islamic-courses",
      },

      {
        title: "Islamic Students",
        icon: "🧑‍🎓",
        path: "/admin/islamic-students",
      },

      {
        title: "Islamic Teachers",
        icon: "👳",
        path: "/admin/islamic-teachers",
      },

      {
        title: "Islamic Batches",
        icon: "🕌",
        path: "/admin/islamic-batches",
      },

    ];
  }

  /* =========================================
     DIGITAL ADMIN
  ========================================= */

  else if (role === "digital_admin") {

    menu = [

      {
        title: "Dashboard",
        icon: "🏠",
        path: "/admin/dashboard",
      },

      {
        title: "Digital Courses",
        icon: "💻",
        path: "/admin/digital-courses",
      },

      {
        title: "Digital Students",
        icon: "🎓",
        path: "/admin/digital-students",
      },

      {
        title: "Digital Trainers",
        icon: "👨‍💻",
        path: "/admin/digital-trainers",
      },

      {
        title: "Digital Batches",
        icon: "🖥️",
        path: "/admin/digital-batches",
      },

    ];
  }

  /* =========================================
     HOSPITAL ADMIN
  ========================================= */

  else if (role === "hospital_admin") {

    menu = [

      {
        title: "Dashboard",
        icon: "🏠",
        path: "/admin/dashboard",
      },

      // {
      //   title: "Patients",
      //   icon: "🩺",
      //   path: "/admin/patients",
      // },

      {
        title: "Doctors",
        icon: "👨‍⚕️",
        path: "/admin/doctors",
      },

      {
        title: "Appointments",
        icon: "📅",
        path: "/admin/appointments",
      },

      // {
      //   title: "Medical Reports",
      //   icon: "📄",
      //   path: "/admin/reports",
      // },

    ];
  }

  return (

    <>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-50
          w-[320px] h-screen
          bg-[#032B38]
          text-white
          overflow-y-auto
          shadow-2xl
          transition-all duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >

        {/* HEADER */}
        <div className="p-8 border-b border-[#0D3C49] sticky top-0 bg-[#032B38] z-50">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-5 right-5 text-3xl"
          >
            ✕
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 object-contain rounded-full bg-white p-1"
            />

            <div>

              <h1 className="text-3xl font-black text-[#F1E67A]">
                Admin Panel
              </h1>

              <p className="text-slate-300 text-sm">
                Healthcare + LMS
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="p-5 space-y-3">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-5
                px-6 py-5
                rounded-2xl
                text-[22px]
                font-bold
                transition-all duration-300

                ${
                  location.pathname === item.path
                    ? "bg-[#F1E67A] text-[#032B38] shadow-lg"
                    : "hover:bg-[#0D3C49] text-white"
                }
              `}
            >

              <span className="text-3xl">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </Link>

          ))}

        </div>

      </div>

    </>
  );
}
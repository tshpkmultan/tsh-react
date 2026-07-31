// src/components/Header.jsx

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  UserCog,
  GraduationCap,
  Stethoscope,
  MonitorSmartphone,
} from "lucide-react";

import logo from "../assets/logo.png";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Header({ lang, setLang }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ["en", "ur", "ar"];

  const content = {
    en: {
      about: "About",
      skills: "Digital Skills",
      islamic: "Islamic Education",
      health: "Health Services",
      team: "Our Team",

      login: "Log In",
      signup: "Sign Up",
      logout: "Logout",
      welcome: "Welcome",

      staffLogin: "Staff Portal",

      admin: "Admin",
      teacher: "Teacher",
      digitalTeacher: "Digital Teacher",
      doctor: "Doctor",
    },

    ur: {
      about: "تعارف",
      skills: "ڈیجیٹل مہارتیں",
      islamic: "اسلامی تعلیم",
      health: "صحت کی خدمات",
      team: "ہماری ٹیم",

      login: "لاگ ان",
      signup: "سائن اپ",
      logout: "لاگ آؤٹ",
      welcome: "خوش آمدید",

      staffLogin: "اسٹاف پورٹل",

      admin: "ایڈمن",
      teacher: "ٹیچر",
      digitalTeacher: "ڈیجیٹل ٹیچر",
      doctor: "ڈاکٹر",
    },

    ar: {
      about: "حول",
      skills: "المهارات الرقمية",
      islamic: "التعليم الإسلامي",
      health: "الخدمات الصحية",
      team: "فريقنا",

      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
      welcome: "مرحبا",

      staffLogin: "بوابة الموظفين",

      admin: "المشرف",
      teacher: "المعلم",
      digitalTeacher: "المعلم الرقمي",
      doctor: "الطبيب",
    },
  };

  const t = content[lang];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (location.state?.section) {
      setTimeout(() => {
        const section = document.getElementById(location.state.section);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }
  }, [location]);
    const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", {
        state: {
          section: sectionId,
        },
      });
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/category");
  };

  const handleAuthClick = (type) => {
    localStorage.setItem("authType", type);

    navigate("/category");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#08434B] text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4">

        {/* Logo */}

        <div
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-14 md:h-20 object-contain"
          />
        </div>

        {/* ===========================
              Desktop Navigation
        ============================ */}

        <nav className="hidden lg:flex items-center gap-8 font-medium">

          <Link
            to="/about"
            className="hover:text-yellow-400 transition"
          >
            {t.about}
          </Link>

          <button
            onClick={() => scrollToSection("digital-skills")}
            className="hover:text-yellow-400 transition"
          >
            {t.skills}
          </button>

          <button
            onClick={() => scrollToSection("islamic-courses")}
            className="hover:text-yellow-400 transition"
          >
            {t.islamic}
          </button>

          <button
            onClick={() => scrollToSection("health-services")}
            className="hover:text-yellow-400 transition"
          >
            {t.health}
          </button>

          <button
            onClick={() => scrollToSection("team")}
            className="hover:text-yellow-400 transition"
          >
            {t.team}
          </button>

        </nav>

        {/* ===========================
              Right Side
        ============================ */}

        <div className="hidden lg:flex items-center gap-4">

          {/* Language Switcher */}

          {/* <div className="flex border border-white/30 rounded-full overflow-hidden">

            {languages.map((lng) => (

              <button
                key={lng}
                onClick={() => {
                  setLang(lng);
                  localStorage.setItem("lang", lng);
                  window.dispatchEvent(
                    new Event("languageChange")
                  );
                }}
                className={`px-3 py-1 text-sm transition ${
                  lang === lng
                    ? "bg-yellow-400 text-black font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                {lng.toUpperCase()}
              </button>

            ))}

          </div> */}
                    {/* ===========================
                User Section
          ============================ */}

          {user ? (
            <div className="flex items-center gap-3">

              <span className="text-sm">
                {t.welcome}, <strong>{user.name}</strong>
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm transition"
              >
                {t.logout}
              </button>

            </div>
          ) : (

            <div className="flex items-center gap-3">

              {/* Login */}

              <button
                onClick={() => handleAuthClick("login")}
                className="hover:text-yellow-400 font-medium transition"
              >
                {t.login}
              </button>

              {/* Register */}

              <button
                onClick={() => handleAuthClick("register")}
                className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                {t.signup}
              </button>

              {/* ===========================
                    Staff Portal
              ============================ */}

              <div className="relative">

                <button
                  onClick={() =>
                    setShowStaffMenu(!showStaffMenu)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 px-5 py-2 rounded-full shadow-lg transition"
                >

                  <ShieldCheck size={18} />

                  {t.staffLogin}

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      showStaffMenu ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {showStaffMenu && (

                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">

                    <div className="bg-[#08434B] text-white px-5 py-3 font-semibold">
                      {t.staffLogin}
                    </div>

                    {/* Admin */}

                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-100 transition"
                    >

                      <UserCog className="text-indigo-600" />

                      <div className="text-left">

                        <h4 className="font-semibold text-gray-800">
                          {t.admin}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Administrator Portal
                        </p>

                      </div>

                    </button>

                    {/* Islamic Teacher */}

                    <button
                      onClick={() => navigate("/teacher")}
                      className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-100 transition"
                    >

                      <GraduationCap className="text-green-600" />

                      <div className="text-left">

                        <h4 className="font-semibold text-gray-800">
                          {t.teacher}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Islamic Teacher Portal
                        </p>

                      </div>

                    </button>

                    {/* Digital Teacher */}

                    <button
                      onClick={() =>
                        navigate("/digital-teacher")
                      }
                      className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-100 transition"
                    >

                      <MonitorSmartphone className="text-blue-600" />

                      <div className="text-left">

                        <h4 className="font-semibold text-gray-800">
                          {t.digitalTeacher}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Digital Teacher Portal
                        </p>

                      </div>

                    </button>

                    {/* Doctor */}

                    <button
                      onClick={() => navigate("/doctor")}
                      className="flex items-center gap-4 w-full px-5 py-4 hover:bg-gray-100 transition"
                    >

                      <Stethoscope className="text-red-600" />

                      <div className="text-left">

                        <h4 className="font-semibold text-gray-800">
                          {t.doctor}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Doctor Portal
                        </p>

                      </div>

                    </button>

                  </div>

                )}

              </div>

            </div>

          )}

        </div>
                {/* ===========================
              Mobile Menu Button
        ============================ */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="lg:hidden"
        >
          {mobileMenuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>

      {/* ===========================
            Mobile Menu
      ============================ */}

      {mobileMenuOpen && (

        <div className="lg:hidden bg-[#08434B] border-t border-white/10">

          <div className="px-6 py-5 space-y-5">

            {/* About */}

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-yellow-400 transition"
            >
              {t.about}
            </Link>

            {/* Digital Skills */}

            <button
              onClick={() => scrollToSection("digital-skills")}
              className="block w-full text-left hover:text-yellow-400 transition"
            >
              {t.skills}
            </button>

            {/* Islamic Education */}

            <button
              onClick={() => scrollToSection("islamic-courses")}
              className="block w-full text-left hover:text-yellow-400 transition"
            >
              {t.islamic}
            </button>

            {/* Health */}

            <button
              onClick={() => scrollToSection("health-services")}
              className="block w-full text-left hover:text-yellow-400 transition"
            >
              {t.health}
            </button>

            {/* Team */}

            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left hover:text-yellow-400 transition"
            >
              {t.team}
            </button>

            <hr className="border-white/20" />

            {/* ===========================
                  Language
            ============================ */}

            {/* <div className="flex gap-2">

              {languages.map((lng) => (

                <button
                  key={lng}
                  onClick={() => {
                    setLang(lng);
                    localStorage.setItem("lang", lng);
                    window.dispatchEvent(
                      new Event("languageChange")
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    lang === lng
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>

              ))}

            </div> */}

            <hr className="border-white/20" />

            {/* ===========================
                  User Section
            ============================ */}

            {user ? (

              <>
                <div className="font-semibold">
                  {t.welcome}, {user.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 rounded-lg py-2"
                >
                  {t.logout}
                </button>
              </>

            ) : (

              <>                {/* Login */}

                <button
                  onClick={() => {
                    handleAuthClick("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full border border-white rounded-lg py-2 hover:bg-white/10 transition"
                >
                  {t.login}
                </button>

                {/* Register */}

                <button
                  onClick={() => {
                    handleAuthClick("register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-yellow-400 text-black rounded-lg py-2 font-semibold hover:bg-yellow-300 transition"
                >
                  {t.signup}
                </button>

                <hr className="border-white/20" />

                {/* ===========================
                      Staff Portal
                ============================ */}

                <div className="font-semibold text-yellow-400">
                  {t.staffLogin}
                </div>

                {/* Admin */}

                <button
                  onClick={() => {
                    navigate("/admin");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 hover:text-yellow-400 transition"
                >
                  <UserCog size={20} />
                  <span>{t.admin}</span>
                </button>

                {/* Islamic Teacher */}

                <button
                  onClick={() => {
                    navigate("/teacher");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 hover:text-yellow-400 transition"
                >
                  <GraduationCap size={20} />
                  <span>{t.teacher}</span>
                </button>

                {/* Digital Teacher */}

                <button
                  onClick={() => {
                    navigate("/digital-teacher");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 hover:text-yellow-400 transition"
                >
                  <MonitorSmartphone size={20} />
                  <span>{t.digitalTeacher}</span>
                </button>

                {/* Doctor */}

                <button
                  onClick={() => {
                    navigate("/doctor");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 hover:text-yellow-400 transition"
                >
                  <Stethoscope size={20} />
                  <span>{t.doctor}</span>
                </button>

              </>
            )}

          </div>

        </div>

      )}

    </header>
  );
}

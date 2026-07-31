// pages/dashboard/IslamicDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function IslamicDashboard() {

  const navigate = useNavigate();

  const translations = {
    en: { title: "Islamic Dashboard", logout: "Logout" },
    ur: { title: "اسلامک ڈیش بورڈ", logout: "لاگ آؤٹ" },
    ar: { title: "لوحة التحكم الإسلامية", logout: "تسجيل الخروج" },
  };

  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          {t.title}
        </h2>

        <p className="text-green-600 text-lg mb-4">
          🕌 You are enrolled in Islamic Course
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          {t.logout}
        </button>

      </div>
    </div>
  );
}
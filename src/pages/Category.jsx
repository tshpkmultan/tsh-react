import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Category() {

  const navigate = useNavigate();

  // 🌍 Inline translations
  const translations = {
    en: {
      title: "Select Your Category",
      islamic: "Islamic Education",
      digital: "Digital Skills",
      health: "Health Department"
    },
    ur: {
      title: "اپنی کیٹیگری منتخب کریں",
      islamic: "اسلامی تعلیم",
      digital: "ڈیجیٹل مہارتیں",
      health: "صحت کا شعبہ"
    },
    ar: {
      title: "اختر الفئة الخاصة بك",
      islamic: "التعليم الإسلامي",
      digital: "المهارات الرقمية",
      health: "قسم الصحة"
    }
  };

  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  // 🔥 MAIN LOGIC
  const handleSelect = (category) => {
    localStorage.setItem("category", category);

    const authType = localStorage.getItem("authType");

    if (authType === "register") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F4C4C] flex flex-col items-center justify-center text-white px-4">

      {/* LOGO */}
      <img src={logo} className="w-24 mb-6" />

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
        {t.title}
      </h2>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">

        {/* Islamic */}
        <div
          onClick={() => handleSelect("islamic")}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl cursor-pointer hover:scale-105 transition text-center shadow-lg"
        >
          <div className="text-4xl mb-3">🕌</div>
          <p className="text-lg font-semibold">{t.islamic}</p>
        </div>

        {/* Digital */}
        <div
          onClick={() => handleSelect("digital")}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl cursor-pointer hover:scale-105 transition text-center shadow-lg"
        >
          <div className="text-4xl mb-3">💻</div>
          <p className="text-lg font-semibold">{t.digital}</p>
        </div>

        {/* Health */}
        <div
          onClick={() => handleSelect("health")}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl cursor-pointer hover:scale-105 transition text-center shadow-lg"
        >
          <div className="text-4xl mb-3">🏥</div>
          <p className="text-lg font-semibold">{t.health}</p>
        </div>

      </div>

    </div>
  );
}
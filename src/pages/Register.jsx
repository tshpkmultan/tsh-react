import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  // 🌍 Inline translations
  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Register to continue",
      name: "Full Name",
      username: "Username",
      password: "Password",
      button: "Sign Up",
      loginText: "Already have an account?",
      loginBtn: "Login",
      category: "Category",
    },
    ur: {
      title: "اکاؤنٹ بنائیں",
      subtitle: "جاری رکھنے کے لیے رجسٹر کریں",
      name: "پورا نام",
      username: "یوزر نیم",
      password: "پاس ورڈ",
      button: "رجسٹر کریں",
      loginText: "پہلے سے اکاؤنٹ ہے؟",
      loginBtn: "لاگ ان کریں",
      category: "کیٹیگری",
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "سجل للمتابعة",
      name: "الاسم الكامل",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      button: "تسجيل",
      loginText: "لديك حساب بالفعل؟",
      loginBtn: "تسجيل الدخول",
      category: "الفئة",
    },
  };

  const lang = localStorage.getItem("lang") || "en";
  const t = translations[lang];

  // 🔥 REQUIRED: Category must exist
  const category = localStorage.getItem("category");
  if (!category) {
    navigate("/category");
  }

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
      category: category,
    };

    try {
      const res = await fetch("https://800junkuae.online/tsh-api/API/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "success") {
        alert("Registered Successfully ✅");

        // go to login (category already selected)
        navigate("/login");
      } else {
        alert(result.message || "Error");
      }

    } catch (error) {
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F4C4C] flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {t.title}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {t.subtitle}
        </p>

        {/* CATEGORY */}
        <div className="mb-4 text-sm text-gray-600 text-center">
          {t.category}: <span className="font-semibold">{category}</span>
        </div>

        {/* INPUTS */}
        <input
          type="text"
          name="name"
          placeholder={t.name}
          required
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C4C]"
        />

        <input
          type="text"
          name="username"
          placeholder={t.username}
          required
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C4C]"
        />

        <input
          type="password"
          name="password"
          placeholder={t.password}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C4C]"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          {t.button}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4">
          {t.loginText}{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#0F4C4C] font-semibold cursor-pointer"
          >
            {t.loginBtn}
          </span>
        </p>

      </form>
    </div>
  );
}
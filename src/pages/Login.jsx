import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /* =========================================
     TRANSLATIONS
  ========================================= */

  const translations = {

    en: {
      title: "Welcome Back",
      subtitle: "Login to your account",
      username: "Username",
      password: "Password",
      button: "Login",
      loading: "Please wait...",
      registerText: "Don't have an account?",
      registerBtn: "Register",
      category: "Category",
    },

    ur: {
      title: "خوش آمدید",
      subtitle: "اپنے اکاؤنٹ میں لاگ ان کریں",
      username: "یوزر نیم",
      password: "پاس ورڈ",
      button: "لاگ ان کریں",
      loading: "براہ کرم انتظار کریں...",
      registerText: "اکاؤنٹ نہیں ہے؟",
      registerBtn: "رجسٹر کریں",
      category: "کیٹیگری",
    },

    ar: {
      title: "مرحباً بعودتك",
      subtitle: "قم بتسجيل الدخول",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      button: "دخول",
      loading: "يرجى الانتظار...",
      registerText: "ليس لديك حساب؟",
      registerBtn: "تسجيل",
      category: "الفئة",
    },

  };

  /* =========================================
     LANGUAGE
  ========================================= */

  const lang =
    localStorage.getItem("lang") || "en";

  const t = translations[lang];

  /* =========================================
     CATEGORY
  ========================================= */

  const category =
    localStorage.getItem("category");

  if (!category) {

    navigate("/category");
  }

  /* =========================================
     LOGIN SUBMIT
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const data = {

      username:
        e.target.username.value,

      password:
        e.target.password.value,

      category: category,

    };

    try {

      const res = await fetch(

        "https://800junkuae.online/tsh-api/API/login.php",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),

        }

      );

    const result = await res.json();

console.log(result);



      /* =========================================
         LOGIN SUCCESS
      ========================================= */

      if (result.status === "success") {

        /* SAVE USER */

        localStorage.setItem(
          "user_id",
          result.user_id
        );

        localStorage.setItem(
          "user",
          JSON.stringify(result)
        );

        /* =========================================
           PATIENT AUTH
        ========================================= */

        /* =========================================
   HEALTH
========================================= */

if (category === "health" || category === "patient") {

    if (!result.enrolled) {

        navigate("/enrollment-health");

    } else {

        switch (result.admission_status) {

            case "Approved":
                navigate("/patient/dashboard");
                break;

            case "Pending":
                navigate("/patient/pending-approval");
                break;

            case "Rejected":
                navigate("/patient/rejected");
                break;

            default:
                navigate("/enrollment-health");
        }

    }

    return;
}

        /* =========================================
           ISLAMIC
        ========================================= */

        else if (category === "islamic") {

  if (!result.enrolled) {

    navigate("/enrollment-islamic");

  } else {

    switch (result.admission_status) {

      case "Approved":
        navigate("/student");
        break;

      case "Pending":
        navigate("/student/pending-approval");
        break;

      case "Rejected":
        navigate("/student/rejected");
        break;

      default:
        navigate("/enrollment-islamic");
    }

  }

}
        /* =========================================
           DIGITAL
        ========================================= */

        else if (
          category === "digital"
        ) {

       if (!result.enrolled) {

    navigate("/enrollment-education");

} else {

    switch (result.admission_status) {

        case "Approved":
            navigate("/digital-student");
            break;

        case "Pending":
            navigate("/digital-student/pending-approval");
            break;

        case "Rejected":
            navigate("/digital-student/rejected");
            break;

        default:
            navigate("/enrollment-education");
    }

}
        }

        /* =========================================
           DEFAULT
        ========================================= */

        else {

          navigate("/dashboard");
        }

      }

      /* =========================================
         LOGIN FAILED
      ========================================= */

      else {

        alert(

          result.message ||

          "Invalid Login"

        );
      }

    }

    catch (error) {

      console.log(error);

      alert("Server Error");
    }

    finally {

      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen bg-[#0F4C4C] flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
      >

        {/* LOGO */}

<div className="flex justify-center mb-6">
  <img
    src={logo}
    alt="TSH Logo"
    className="w-24 h-24 object-contain"
  />
</div>

{/* TITLE */}

<h2 className="text-2xl font-bold text-center text-[#0F4C4C] font-bold mb-2">
  {t.title}
</h2>

        {/* SUBTITLE */}

        <p className="text-center text-gray-500 mb-6">

          {t.subtitle}

        </p>

        {/* CATEGORY */}

        <div className="mb-4 text-sm text-gray-600 text-center">

          {t.category}:

          <span className="font-semibold ml-1">

            {category}

          </span>

        </div>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder={t.username}
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C4C]"
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder={t.password}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C4C]"
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
        >

          {

            loading

              ? t.loading

              : t.button

          }

        </button>

        {/* REGISTER */}

        <p className="text-center text-sm mt-4">

          {t.registerText}{" "}

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-[#0F4C4C] font-semibold cursor-pointer"
          >

            {t.registerBtn}

          </span>

        </p>

      </form>

    </div>

  );

}
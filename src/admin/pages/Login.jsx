import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================================
     LOGIN
  ========================================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const form = new FormData();

      form.append("email", formData.email);
      form.append("password", formData.password);

      const res = await axios.post(
        "https://800junkuae.online/tsh-api/API/admin/login.php",
        form
      );

      if (res.data.status === "success") {

        // SAVE ADMIN
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );

        // REDIRECT
        navigate("/admin/dashboard");

      } else {

        alert(res.data.message);
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-[#032B38] flex items-center justify-center px-4">

      {/* LOGIN CARD */}
      <div className="w-full max-w-[500px] bg-white rounded-[35px] shadow-2xl p-8 md:p-12">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-10">

         <img
    src={logo}
    alt="Logo"
    className="w-24 h-24 object-contain rounded-full bg-white p-1"
  />

          <h1 className="text-3xl md:text-5xl font-black text-[#032B38] text-center">
            Admin Login
          </h1>

          <p className="text-slate-500 mt-4 text-center text-base md:text-lg">
            Healthcare + LMS Management System
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="mb-6">

            <label className="block mb-3 text-lg font-bold text-[#032B38]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-[#032B38] transition-all"
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="mb-8">

            <label className="block mb-3 text-lg font-bold text-[#032B38]">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full border-2 border-slate-200 p-5 rounded-2xl pr-16 outline-none focus:border-[#032B38] transition-all"
                required
              />

              {/* EYE ICON */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-slate-500 hover:text-[#032B38] transition-all"
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#032B38] hover:bg-[#021d26] text-white py-5 rounded-2xl font-black text-xl transition-all"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove error when user starts typing
    if (error) {
      setError("");
    }
  };

  /* =========================================
     LOGIN
  ========================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const form = new FormData();

      form.append("email", formData.email.trim());
      form.append("password", formData.password);

      const res = await axios.post(
        "https://800junkuae.online/tsh-api/API/admin/login.php",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.status === "success") {
        // Save admin information
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );

        // Redirect
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(
          res.data.message || "Invalid email or password."
        );

        // Clear password after failed login
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        console.log("SERVER RESPONSE:", error.response.data);

        setError(
          error.response.data?.message ||
            "Unable to login. Please try again."
        );
      } else if (error.request) {
        setError(
          "Server is not responding. Please check your internet connection."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#032B38] flex items-center justify-center px-4 py-8">

      {/* LOGIN CARD */}
      <div className="w-full max-w-[500px] bg-white rounded-[35px] shadow-2xl p-8 md:p-12">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-10">

          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 object-contain rounded-full bg-white p-1"
          />

          <h1 className="text-3xl md:text-5xl font-black text-[#032B38] text-center mt-5">
            Admin Login
          </h1>

          <p className="text-slate-500 mt-4 text-center text-base md:text-lg">
            Healthcare + LMS Management System
          </p>

        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

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
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              autoComplete="email"
              className="w-full border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-[#032B38] transition-all"
              required
              disabled={loading}
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
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full border-2 border-slate-200 p-5 rounded-2xl pr-16 outline-none focus:border-[#032B38] transition-all"
                required
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-slate-500 hover:text-[#032B38] transition-all"
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-5 rounded-2xl font-black text-xl transition-all ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-[#032B38] hover:bg-[#021d26]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

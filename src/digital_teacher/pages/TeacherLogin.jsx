import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import logo from "../../assets/logo.png";

const DigitalTrainerLogin = () => {
  const navigate = useNavigate();

  const API = "https://800junkuae.online/tsh-api/API";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/digital_trainer/login.php`,
        form
      );

      if (res.data.success) {
        localStorage.setItem(
          "trainer",
          JSON.stringify(res.data.trainer)
        );

        navigate("/digital-teacher/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#082B3A] via-[#0F4C63] to-[#1E3A8A] flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#082B3A] text-center px-8 py-10">

          <img
            src={logo}
            alt="TSH Logo"
            className="w-28 h-28 mx-auto object-contain"
          />

          <h1 className="text-3xl font-bold text-white mt-5">
            Digital Trainer
          </h1>

          <p className="text-yellow-400 mt-2 font-medium">
            Taleem • Sehat • Hunar
          </p>

          <p className="text-gray-300 mt-3 text-sm">
            Login to access your Trainer Dashboard
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={login}
          className="p-8 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-[#082B3A]">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                required
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full p-4 outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-[#082B3A]">

              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full p-4 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#082B3A] hover:bg-[#11465D] text-yellow-400 font-bold text-lg transition duration-300"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default DigitalTrainerLogin;
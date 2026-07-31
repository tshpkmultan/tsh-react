import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
const DoctorLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================================
     LOGIN
  ========================================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Fill all fields");

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(

        "https://800junkuae.online/tsh-api/API/auth/login.php",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            login_email: email,

            login_password: password,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.success) {

        /* SAVE LOGIN */

        localStorage.setItem(

          "doctorAuth",

          "true"
        );

        localStorage.setItem(

          "doctorData",

          JSON.stringify(data.user)
        );

        /* ROLE CHECK */

        if (
          data.user.role_type ===
          "doctor"
        ) {

          navigate(
            "/doctor/dashboard"
          );

        } else {

          alert(
            "This account is not doctor account"
          );
        }

      } else {

        alert(data.message);
      }

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Server Error");

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#082C3B] to-[#0B4D67] flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-[35px] p-8 md:p-10 shadow-2xl">

        {/* TITLE */}
        <div className="text-center mb-10">

  <div className="flex justify-center mb-6">

    <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#082C3B]">

      <img
        src={Logo}
        alt="TSH Hospital"
        className="w-16 h-16 object-contain"
      />

    </div>

  </div>

  <h1 className="text-4xl md:text-5xl font-black text-[#082C3B]">

    TSH Hospital

  </h1>

  <p className="text-[#0B4D67] text-xl font-semibold mt-2">

    Doctor Portal

  </p>

  <p className="text-gray-500 mt-3">

    Sign in using your credentials

  </p>

</div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="block font-semibold mb-2 text-[#082C3B]">

              Email Address

            </label>

            <input
              type="email"

              placeholder="Enter Email"

              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#082C3B]"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block font-semibold mb-2 text-[#082C3B]">

              Password

            </label>

            <input
              type="password"

              placeholder="Enter Password"

              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#082C3B]"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="w-full bg-[#082C3B] hover:bg-[#0E4257] text-white py-4 rounded-2xl font-bold text-lg transition-all"
          >

            {loading
              ? "Please Wait..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default DoctorLogin;
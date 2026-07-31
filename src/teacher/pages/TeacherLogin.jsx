import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

const TeacherLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login_email, setLoginEmail] = useState("");
  const [login_password, setLoginPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://800junkuae.online/tsh-api/API/auth/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_email,
            login_password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        // Allow only teachers
        if (data.user.role_type !== "islamic_teacher") {
          alert("Teacher account required");
          setLoading(false);
          return;
        }

        localStorage.setItem(
          "teacher",
          JSON.stringify(data.user)
        );

        navigate("/teacher");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-800 to-emerald-950 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">

         <div className="flex justify-center">

  <img
    src={logo}
    alt="TSH Logo"
    className="w-28 h-28 object-contain drop-shadow-lg"
  />

</div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Teacher Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">

            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={login_email}
              onChange={(e) =>
                setLoginEmail(e.target.value)
              }
              placeholder="teacher@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                required
                value={login_password}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
                placeholder="********"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default TeacherLogin;
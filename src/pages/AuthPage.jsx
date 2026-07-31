import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaLaptopCode, FaBookOpen, FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className =
      lang === "ur" || lang === "ar"
        ? "font-urdu direction-rtl"
        : "font-english";
  }, [lang]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2f2f] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-[#08434B] text-white text-center p-6">
          <img src={logo} className="h-12 mx-auto mb-2" />
          <h2 className="text-xl font-semibold">Select Category</h2>

          {/* Language */}
          <div className="mt-4 flex justify-center gap-2">
            {["en", "ur", "ar"].map((lng) => (
              <button
                key={lng}
                onClick={() => setLang(lng)}
                className={`px-3 py-1 text-xs rounded-full ${
                  lang === lng
                    ? "bg-yellow-400 text-black"
                    : "bg-white/10"
                }`}
              >
                {lng === "en" ? "EN" : lng === "ur" ? "اردو" : "عربي"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { name: "Digital Skills", icon: <FaLaptopCode /> },
            { name: "Islamic Education", icon: <FaBookOpen /> },
            { name: "Health Services", icon: <FaStethoscope /> },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                navigate("/register", {
                  state: { category: cat.name },
                })
              }
              className="flex items-center gap-4 border p-4 rounded-xl cursor-pointer hover:border-[#08434B]"
            >
              <div className="bg-[#08434B] text-yellow-400 p-3 rounded-full">
                {cat.icon}
              </div>
              <span className="font-semibold text-[#08434B]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
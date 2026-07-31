import { useEffect, useState, useRef } from "react";
import { FaGlobeAsia, FaChevronDown } from "react-icons/fa";

const GoogleTranslate = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Google Translate callback
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      setLoaded(true);
    };

    // Load script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const changeLanguage = (lang) => {
    let attempts = 0;

    const timer = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));

        clearInterval(timer);
        setOpen(false);
      }

      attempts++;

      if (attempts > 20) {
        clearInterval(timer);
        alert("Google Translate is still loading. Please try again.");
      }
    }, 300);
  };

  return (
    <>
      {/* Hidden Google Widget */}
      <div
        id="google_translate_element"
        style={{ display: "none" }}
      ></div>

      {/* Floating Button */}
      <div
  ref={dropdownRef}
  className="
    fixed
    top-1/2
    right-0
    -translate-y-1/2
    z-[99999]

    sm:right-0
    right-2

    sm:top-1/2
    top-[75%]
  "
>
        <div className="relative">

          {/* Button */}
         <button
  disabled={!loaded}
  onClick={() => setOpen(!open)}
  className={`
    group
    flex
    items-center
    gap-2
    sm:gap-3

    rounded-l-2xl
    shadow-2xl

    pl-3 sm:pl-5
    pr-3 sm:pr-5

    py-3 sm:py-3

    transition-all
    duration-300

    ${
      loaded
        ? "bg-[#082B3A] hover:bg-[#0E4156] text-white hover:scale-105"
        : "bg-gray-400 text-white cursor-not-allowed"
    }
  `}
>
  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
    <FaGlobeAsia className="text-white text-lg" />
  </div>

  {/* Hide text on small mobile */}
  <div className="hidden xs:block text-left">
    <p className="text-[10px] text-gray-300 uppercase tracking-wider">
      Website
    </p>

    <p className="font-semibold text-sm sm:text-base">
      Language
    </p>
  </div>

  <FaChevronDown
    className={`hidden sm:block transition duration-300 ${
      open ? "rotate-180" : ""
    }`}
  />
</button>

          {/* Dropdown */}
        {/* Dropdown */}
{open && (
  <div className="absolute right-0 mt-3 w-56 sm:w-72 bg-white rounded-l-3xl shadow-2xl border border-gray-200 overflow-hidden animate-fade">

    {/* Header */}
    <div className="px-5 py-4 bg-gradient-to-r from-[#082B3A] to-[#0E4156]">
      <h3 className="text-white font-bold text-base">
        🌐 Select Language
      </h3>

      <p className="text-gray-300 text-xs mt-1">
        Choose your preferred language
      </p>
    </div>

    {/* English */}
    <button
      onClick={() => changeLanguage("en")}
      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-blue-50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-3xl">🇬🇧</span>

        <div className="text-left">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
            English
          </h3>

          <p className="text-xs text-gray-500">
            Default Language
          </p>
        </div>
      </div>

      <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition">
        ✓
      </span>
    </button>

    <div className="mx-4 border-t"></div>

    {/* Urdu */}
    <button
      onClick={() => changeLanguage("ur")}
      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-green-50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-3xl">🇵🇰</span>

        <div className="text-left">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
            اردو
          </h3>

          <p className="text-xs text-gray-500">
            Urdu Language
          </p>
        </div>
      </div>

      <span className="text-green-500 opacity-0 group-hover:opacity-100 transition">
        ✓
      </span>
    </button>

    <div className="mx-4 border-t"></div>

    {/* Arabic */}
    <button
      onClick={() => changeLanguage("ar")}
      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-yellow-50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-3xl">🇸🇦</span>

        <div className="text-left">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
            العربية
          </h3>

          <p className="text-xs text-gray-500">
            Arabic Language
          </p>
        </div>
      </div>

      <span className="text-yellow-500 opacity-0 group-hover:opacity-100 transition">
        ✓
      </span>
    </button>

  </div>
)}
        </div>
      </div>
    </>
  );
};

export default GoogleTranslate;
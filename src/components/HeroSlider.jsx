import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Images
import slide1 from "../assets/slider1.png";
import slide2 from "../assets/slider2.png";
import slide3 from "../assets/slider3.png";
import slide4 from "../assets/slider4.png";
import slide5 from "../assets/slider5.png";

export default function HeroSlider({ lang }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // =========================================
  // AUTO SLIDER
  // =========================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // =========================================
  // SLIDES
  // =========================================

  const slides = [
    // =========================================
    // SLIDE 1 - ISLAMIC
    // =========================================

    {
      category: "islamic",

      ur: {
        title: "اسلامی تعلیم سب کے لیے",

        desc:
          "قرآن پاک، اسلامیات اور دینی تعلیم حاصل کریں۔ اپنے علم میں اضافہ کریں اور ایک بہتر اسلامی زندگی کی طرف قدم بڑھائیں۔",

        button: "ابھی داخلہ لیں",
      },

      en: {
        title: "Islamic Education for Everyone",

        desc:
          "Learn Quran, Islamic studies and essential Islamic knowledge. Improve your understanding and take a step towards a better spiritual life.",

        button: "Enroll Now",
      },

      ar: {
        title: "التعليم الإسلامي للجميع",

        desc:
          "تعلم القرآن والدراسات الإسلامية والمعرفة الدينية. طوّر فهمك وابدأ رحلة تعليمية وروحية أفضل.",

        button: "سجل الآن",
      },

      image: slide1,

      buttonLink: "/login",
    },

    // =========================================
    // SLIDE 2 - DIGITAL EDUCATION
    // =========================================

    {
      category: "digital",

      ur: {
        title: "بہتر مستقبل کی طرف",

        desc:
          "جدید ڈیجیٹل ہنر سیکھیں، اپنی صلاحیتوں کو بہتر بنائیں اور مستقبل میں آن لائن مواقع حاصل کرنے کے لیے خود کو تیار کریں۔",

        button: "ابھی داخلہ لیں",
      },

      en: {
        title: "Towards a Better Future",

        desc:
          "Learn modern digital skills, improve your abilities and prepare yourself for better educational and online career opportunities.",

        button: "Enroll Now",
      },

      ar: {
        title: "نحو مستقبل أفضل",

        desc:
          "تعلم المهارات الرقمية الحديثة وطوّر قدراتك واستعد للحصول على فرص تعليمية ومهنية أفضل عبر الإنترنت.",

        button: "سجل الآن",
      },

      image: slide2,

      buttonLink: "/login",
    },

    // =========================================
    // SLIDE 3 - EDUCATION
    // =========================================

    {
      category: "digital",

      ur: {
        title: "تعلیم سب کے لیے",

        desc:
          "ہم بچوں اور نوجوانوں کو معیاری تعلیم اور جدید مہارتوں کے مواقع فراہم کرتے ہیں تاکہ وہ اپنے مستقبل کو بہتر بنا سکیں۔",

        button: "ابھی داخلہ لیں",
      },

      en: {
        title: "Education for All",

        desc:
          "We provide quality education and modern learning opportunities for children and young people to help them build a better future.",

        button: "Enroll Now",
      },

      ar: {
        title: "التعليم للجميع",

        desc:
          "نحن نوفر التعليم الجيد وفرص التعلم الحديثة للأطفال والشباب لمساعدتهم على بناء مستقبل أفضل.",

        button: "سجل الآن",
      },

      image: slide3,

      buttonLink: "/login",
    },

    // =========================================
    // SLIDE 4 - HEALTH
    // =========================================

    {
      category: "health",

      ur: {
        title: "صحت مند معاشرہ",

        desc:
          "صحت ہماری اولین ترجیح ہے۔ بہتر صحت، طبی رہنمائی اور معیاری صحت کی خدمات کے لیے ہمارے پروگرام میں شامل ہوں۔",

        button: "اپائنٹمنٹ لیں",
      },

      en: {
        title: "Healthy Society",

        desc:
          "Health is our priority. Get access to quality healthcare services, medical guidance and support through our health program.",

        button: "Appointment",
      },

      ar: {
        title: "مجتمع صحي",

        desc:
          "الصحة هي أولويتنا. احصل على خدمات صحية عالية الجودة وإرشادات طبية ودعم من خلال برنامجنا الصحي.",

        button: "احجز موعدًا",
      },

      image: slide4,

      buttonLink: "/login",
    },

    // =========================================
    // SLIDE 5 - DIGITAL SKILLS
    // =========================================

    {
      category: "digital",

      ur: {
        title: "ہنر سیکھیں اور آن لائن کمائیں",

        desc:
          "eBay، Amazon، Walmart، Freelancing اور Graphic Designing جیسے جدید ہنر سیکھیں اور گھر بیٹھے آن لائن کمائی کے مواقع حاصل کریں۔",

        button: "ابھی داخلہ لیں",
      },

      en: {
        title: "Learn Skills & Earn Online",

        desc:
          "Learn eBay, Amazon, Walmart, Freelancing and Graphic Designing skills and prepare yourself for online earning opportunities from home.",

        button: "Enroll Now",
      },

      ar: {
        title: "تعلم المهارات واربح عبر الإنترنت",

        desc:
          "تعلم مهارات eBay وAmazon وWalmart والعمل الحر والتصميم الجرافيكي واستعد للحصول على فرص للربح عبر الإنترنت من المنزل.",

        button: "سجل الآن",
      },

      image: slide5,

      buttonLink: "/login",
    },
  ];

  // =========================================
  // CURRENT SLIDE
  // =========================================

  const slide = slides[current];

  const content = slide[lang] || slide.en;

  // =========================================
  // BUTTON CLICK
  // =========================================

  const handleEnroll = () => {
    // Save selected category
    localStorage.setItem("category", slide.category);

    // Go to login
    navigate(slide.buttonLink);
  };

  // =========================================
  // RETURN
  // =========================================

  return (
    <div
      className="
        relative
        h-[60vh]
        sm:h-[70vh]
        md:h-[85vh]
        lg:h-screen
        overflow-hidden
      "
    >
      {/* =====================================
          BACKGROUND IMAGE
      ====================================== */}

      <div
        key={slide.image}
        className="
          absolute
          inset-0
          bg-center
          bg-cover
          bg-no-repeat
          transition-all
          duration-1000
        "
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      ></div>

      {/* =====================================
          DARK OVERLAY
      ====================================== */}

      <div className="absolute inset-0 bg-black/40"></div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          h-full
          text-center
          text-white
          px-4
        "
      >
        {/* TITLE */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            mb-5
            text-[#f5d76e]
          "
        >
          {content.title}
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            max-w-3xl
            mb-7
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            px-3
          "
        >
          {content.desc}
        </p>

        {/* =====================================
            ONLY ONE BUTTON
        ====================================== */}

        <button
          type="button"
          onClick={handleEnroll}
          className="
            bg-[#0f4f3f]
            text-white
            px-8
            py-3
            rounded-lg
            font-semibold
            shadow-lg
            hover:bg-[#0b3a2e]
            hover:scale-105
            transition
            duration-300
          "
        >
          {content.button}
        </button>
      </div>

      {/* =====================================
          SLIDER DOTS
      ====================================== */}

      <div
        className="
          absolute
          bottom-6
          left-0
          right-0
          flex
          justify-center
          gap-2
          z-20
        "
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`
              w-3
              h-3
              rounded-full
              cursor-pointer
              transition
              duration-300
              ${
                current === i
                  ? "bg-[#d4af37] scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }
            `}
          ></button>
        ))}
      </div>
    </div>
  );
}

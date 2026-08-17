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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slides = [

    // =========================================
    // ISLAMIC
    // =========================================
    {
      category: "islamic",

      ur: {
        title: "تعلیم، صحت اور ہنر سب کے لیے",
        desc: "ہم ہر فرد کے لیے بہترین تعلیمی، صحت اور ہنر کے مواقع فراہم کرتے ہیں۔",
        btn1: "مزید پڑھیں",
        btn2: "سفر شروع کریں",
      },

      en: {
        title: "Islamic Education for Everyone",
        desc: "Learn Quran, Islamic studies and build your spiritual knowledge.",
        btn1: "Learn More",
        btn2: "Join Now",
      },

      ar: {
        title: "التعليم الإسلامي للجميع",
        desc: "تعلم القرآن والدراسات الإسلامية وطوّر معرفتك الدينية.",
        btn1: "اقرأ المزيد",
        btn2: "انضم الآن",
      },

      image: slide1,
    },

    // =========================================
    // DIGITAL
    // =========================================
    {
      category: "digital",

      ur: {
        title: "بہتر مستقبل کی طرف",
        desc: "ہم نوجوانوں کو جدید ڈیجیٹل ہنر سکھا کر مستقبل کے لیے تیار کرتے ہیں۔",
        btn1: "مزید پڑھیں",
        btn2: "کورس میں شامل ہوں",
      },

      en: {
        title: "Towards a Better Future",
        desc: "Learn modern digital skills and prepare yourself for the future.",
        btn1: "Learn More",
        btn2: "Join Course",
      },

      ar: {
        title: "نحو مستقبل أفضل",
        desc: "تعلم المهارات الرقمية الحديثة واستعد لمستقبل أفضل.",
        btn1: "اقرأ المزيد",
        btn2: "انضم للدورة",
      },

      image: slide2,
    },

    // =========================================
    // EDUCATION
    // =========================================
    {
      category: "digital",

      ur: {
        title: "تعلیم سب کے لیے",
        desc: "ہر بچے اور نوجوان کو معیاری تعلیم کے مواقع فراہم کرنا ہمارا مقصد ہے۔",
        btn1: "مزید جانیں",
        btn2: "شروع کریں",
      },

      en: {
        title: "Education for All",
        desc: "Every child and young person deserves access to quality education.",
        btn1: "Learn More",
        btn2: "Start Learning",
      },

      ar: {
        title: "التعليم للجميع",
        desc: "كل طفل وشاب يستحق الحصول على تعليم جيد.",
        btn1: "المزيد",
        btn2: "ابدأ التعلم",
      },

      image: slide3,
    },

    // =========================================
    // HEALTH
    // =========================================
    {
      category: "health",

      ur: {
        title: "صحت مند معاشرہ",
        desc: "صحت ہماری ترجیح ہے، بہتر صحت کے لیے ہمارے پروگرامز میں شامل ہوں۔",
        btn1: "مزید جانیں",
        btn2: "شروع کریں",
      },

      en: {
        title: "Healthy Society",
        desc: "Health is our priority. Join our health programs and services.",
        btn1: "Learn More",
        btn2: "Get Started",
      },

      ar: {
        title: "مجتمع صحي",
        desc: "الصحة هي أولويتنا. انضم إلى برامجنا وخدماتنا الصحية.",
        btn1: "المزيد",
        btn2: "ابدأ الآن",
      },

      image: slide4,
    },

    // =========================================
    // DIGITAL SKILLS
    // =========================================
    {
      category: "digital",

      ur: {
        title: "ہنر سیکھیں اور آن لائن کمائیں",
        desc: "eBay، Amazon، Walmart، Freelancing اور Graphic Designing کے ذریعے گھر بیٹھے کمائی شروع کریں۔",
        btn1: "مزید جانیں",
        btn2: "کورس میں شامل ہوں",
      },

      en: {
        title: "Learn Skills & Earn Online",
        desc: "Start earning from home with eBay, Amazon, Walmart, Freelancing, and Graphic Designing.",
        btn1: "Learn More",
        btn2: "Join Course",
      },

      ar: {
        title: "تعلم المهارات واربح عبر الإنترنت",
        desc: "ابدأ الربح من المنزل عبر eBay و Amazon و Walmart والعمل الحر والتصميم الجرافيكي.",
        btn1: "اقرأ المزيد",
        btn2: "انضم الآن",
      },

      image: slide5,
    },
  ];

  const slide = slides[current];
  const content = slide[lang] || slide.en;

  // =========================================
  // BUTTON HANDLERS
  // =========================================

  const handleLearnMore = () => {

    // Save category
    localStorage.setItem("category", slide.category);

    // Go to category page
    switch (slide.category) {

      case "islamic":
        navigate("/islamic");
        break;

      case "digital":
        navigate("/digital");
        break;

      case "health":
        navigate("/health");
        break;

      default:
        navigate("/");
    }
  };

  const handleJoin = () => {

    // Save category
    localStorage.setItem("category", slide.category);

    // Go to login
    navigate("/login");
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f5d76e]"
        >
          {content.title}
        </h1>

        <p className="max-w-2xl mb-6 text-base sm:text-lg md:text-xl px-2">
          {content.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">

          {/* LEARN MORE */}
          <button
            onClick={handleLearnMore}
            className="bg-white/20 px-6 py-2 rounded-lg backdrop-blur hover:bg-white/30 transition"
          >
            {content.btn1}
          </button>

          {/* JOIN */}
          <button
            onClick={handleJoin}
            className="bg-[#0f4f3f] px-6 py-2 rounded-lg hover:bg-[#0b3a2e] transition"
          >
            {content.btn2}
          </button>

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">

        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i
                ? "bg-[#d4af37]"
                : "bg-white/50"
            }`}
          ></div>
        ))}

      </div>

    </div>
  );
}

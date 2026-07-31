import { useState, useEffect } from "react";

// ✅ IMPORT IMAGES
import slide1 from "../assets/slider1.png";
import slide2 from "../assets/slider2.png";
import slide3 from "../assets/slider3.png";
import slide4 from "../assets/slider4.png";
import slide5 from "../assets/slider5.png";

export default function HeroSlider({ lang }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      ur: {
        title: "تعلیم، صحت اور ہنر سب کے لیے",
        desc: "ہم ہر فرد کے لیے بہترین تعلیمی، صحت اور ہنر کے مواقع فراہم کرتے ہیں۔",
        btn1: "مزید پڑھیں",
        btn2: "سفر شروع کریں",
      },
      en: {
        title: "Education, Health & Skills for All",
        desc: "We provide quality education, health, and skill opportunities for everyone.",
        btn1: "Read More",
        btn2: "Start Journey",
      },
      ar: {
        title: "التعليم والصحة والمهارات للجميع",
        desc: "نحن نقدم فرص تعليم وصحة ومهارات عالية الجودة للجميع.",
        btn1: "اقرأ المزيد",
        btn2: "ابدأ الرحلة",
      },
      image: slide1, // ✅ FIXED
    },
    {
      ur: {
        title: "بہتر مستقبل کی طرف",
        desc: "ہم نوجوانوں کو ہنر مند بنانے میں مدد کرتے ہیں۔",
        btn1: "مزید پڑھیں",
        btn2: "شامل ہوں",
      },
      en: {
        title: "Towards a Better Future",
        desc: "We empower youth with skills.",
        btn1: "Read More",
        btn2: "Join Now",
      },
      ar: {
        title: "نحو مستقبل أفضل",
        desc: "نحن نمكن الشباب بالمهارات.",
        btn1: "اقرأ المزيد",
        btn2: "انضم الآن",
      },
      image: slide2, // ✅ FIXED
    },
    {
      ur: { title: "تعلیم سب کے لیے", desc: "ہر بچے کو تعلیم", btn1: "مزید", btn2: "شروع کریں" },
      en: { title: "Education for All", desc: "Every child deserves education", btn1: "More", btn2: "Start" },
      ar: { title: "التعليم للجميع", desc: "كل طفل يستحق التعليم", btn1: "المزيد", btn2: "ابدأ" },
      image: slide3, // ✅ FIXED
    },
    {
      ur: { title: "صحت مند معاشرہ", desc: "صحت ہماری ترجیح", btn1: "مزید", btn2: "شروع کریں" },
      en: { title: "Healthy Society", desc: "Health is priority", btn1: "More", btn2: "Start" },
      ar: { title: "مجتمع صحي", desc: "الصحة هي الأولوية", btn1: "المزيد", btn2: "ابدأ" },
      image: slide4, // ✅ FIXED
    },
   {
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
}

  ];

  const slide = slides[current][lang];

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-screen overflow-hidden">

      {/* Background Image */}
   <div
  className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-1000"
  style={{ backgroundImage: `url(${slides[current].image})` }}
></div>
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#f5d76e]">
          {slide.title}
        </h1>

        <p className="max-w-2xl mb-6 text-base sm:text-lg md:text-xl px-2">
          {slide.desc}
        </p>

       <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white/20 px-6 py-2 rounded-lg backdrop-blur hover:bg-white/30 transition">
            {slide.btn1}
          </button>

          <button className="bg-[#0f4f3f] px-6 py-2 rounded-lg hover:bg-[#0b3a2e] transition">
            {slide.btn2}
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
              current === i ? "bg-[#d4af37]" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
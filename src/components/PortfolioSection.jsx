// src/components/ServicesSection.jsx

import React from "react";
import { Laptop, BookOpen, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
export default function ServicesSection({ lang }) {
const handleScroll = (id) => {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
  // ✅ Translations inside component
  const content = {
    en: {
      small: "OUR SERVICES",
      title: "Three Pillars of Excellence",
      popular: "Most Popular",
      btn1: "Explore Skills",
      btn2: "Learn More",
      btn3: "Book Appointment",
      services: [
        {
          title: "Digital Skills",
          desc: "Learn Freelancing, E-commerce, Graphic Designing, and more to build a profitable online career.",
        },
        {
          title: "Islamic Education",
          desc: "Access authentic Islamic knowledge including Tajweed, Hifz, and courses with separate classes.",
        },
        {
          title: "Health Services",
          desc: "Consult top-tier specialists, dietitians, and dentists via text, audio, or video calls instantly.",
        },
      ],
    },

    ur: {
      small: "ہماری خدمات",
      title: "کامیابی کے تین ستون",
      popular: "سب سے مقبول",
      btn1: "مزید سیکھیں",
      btn2: "مزید معلومات",
      btn3: "اپائنٹمنٹ بک کریں",
      services: [
        {
          title: "ڈیجیٹل مہارتیں",
          desc: "فری لانسنگ، ای کامرس، گرافک ڈیزائننگ اور مزید سیکھیں۔",
        },
        {
          title: "اسلامی تعلیم",
          desc: "تجوید، حفظ اور دیگر مستند اسلامی کورسز تک رسائی حاصل کریں۔",
        },
        {
          title: "صحت کی خدمات",
          desc: "ماہر ڈاکٹروں سے آن لائن مشورہ حاصل کریں۔",
        },
      ],
    },

    ar: {
      small: "خدماتنا",
      title: "ثلاث ركائز للتميز",
      popular: "الأكثر شيوعًا",
      btn1: "استكشاف المهارات",
      btn2: "تعلم المزيد",
      btn3: "حجز موعد",
      services: [
        {
          title: "المهارات الرقمية",
          desc: "تعلم العمل الحر والتجارة الإلكترونية والتصميم.",
        },
        {
          title: "التعليم الإسلامي",
          desc: "احصل على معرفة إسلامية أصيلة ودورات متخصصة.",
        },
        {
          title: "الخدمات الصحية",
          desc: "استشر أفضل الأطباء عبر الإنترنت بسهولة.",
        },
      ],
    },
  };

  const t = content[lang];

  const icons = [
    <Laptop size={40} />,
    <BookOpen size={40} />,
    <Stethoscope size={40} />,
  ];

  return (
    <section className="bg-gray-100 py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          {t.small}
        </p>

        <h2 className="text-3xl md:text-5xl font-bold text-[#0b2d36] mt-3">
          {t.title}
        </h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {t.services.map((item, index) => {

          const isCenter = index === 1;

          return (
            <div
              key={index}
              className={`relative rounded-3xl p-8 text-center transition duration-300 ${
                isCenter
                  ? "bg-[#0b2d36] text-white shadow-2xl scale-105"
                  : "bg-white text-[#0b2d36] shadow hover:shadow-xl"
              }`}
            >

              {/* Badge */}
              {isCenter && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs px-4 py-1 rounded-full font-semibold">
                  {t.popular}
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
                  isCenter
                    ? "bg-yellow-400 text-[#0b2d36]"
                    : "bg-[#0b2d36] text-yellow-400"
                }`}
              >
                {icons[index]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm opacity-80 leading-relaxed mb-6">
                {item.desc}
              </p>

      {index === 2 ? (
  <Link
    to="/enrollment-health"
    className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 ${
      isCenter
        ? "text-yellow-400 hover:text-yellow-300"
        : "text-[#0b2d36] hover:text-yellow-600"
    }`}
  >
    {t.btn3}
    <span>→</span>
  </Link>
) : (
  <button
    onClick={() =>
      handleScroll(
        index === 0 ? "digital-skills" : "islamic-courses"
      )
    }
    className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 ${
      isCenter
        ? "text-yellow-400 hover:text-yellow-300"
        : "text-[#0b2d36] hover:text-yellow-600"
    }`}
  >
    {index === 0 ? t.btn1 : t.btn2}
    <span>→</span>
  </button>
)}
            </div>
          );
        })}

      </div>
    </section>
  );
}
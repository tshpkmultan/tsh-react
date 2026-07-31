// src/components/ProcessSection.jsx

import React from "react";

export default function ProcessSection({ lang }) {

  // ✅ Translations inside component
  const content = {
    en: {
      title: "How Our Platform Works",
      desc: "A simple, transparent 4-step process to get started with any of our services.",
      steps: [
        {
          title: "Sign Up & Register",
          desc: "Create an account with basic details (Name, Age, WhatsApp, Laptop Yes/No).",
        },
        {
          title: "Select Service",
          desc: "Pick Skills, Islamic Edu, or Health. Browse teacher/doctor profiles & schedules.",
        },
        {
          title: "Secure Payment",
          desc: "Pay fee via JazzCash, EasyPaisa, or Bank Transfer & upload screenshot.",
        },
        {
          title: "Dashboard Active",
          desc: "Access Notes, WhatsApp Community, Zoom links, and Track Progress instantly.",
        },
      ],
    },

    ur: {
      title: "ہماری پلیٹ فارم کیسے کام کرتا ہے",
      desc: "4 آسان مراحل میں شروع کریں۔",
      steps: [
        {
          title: "رجسٹریشن کریں",
          desc: "اپنا اکاؤنٹ بنائیں۔",
        },
        {
          title: "سروس منتخب کریں",
          desc: "مہارت، اسلامی تعلیم یا ہیلتھ سروس منتخب کریں۔",
        },
        {
          title: "ادائیگی کریں",
          desc: "JazzCash یا EasyPaisa کے ذریعے ادائیگی کریں۔",
        },
        {
          title: "ڈیش بورڈ فعال",
          desc: "تمام مواد اور کلاسز تک رسائی حاصل کریں۔",
        },
      ],
    },

    ar: {
      title: "كيف تعمل منصتنا",
      desc: "عملية بسيطة من 4 خطوات للبدء.",
      steps: [
        {
          title: "التسجيل",
          desc: "أنشئ حسابك بسهولة.",
        },
        {
          title: "اختر الخدمة",
          desc: "اختر المهارات أو التعليم الإسلامي أو الصحة.",
        },
        {
          title: "الدفع",
          desc: "ادفع عبر الطرق المتاحة.",
        },
        {
          title: "تفعيل الحساب",
          desc: "ابدأ باستخدام المنصة فورًا.",
        },
      ],
    },
  };

  const t = content[lang];

  return (
    <section className="bg-gray-100 py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0b2d36]">
          {t.title}
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {t.desc}
        </p>
      </div>

      {/* Steps */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">

        {t.steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">

            {/* Circle Number */}
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold shadow-md mb-6 ${
                index === 3
                  ? "bg-yellow-300 text-[#0b2d36]"
                  : "bg-[#0b2d36] text-yellow-400"
              }`}
            >
              {index + 1}
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg text-[#0b2d36]">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-3 max-w-xs">
              {step.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}
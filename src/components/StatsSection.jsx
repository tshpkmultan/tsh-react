// src/components/CTASection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  HeartPulse,
  BookOpen,
  Sparkles,
  Compass,
  Users,
  ShieldCheck,
  Clock3,
  MessageCircle,
  Lightbulb,
} from "lucide-react";

export default function CTASection({ lang = "en" }) {
  const content = {
    en: {
      badge: "Start Your Journey",

      title: "Choose Your",

      highlight: "Path With TSH",

      desc:
        "Whether you want to learn, improve your wellbeing, or build practical skills, TSH brings the right opportunities together in one platform.",

      explore: "Explore Categories",

      features: [
        "Learn from structured resources",
        "Access trusted services",
        "Build practical skills",
      ],

      /* =====================================================
         WHY TSH SECTION
      ====================================================== */

      whyTitle: "Why Choose TSH?",

      whyDescription:
        "TSH is designed to make learning, healthcare and personal development easier, more accessible and more connected.",

      whyFeatures: [
        {
          icon: BookOpen,
          title: "Learn With Purpose",
          description:
            "Access meaningful educational resources and opportunities designed to support continuous learning.",
        },
        {
          icon: ShieldCheck,
          title: "Trusted Experience",
          description:
            "A platform focused on quality, reliability and a better experience for every user.",
        },
        {
          icon: Clock3,
          title: "Simple & Accessible",
          description:
            "Find the services and resources you need through a simple and user-friendly experience.",
        },
        {
          icon: MessageCircle,
          title: "Stay Connected",
          description:
            "Stay connected with teachers, professionals and the wider TSH community.",
        },
      ],

      closingBadge: "Your Journey Starts Here",

      closingTitle: "One Platform.",

      closingHighlight: "Many Possibilities.",

      closingDescription:
        "Take the next step toward learning, better wellbeing and personal growth with TSH.",

      closingButton: "Explore TSH",

      footerText:
        "Discover the right opportunity for your journey.",
    },

    ur: {
      badge: "اپنا سفر شروع کریں",

      title: "TSH کے ساتھ",

      highlight: "اپنا راستہ منتخب کریں",

      desc:
        "چاہے آپ تعلیم حاصل کرنا چاہتے ہوں، اپنی صحت بہتر بنانا چاہتے ہوں یا عملی ہنر سیکھنا چاہتے ہوں، TSH آپ کے لیے مختلف مواقع ایک ہی پلیٹ فارم پر فراہم کرتا ہے۔",

      explore: "کیٹیگریز دیکھیں",

      features: [
        "منظم تعلیمی مواد سے سیکھیں",
        "قابل اعتماد سہولیات حاصل کریں",
        "عملی اور ڈیجیٹل ہنر بنائیں",
      ],

      whyTitle: "TSH کا انتخاب کیوں کریں؟",

      whyDescription:
        "TSH کو اس طرح بنایا گیا ہے کہ تعلیم، صحت اور ذاتی ترقی کو آسان، قابل رسائی اور ایک دوسرے سے مربوط بنایا جا سکے۔",

      whyFeatures: [
        {
          icon: BookOpen,
          title: "مقصد کے ساتھ سیکھیں",
          description:
            "بامقصد تعلیمی مواد اور مواقع تک رسائی حاصل کریں جو مسلسل سیکھنے میں مدد دیتے ہیں۔",
        },
        {
          icon: ShieldCheck,
          title: "قابل اعتماد تجربہ",
          description:
            "ایک ایسا پلیٹ فارم جو معیار، اعتماد اور صارف کے بہتر تجربے پر توجہ دیتا ہے۔",
        },
        {
          icon: Clock3,
          title: "آسان اور قابل رسائی",
          description:
            "آسان اور صارف دوست طریقے سے اپنی ضرورت کی سہولیات اور مواد تلاش کریں۔",
        },
        {
          icon: MessageCircle,
          title: "رابطے میں رہیں",
          description:
            "اساتذہ، ماہرین اور TSH کمیونٹی کے ساتھ رابطے میں رہیں۔",
        },
      ],

      closingBadge: "آپ کا سفر یہاں سے شروع ہوتا ہے",

      closingTitle: "ایک پلیٹ فارم۔",

      closingHighlight: "بے شمار مواقع۔",

      closingDescription:
        "TSH کے ساتھ تعلیم، بہتر صحت اور ذاتی ترقی کی طرف اپنا اگلا قدم اٹھائیں۔",

      closingButton: "TSH دریافت کریں",

      footerText:
        "اپنے سفر کے لیے درست موقع دریافت کریں۔",
    },

    ar: {
      badge: "ابدأ رحلتك",

      title: "اختر",

      highlight: "مسارك مع TSH",

      desc:
        "سواء كنت ترغب في التعلم أو تحسين صحتك أو تطوير مهارات عملية، تجمع TSH الفرص المناسبة لك في منصة واحدة.",

      explore: "استكشف الأقسام",

      features: [
        "تعلم من موارد منظمة",
        "الوصول إلى خدمات موثوقة",
        "تطوير مهارات عملية",
      ],

      whyTitle: "لماذا تختار TSH؟",

      whyDescription:
        "تم تصميم TSH لجعل التعليم والرعاية الصحية والتطور الشخصي أسهل وأكثر سهولة وترابطاً.",

      whyFeatures: [
        {
          icon: BookOpen,
          title: "تعلم بهدف",
          description:
            "الوصول إلى موارد وفرص تعليمية هادفة تساعدك على التعلم والتطور المستمر.",
        },
        {
          icon: ShieldCheck,
          title: "تجربة موثوقة",
          description:
            "منصة تركز على الجودة والموثوقية وتقديم تجربة أفضل لكل مستخدم.",
        },
        {
          icon: Clock3,
          title: "بسيط وسهل الوصول",
          description:
            "اعثر على الخدمات والموارد التي تحتاجها من خلال تجربة بسيطة وسهلة الاستخدام.",
        },
        {
          icon: MessageCircle,
          title: "ابق على تواصل",
          description:
            "ابق على اتصال بالمعلمين والمتخصصين ومجتمع TSH.",
        },
      ],

      closingBadge: "رحلتك تبدأ من هنا",

      closingTitle: "منصة واحدة.",

      closingHighlight: "فرص لا محدودة.",

      closingDescription:
        "خذ خطوتك التالية نحو التعلم والصحة الأفضل والتطور الشخصي مع TSH.",

      closingButton: "اكتشف TSH",

      footerText:
        "اكتشف الفرصة المناسبة لرحلتك.",
    },
  };

  const t = content[lang] || content.en;

  const isRTL = lang === "ur" || lang === "ar";

  // All category/discovery actions go to the category page first.
  const categoryPath = "/category";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gradient-to-br from-[#071f27] via-[#0b2d36] to-[#123d47] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-[140px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN CTA CARD
        ====================================================== */}

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:rounded-[40px] sm:p-10 lg:p-16">

          {/* Decorative Effects */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-[100px]" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div>

              {/* Badge */}

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-md sm:px-5">

                <Compass size={18} />

                {t.badge}

              </span>

              {/* Heading */}

              <h2 className="mt-7 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">

                {t.title}

                <span className="mt-3 block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  {t.highlight}
                </span>

              </h2>

              {/* Description */}

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {t.desc}
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-4">

                {t.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-white sm:text-base"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-400/10">

                      <CheckCircle
                        size={18}
                        className="text-green-400"
                      />

                    </div>

                    <span>{feature}</span>

                  </div>
                ))}

              </div>

              {/* Main CTA */}

              <Link
                to={categoryPath}
                className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-7 py-4 font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-yellow-300 hover:to-amber-300 hover:shadow-2xl sm:w-auto sm:px-8"
              >

                <Compass size={20} />

                {t.explore}

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

            {/* =================================================
                RIGHT - JOURNEY PREVIEW
            ================================================== */}

            <div className="relative">

              {/* Glow */}

              <div className="absolute inset-5 rounded-[40px] bg-cyan-400/10 blur-[70px]" />

              <div className="relative rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:p-7">

                {/* Header */}

                <div className="mb-6 flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">

                    <Users size={24} />

                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {t.whyTitle}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                      {t.whyDescription}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    JOURNEY FEATURES
                ================================================== */}

                <div className="space-y-4">

                  {t.whyFeatures.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="group rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.12] sm:p-5"
                      >

                        <div className="flex items-start gap-4">

                          {/* Icon */}

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              index === 0
                                ? "bg-cyan-400/10 text-cyan-300"
                                : index === 1
                                ? "bg-green-400/10 text-green-300"
                                : index === 2
                                ? "bg-yellow-400/10 text-yellow-300"
                                : "bg-purple-400/10 text-purple-300"
                            } transition-transform duration-300 group-hover:scale-110`}
                          >

                            <Icon size={21} />

                          </div>

                          {/* Content */}

                          <div>

                            <h4 className="font-bold text-white">
                              {item.title}
                            </h4>

                            <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
                              {item.description}
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            WHY TSH SECTION
            REPLACES THE OLD CATEGORY SECTION
        ====================================================== */}

        <div className="mt-20 sm:mt-24">

          {/* Section Header */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">

              <Lightbulb size={17} />

              TSH Experience

            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t.whyTitle}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {t.whyDescription}
            </p>

          </div>

          {/* Why TSH Cards */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

            {t.whyFeatures.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/20 hover:bg-white/[0.10] sm:p-7"
                >

                  {/* Glow */}

                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[60px] ${
                      index === 0
                        ? "bg-cyan-400/20"
                        : index === 1
                        ? "bg-green-400/20"
                        : index === 2
                        ? "bg-yellow-400/20"
                        : "bg-purple-400/20"
                    }`}
                  />

                  <div className="relative z-10">

                    {/* Icon */}

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        index === 0
                          ? "bg-cyan-400/10 text-cyan-300"
                          : index === 1
                          ? "bg-green-400/10 text-green-300"
                          : index === 2
                          ? "bg-yellow-400/10 text-yellow-300"
                          : "bg-purple-400/10 text-purple-300"
                      } transition-all duration-500 group-hover:scale-110`}
                    >

                      <Icon size={27} />

                    </div>

                    {/* Title */}

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    {/* Description */}

                    <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                      {item.description}
                    </p>

                    {/* Small indicator */}

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-300">

                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                      TSH Experience

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            FINAL CLOSING CTA
        ====================================================== */}

        <div className="mt-20 sm:mt-24">

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-700 via-[#0b2d36] to-cyan-900 px-6 py-12 text-center shadow-[0_35px_90px_rgba(0,0,0,.25)] sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-16 lg:py-20">

            {/* Background Glows */}

            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/15 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-3xl">

              {/* Badge */}

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 backdrop-blur-md">

                <Sparkles size={17} />

                {t.closingBadge}

              </span>

              {/* Heading */}

              <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

                {t.closingTitle}

                <span className="mt-2 block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  {t.closingHighlight}
                </span>

              </h2>

              {/* Description */}

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {t.closingDescription}
              </p>

              {/* Button */}

              <Link
                to={categoryPath}
                className="group mt-9 inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl sm:px-10"
              >

                {t.closingButton}

                <ArrowRight
                  size={21}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

              {/* Small Footer Text */}

              <div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-400">

                <CheckCircle
                  size={16}
                  className="text-green-400"
                />

                {t.footerText}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

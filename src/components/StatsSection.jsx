// src/components/CTASection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  HeartPulse,
  BookOpen,
  Stethoscope,
  Sparkles,
  Compass,
  Users,
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

      categoriesTitle: "Explore What TSH Offers",

      categoriesDescription:
        "Choose the area that matches your goals. You can explore education, healthcare and practical skills from one place.",

      categories: [
        {
          icon: BookOpen,
          title: "Taleem",
          subtitle: "Education",
          description:
            "Explore educational resources, Islamic learning and structured courses designed to support your learning journey.",
        },
        {
          icon: HeartPulse,
          title: "Sehat",
          subtitle: "Healthcare",
          description:
            "Access healthcare services and connect with professional medical support when you need it.",
        },
        {
          icon: Sparkles,
          title: "Hunar",
          subtitle: "Skills",
          description:
            "Develop practical and digital skills that can help you grow personally and professionally.",
        },
      ],

      bottomTitle: "Your Journey Starts",

      bottomHighlight: "With One Choice",

      bottomDescription:
        "Explore the three TSH categories and choose the path that is right for you.",

      button: "View All Categories",
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

      categoriesTitle: "TSH کیا فراہم کرتا ہے؟",

      categoriesDescription:
        "اپنے مقصد کے مطابق شعبہ منتخب کریں۔ تعلیم، صحت اور عملی ہنر ایک ہی جگہ سے دریافت کریں۔",

      categories: [
        {
          icon: BookOpen,
          title: "تعلیم",
          subtitle: "Taleem",
          description:
            "تعلیمی مواد، اسلامی تعلیم اور منظم کورسز کے ذریعے اپنے تعلیمی سفر کو آگے بڑھائیں۔",
        },
        {
          icon: HeartPulse,
          title: "صحت",
          subtitle: "Sehat",
          description:
            "صحت کی سہولیات حاصل کریں اور ضرورت کے وقت طبی ماہرین سے رابطہ کریں۔",
        },
        {
          icon: Sparkles,
          title: "ہنر",
          subtitle: "Hunar",
          description:
            "اپنی ذاتی اور پیشہ ورانہ ترقی کے لیے عملی اور ڈیجیٹل مہارتیں حاصل کریں۔",
        },
      ],

      bottomTitle: "آپ کا سفر شروع ہوتا ہے",

      bottomHighlight: "ایک انتخاب سے",

      bottomDescription:
        "TSH کی تینوں کیٹیگریز دیکھیں اور اپنے لیے درست راستہ منتخب کریں۔",

      button: "تمام کیٹیگریز دیکھیں",
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

      categoriesTitle: "اكتشف ما تقدمه TSH",

      categoriesDescription:
        "اختر المجال الذي يناسب أهدافك. يمكنك استكشاف التعليم والرعاية الصحية والمهارات العملية من مكان واحد.",

      categories: [
        {
          icon: BookOpen,
          title: "تعليم",
          subtitle: "Taleem",
          description:
            "استكشف الموارد التعليمية والتعليم الإسلامي والدورات المنظمة لدعم رحلتك التعليمية.",
        },
        {
          icon: HeartPulse,
          title: "صحة",
          subtitle: "Sehat",
          description:
            "احصل على خدمات الرعاية الصحية وتواصل مع المتخصصين الطبيين عند الحاجة.",
        },
        {
          icon: Sparkles,
          title: "مهارات",
          subtitle: "Hunar",
          description:
            "طور مهارات عملية ورقمية تساعدك على النمو الشخصي والمهني.",
        },
      ],

      bottomTitle: "رحلتك تبدأ",

      bottomHighlight: "باختيار واحد",

      bottomDescription:
        "استكشف أقسام TSH الثلاثة واختر المسار المناسب لك.",

      button: "عرض جميع الأقسام",
    },
  };

  const t = content[lang] || content.en;

  const isRTL = lang === "ur" || lang === "ar";

  // All category/discovery actions go here first.
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
                RIGHT CATEGORY PREVIEW
            ================================================== */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:p-7">

              {/* Header */}

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">

                  <Users size={24} />

                </div>

                <div>

                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {t.categoriesTitle}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                    {t.categoriesDescription}
                  </p>

                </div>

              </div>

              {/* =================================================
                  CATEGORY OPTIONS
              ================================================== */}

              <div className="space-y-4">

                {t.categories.map((category, index) => {

                  const Icon = category.icon;

                  return (
                    <Link
                      key={index}
                      to={categoryPath}
                      className="group block rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.13] sm:p-5"
                    >

                      <div className="flex items-center gap-4">

                        {/* Icon */}

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            index === 0
                              ? "bg-cyan-400/10 text-cyan-300"
                              : index === 1
                              ? "bg-green-400/10 text-green-300"
                              : "bg-yellow-400/10 text-yellow-300"
                          }`}
                        >

                          <Icon size={23} />

                        </div>

                        {/* Content */}

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">

                            <h4 className="font-bold text-white">
                              {category.title}
                            </h4>

                            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-slate-300">
                              {category.subtitle}
                            </span>

                          </div>

                          <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
                            {category.description}
                          </p>

                        </div>

                        {/* Arrow */}

                        <ArrowRight
                          size={19}
                          className="shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300"
                        />

                      </div>

                    </Link>
                  );
                })}

              </div>

              {/* Bottom Button */}

              <Link
                to={categoryPath}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 font-bold text-[#0b2d36] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl"
              >

                {t.explore}

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

          </div>

        </div>

        {/* =====================================================
            CATEGORY SECTION
        ====================================================== */}

        <div className="mt-20 sm:mt-24">

          {/* Section Header */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">

              <Sparkles size={17} />

              TSH Categories

            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t.categoriesTitle}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {t.categoriesDescription}
            </p>

          </div>

          {/* Category Cards */}

          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">

            {t.categories.map((category, index) => {

              const Icon = category.icon;

              return (
                <Link
                  key={index}
                  to={categoryPath}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/20 hover:bg-white/[0.11] sm:p-7"
                >

                  {/* Glow */}

                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px] ${
                      index === 0
                        ? "bg-cyan-400/20"
                        : index === 1
                        ? "bg-green-400/20"
                        : "bg-yellow-400/20"
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
                          : "bg-yellow-400/10 text-yellow-300"
                      } transition-transform duration-500 group-hover:scale-110`}
                    >

                      <Icon size={27} />

                    </div>

                    {/* Title */}

                    <div className="mt-6 flex items-center gap-3">

                      <h3 className="text-2xl font-extrabold text-white">
                        {category.title}
                      </h3>

                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
                        {category.subtitle}
                      </span>

                    </div>

                    {/* Description */}

                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                      {category.description}
                    </p>

                    {/* Explore */}

                    <div className="mt-7 flex items-center gap-2 text-sm font-bold text-cyan-300">

                      {t.explore}

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            FINAL SIMPLE CTA
        ====================================================== */}

        <div className="mt-20 text-center sm:mt-24">

          <div className="mx-auto max-w-3xl">

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">

              {t.bottomTitle}

              <span className="mt-2 block text-yellow-400">
                {t.bottomHighlight}
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {t.bottomDescription}
            </p>

            <Link
              to={categoryPath}
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl sm:px-9"
            >

              {t.button}

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

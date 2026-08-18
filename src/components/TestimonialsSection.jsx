// src/components/TestimonialsSection.jsx

import React from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  Users,
  Award,
  HeartHandshake,
  BookOpen,
  Stethoscope,
  GraduationCap,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function TestimonialsSection({ lang = "en" }) {
  const content = {
    en: {
      badge: "Trusted Experiences",

      title: "Real Stories From",

      highlight: "Our TSH Community",

      description:
        "Discover how learners and patients experience our Digital Skills, Islamic Education and Healthcare services.",

      trustFeatures: [
        {
          icon: HeartHandshake,
          title: "Real Experiences",
          description:
            "Read genuine experiences from people using our education, skills and healthcare services.",
        },
        {
          icon: ShieldCheck,
          title: "Verified Feedback",
          description:
            "We value honest feedback and continuously improve our platform based on user experiences.",
        },
        {
          icon: GraduationCap,
          title: "Learning & Growth",
          description:
            "Our platform is designed to help learners build knowledge, confidence and practical skills.",
        },
        {
          icon: Users,
          title: "Supportive Community",
          description:
            "Connect with teachers, healthcare professionals and a growing learning community.",
        },
      ],

      testimonials: [
        {
          text:
            "The Freelancing Masterclass completely changed my career. The practical learning environment helped me understand how to work with international clients.",

          name: "Hassan R.",

          role: "Digital Skills Student",

          course: "MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H",
        },

        {
          text:
            "Female-only Quran classes gave me confidence to learn Tajweed in a comfortable environment. The teachers are very supportive and patient.",

          name: "Ayesha M.",

          role: "Islamic Education",

          course: "Nazra & Tajweed",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A",
        },

        {
          text:
            "The online doctor consultation saved me time and made it easier to discuss my health concerns from home. The consultation experience was convenient and professional.",

          name: "Zainab K.",

          role: "Healthcare Patient",

          course: "Video Consultation",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z",
        },
      ],

      categories: {
        title: "Choose Your Experience",

        description:
          "TSH brings education, healthcare and practical skills together in one platform. Choose the category that best matches your needs.",

        taleem: "Taleem",

        taleemDesc:
          "Learn through structured courses, Islamic education and academic resources.",

        sehat: "Sehat",

        sehatDesc:
          "Explore healthcare services and connect with professional medical support.",

        hunar: "Hunar",

        hunarDesc:
          "Build practical and digital skills for your personal and professional growth.",
      },

      cta: {
        badge: "Your Journey Starts Here",

        title: "Ready To Begin",

        highlight: "Your Next Chapter?",

        description:
          "Whether you want to learn, improve your health or develop a practical skill, TSH helps you find the right path.",

        benefits: [
          {
            icon: BookOpen,
            title: "Learn With Purpose",
            description:
              "Explore educational opportunities designed around meaningful learning.",
          },
          {
            icon: Stethoscope,
            title: "Care With Confidence",
            description:
              "Access healthcare services designed around convenience and trust.",
          },
          {
            icon: Sparkles,
            title: "Build Your Skills",
            description:
              "Develop practical skills that can support your personal and professional future.",
          },
        ],

        button: "Explore Categories",
      },
    },

    ur: {
      badge: "قابل اعتماد تجربات",

      title: "TSH کمیونٹی کی",

      highlight: "حقیقی کہانیاں",

      description:
        "دیکھیں کہ ہمارے طلبہ اور مریض ڈیجیٹل اسکلز، اسلامی تعلیم اور صحت کی سہولیات کو کس طرح محسوس کرتے ہیں۔",

      trustFeatures: [
        {
          icon: HeartHandshake,
          title: "حقیقی تجربات",
          description:
            "تعلیم، ہنر اور صحت کی سہولیات استعمال کرنے والے افراد کے حقیقی تجربات پڑھیں۔",
        },
        {
          icon: ShieldCheck,
          title: "قابل اعتماد رائے",
          description:
            "ہم حقیقی رائے کو اہمیت دیتے ہیں اور صارفین کے تجربات کی بنیاد پر پلیٹ فارم کو بہتر بناتے ہیں۔",
        },
        {
          icon: GraduationCap,
          title: "تعلیم اور ترقی",
          description:
            "ہمارا پلیٹ فارم علم، اعتماد اور عملی مہارتیں حاصل کرنے میں مدد فراہم کرتا ہے۔",
        },
        {
          icon: Users,
          title: "مددگار کمیونٹی",
          description:
            "اساتذہ، صحت کے ماہرین اور تعلیمی کمیونٹی کے ساتھ رابطے میں رہیں۔",
        },
      ],

      testimonials: [
        {
          text:
            "فری لانسنگ ماسٹرکلاس نے میرے کیریئر کو بدلنے میں مدد کی۔ عملی ماحول نے مجھے بین الاقوامی کلائنٹس کے ساتھ کام کرنے کو بہتر طریقے سے سمجھنے میں مدد دی۔",

          name: "حسن",

          role: "ڈیجیٹل اسکلز طالب علم",

          course: "MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H",
        },

        {
          text:
            "خواتین کے لیے قرآن کلاسز نے مجھے آرام دہ ماحول میں تجوید سیکھنے کا اعتماد دیا۔ اساتذہ بہت مددگار اور صابر ہیں۔",

          name: "عائشہ",

          role: "اسلامی تعلیم",

          course: "ناظرہ و تجوید",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A",
        },

        {
          text:
            "آن لائن ڈاکٹر کنسلٹیشن نے میرے لیے گھر بیٹھے صحت کے مسائل پر بات کرنا آسان بنا دیا۔ مشاورت کا تجربہ آسان اور پیشہ ورانہ تھا۔",

          name: "زینب",

          role: "ہیلتھ",

          course: "ویڈیو کنسلٹیشن",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z",
        },
      ],

      categories: {
        title: "اپنا تجربہ منتخب کریں",

        description:
          "TSH تعلیم، صحت اور عملی ہنر کو ایک ہی پلیٹ فارم پر فراہم کرتا ہے۔ اپنی ضرورت کے مطابق کیٹیگری منتخب کریں۔",

        taleem: "تعلیم",

        taleemDesc:
          "منظم کورسز، اسلامی تعلیم اور تعلیمی مواد کے ذریعے سیکھیں۔",

        sehat: "صحت",

        sehatDesc:
          "صحت کی سہولیات حاصل کریں اور طبی ماہرین سے رابطہ کریں۔",

        hunar: "ہنر",

        hunarDesc:
          "اپنی ذاتی اور پیشہ ورانہ ترقی کے لیے عملی اور ڈیجیٹل مہارتیں حاصل کریں۔",
      },

      cta: {
        badge: "آپ کا سفر یہاں سے شروع ہوتا ہے",

        title: "تیار ہیں",

        highlight: "اپنے اگلے سفر کے لیے؟",

        description:
          "چاہے آپ سیکھنا چاہتے ہیں، اپنی صحت بہتر بنانا چاہتے ہیں یا کوئی عملی ہنر حاصل کرنا چاہتے ہیں، TSH آپ کے لیے درست راستہ تلاش کرنے میں مدد کرتا ہے۔",

        benefits: [
          {
            icon: BookOpen,
            title: "مقصد کے ساتھ سیکھیں",
            description:
              "ایسے تعلیمی مواقع دریافت کریں جو بامقصد سیکھنے میں مدد دیتے ہیں۔",
          },
          {
            icon: Stethoscope,
            title: "اعتماد کے ساتھ صحت",
            description:
              "آسان اور قابل اعتماد صحت کی سہولیات تک رسائی حاصل کریں۔",
          },
          {
            icon: Sparkles,
            title: "اپنی مہارت بنائیں",
            description:
              "ایسی عملی مہارتیں حاصل کریں جو آپ کے مستقبل میں مددگار ہوں۔",
          },
        ],

        button: "کیٹیگریز دیکھیں",
      },
    },

    ar: {
      badge: "تجارب موثوقة",

      title: "قصص حقيقية من",

      highlight: "مجتمع TSH",

      description:
        "اكتشف تجارب المتعلمين والمرضى مع خدمات المهارات الرقمية والتعليم الإسلامي والرعاية الصحية.",

      trustFeatures: [
        {
          icon: HeartHandshake,
          title: "تجارب حقيقية",
          description:
            "اقرأ تجارب الأشخاص الذين يستخدمون خدمات التعليم والمهارات والرعاية الصحية.",
        },
        {
          icon: ShieldCheck,
          title: "آراء موثوقة",
          description:
            "نقدر الآراء الصادقة ونعمل باستمرار على تطوير منصتنا بناءً على تجارب المستخدمين.",
        },
        {
          icon: GraduationCap,
          title: "تعلم وتطور",
          description:
            "منصتنا تساعد المتعلمين على تطوير المعرفة والثقة والمهارات العملية.",
        },
        {
          icon: Users,
          title: "مجتمع داعم",
          description:
            "تواصل مع المعلمين والمتخصصين في الرعاية الصحية ومجتمع التعلم.",
        },
      ],

      testimonials: [
        {
          text:
            "ساعدتني دورة العمل الحر على تطوير مسيرتي المهنية. البيئة التعليمية العملية ساعدتني على فهم العمل مع العملاء الدوليين.",

          name: "حسن",

          role: "طالب مهارات رقمية",

          course: "MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H",
        },

        {
          text:
            "منحتني دروس القرآن للنساء الثقة لتعلم التجويد في بيئة مريحة. المعلمات متعاونات وصبورات للغاية.",

          name: "عائشة",

          role: "التعليم الإسلامي",

          course: "الناظرة والتجويد",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A",
        },

        {
          text:
            "جعلت الاستشارة الطبية عبر الإنترنت من السهل بالنسبة لي مناقشة مشكلتي الصحية من المنزل. كانت التجربة مريحة واحترافية.",

          name: "زينب",

          role: "الرعاية الصحية",

          course: "استشارة فيديو",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z",
        },
      ],

      categories: {
        title: "اختر تجربتك",

        description:
          "تجمع TSH بين التعليم والرعاية الصحية والمهارات العملية في منصة واحدة. اختر القسم الذي يناسب احتياجاتك.",

        taleem: "تعليم",

        taleemDesc:
          "تعلم من خلال الدورات المنظمة والتعليم الإسلامي والموارد التعليمية.",

        sehat: "صحة",

        sehatDesc:
          "اكتشف خدمات الرعاية الصحية وتواصل مع المتخصصين الطبيين.",

        hunar: "مهارات",

        hunarDesc:
          "طور مهارات عملية ورقمية تساعدك في حياتك المهنية والشخصية.",
      },

      cta: {
        badge: "رحلتك تبدأ من هنا",

        title: "هل أنت مستعد",

        highlight: "لبدء فصل جديد؟",

        description:
          "سواء كنت تريد التعلم أو تحسين صحتك أو تطوير مهارة عملية، تساعدك TSH على العثور على المسار المناسب.",

        benefits: [
          {
            icon: BookOpen,
            title: "تعلم بهدف",
            description:
              "اكتشف فرصاً تعليمية مصممة لمساعدتك على التعلم بشكل هادف.",
          },
          {
            icon: Stethoscope,
            title: "رعاية بثقة",
            description:
              "احصل على خدمات صحية مصممة لتوفير الراحة والثقة.",
          },
          {
            icon: Sparkles,
            title: "طور مهاراتك",
            description:
              "اكتسب مهارات عملية تساعدك في مستقبلك الشخصي والمهني.",
          },
        ],

        button: "استكشف الأقسام",
      },
    },
  };

  const t = content[lang] || content.en;

  const isRTL = lang === "ur" || lang === "ar";

  const categoryPath = "/category";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-white py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-4xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-xl sm:px-6 sm:py-3">

            <HeartHandshake
              size={18}
              className="text-cyan-600"
            />

            <span className="font-semibold text-cyan-700">
              {t.badge}
            </span>

          </div>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">

            {t.title}

            <span className="mt-3 block bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-700 bg-clip-text text-transparent">
              {t.highlight}
            </span>

          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {t.description}
          </p>

        </div>

        {/* =====================================================
            TRUST / VALUE CARDS
            REPLACED ALL STATISTICS
        ====================================================== */}

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {t.trustFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-7"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-lg transition-transform duration-500 group-hover:scale-110">

                  <Icon size={27} />

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}

        <div className="mt-20 grid gap-7 lg:mt-24 lg:grid-cols-3">

          {t.testimonials.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-500 p-[1px] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >

              <div className="relative h-full rounded-[31px] bg-white/90 p-6 backdrop-blur-2xl sm:p-8">

                {/* Background Effects */}

                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

                {/* =================================================
                    TOP
                ================================================== */}

                <div className="relative z-10 flex items-center justify-between gap-3">

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={17}
                        className="fill-yellow-400 text-yellow-400 sm:h-[18px] sm:w-[18px]"
                      />

                    ))}

                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700 sm:text-xs">

                    <CheckCircle2 size={13} />

                    Verified Review

                  </div>

                </div>

                {/* =================================================
                    QUOTE
                ================================================== */}

                <div className="relative z-10 mt-7 rounded-3xl bg-slate-50 p-6 sm:mt-8 sm:p-7">

                  <Quote
                    size={40}
                    className="absolute -top-4 left-5 text-cyan-500"
                  />

                  <p className="pt-3 text-[15px] leading-7 italic text-slate-600 sm:text-[16px] sm:leading-8">
                    "{item.text}"
                  </p>

                </div>

                {/* =================================================
                    USER
                ================================================== */}

                <div className="relative z-10 mt-7 flex items-center gap-4 sm:mt-8 sm:gap-5">

                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.imageColor} text-xl font-bold text-white shadow-xl transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16`}
                  >
                    {item.letter}
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.role}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    COURSE BADGE
                ================================================== */}

                <div className="relative z-10 mt-6">

                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-xs font-semibold text-cyan-700 sm:text-sm">

                    <Award size={15} />

                    {item.course}

                  </span>

                </div>

                {/* =================================================
                    BOTTOM TRUST
                ================================================== */}

                <div className="relative z-10 mt-7 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">

                    <CheckCircle2
                      size={17}
                      className="text-green-500"
                    />

                    Verified Experience

                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-lg sm:px-5 sm:text-sm">

                    Trusted Member

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* =====================================================
            CATEGORY EXPLORATION
        ====================================================== */}

        <div className="mt-24 sm:mt-28">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">

              <Sparkles size={17} />

              Explore TSH

            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              {t.categories.title}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {t.categories.description}
            </p>

          </div>

          {/* Category Cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Taleem */}

            <Link
              to={categoryPath}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-cyan-700 to-cyan-500 p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl sm:p-8"
            >

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">

                  <BookOpen size={28} />

                </div>

                <h3 className="mt-7 text-2xl font-extrabold">
                  {t.categories.taleem}
                </h3>

                <p className="mt-3 leading-7 text-cyan-50">
                  {t.categories.taleemDesc}
                </p>

                <div className="mt-7 flex items-center gap-2 font-semibold">

                  Explore

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>

            {/* Sehat */}

            <Link
              to={categoryPath}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-emerald-700 to-green-500 p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl sm:p-8"
            >

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">

                  <Stethoscope size={28} />

                </div>

                <h3 className="mt-7 text-2xl font-extrabold">
                  {t.categories.sehat}
                </h3>

                <p className="mt-3 leading-7 text-green-50">
                  {t.categories.sehatDesc}
                </p>

                <div className="mt-7 flex items-center gap-2 font-semibold">

                  Explore

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>

            {/* Hunar */}

            <Link
              to={categoryPath}
              className="group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-yellow-600 to-orange-500 p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl sm:p-8"
            >

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">

                  <Sparkles size={28} />

                </div>

                <h3 className="mt-7 text-2xl font-extrabold">
                  {t.categories.hunar}
                </h3>

                <p className="mt-3 leading-7 text-yellow-50">
                  {t.categories.hunarDesc}
                </p>

                <div className="mt-7 flex items-center gap-2 font-semibold">

                  Explore

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>

          </div>

        </div>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <div className="mt-24 sm:mt-28">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0b2d36] via-cyan-800 to-[#0b2d36] p-7 shadow-[0_35px_80px_rgba(0,0,0,.22)] sm:rounded-[40px] sm:p-10 lg:p-16">

            {/* Background Effects */}

            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-yellow-400/20 blur-[120px]" />

            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

              {/* =================================================
                  LEFT
              ================================================== */}

              <div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-cyan-200 backdrop-blur-md">

                  <Award size={18} />

                  {t.cta.badge}

                </span>

                <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl">

                  {t.cta.title}

                  <span className="mt-2 block text-yellow-400">
                    {t.cta.highlight}
                  </span>

                </h2>

                <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  {t.cta.description}
                </p>

                <Link
                  to={categoryPath}
                  className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 text-base font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl sm:px-8"
                >

                  {t.cta.button}

                  <ArrowRight
                    size={21}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>

              </div>

              {/* =================================================
                  RIGHT BENEFITS
              ================================================== */}

              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl sm:p-7">

                <div className="space-y-4">

                  {t.cta.benefits.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="group rounded-2xl bg-white/10 p-4 transition-all duration-300 hover:bg-white/15 sm:p-5"
                      >

                        <div className="flex items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">

                            <Icon size={23} />

                          </div>

                          <div>

                            <h3 className="font-bold text-white">
                              {item.title}
                            </h3>

                            <p className="mt-1.5 text-sm leading-6 text-slate-400">
                              {item.description}
                            </p>

                          </div>

                        </div>

                      </div>
                    );

                  })}

                </div>

                <Link
                  to={categoryPath}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:bg-yellow-300 hover:shadow-2xl"
                >

                  {t.cta.button}

                  <ArrowRight size={21} />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

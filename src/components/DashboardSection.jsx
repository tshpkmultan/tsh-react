// src/components/DashboardSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  GraduationCap,
  Award,
  Folder,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  Bell,
  FileText,
  Clock3,
  PlayCircle,
} from "lucide-react";

export default function DashboardSection({ lang = "en" }) {
  const content = {
    en: {
      badge: "Smart Learning Platform",

      title: "Everything You Need In",

      highlight: "One Smart Learning Experience",

      description:
        "Explore a complete learning experience where students can access classes, learning materials, teachers, assignments, certificates and important updates from one place.",

      button: "Explore Categories",

      secondaryButton: "View All",

      serviceHighlights: [
        {
          icon: Calendar,
          title: "Class Schedule",
          desc: "Stay organized with your upcoming classes and learning sessions.",
        },
        {
          icon: ClipboardCheck,
          title: "Track Progress",
          desc: "Monitor assignments, attendance and your academic progress.",
        },
        {
          icon: MessageCircle,
          title: "Stay Connected",
          desc: "Communicate with teachers and stay updated with important notices.",
        },
        {
          icon: Award,
          title: "Earn Certificates",
          desc: "Access your certificates after successfully completing courses.",
        },
      ],

      dashboard: {
        title: "Student Dashboard",
        welcome: "Welcome back!",
        overview: "Your Learning Overview",

        classes: "Today's Classes",
        classesDesc: "Stay on top of your learning schedule.",

        assignments: "Assignments",
        assignmentsDesc: "Review and manage your pending work.",

        attendance: "Attendance",
        attendanceDesc: "Keep track of your class attendance.",

        notices: "Latest Notices",
        noticesDesc: "Stay updated with important announcements.",

        viewAll: "View All",

        live: "Live Now",
        upcoming: "Upcoming",
        pending: "Pending",
        completed: "Completed",

        class1: "React Development",
        class1Time: "09:00 AM - 10:30 AM",

        class2: "Quran Class",
        class2Time: "11:00 AM - 12:00 PM",

        notice: "New course material has been uploaded.",

        certificates: "Certificates",
        certificatesDesc: "Available after course completion",
      },

      featuresTitle: "Everything In One Place",

      featuresDescription:
        "Our learning platform gives students easy access to schedules, learning resources, certificates, communication and progress tracking.",

      features: [
        {
          icon: Calendar,
          title: "Class Schedule",
          desc: "View upcoming classes, timings and important learning sessions.",
        },
        {
          icon: MessageCircle,
          title: "Teacher Communication",
          desc: "Stay connected with teachers and receive important updates.",
        },
        {
          icon: Folder,
          title: "Learning Material",
          desc: "Access notes, lectures, documents and course resources.",
        },
        {
          icon: Award,
          title: "Certificates",
          desc: "Access and download your digital certificates anytime.",
        },
      ],

      highlights: [
        {
          icon: Calendar,
          title: "Daily Schedule",
          desc: "Never miss an important class.",
        },
        {
          icon: MessageCircle,
          title: "Community Support",
          desc: "Stay connected with your teachers.",
        },
        {
          icon: Award,
          title: "Verified Certificates",
          desc: "Access certificates after course completion.",
        },
      ],

      cta: {
        badge: "Explore TSH",

        title: "Learn.",

        highlight: "Grow.",

        final: "Succeed.",

        description:
          "Choose the category that matches your needs and continue to the right learning, health or skills experience.",

        dashboard: "Taleem",
        dashboardStatus: "Education",

        courses: "Sehat",
        coursesStatus: "Healthcare",

        certificates: "Hunar",
        certificatesStatus: "Skills",

        communication: "Choose Your Category",
        communicationStatus: "Get Started",
      },
    },

    ur: {
      badge: "اسمارٹ لرننگ پلیٹ فارم",

      title: "تمام سہولیات",

      highlight: "ایک جدید تعلیمی تجربہ",

      description:
        "ایک مکمل تعلیمی پلیٹ فارم جہاں طلبہ کلاسز، تعلیمی مواد، اساتذہ، اسائنمنٹس، سرٹیفکیٹس اور اہم معلومات تک ایک ہی جگہ سے رسائی حاصل کر سکتے ہیں۔",

      button: "کیٹیگریز دیکھیں",

      secondaryButton: "سب دیکھیں",

      serviceHighlights: [
        {
          icon: Calendar,
          title: "کلاس شیڈول",
          desc: "اپنی آنے والی کلاسز اور تعلیمی سیشنز کو منظم رکھیں۔",
        },
        {
          icon: ClipboardCheck,
          title: "پروگریس دیکھیں",
          desc: "اسائنمنٹس، حاضری اور تعلیمی کارکردگی کو مانیٹر کریں۔",
        },
        {
          icon: MessageCircle,
          title: "رابطے میں رہیں",
          desc: "اساتذہ سے رابطہ کریں اور اہم اطلاعات حاصل کریں۔",
        },
        {
          icon: Award,
          title: "سرٹیفکیٹس حاصل کریں",
          desc: "کورس مکمل کرنے کے بعد اپنے سرٹیفکیٹس حاصل کریں۔",
        },
      ],

      dashboard: {
        title: "اسٹوڈنٹ ڈیش بورڈ",
        welcome: "خوش آمدید!",
        overview: "آپ کی تعلیمی معلومات",

        classes: "آج کی کلاسز",
        classesDesc: "اپنے تعلیمی شیڈول سے باخبر رہیں۔",

        assignments: "اسائنمنٹس",
        assignmentsDesc: "اپنے زیر التواء کام دیکھیں۔",

        attendance: "حاضری",
        attendanceDesc: "اپنی کلاس حاضری چیک کریں۔",

        notices: "تازہ اطلاعات",
        noticesDesc: "اہم اعلانات سے باخبر رہیں۔",

        viewAll: "سب دیکھیں",

        live: "جاری ہے",
        upcoming: "آنے والی",
        pending: "زیر التواء",
        completed: "مکمل",

        class1: "ری ایکٹ ڈویلپمنٹ",
        class1Time: "09:00 صبح - 10:30 صبح",

        class2: "قرآن کلاس",
        class2Time: "11:00 صبح - 12:00 دوپہر",

        notice: "نیا کورس میٹریل اپ لوڈ کر دیا گیا ہے۔",

        certificates: "سرٹیفکیٹس",
        certificatesDesc: "کورس مکمل ہونے کے بعد دستیاب",
      },

      featuresTitle: "تمام سہولیات ایک جگہ",

      featuresDescription:
        "ہمارا لرننگ پلیٹ فارم طلبہ کو شیڈول، تعلیمی مواد، سرٹیفکیٹس، رابطے اور تعلیمی پروگریس تک آسان رسائی فراہم کرتا ہے۔",

      features: [
        {
          icon: Calendar,
          title: "کلاس شیڈول",
          desc: "آنے والی کلاسز، اوقات اور اہم تعلیمی سیشنز دیکھیں۔",
        },
        {
          icon: MessageCircle,
          title: "اساتذہ سے رابطہ",
          desc: "اساتذہ سے رابطے میں رہیں اور اہم معلومات حاصل کریں۔",
        },
        {
          icon: Folder,
          title: "تعلیمی مواد",
          desc: "نوٹس، لیکچرز، ڈاکومنٹس اور کورس میٹریل حاصل کریں۔",
        },
        {
          icon: Award,
          title: "سرٹیفکیٹس",
          desc: "اپنے ڈیجیٹل سرٹیفکیٹس کسی بھی وقت حاصل کریں۔",
        },
      ],

      highlights: [
        {
          icon: Calendar,
          title: "روزانہ شیڈول",
          desc: "اہم کلاس کبھی نہ چھوڑیں۔",
        },
        {
          icon: MessageCircle,
          title: "کمیونٹی سپورٹ",
          desc: "اپنے اساتذہ سے رابطے میں رہیں۔",
        },
        {
          icon: Award,
          title: "تصدیق شدہ سرٹیفکیٹس",
          desc: "کورس مکمل ہونے کے بعد سرٹیفکیٹ حاصل کریں۔",
        },
      ],

      cta: {
        badge: "TSH دریافت کریں",

        title: "سیکھیں۔",

        highlight: "آگے بڑھیں۔",

        final: "کامیاب ہوں۔",

        description:
          "اپنی ضرورت کے مطابق کیٹیگری منتخب کریں اور متعلقہ تعلیم، صحت یا ہنر کے پلیٹ فارم پر جائیں۔",

        dashboard: "تعلیم",
        dashboardStatus: "Taleem",

        courses: "صحت",
        coursesStatus: "Sehat",

        certificates: "ہنر",
        certificatesStatus: "Hunar",

        communication: "اپنی کیٹیگری منتخب کریں",
        communicationStatus: "شروع کریں",
      },
    },

    ar: {
      badge: "منصة تعليمية ذكية",

      title: "كل ما تحتاجه",

      highlight: "في تجربة تعليمية واحدة",

      description:
        "تجربة تعليمية متكاملة تتيح للطلاب الوصول إلى الدروس والمواد التعليمية والمعلمين والواجبات والشهادات والتحديثات المهمة من مكان واحد.",

      button: "استكشف الأقسام",

      secondaryButton: "عرض الكل",

      serviceHighlights: [
        {
          icon: Calendar,
          title: "جدول الدروس",
          desc: "نظم دروسك القادمة والجلسات التعليمية بسهولة.",
        },
        {
          icon: ClipboardCheck,
          title: "متابعة التقدم",
          desc: "تابع الواجبات والحضور والتقدم الأكاديمي.",
        },
        {
          icon: MessageCircle,
          title: "ابق على تواصل",
          desc: "تواصل مع المعلمين واحصل على أهم الإشعارات.",
        },
        {
          icon: Award,
          title: "الشهادات",
          desc: "احصل على شهاداتك الرقمية بعد إكمال الدورات.",
        },
      ],

      dashboard: {
        title: "لوحة الطالب",
        welcome: "مرحباً بعودتك!",
        overview: "نظرة عامة على تعلمك",

        classes: "دروس اليوم",
        classesDesc: "تابع جدولك التعليمي بسهولة.",

        assignments: "الواجبات",
        assignmentsDesc: "راجع وأدر أعمالك المطلوبة.",

        attendance: "الحضور",
        attendanceDesc: "تابع حضورك في الدروس.",

        notices: "آخر الإشعارات",
        noticesDesc: "ابق على اطلاع بأهم الإعلانات.",

        viewAll: "عرض الكل",

        live: "مباشر الآن",
        upcoming: "قادم",
        pending: "معلق",
        completed: "مكتمل",

        class1: "تطوير React",
        class1Time: "09:00 صباحاً - 10:30 صباحاً",

        class2: "درس القرآن",
        class2Time: "11:00 صباحاً - 12:00 ظهراً",

        notice: "تم رفع مواد تعليمية جديدة.",

        certificates: "الشهادات",
        certificatesDesc: "متاحة بعد إكمال الدورة",
      },

      featuresTitle: "كل شيء في مكان واحد",

      featuresDescription:
        "توفر منصة التعلم وصولاً سهلاً إلى الجداول والمواد التعليمية والشهادات والتواصل ومتابعة التقدم.",

      features: [
        {
          icon: Calendar,
          title: "جدول الدروس",
          desc: "عرض الدروس القادمة ومواعيدها والجلسات التعليمية المهمة.",
        },
        {
          icon: MessageCircle,
          title: "التواصل مع المعلمين",
          desc: "ابق على اتصال بالمعلمين واحصل على التحديثات المهمة.",
        },
        {
          icon: Folder,
          title: "المواد التعليمية",
          desc: "الوصول إلى الملاحظات والمحاضرات والوثائق والمواد التعليمية.",
        },
        {
          icon: Award,
          title: "الشهادات",
          desc: "الوصول إلى شهاداتك الرقمية وتحميلها في أي وقت.",
        },
      ],

      highlights: [
        {
          icon: Calendar,
          title: "الجدول اليومي",
          desc: "لا تفوت أي درس مهم.",
        },
        {
          icon: MessageCircle,
          title: "دعم المجتمع",
          desc: "ابق على اتصال مع معلميك.",
        },
        {
          icon: Award,
          title: "شهادات موثقة",
          desc: "احصل على شهادتك بعد إكمال الدورة.",
        },
      ],

      cta: {
        badge: "اكتشف TSH",

        title: "تعلم.",

        highlight: "تطور.",

        final: "تنجح.",

        description:
          "اختر القسم الذي يناسب احتياجاتك وانتقل إلى تجربة التعليم أو الصحة أو المهارات المناسبة لك.",

        dashboard: "تعليم",
        dashboardStatus: "Taleem",

        courses: "صحة",
        coursesStatus: "Sehat",

        certificates: "مهارات",
        certificatesStatus: "Hunar",

        communication: "اختر القسم الخاص بك",
        communicationStatus: "ابدأ الآن",
      },
    },
  };

  const t = content[lang] || content.en;

  const isRTL = lang === "ur" || lang === "ar";

  /*
   * ============================================================
   * IMPORTANT NAVIGATION
   * ============================================================
   *
   * All category/discovery buttons first go to:
   *
   * https://www.tshpk.com/category
   *
   * The category page should then allow the user to select:
   *
   * 1. Taleem
   * 2. Sehat
   * 3. Hunar
   *
   * ============================================================
   */

  const categoryPath = "/category";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gradient-to-br from-[#061c23] via-[#0b2d36] to-[#123f49] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[130px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[150px]" />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HERO
        ====================================================== */}

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ================= LEFT CONTENT ================= */}

          <div className="text-center lg:text-left">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-lg backdrop-blur-md sm:px-5">
              <LayoutDashboard size={17} />

              <span>{t.badge}</span>
            </div>

            {/* Heading */}

            <h2 className="mt-7 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[64px]">
              {t.title}

              <span className="mt-3 block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {t.highlight}
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
              {t.description}
            </p>

            {/* =================================================
                MAIN CATEGORY BUTTONS
            ================================================== */}

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

              {/* Explore Categories */}

              <Link
                to={categoryPath}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-[#0b2d36] shadow-xl shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl sm:px-8"
              >
                {t.button}

                <ArrowRight
                  size={21}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* View All */}

              <Link
                to={categoryPath}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 sm:px-8"
              >
                <BookOpen size={20} />

                {t.secondaryButton}

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

            {/* =================================================
                SERVICE HIGHLIGHTS
            ================================================== */}

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {t.serviceHighlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    to={categoryPath}
                    className="group rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/10"
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-400">
                          {item.desc}
                        </p>
                      </div>

                    </div>
                  </Link>
                );
              })}

            </div>
          </div>

          {/* =====================================================
              RIGHT DASHBOARD MOCKUP
          ====================================================== */}

          <div className="relative mx-auto w-full max-w-[520px]">

            {/* Glow */}

            <div className="absolute inset-8 rounded-[45px] bg-cyan-400/20 blur-[70px]" />

            {/* Dashboard Window */}

            <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_35px_100px_rgba(0,0,0,0.35)] sm:rounded-[36px]">

              {/* Browser Header */}

              <div className="flex items-center justify-between bg-[#08242c] px-4 py-4 sm:px-6 sm:py-5">

                <div className="flex gap-1.5 sm:gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3" />
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-white sm:text-sm">
                  <LayoutDashboard size={16} />

                  {t.dashboard.title}
                </div>

                <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

              </div>

              {/* Dashboard Body */}

              <div className="bg-slate-50 p-4 sm:p-6">

                {/* Welcome */}

                <div className="mb-5 rounded-2xl bg-gradient-to-r from-cyan-700 to-[#0b2d36] p-5 text-white sm:p-6">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs text-cyan-100 sm:text-sm">
                        {t.dashboard.welcome}
                      </p>

                      <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                        {t.dashboard.overview}
                      </h3>
                    </div>

                    <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                      <GraduationCap size={25} />
                    </div>

                  </div>

                </div>

                {/* =================================================
                    DASHBOARD QUICK CARDS
                ================================================== */}

                <div className="grid grid-cols-2 gap-3 sm:gap-4">

                  {/* Classes */}

                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 sm:p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                        <Calendar size={21} />
                      </div>

                      <span className="rounded-full bg-cyan-100 px-2 py-1 text-[10px] font-bold text-cyan-700 sm:text-xs">
                        {t.dashboard.live}
                      </span>

                    </div>

                    <h4 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
                      {t.dashboard.classes}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.dashboard.classesDesc}
                    </p>

                  </div>

                  {/* Assignments */}

                  <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4 sm:p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm">
                        <FileText size={21} />
                      </div>

                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold text-yellow-700 sm:text-xs">
                        {t.dashboard.pending}
                      </span>

                    </div>

                    <h4 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
                      {t.dashboard.assignments}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.dashboard.assignmentsDesc}
                    </p>

                  </div>

                  {/* Attendance */}

                  <div className="rounded-2xl border border-green-100 bg-green-50 p-4 sm:p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                        <CheckCircle size={21} />
                      </div>

                      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700 sm:text-xs">
                        {t.dashboard.completed}
                      </span>

                    </div>

                    <h4 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
                      {t.dashboard.attendance}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.dashboard.attendanceDesc}
                    </p>

                  </div>

                  {/* Notices */}

                  <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                        <Bell size={21} />
                      </div>

                      <span className="rounded-full bg-purple-100 px-2 py-1 text-[10px] font-bold text-purple-700 sm:text-xs">
                        New
                      </span>

                    </div>

                    <h4 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
                      {t.dashboard.notices}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.dashboard.noticesDesc}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    TODAY'S SCHEDULE
                ================================================== */}

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {t.dashboard.classes}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {t.dashboard.classesDesc}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <Clock3 size={19} />
                    </div>

                  </div>

                  <div className="mt-4 space-y-3">

                    {/* Class 1 */}

                    <div className="flex items-center gap-3 rounded-xl bg-cyan-50 p-3 sm:p-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white">
                        <PlayCircle size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <h4 className="truncate text-sm font-bold text-slate-800">
                          {t.dashboard.class1}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          {t.dashboard.class1Time}
                        </p>

                      </div>

                      <span className="hidden rounded-full bg-cyan-600 px-3 py-1 text-[10px] font-bold text-white sm:inline-block">
                        {t.dashboard.live}
                      </span>

                    </div>

                    {/* Class 2 */}

                    <div className="flex items-center gap-3 rounded-xl bg-yellow-50 p-3 sm:p-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-white">
                        <BookOpen size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <h4 className="truncate text-sm font-bold text-slate-800">
                          {t.dashboard.class2}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          {t.dashboard.class2Time}
                        </p>

                      </div>

                      <span className="hidden rounded-full bg-yellow-500 px-3 py-1 text-[10px] font-bold text-white sm:inline-block">
                        {t.dashboard.upcoming}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Notice */}

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Bell size={18} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {t.dashboard.notices}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.dashboard.notice}
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* =================================================
                FLOATING CERTIFICATE CARD
            ================================================== */}

            <Link
              to={categoryPath}
              className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-2xl transition duration-300 hover:-translate-y-1 sm:flex lg:-left-12 lg:translate-x-0"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Award
                  className="text-green-600"
                  size={25}
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {t.dashboard.certificates}
                </h4>

                <p className="text-xs text-slate-500">
                  {t.dashboard.certificatesDesc}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="text-cyan-700"
              />

            </Link>

          </div>
        </div>

        {/* =====================================================
            FEATURES SECTION
        ====================================================== */}

        <div
          id="dashboard-features"
          className="mt-24 scroll-mt-20 sm:mt-28"
        >

          {/* Section Heading */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
              <LayoutDashboard size={17} />

              Dashboard Features
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {t.featuresTitle}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {t.featuresDescription}
            </p>

          </div>

          {/* Feature Cards */}

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

            {t.features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={index}
                  to={categoryPath}
                  className="group rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/10 sm:p-7"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-300/5 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-400/20">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    {feature.desc}
                  </p>

                  {/* View All → Category Page */}

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    <span>{t.dashboard.viewAll}</span>

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                </Link>
              );
            })}

          </div>

          {/* =================================================
              FEATURE HIGHLIGHTS
          ================================================== */}

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {t.highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  to={categoryPath}
                  className="group rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08] sm:p-7"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 transition duration-300 group-hover:scale-110">
                      <Icon size={27} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.desc}
                      </p>
                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            PREMIUM CATEGORY CTA
        ====================================================== */}

        <div className="mt-24 sm:mt-28">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-700 via-[#0b2d36] to-cyan-950 p-7 shadow-2xl sm:rounded-[40px] sm:p-10 lg:p-16">

            {/* Background */}

            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[110px]" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

              {/* LEFT */}

              <div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-200 backdrop-blur-md">
                  <LayoutDashboard size={17} />

                  {t.cta.badge}
                </span>

                <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl">

                  {t.cta.title}

                  <span className="block text-yellow-400">
                    {t.cta.highlight}
                  </span>

                  <span className="block">
                    {t.cta.final}
                  </span>

                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  {t.cta.description}
                </p>

                <Link
                  to={categoryPath}
                  className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-[#0b2d36] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-yellow-300"
                >
                  {t.button}

                  <ArrowRight
                    size={21}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>

              {/* =================================================
                  CATEGORY SELECTION PREVIEW
              ================================================== */}

              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl sm:p-7">

                <div className="mb-5">

                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {t.cta.communication}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {t.cta.communicationStatus}
                  </p>

                </div>

                <div className="space-y-3">

                  {/* Taleem */}

                  <Link
                    to={categoryPath}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:px-5"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <GraduationCap size={21} />
                      </div>

                      <div>
                        <span className="block text-sm font-bold text-white">
                          {t.cta.dashboard}
                        </span>

                        <span className="text-xs text-slate-400">
                          {t.cta.dashboardStatus}
                        </span>
                      </div>

                    </div>

                    <ArrowRight
                      size={18}
                      className="text-cyan-300 transition-transform group-hover:translate-x-1"
                    />

                  </Link>

                  {/* Sehat */}

                  <Link
                    to={categoryPath}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:px-5"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10 text-green-300">
                        <CheckCircle size={21} />
                      </div>

                      <div>
                        <span className="block text-sm font-bold text-white">
                          {t.cta.courses}
                        </span>

                        <span className="text-xs text-slate-400">
                          {t.cta.coursesStatus}
                        </span>
                      </div>

                    </div>

                    <ArrowRight
                      size={18}
                      className="text-green-300 transition-transform group-hover:translate-x-1"
                    />

                  </Link>

                  {/* Hunar */}

                  <Link
                    to={categoryPath}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:px-5"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-300">
                        <Award size={21} />
                      </div>

                      <div>
                        <span className="block text-sm font-bold text-white">
                          {t.cta.certificates}
                        </span>

                        <span className="text-xs text-slate-400">
                          {t.cta.certificatesStatus}
                        </span>
                      </div>

                    </div>

                    <ArrowRight
                      size={18}
                      className="text-yellow-300 transition-transform group-hover:translate-x-1"
                    />

                  </Link>

                </div>

                {/* Main Category Button */}

                <Link
                  to={categoryPath}
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 font-bold text-[#0b2d36] shadow-xl transition duration-300 hover:bg-yellow-300 hover:shadow-2xl"
                >
                  {t.secondaryButton}

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

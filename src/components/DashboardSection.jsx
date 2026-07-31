import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  Folder,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function DashboardSection({ lang = "en" }) {
  const content = {
    en: {
      badge: "Student Dashboard",
      title: "Everything You Need In",
      highlight: "One Smart Dashboard",
      description:
        "Manage your complete learning journey from one powerful dashboard. Access classes, assignments, attendance, teachers, certificates and announcements anytime.",

      button: "Open Dashboard",

      stats: [
        {
          number: "10K+",
          label: "Students",
        },
        {
          number: "250+",
          label: "Courses",
        },
        {
          number: "500+",
          label: "Teachers",
        },
        {
          number: "98%",
          label: "Success Rate",
        },
      ],

      features: [
        {
          icon: Calendar,
          title: "Class Schedule",
          desc: "View upcoming classes and timings.",
        },
        {
          icon: MessageCircle,
          title: "WhatsApp Groups",
          desc: "Stay connected with teachers.",
        },
        {
          icon: Folder,
          title: "Learning Material",
          desc: "Download notes and lectures.",
        },
        {
          icon: Award,
          title: "Certificates",
          desc: "Receive digital certificates.",
        },
      ],
    },

    ur: {
      badge: "اسٹوڈنٹ ڈیش بورڈ",

      title: "تمام سہولیات",

      highlight: "ایک جدید ڈیش بورڈ",

      description:
        "اپنی کلاسز، اسائنمنٹس، اساتذہ، سرٹیفکیٹس اور شیڈول ایک ہی جگہ سے منظم کریں۔",

      button: "ڈیش بورڈ کھولیں",

      stats: [
        {
          number: "10K+",
          label: "طلبہ",
        },
        {
          number: "250+",
          label: "کورسز",
        },
        {
          number: "500+",
          label: "اساتذہ",
        },
        {
          number: "98%",
          label: "کامیابی",
        },
      ],

      features: [
        {
          icon: Calendar,
          title: "شیڈول",
          desc: "تمام کلاسوں کا شیڈول۔",
        },
        {
          icon: MessageCircle,
          title: "واٹس ایپ",
          desc: "اساتذہ سے رابطہ کریں۔",
        },
        {
          icon: Folder,
          title: "مطالعہ مواد",
          desc: "نوٹس اور لیکچرز حاصل کریں۔",
        },
        {
          icon: Award,
          title: "سرٹیفکیٹس",
          desc: "آن لائن سرٹیفکیٹس حاصل کریں۔",
        },
      ],
    },

    ar: {
      badge: "لوحة الطالب",

      title: "كل ما تحتاجه",

      highlight: "في لوحة ذكية",

      description:
        "يمكنك إدارة الدورات والواجبات والشهادات والمدرسين بسهولة من لوحة تحكم واحدة.",

      button: "فتح اللوحة",

      stats: [
        {
          number: "10K+",
          label: "طلاب",
        },
        {
          number: "250+",
          label: "دورات",
        },
        {
          number: "500+",
          label: "معلمون",
        },
        {
          number: "98%",
          label: "نجاح",
        },
      ],

      features: [
        {
          icon: Calendar,
          title: "الجدول",
          desc: "عرض جميع الدروس.",
        },
        {
          icon: MessageCircle,
          title: "واتساب",
          desc: "التواصل مع المعلمين.",
        },
        {
          icon: Folder,
          title: "المواد",
          desc: "تحميل الملفات.",
        },
        {
          icon: Award,
          title: "الشهادات",
          desc: "الحصول على الشهادات.",
        },
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#071f27] via-[#0b2d36] to-[#123d47]">

      {/* Background Blur */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[130px]" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/20 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* ================= LEFT CONTENT ================= */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 text-cyan-300 font-semibold">

              <LayoutDashboard size={18} />

              {t.badge}

            </span>

            <h2 className="mt-8 text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight">

              {t.title}

              <span className="block mt-3 text-yellow-400">

                {t.highlight}

              </span>

            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

              {t.description}

            </p>

            {/* Statistics */}

            <div className="grid grid-cols-2 gap-5 mt-12">

              {t.stats.map((item, index) => (

                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/15"
                >

                  <h3 className="text-4xl font-extrabold text-yellow-400">

                    {item.number}

                  </h3>

                  <p className="mt-2 text-slate-300">

                    {item.label}

                  </p>

                </div>

              ))}

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/login"
                className="inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-[#0b2d36] transition-all duration-300 hover:scale-105 hover:bg-yellow-300 shadow-xl"
              >

                {t.button}

                <ArrowRight size={22} />

              </Link>

              <button
                className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/20"
              >

                <BookOpen size={20} />

                Learn More

              </button>

            </div>

            {/* Bottom Highlights */}

            <div className="grid sm:grid-cols-3 gap-5 mt-14">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

                  <Users className="text-cyan-300" size={22} />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    10,000+

                  </h4>

                  <p className="text-sm text-slate-400">

                    Active Students

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 flex items-center justify-center">

                  <GraduationCap
                    className="text-yellow-300"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    250+

                  </h4>

                  <p className="text-sm text-slate-400">

                    Professional Courses

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">

                  <CheckCircle
                    className="text-green-300"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-bold text-white">

                    98%

                  </h4>

                  <p className="text-sm text-slate-400">

                    Student Satisfaction

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE START ================= */}

          <div className="relative flex justify-center">
                        {/* Dashboard Window */}

            <div className="relative w-full max-w-md rounded-[36px] overflow-hidden bg-white shadow-[0_35px_90px_rgba(0,0,0,.35)]">

              {/* Header */}

              <div className="bg-[#0b2d36] px-6 py-5 flex items-center justify-between">

                <div className="flex gap-2">

                  <span className="w-3 h-3 rounded-full bg-red-400"></span>

                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>

                  <span className="w-3 h-3 rounded-full bg-green-400"></span>

                </div>

                <h3 className="text-white font-semibold">

                  Student Dashboard

                </h3>

              </div>

              {/* Dashboard Body */}

              <div className="p-6">

                {/* Top Cards */}

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-cyan-50 p-5">

                    <Users
                      className="text-cyan-700"
                      size={28}
                    />

                    <h4 className="mt-4 font-bold">

                      Students

                    </h4>

                    <p className="mt-2 text-3xl font-bold text-cyan-700">

                      10K+

                    </p>

                  </div>

                  <div className="rounded-2xl bg-yellow-50 p-5">

                    <BookOpen
                      className="text-yellow-600"
                      size={28}
                    />

                    <h4 className="mt-4 font-bold">

                      Courses

                    </h4>

                    <p className="mt-2 text-3xl font-bold text-yellow-600">

                      250+

                    </p>

                  </div>

                  <div className="rounded-2xl bg-green-50 p-5">

                    <GraduationCap
                      className="text-green-600"
                      size={28}
                    />

                    <h4 className="mt-4 font-bold">

                      Certificates

                    </h4>

                    <p className="mt-2 text-3xl font-bold text-green-600">

                      1500+

                    </p>

                  </div>

                  <div className="rounded-2xl bg-purple-50 p-5">

                    <Award
                      className="text-purple-600"
                      size={28}
                    />

                    <h4 className="mt-4 font-bold">

                      Success

                    </h4>

                    <p className="mt-2 text-3xl font-bold text-purple-600">

                      98%

                    </p>

                  </div>

                </div>

                {/* Today's Schedule */}

                <div className="mt-6 rounded-2xl border border-slate-200 p-5">

                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-slate-800">

                      Today's Schedule

                    </h3>

                    <Calendar
                      className="text-cyan-700"
                      size={22}
                    />

                  </div>

                  <div className="mt-5 space-y-4">

                    <div className="flex items-center justify-between rounded-xl bg-cyan-50 p-4">

                      <div>

                        <h4 className="font-semibold">

                          React Development

                        </h4>

                        <p className="text-sm text-slate-500">

                          09:00 AM - 10:30 AM

                        </p>

                      </div>

                      <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs text-white">

                        Live

                      </span>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">

                      <div>

                        <h4 className="font-semibold">

                          Quran Class

                        </h4>

                        <p className="text-sm text-slate-500">

                          11:00 AM - 12:00 PM

                        </p>

                      </div>

                      <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs text-white">

                        Upcoming

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div className="hidden xl:flex absolute -left-8 bottom-10 bg-white rounded-3xl shadow-2xl border border-slate-100 px-6 py-5 items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <Award
                  className="text-green-600"
                  size={28}
                />

              </div>

              <div>

                <h4 className="font-bold text-slate-900">

                  Certificates Ready

                </h4>

                <p className="text-sm text-slate-500">

                  Download Anytime

                </p>

              </div>

            </div>

          </div>

        </div>
                  {/* ================= FEATURES ================= */}

        <div className="mt-28">

          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 font-semibold text-cyan-700">

              <LayoutDashboard size={18} />

              Dashboard Features

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-white">

              Everything In One Place

            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">

              Our student dashboard gives learners instant access to everything
              they need including schedules, learning resources, certificates,
              communication and progress tracking.

            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {t.features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={index}
                  className="group rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/15"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-300/10 transition duration-500 group-hover:scale-110">

                    <Icon
                      size={30}
                      className="text-cyan-300"
                    />

                  </div>

                  <h3 className="mt-7 text-2xl font-bold text-white">

                    {feature.title}

                  </h3>

                  <p className="mt-4 leading-7 text-slate-300">

                    {feature.desc}

                  </p>

                  <div className="mt-8 flex items-center gap-2 text-cyan-300 font-semibold">

                    Learn More

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-2"
                    />

                  </div>

                </div>

              );

            })}

          </div>

          {/* Feature Highlights */}

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20">

                  <Calendar
                    className="text-cyan-300"
                    size={30}
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-white">

                    Daily Schedule

                  </h3>

                  <p className="text-slate-300">

                    Never miss a class.

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20">

                  <MessageCircle
                    className="text-green-300"
                    size={30}
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-white">

                    Community Support

                  </h3>

                  <p className="text-slate-300">

                    Connect with mentors instantly.

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/20">

                  <Award
                    className="text-yellow-300"
                    size={30}
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-white">

                    Verified Certificates

                  </h3>

                  <p className="text-slate-300">

                    Download anytime after completion.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
                {/* ================= PREMIUM CTA ================= */}

        <div className="mt-28">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-700 via-[#0b2d36] to-cyan-900 p-10 lg:p-16 shadow-2xl">

            {/* Background */}

            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-400/20 blur-[130px]" />

            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-yellow-400/20 blur-[130px]" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}

              <div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-cyan-200">

                  <LayoutDashboard size={18} />

                  Smart Learning Platform

                </span>

                <h2 className="mt-8 text-4xl lg:text-5xl font-extrabold text-white leading-tight">

                  Learn.

                  <span className="block text-yellow-400">

                    Track.

                  </span>

                  <span className="block">

                    Succeed.

                  </span>

                </h2>

                <p className="mt-8 text-lg leading-8 text-slate-300 max-w-xl">

                  Access your classes, assignments, certificates,
                  attendance, notices and teachers from one secure
                  dashboard anytime and anywhere.

                </p>

              </div>

              {/* Right */}

              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8">

                <div className="space-y-5">

                  <div className="flex justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Dashboard

                    </span>

                    <span className="font-bold text-green-400">

                      Active

                    </span>

                  </div>

                  <div className="flex justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Courses

                    </span>

                    <span className="font-bold text-yellow-300">

                      250+

                    </span>

                  </div>

                  <div className="flex justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Certificates

                    </span>

                    <span className="font-bold text-cyan-300">

                      Ready

                    </span>

                  </div>

                  <div className="flex justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      WhatsApp Groups

                    </span>

                    <span className="font-bold text-green-400">

                      Connected

                    </span>

                  </div>

                </div>

                <Link
                  to="/login"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 font-bold text-[#0b2d36] transition-all duration-300 hover:scale-105 hover:bg-yellow-300 shadow-xl"
                >

                  {t.button}

                  <ArrowRight size={22} />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
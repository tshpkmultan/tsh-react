// src/components/Stats.jsx

import React from "react";
import {
  Users,
  UserCheck,
  Stethoscope,
  BadgeCheck,
} from "lucide-react";

export default function Stats({ lang = "en" }) {
  const content = {
    en: {
      badge: "Platform Statistics",
      title: "Trusted By Thousands",
      highlight: "Growing Every Day",
      description:
        "Our platform continues to empower students, teachers and healthcare professionals through quality education and trusted medical services.",

      stats: [
        {
          icon: Users,
          value: "10,000+",
          label: "Active Students",
          color: "from-cyan-500 to-sky-500",
        },
        {
          icon: UserCheck,
          value: "250+",
          label: "Expert Mentors",
          color: "from-yellow-500 to-orange-400",
        },
        {
          icon: Stethoscope,
          value: "100+",
          label: "Specialist Doctors",
          color: "from-emerald-500 to-green-400",
        },
        {
          icon: BadgeCheck,
          value: "100%",
          label: "Verified Certification",
          color: "from-violet-500 to-purple-500",
        },
      ],
    },

    ur: {
      badge: "اعداد و شمار",

      title: "ہزاروں افراد کا اعتماد",

      highlight: "روز بروز ترقی",

      description:
        "ہماری خدمات ہزاروں طلبہ، اساتذہ اور مریضوں کی زندگی میں مثبت تبدیلی لا رہی ہیں۔",

      stats: [
        {
          icon: Users,
          value: "10,000+",
          label: "فعال طلبہ",
          color: "from-cyan-500 to-sky-500",
        },
        {
          icon: UserCheck,
          value: "250+",
          label: "ماہر اساتذہ",
          color: "from-yellow-500 to-orange-400",
        },
        {
          icon: Stethoscope,
          value: "100+",
          label: "ماہر ڈاکٹرز",
          color: "from-emerald-500 to-green-400",
        },
        {
          icon: BadgeCheck,
          value: "100%",
          label: "مصدقہ سرٹیفکیٹ",
          color: "from-violet-500 to-purple-500",
        },
      ],
    },

    ar: {
      badge: "إحصائيات",

      title: "موثوق من الآلاف",

      highlight: "نمو مستمر",

      description:
        "منصتنا تساعد الطلاب والمعلمين والأطباء على تحقيق النجاح كل يوم.",

      stats: [
        {
          icon: Users,
          value: "10,000+",
          label: "الطلاب النشطون",
          color: "from-cyan-500 to-sky-500",
        },
        {
          icon: UserCheck,
          value: "250+",
          label: "المرشدون الخبراء",
          color: "from-yellow-500 to-orange-400",
        },
        {
          icon: Stethoscope,
          value: "100+",
          label: "الأطباء المتخصصون",
          color: "from-emerald-500 to-green-400",
        },
        {
          icon: BadgeCheck,
          value: "100%",
          label: "شهادة معتمدة",
          color: "from-violet-500 to-purple-500",
        },
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#071f27] via-[#0b2d36] to-[#123d47]">

      {/* Background */}

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-400/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-400/20 px-5 py-2 text-cyan-300 font-semibold">

            {t.badge}

          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold text-white">

            {t.title}

            <span className="block mt-3 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">

              {t.highlight}

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">

            {t.description}

          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {t.stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/30 hover:bg-white/15 hover:shadow-[0_25px_60px_rgba(0,0,0,.25)]"
              >

                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >

                  <Icon size={38} />

                </div>

                <h3 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">

                  {item.value}

                </h3>

                <p className="mt-3 text-base font-medium text-slate-300">

                  {item.label}

                </p>

                <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 transition-all duration-500 group-hover:w-24" />

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
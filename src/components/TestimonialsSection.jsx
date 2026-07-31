// src/components/TestimonialsSection.jsx

import React from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

export default function TestimonialsSection({ lang = "en" }) {

  const content = {

    en: {

      badge: "★★★★★ Trusted By Thousands",

      title: "Real Stories From",

      highlight: "Our Successful Students",

      description:
        "Discover how our students and patients transformed their lives through Digital Skills, Islamic Education and Healthcare services.",

      stats: [

        {
          number: "10K+",
          label: "Students"
        },

        {
          number: "250+",
          label: "Courses"
        },

        {
          number: "4.9★",
          label: "Average Rating"
        },

        {
          number: "98%",
          label: "Success Rate"
        }

      ],

      testimonials: [

        {

          text:
            "The Freelancing Masterclass completely changed my career. Within two months I landed my first international client and now work full-time from home.",

          name: "Hassan R.",

          role: "Digital Skills Student",

          course: "Completed MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H"

        },

        {

          text:
            "Female-only Quran classes gave me confidence to learn Tajweed in a comfortable environment. The teachers are very supportive.",

          name: "Ayesha M.",

          role: "Islamic Education",

          course: "Nazra & Tajweed",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A"

        },

        {

          text:
            "The online doctor consultation saved me time and money. The doctor diagnosed my condition perfectly and prescribed medicines immediately.",

          name: "Zainab K.",

          role: "Healthcare Patient",

          course: "Video Consultation",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z"

        }

      ]

    },

    ur: {

      badge: "★★★★★ ہزاروں لوگوں کا اعتماد",

      title: "ہمارے",

      highlight: "کامیاب طلبہ",

      description:
        "دیکھیں کہ ہمارے طلبہ اور مریضوں نے کس طرح اپنی زندگی بدلی۔",

      stats: [

        {
          number: "10K+",
          label: "طلبہ"
        },

        {
          number: "250+",
          label: "کورسز"
        },

        {
          number: "4.9★",
          label: "ریٹنگ"
        },

        {
          number: "98%",
          label: "کامیابی"
        }

      ],

      testimonials: [

        {

          text:
            "فری لانسنگ کورس نے میری زندگی بدل دی اور میں نے جلد ہی اپنی پہلی بین الاقوامی جاب حاصل کر لی۔",

          name: "حسن",

          role: "ڈیجیٹل اسکلز",

          course: "MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H"

        },

        {

          text:
            "آن لائن قرآن کلاسز نے میرے لیے سیکھنا آسان بنا دیا۔",

          name: "عائشہ",

          role: "اسلامی تعلیم",

          course: "تجوید",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A"

        },

        {

          text:
            "ویڈیو کنسلٹیشن کے ذریعے بہترین علاج ملا۔",

          name: "زینب",

          role: "ہیلتھ",

          course: "آن لائن ڈاکٹر",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z"

        }

      ]

    },

    ar: {

      badge: "★★★★★ موثوق من الآلاف",

      title: "قصص",

      highlight: "نجاح طلابنا",

      description:
        "تعرف على كيفية نجاح طلابنا ومرضانا من خلال منصتنا.",

      stats: [

        {
          number: "10K+",
          label: "طلاب"
        },

        {
          number: "250+",
          label: "دورات"
        },

        {
          number: "4.9★",
          label: "التقييم"
        },

        {
          number: "98%",
          label: "نجاح"
        }

      ],

      testimonials: [

        {

          text:
            "ساعدتني دورة العمل الحر في الحصول على أول عميل دولي خلال شهرين فقط.",

          name: "حسن",

          role: "طالب",

          course: "MERN Stack",

          imageColor: "from-cyan-600 to-cyan-400",

          letter: "H"

        },

        {

          text:
            "كانت دروس القرآن عبر الإنترنت مريحة للغاية.",

          name: "عائشة",

          role: "التعليم الإسلامي",

          course: "تجويد",

          imageColor: "from-yellow-500 to-orange-400",

          letter: "A"

        },

        {

          text:
            "كانت الاستشارة الطبية دقيقة وسريعة للغاية.",

          name: "زينب",

          role: "الرعاية الصحية",

          course: "استشارة فيديو",

          imageColor: "from-emerald-600 to-green-400",

          letter: "Z"

        }

      ]

    }

  };

  const t = content[lang] || content.en;

  return (

    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-cyan-50 to-white">

      {/* Background */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
                {/* ================= HEADER ================= */}

        <div className="text-center max-w-4xl mx-auto">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 backdrop-blur-xl px-6 py-3 shadow-lg">

            <Award
              size={18}
              className="text-yellow-500"
            />

            <span className="font-semibold text-cyan-700">

              {t.badge}

            </span>

          </div>

          <h2 className="mt-8 text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900">

            {t.title}

            <span className="block mt-3 bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-700 bg-clip-text text-transparent">

              {t.highlight}

            </span>

          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-slate-600">

            {t.description}

          </p>

        </div>

        {/* ================= TRUST BAR ================= */}

        <div className="mt-16 rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-xl p-8">

          <div className="grid gap-8 lg:grid-cols-3 items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg">

                <Star
                  size={30}
                  className="fill-white text-white"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-slate-900">

                  Rated Excellent

                </h3>

                <p className="text-slate-500">

                  Based on thousands of successful learners

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg">

                <CheckCircle2
                  size={30}
                  className="text-white"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-slate-900">

                  Verified Reviews

                </h3>

                <p className="text-slate-500">

                  Genuine feedback from our students & patients

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-500 shadow-lg">

                <TrendingUp
                  size={30}
                  className="text-white"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-slate-900">

                  Growing Every Day

                </h3>

                <p className="text-slate-500">

                  More students join our platform every week

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= STATISTICS ================= */}

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {t.stats.map((item, index) => (

            <div
              key={index}
              className="group rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 shadow-lg">

                <Users
                  size={32}
                  className="text-white"
                />

              </div>

              <h3 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">

                {item.number}

              </h3>

              <p className="mt-3 text-slate-600 font-medium">

                {item.label}

              </p>

            </div>

          ))}

        </div>

        {/* ================= TESTIMONIALS START ================= */}

        <div className="mt-24 grid gap-8 lg:grid-cols-3">

          {t.testimonials.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-400 via-sky-400 to-cyan-500 p-[1px] transition-all duration-500 hover:-translate-y-4 hover:rotate-[0.5deg] hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >

              <div className="relative h-full rounded-[31px] bg-white/85 backdrop-blur-2xl p-8">

                {/* Background Blur */}

                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

                {/* Top */}

                <div className="relative z-10 flex items-center justify-between">

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                    ))}

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    <CheckCircle2 size={14} />

                    Verified Review

                  </div>

                </div>

                {/* Quote Bubble */}

                <div className="relative z-10 mt-8 rounded-3xl bg-slate-50 p-7">

                  <Quote
                    size={42}
                    className="absolute -top-4 left-6 text-cyan-500"
                  />

                  <p className="pt-3 text-[16px] leading-8 italic text-slate-600">

                    "{item.text}"

                  </p>

                </div>

                {/* User */}

                <div className="relative z-10 mt-8 flex items-center gap-5">

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${item.imageColor} text-xl font-bold text-white shadow-xl transition-transform duration-500 group-hover:scale-110`}
                  >

                    {item.letter}

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">

                      {item.name}

                    </h3>

                    <p className="mt-1 text-slate-500">

                      {item.role}

                    </p>

                  </div>

                </div>

                {/* Course Badge */}

                <div className="relative z-10 mt-6">

                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">

                    <Award size={16} />

                    {item.course}

                  </span>

                </div>

                {/* Bottom */}

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-200 pt-6">

                  <div>

                    <p className="text-sm text-slate-500">

                      Overall Rating

                    </p>

                    <p className="font-bold text-slate-900">

                      5.0 / 5.0

                    </p>

                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">

                    Trusted Member

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ================= CTA START ================= */}

        <div className="mt-28">

                  <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0b2d36] via-cyan-800 to-[#0b2d36] p-10 lg:p-16 shadow-[0_35px_80px_rgba(0,0,0,.25)]">

            {/* Background Effects */}

            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />

            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-yellow-400/20 blur-[120px]" />

            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

              {/* Left Side */}

              <div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-cyan-200 backdrop-blur-md">

                  <Award size={18} />

                  Trusted Learning Platform

                </span>

                <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white lg:text-5xl">

                  Ready To Become

                  <span className="mt-2 block text-yellow-400">

                    Our Next Success Story?

                  </span>

                </h2>

                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

                  Join thousands of learners and patients who have already
                  transformed their future through our Digital Skills,
                  Islamic Education and Healthcare services.

                </p>

                <div className="mt-10 flex flex-wrap gap-6">

                  <div className="flex items-center gap-3 text-white">

                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />

                    Certified Courses

                  </div>

                  <div className="flex items-center gap-3 text-white">

                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />

                    Expert Mentors

                  </div>

                  <div className="flex items-center gap-3 text-white">

                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />

                    Lifetime Support

                  </div>

                </div>

              </div>

              {/* Right Side */}

              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

                <div className="space-y-5">

                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Student Satisfaction

                    </span>

                    <span className="font-bold text-green-400">

                      98%

                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Average Rating

                    </span>

                    <span className="font-bold text-yellow-300">

                      ★ 4.9

                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Active Students

                    </span>

                    <span className="font-bold text-cyan-300">

                      10K+

                    </span>

                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4">

                    <span className="text-white">

                      Expert Teachers

                    </span>

                    <span className="font-bold text-green-400">

                      100+

                    </span>

                  </div>

                </div>

                <button
                  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-8 py-4 text-lg font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >

                  Start Your Journey Today

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
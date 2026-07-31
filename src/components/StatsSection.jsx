// src/components/CTASection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  HeartPulse,
} from "lucide-react";

export default function CTASection({ lang = "en" }) {
  const content = {
    en: {
      badge: "Join Our Community",
      title: "Ready to Transform",
      highlight: "Your Future?",
      desc:
        "Start your journey with Digital Skills, Islamic Education, and Healthcare services. Join thousands of students and patients already benefiting from our platform.",

      register: "Student Registration",
      doctor: "Book Doctor",

      features: [
        "Certified Courses",
        "Expert Teachers",
        "Online Consultations",
      ],
    },

    ur: {
      badge: "ہماری کمیونٹی میں شامل ہوں",

      title: "اپنا مستقبل",

      highlight: "آج ہی بہتر بنائیں",

      desc:
        "ڈیجیٹل اسکلز، اسلامی تعلیم اور صحت کی سہولیات کے ذریعے اپنی کامیابی کا سفر شروع کریں۔",

      register: "طلبہ رجسٹریشن",

      doctor: "ڈاکٹر بک کریں",

      features: [
        "مصدقہ کورسز",
        "ماہر اساتذہ",
        "آن لائن کنسلٹیشن",
      ],
    },

    ar: {
      badge: "انضم إلى مجتمعنا",

      title: "ابدأ",

      highlight: "رحلتك اليوم",

      desc:
        "ابدأ رحلتك مع المهارات الرقمية والتعليم الإسلامي والخدمات الصحية.",

      register: "تسجيل الطالب",

      doctor: "احجز طبيب",

      features: [
        "دورات معتمدة",
        "معلمون خبراء",
        "استشارات عبر الإنترنت",
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#071f27] via-[#0b2d36] to-[#123d47]">

      {/* Background Effects */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur-xl p-10 lg:p-16 shadow-[0_30px_80px_rgba(0,0,0,.25)]">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 px-5 py-2 text-cyan-300 font-semibold">

                <GraduationCap size={18} />

                {t.badge}

              </span>

              <h2 className="mt-8 text-4xl lg:text-6xl font-extrabold text-white leading-tight">

                {t.title}

                <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">

                  {t.highlight}

                </span>

              </h2>

              <p className="mt-8 text-lg leading-8 text-slate-300 max-w-xl">

                {t.desc}

              </p>

              <div className="mt-10 space-y-4">

                {t.features.map((feature, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 text-white"
                  >

                    <CheckCircle
                      size={20}
                      className="text-green-400"
                    />

                    {feature}

                  </div>

                ))}

              </div>

            </div>

            {/* Right */}

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">

              <div className="space-y-5">

                <div className="flex justify-between items-center rounded-2xl bg-white/10 p-5">

                  <span className="text-white">

                    Students Enrolled

                  </span>

                  <span className="font-bold text-yellow-300">

                    10K+

                  </span>

                </div>

                <div className="flex justify-between items-center rounded-2xl bg-white/10 p-5">

                  <span className="text-white">

                    Professional Teachers

                  </span>

                  <span className="font-bold text-cyan-300">

                    250+

                  </span>

                </div>

                <div className="flex justify-between items-center rounded-2xl bg-white/10 p-5">

                  <span className="text-white">

                    Specialist Doctors

                  </span>

                  <span className="font-bold text-green-400">

                    100+

                  </span>

                </div>

                <div className="mt-8 flex flex-col gap-4">

                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 px-8 py-4 font-bold text-[#0b2d36] shadow-xl transition-all duration-300 hover:scale-105"
                  >

                    <UserPlus size={20} />

                    {t.register}

                    <ArrowRight size={18} />

                  </Link>

                  <Link
                    to="/enrollment-health"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-400/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                  >

                    <HeartPulse size={20} />

                    {t.doctor}

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
// src/pages/About.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  Laptop,
  BookOpen,
  Stethoscope,
  CheckCircle,
} from "lucide-react";

export default function About({ lang = "en" }) {
  const content = {
    en: {
      badge: "ABOUT EDUHEALTH",

      title1: "Empowering Lives Through",

      title2: "Education, Health",

      title3: "& Islamic Knowledge",

      subtitle:
        "EduHealth is a modern platform that combines Digital Skills, Healthcare Services, and Islamic Education under one trusted ecosystem for learners worldwide.",

      explore: "Explore Courses",

      contact: "Contact Us",

      who: "Who We Are",

      whoTitle: "One Platform. Three Powerful Services.",

      whoDesc1:
        "EduHealth was created with a vision to make quality education and healthcare accessible for everyone. We believe every person deserves opportunities to learn, improve their health, and strengthen their faith.",

      whoDesc2:
        "Our platform connects students, teachers, doctors, and Islamic scholars through modern technology while maintaining excellence, trust, and professionalism.",

      feature1: "Professional Digital Skills",

      feature2: "Certified Healthcare Services",

      feature3: "Authentic Islamic Education",
    },

    ur: {
      badge: "ہمارے بارے میں",

      title1: "تعلیم، صحت",

      title2: "اور اسلامی تعلیم",

      title3: "کے ذریعے بااختیار بنانا",

      subtitle:
        "EduHealth ایک جدید پلیٹ فارم ہے جو ڈیجیٹل مہارت، صحت اور اسلامی تعلیم کو ایک جگہ فراہم کرتا ہے۔",

      explore: "کورسز دیکھیں",

      contact: "رابطہ کریں",

      who: "ہم کون ہیں",

      whoTitle: "ایک پلیٹ فارم، تین بہترین خدمات",

      whoDesc1:
        "EduHealth کا مقصد معیاری تعلیم، صحت اور اسلامی تعلیم ہر فرد تک پہنچانا ہے۔",

      whoDesc2:
        "ہمارا پلیٹ فارم طلبہ، اساتذہ، ڈاکٹرز اور اسلامی اسکالرز کو جدید ٹیکنالوجی کے ذریعے جوڑتا ہے۔",

      feature1: "ڈیجیٹل مہارتیں",

      feature2: "ہیلتھ سروسز",

      feature3: "اسلامی تعلیم",
    },

    ar: {
      badge: "من نحن",

      title1: "تمكين الحياة من خلال",

      title2: "التعليم والصحة",

      title3: "والمعرفة الإسلامية",

      subtitle:
        "EduHealth منصة حديثة تجمع بين المهارات الرقمية والخدمات الصحية والتعليم الإسلامي.",

      explore: "استكشف الدورات",

      contact: "اتصل بنا",

      who: "من نحن",

      whoTitle: "منصة واحدة، ثلاث خدمات",

      whoDesc1:
        "تم إنشاء EduHealth لتوفير التعليم والرعاية الصحية للجميع.",

      whoDesc2:
        "نجمع الطلاب والمعلمين والأطباء والعلماء في منصة حديثة.",

      feature1: "المهارات الرقمية",

      feature2: "الخدمات الصحية",

      feature3: "التعليم الإسلامي",
    },
  };

  const t = content[lang] || content.en;

  return (
    <div className="bg-slate-50">

      {/* =======================================
                  HERO SECTION
      ======================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#08434B] via-[#0B5D66] to-[#127A85] text-white">

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">

          <div className="max-w-3xl">

            <span className="inline-flex items-center bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold mb-6">

              {t.badge}

            </span>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              {t.title1}

              <br />

              <span className="text-yellow-400">

                {t.title2}

              </span>

              <br />

              {t.title3}

            </h1>

            <p className="mt-8 text-xl text-slate-200 leading-9 max-w-2xl">

              {t.subtitle}

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/enrollment-education"
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition flex items-center gap-2"
              >
                {t.explore}

                <ArrowRight size={20} />

              </Link>

              <Link
                to="/contact"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#08434B] transition"
              >
                {t.contact}
              </Link>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================
                  WHO WE ARE
      ======================================== */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Side */}

            <div>

              <span className="inline-flex items-center bg-teal-100 text-[#08434B] px-4 py-2 rounded-full font-semibold">

                {t.who}

              </span>

              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 leading-tight">

                {t.whoTitle}

              </h2>

              <p className="mt-8 text-slate-600 text-lg leading-9">

                {t.whoDesc1}

              </p>

              <p className="mt-6 text-slate-600 text-lg leading-9">

                {t.whoDesc2}

              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-xl bg-yellow-400 flex items-center justify-center">

                    <Laptop className="text-black" />

                  </div>

                  <span className="font-semibold text-lg text-slate-800">

                    {t.feature1}

                  </span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-xl bg-teal-500 flex items-center justify-center">

                    <Stethoscope className="text-white" />

                  </div>

                  <span className="font-semibold text-lg text-slate-800">

                    {t.feature2}

                  </span>

                </div>

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-xl bg-indigo-500 flex items-center justify-center">

                    <BookOpen className="text-white" />

                  </div>

                  <span className="font-semibold text-lg text-slate-800">

                    {t.feature3}

                  </span>

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div className="relative">

              <div className="absolute -top-8 -left-8 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"></div>

              <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

                <div className="grid grid-cols-2 gap-6">

                  <div className="rounded-2xl bg-slate-50 p-6 text-center">

                    <Laptop
                      className="mx-auto text-[#08434B]"
                      size={42}
                    />

                    <h3 className="mt-5 font-bold text-lg text-slate-900">

                      Digital Skills

                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-7">

                      Professional IT courses designed for modern careers.

                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 p-6 text-center">

                    <BookOpen
                      className="mx-auto text-green-600"
                      size={42}
                    />

                    <h3 className="mt-5 font-bold text-lg text-slate-900">

                      Islamic Education

                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-7">

                      Learn Quran, Tajweed, Arabic and Islamic Studies.

                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 p-6 text-center">

                    <Stethoscope
                      className="mx-auto text-red-500"
                      size={42}
                    />

                    <h3 className="mt-5 font-bold text-lg text-slate-900">

                      Health Care

                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-7">

                      Online appointments with qualified doctors.

                    </p>

                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-[#08434B] to-[#0E7490] text-white p-6">

                    <CheckCircle
                      className="text-yellow-400"
                      size={42}
                    />

                    <h3 className="mt-5 text-2xl font-bold">

                      Trusted Platform

                    </h3>

                    <p className="mt-4 leading-7 text-slate-200">

                      Thousands of students and patients trust EduHealth every
                      day.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================
                MISSION & VISION
      ======================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-flex bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

              Our Purpose

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Mission & Vision

            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">

              Everything we build is focused on helping people grow
              professionally, spiritually and physically.

            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-16">

            {/* Mission */}

            <div className="bg-gradient-to-br from-[#08434B] to-[#0E7490] rounded-3xl p-10 text-white shadow-xl">

              <div className="h-16 w-16 rounded-2xl bg-yellow-400 flex items-center justify-center">

                <Target
                  className="text-black"
                  size={34}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8">

                Our Mission

              </h3>

              <p className="mt-6 text-slate-200 leading-8">

                To provide high-quality Digital Skills training,
                authentic Islamic Education and professional
                Healthcare Services through one trusted online
                platform accessible from anywhere in the world.

              </p>

            </div>

            {/* Vision */}

            <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl">

              <div className="h-16 w-16 rounded-2xl bg-cyan-100 flex items-center justify-center">

                <Eye
                  className="text-[#08434B]"
                  size={34}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8 text-slate-900">

                Our Vision

              </h3>

              <p className="mt-6 text-slate-600 leading-8">

                To become one of the world's leading educational
                and healthcare platforms where technology,
                knowledge and faith work together to improve lives.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =======================================
                THREE PILLARS
      ======================================== */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex bg-cyan-100 text-[#08434B] px-4 py-2 rounded-full font-semibold">

              Our Services

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Three Powerful Departments

            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-8">

              EduHealth combines three essential services under one
              modern platform to help you learn, stay healthy and
              strengthen your Islamic knowledge.

            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">

            {/* Card 1 */}

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-3 transition duration-500">

              <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Laptop
                  className="text-blue-600"
                  size={34}
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Digital Skills

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Learn Web Development, Graphic Design,
                Artificial Intelligence, Digital Marketing,
                Video Editing and many other professional skills.

              </p>

              <Link
                to="/enrollment-education"
                className="inline-flex items-center gap-2 mt-8 font-semibold text-[#08434B]"
              >

                Explore Courses

                <ArrowRight size={18} />

              </Link>

            </div>

            {/* Card 2 */}

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-3 transition duration-500">

              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

                <BookOpen
                  className="text-green-600"
                  size={34}
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Islamic Education

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Learn Quran, Tajweed, Arabic Language,
                Hadith, Islamic Studies and other courses
                from experienced scholars.

              </p>

              <Link
                to="/enrollment-islamic"
                className="inline-flex items-center gap-2 mt-8 font-semibold text-green-700"
              >

                Learn More

                <ArrowRight size={18} />

              </Link>

            </div>

            {/* Card 3 */}

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:-translate-y-3 transition duration-500">

              <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center">

                <Stethoscope
                  className="text-red-600"
                  size={34}
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Health Services

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Consult professional doctors online,
                book appointments and receive trusted
                healthcare guidance from qualified experts.

              </p>

              <Link
                to="/enrollment-health"
                className="inline-flex items-center gap-2 mt-8 font-semibold text-red-600"
              >

                Book Appointment

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================
                WHY CHOOSE EDUHEALTH
      ======================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

              Why Choose Us

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Why Thousands Trust EduHealth

            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-8">

              We combine technology, education, healthcare, and
              Islamic learning into one professional platform that
              helps people build a better future.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold">

                Certified Experts

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Learn from experienced teachers,
                scholars and healthcare professionals.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-blue-600"
              />

              <h3 className="mt-6 text-xl font-bold">

                Flexible Learning

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Study anytime and anywhere with
                our online learning platform.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-red-500"
              />

              <h3 className="mt-6 text-xl font-bold">

                Trusted Healthcare

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Consult qualified doctors securely
                through online appointments.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-yellow-500"
              />

              <h3 className="mt-6 text-xl font-bold">

                24/7 Support

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Our support team is always ready
                to help students and patients.

              </p>

            </div>

          </div>

        </div>

      </section>

     {/* =======================================
    TSH EXPERIENCE
======================================== */}

<section className="relative overflow-hidden bg-gradient-to-r from-[#08434B] to-[#0E7490] py-20 text-white sm:py-24">

  {/* Background Effects */}

  <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-300/10 blur-[120px]" />

  <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* =====================================
        HEADER
    ====================================== */}

    <div className="mx-auto max-w-3xl text-center">

      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-cyan-100 backdrop-blur-md">

        <Sparkles size={17} />

        The TSH Experience

      </span>

      <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">

        More Than Just a Platform

      </h2>

      <p className="mt-5 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">

        TSH brings learning, healthcare and personal development
        together in a simple and meaningful digital experience.

      </p>

    </div>


    {/* =====================================
        VALUE CARDS
    ====================================== */}

    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {/* =================================
          CARD 1
      ================================== */}

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.15] hover:shadow-2xl sm:p-7">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200 transition-transform duration-500 group-hover:scale-110">

          <BookOpen size={27} />

        </div>

        <h3 className="mt-6 text-xl font-bold">

          Meaningful Learning

        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">

          Explore structured educational resources
          designed to make learning easier and more engaging.

        </p>

      </div>


      {/* =================================
          CARD 2
      ================================== */}

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.15] hover:shadow-2xl sm:p-7">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 text-green-200 transition-transform duration-500 group-hover:scale-110">

          <HeartPulse size={27} />

        </div>

        <h3 className="mt-6 text-xl font-bold">

          Accessible Healthcare

        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">

          Connect with healthcare services and
          professional support when you need it.

        </p>

      </div>


      {/* =================================
          CARD 3
      ================================== */}

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.15] hover:shadow-2xl sm:p-7">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-200 transition-transform duration-500 group-hover:scale-110">

          <Sparkles size={27} />

        </div>

        <h3 className="mt-6 text-xl font-bold">

          Practical Skills

        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">

          Build useful digital and professional skills
          that can support your personal growth.

        </p>

      </div>


      {/* =================================
          CARD 4
      ================================== */}

      <div className="group rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.15] hover:shadow-2xl sm:p-7">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-200 transition-transform duration-500 group-hover:scale-110">

          <Users size={27} />

        </div>

        <h3 className="mt-6 text-xl font-bold">

          Connected Community

        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">

          Learn, connect and grow with teachers,
          professionals and a supportive community.

        </p>

      </div>

    </div>


    {/* =====================================
        BOTTOM MESSAGE
    ====================================== */}

    <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/10 bg-black/10 p-6 text-center backdrop-blur-md sm:mt-16 sm:p-8">

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">

        <CheckCircle
          size={22}
          className="shrink-0 text-green-300"
        />

        <p className="text-sm font-medium leading-6 text-slate-200 sm:text-base">

          A simple platform designed around
          learning, wellbeing and personal growth.

        </p>

      </div>

    </div>

  </div>

</section>
            {/* =======================================
                WHY CHOOSE EDUHEALTH
      ======================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

              Why Choose Us

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Why Thousands Trust EduHealth

            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-8">

              We combine technology, education, healthcare, and
              Islamic learning into one professional platform that
              helps people build a better future.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold">

                Certified Experts

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Learn from experienced teachers,
                scholars and healthcare professionals.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-blue-600"
              />

              <h3 className="mt-6 text-xl font-bold">

                Flexible Learning

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Study anytime and anywhere with
                our online learning platform.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-red-500"
              />

              <h3 className="mt-6 text-xl font-bold">

                Trusted Healthcare

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Consult qualified doctors securely
                through online appointments.

              </p>

            </div>

            <div className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition duration-500">

              <CheckCircle
                size={42}
                className="text-yellow-500"
              />

              <h3 className="mt-6 text-xl font-bold">

                24/7 Support

              </h3>

              <p className="mt-4 text-slate-600 leading-7">

                Our support team is always ready
                to help students and patients.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =======================================
                STATISTICS
      ======================================== */}

      <section className="py-24 bg-gradient-to-r from-[#08434B] to-[#0E7490] text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex bg-white/10 px-4 py-2 rounded-full">

              Our Achievements

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black">

              Growing Every Day

            </h2>

            <p className="mt-6 text-slate-200 text-lg max-w-3xl mx-auto">

              Our numbers reflect the trust and
              confidence of students, teachers,
              doctors and communities worldwide.

            </p>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                5,000+

              </h3>

              <p className="mt-3 text-slate-200">

                Students

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                120+

              </h3>

              <p className="mt-3 text-slate-200">

                Teachers

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                75+

              </h3>

              <p className="mt-3 text-slate-200">

                Doctors

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                40+

              </h3>

              <p className="mt-3 text-slate-200">

                Professional Courses

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                15+

              </h3>

              <p className="mt-3 text-slate-200">

                Countries

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                98%

              </h3>

              <p className="mt-3 text-slate-200">

                Success Rate

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                24/7

              </h3>

              <p className="mt-3 text-slate-200">

                Support

              </p>

            </div>

            <div className="text-center">

              <h3 className="text-5xl font-black text-yellow-400">

                100%

              </h3>

              <p className="mt-3 text-slate-200">

                Trusted Platform

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================
                OUR EXPERTS
      ======================================== */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex bg-cyan-100 text-[#08434B] px-4 py-2 rounded-full font-semibold">

              Our Team

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Meet Our Professional Experts

            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">

              Our dedicated teachers, doctors and trainers are committed
              to helping every learner achieve success.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-500"
              >

                <div className="h-64 bg-gradient-to-br from-[#08434B] to-[#0E7490] flex items-center justify-center">

                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-4xl font-black text-[#08434B]">

                    {item}

                  </div>

                </div>

                <div className="p-8">

                  <h3 className="text-xl font-bold">

                    Expert {item}

                  </h3>

                  <p className="text-cyan-700 mt-2">

                    Professional Instructor

                  </p>

                  <p className="mt-5 text-slate-600 leading-7">

                    Experienced professionals committed to delivering
                    quality education and healthcare services.

                  </p>

                </div>

              </div>
            ))}

          </div>

          <div className="text-center mt-14">

            <Link
              to="/team"
              className="inline-flex items-center gap-3 bg-[#08434B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0E7490] transition"
            >

              View Complete Team

              <ArrowRight size={20} />

            </Link>

          </div>

        </div>

      </section>

      {/* =======================================
                    CTA
      ======================================== */}

      <section className="py-24 bg-gradient-to-r from-[#08434B] to-[#0E7490] text-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <span className="inline-flex bg-white/10 px-5 py-2 rounded-full">

            Join EduHealth Today

          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight">

            Ready To Start

            <br />

            Your Journey?

          </h2>

          <p className="mt-8 text-xl text-slate-200 leading-9">

            Whether you're looking to learn professional digital skills,
            receive expert healthcare consultations or strengthen your
            Islamic knowledge, EduHealth is here to guide your journey.

          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            >

              Get Started

            </Link>

            <Link
              to="/contact"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#08434B] transition"
            >

              Contact Us

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

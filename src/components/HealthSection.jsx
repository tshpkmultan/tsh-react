// src/components/HealthSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  PlusCircle,
  Headphones,
  Video,
  HeartPulse,
  ShieldCheck,
  Clock3,
  Users,
  Star,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function HealthSection({ lang }) {
  const content = {
    en: {
      badge: "Department 03",
      title: "Professional Healthcare Services for Everyone",
      highlight: "Expert Doctors",
      desc:
        "Connect with experienced doctors from anywhere. Book appointments, consult online, and receive quality healthcare with confidence.",

      stats: [
        { value: "50+", label: "Qualified Doctors" },
        { value: "5K+", label: "Happy Patients" },
        { value: "15+", label: "Medical Specialties" },
        { value: "98%", label: "Success Rate" },
      ],

      online: "Online Consultation",
      available: "Doctors Available",
      appointment: "Book Appointment",
    },

    ur: {
      badge: "ڈیپارٹمنٹ 03",
      title: "ہر ایک کے لیے جدید طبی سہولیات",
      highlight: "ماہر ڈاکٹرز",
      desc:
        "تجربہ کار ڈاکٹروں سے گھر بیٹھے مشورہ حاصل کریں، اپائنٹمنٹ بک کریں اور معیاری صحت کی سہولت حاصل کریں۔",

      stats: [
        { value: "50+", label: "ماہر ڈاکٹرز" },
        { value: "5000+", label: "مریض" },
        { value: "15+", label: "اسپیشلٹیز" },
        { value: "98%", label: "کامیابی" },
      ],

      online: "آن لائن مشورہ",
      available: "ڈاکٹر دستیاب",
      appointment: "اپائنٹمنٹ بک کریں",
    },

    ar: {
      badge: "القسم 03",
      title: "خدمات صحية احترافية للجميع",
      highlight: "أطباء خبراء",
      desc:
        "احصل على استشارة طبية من أي مكان مع أفضل الأطباء واحجز موعدك بسهولة.",

      stats: [
        { value: "50+", label: "أطباء" },
        { value: "5K+", label: "مرضى" },
        { value: "15+", label: "تخصصات" },
        { value: "98%", label: "نجاح" },
      ],

      online: "استشارة أونلاين",
      available: "الأطباء متاحون",
      appointment: "احجز الآن",
    },
  };

  const t = content[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-yellow-50 py-24">

      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-200 rounded-full blur-[120px] opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= Left Side ================= */}

        <div>

          <span className="inline-flex items-center gap-2 bg-white shadow-md px-5 py-2 rounded-full text-sm font-semibold text-cyan-700">

            <HeartPulse size={18} />

            {t.badge}

          </span>

          <h2 className="mt-8 text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900">

            {t.title}

            <span className="block mt-3 text-cyan-600">

              {t.highlight}

            </span>

          </h2>

          <p className="mt-8 text-lg text-slate-600 leading-8 max-w-xl">

            {t.desc}

          </p>

          {/* Statistics */}

          <div className="grid grid-cols-2 gap-5 mt-10">

            {t.stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:-translate-y-2 hover:shadow-xl transition duration-300"
              >

                <h3 className="text-3xl font-extrabold text-cyan-700">

                  {item.value}

                </h3>

                <p className="mt-2 text-slate-500">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ================= Right Side ================= */}

        <div className="relative flex justify-center">

          {/* Main Circle */}

          <div className="w-[430px] h-[430px] rounded-full bg-gradient-to-br from-cyan-600 to-[#0b2d36] shadow-[0_25px_80px_rgba(0,0,0,0.25)] flex items-center justify-center">

            <Stethoscope
              size={170}
              className="text-white opacity-90"
            />

          </div>

          {/* Floating Online Card */}

          <div className="absolute top-12 -left-6 bg-white backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200 p-5 flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

              <Video
                className="text-green-600"
                size={28}
              />

            </div>

            <div>

              <p className="text-xs text-slate-500">

                {t.available}

              </p>

              <h4 className="font-bold text-slate-900">

                {t.online}

              </h4>

            </div>

          </div>
                    {/* Floating Rating Card */}

          <div className="absolute bottom-10 -right-6 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <Star
                  className="text-yellow-500 fill-yellow-500"
                  size={28}
                />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-slate-900">
                  4.9/5
                </h3>

                <p className="text-sm text-slate-500">
                  Patient Satisfaction
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Features ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-24">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Feature 1 */}

          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition duration-500">

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center group-hover:scale-110 transition">

              <Stethoscope
                size={30}
                className="text-cyan-700"
              />

            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-6">

              Medical Specialists

            </h3>

            <p className="mt-4 text-slate-600 leading-7">

              Access experienced doctors in General Medicine,
              Skin Care, Dental Care, Physiotherapy,
              Nutrition, Pediatrics and many more specialties.

            </p>

          </div>

          {/* Feature 2 */}

          <div className="group bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-500">

            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">

              <PlusCircle
                size={30}
                className="text-yellow-600"
              />

            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-6">

              Free Quick Consultation

            </h3>

            <p className="mt-4 text-slate-700 leading-7">

              Send your medical questions through chat and
              receive quick guidance from our healthcare
              professionals before booking a full consultation.

            </p>

          </div>

          {/* Feature 3 */}

          <div className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition duration-500">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

              <Video
                size={30}
                className="text-green-600"
              />

            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-6">

              Video Consultation

            </h3>

            <p className="mt-4 text-slate-600 leading-7">

              Meet doctors securely through high-quality
              video consultations from your home,
              saving both time and travel costs.

            </p>

          </div>

        </div>

      </div>

      {/* ================= Why Choose Us ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-24">

        <div className="bg-white rounded-[35px] shadow-xl border border-slate-100 p-10">

          <div className="text-center">

            <span className="text-cyan-700 font-semibold uppercase tracking-widest">

              Why Choose Us

            </span>

            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">

              Healthcare That Fits Your Lifestyle

            </h2>

            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">

              We combine qualified doctors, secure online consultations,
              affordable appointments and fast response times to deliver
              a seamless healthcare experience.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center">

                <ShieldCheck
                  className="text-cyan-700"
                  size={34}
                />

              </div>

              <h3 className="mt-5 text-xl font-bold">

                Trusted Doctors

              </h3>

              <p className="mt-3 text-slate-600">

                Verified healthcare professionals with years of experience.

              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                <Clock3
                  className="text-green-600"
                  size={34}
                />

              </div>

              <h3 className="mt-5 text-xl font-bold">

                Fast Booking

              </h3>

              <p className="mt-3 text-slate-600">

                Schedule appointments within minutes from any device.

              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

                <Users
                  className="text-yellow-600"
                  size={34}
                />

              </div>

              <h3 className="mt-5 text-xl font-bold">

                Patient Focused

              </h3>

              <p className="mt-3 text-slate-600">

                Personalized healthcare designed around every patient's needs.

              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">

                <CalendarDays
                  className="text-purple-600"
                  size={34}
                />

              </div>

              <h3 className="mt-5 text-xl font-bold">

                Flexible Schedule

              </h3>

              <p className="mt-3 text-slate-600">

                Book appointments based on your preferred date and time.

              </p>

            </div>

          </div>

        </div>

      </div>
            {/* ================= Premium CTA ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-24">

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0b2d36] via-cyan-900 to-[#0b2d36] px-8 md:px-16 py-16 shadow-2xl">

          {/* Background Effects */}

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-400 rounded-full blur-[120px] opacity-20"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}

            <div>

              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-cyan-200 text-sm">

                <HeartPulse size={18} />

                Premium Healthcare

              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">

                Book Your Appointment

                <span className="block text-yellow-400 mt-2">

                  With Qualified Doctors

                </span>

              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">

                Get professional healthcare from trusted doctors.
                Schedule an appointment, consult online, and receive
                quality medical advice wherever you are.

              </p>

            </div>

            {/* Right */}

            <div className="flex flex-col items-center lg:items-end gap-6">

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md">

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center">

                    <CalendarDays
                      size={32}
                      className="text-[#0b2d36]"
                    />

                  </div>

                  <div>

                    <h3 className="text-white font-bold text-xl">

                      Easy Appointment

                    </h3>

                    <p className="text-slate-300 text-sm">

                      Choose Doctor, Date & Time

                    </p>

                  </div>

                </div>

                <Link
                  to="/enrollment-health"
                  className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-[#0b2d36] font-bold py-4 rounded-2xl transition duration-300 shadow-lg hover:scale-105"
                >
                  {t.appointment}

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
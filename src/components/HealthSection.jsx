// src/components/HealthSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  PlusCircle,
  Video,
  HeartPulse,
  ShieldCheck,
  Clock3,
  Users,
  CalendarDays,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function HealthSection({ lang }) {
  const content = {
    en: {
      badge: "Department 03",
      title: "Professional Healthcare Services for Everyone",
      highlight: "Expert Doctors",
      desc:
        "Connect with experienced doctors from anywhere. Book appointments, consult online, and receive quality healthcare with confidence.",

      services: [
        {
          title: "Online Consultation",
          description:
            "Get healthcare guidance from experienced doctors without leaving your home.",
          icon: Video,
          color: "green",
          bg: "bg-green-100",
          text: "text-green-600",
        },
        {
          title: "Easy Appointment",
          description:
            "Choose your doctor, preferred date and time, and book your appointment easily.",
          icon: CalendarDays,
          color: "cyan",
          bg: "bg-cyan-100",
          text: "text-cyan-700",
        },
        {
          title: "Video Consultation",
          description:
            "Talk to qualified doctors through secure online video consultations.",
          icon: Video,
          color: "purple",
          bg: "bg-purple-100",
          text: "text-purple-600",
        },
        {
          title: "Trusted Healthcare",
          description:
            "Access professional and patient-focused healthcare services with confidence.",
          icon: ShieldCheck,
          color: "yellow",
          bg: "bg-yellow-100",
          text: "text-yellow-600",
        },
      ],

      online: "Online Consultation",
      available: "Doctors Available",
      appointment: "Book Appointment",

      features: {
        specialists: "Medical Specialists",
        specialistsDesc:
          "Access experienced doctors in General Medicine, Skin Care, Dental Care, Physiotherapy, Nutrition, Pediatrics and many more specialties.",

        quick: "Free Quick Consultation",
        quickDesc:
          "Send your medical questions through chat and receive quick guidance from our healthcare professionals before booking a full consultation.",

        video: "Video Consultation",
        videoDesc:
          "Meet doctors securely through high-quality video consultations from your home, saving both time and travel costs.",
      },

      why: {
        badge: "Why Choose Us",
        title: "Healthcare That Fits Your Lifestyle",
        desc:
          "We combine qualified doctors, secure online consultations, affordable appointments and fast response times to deliver a seamless healthcare experience.",

        trusted: "Trusted Doctors",
        trustedDesc:
          "Verified healthcare professionals with years of experience.",

        booking: "Fast Booking",
        bookingDesc:
          "Schedule appointments within minutes from any device.",

        patient: "Patient Focused",
        patientDesc:
          "Personalized healthcare designed around every patient's needs.",

        flexible: "Flexible Schedule",
        flexibleDesc:
          "Book appointments based on your preferred date and time.",
      },

      cta: {
        badge: "Premium Healthcare",
        title: "Book Your Appointment",
        highlight: "With Qualified Doctors",
        desc:
          "Get professional healthcare from trusted doctors. Schedule an appointment, consult online, and receive quality medical advice wherever you are.",

        easy: "Easy Appointment",
        choose: "Choose Doctor, Date & Time",
      },
    },

    ur: {
      badge: "ڈیپارٹمنٹ 03",
      title: "ہر ایک کے لیے جدید طبی سہولیات",
      highlight: "ماہر ڈاکٹرز",
      desc:
        "تجربہ کار ڈاکٹروں سے گھر بیٹھے مشورہ حاصل کریں، اپائنٹمنٹ بک کریں اور معیاری صحت کی سہولت حاصل کریں۔",

      services: [
        {
          title: "آن لائن مشورہ",
          description:
            "گھر بیٹھے تجربہ کار ڈاکٹروں سے صحت کے بارے میں رہنمائی حاصل کریں۔",
          icon: Video,
          color: "green",
          bg: "bg-green-100",
          text: "text-green-600",
        },
        {
          title: "آسان اپائنٹمنٹ",
          description:
            "اپنا ڈاکٹر، پسندیدہ تاریخ اور وقت منتخب کریں اور آسانی سے اپائنٹمنٹ بک کریں۔",
          icon: CalendarDays,
          color: "cyan",
          bg: "bg-cyan-100",
          text: "text-cyan-700",
        },
        {
          title: "ویڈیو مشاورت",
          description:
            "محفوظ آن لائن ویڈیو کے ذریعے ماہر ڈاکٹروں سے مشورہ حاصل کریں۔",
          icon: Video,
          color: "purple",
          bg: "bg-purple-100",
          text: "text-purple-600",
        },
        {
          title: "قابل اعتماد صحت",
          description:
            "اعتماد کے ساتھ پیشہ ورانہ اور مریضوں پر مرکوز طبی سہولیات حاصل کریں۔",
          icon: ShieldCheck,
          color: "yellow",
          bg: "bg-yellow-100",
          text: "text-yellow-600",
        },
      ],

      online: "آن لائن مشورہ",
      available: "ڈاکٹر دستیاب",
      appointment: "اپائنٹمنٹ بک کریں",

      features: {
        specialists: "ماہر طبی ڈاکٹرز",
        specialistsDesc:
          "جنرل میڈیسن، جلد، دانتوں، فزیوتھراپی، غذائیت، بچوں اور دیگر شعبوں کے تجربہ کار ڈاکٹروں تک رسائی حاصل کریں۔",

        quick: "مفت فوری مشاورت",
        quickDesc:
          "اپنے طبی سوالات چیٹ کے ذریعے بھیجیں اور مکمل مشاورت بک کرنے سے پہلے ہمارے ماہرین سے فوری رہنمائی حاصل کریں۔",

        video: "ویڈیو مشاورت",
        videoDesc:
          "گھر بیٹھے اعلیٰ معیار کی محفوظ ویڈیو مشاورت کے ذریعے ڈاکٹروں سے رابطہ کریں اور وقت و سفر کے اخراجات بچائیں۔",
      },

      why: {
        badge: "ہمیں کیوں منتخب کریں",
        title: "آپ کے طرز زندگی کے مطابق صحت کی سہولت",
        desc:
          "ہم ماہر ڈاکٹروں، محفوظ آن لائن مشاورت، آسان اپائنٹمنٹس اور تیز رسپانس کو یکجا کرکے بہترین طبی تجربہ فراہم کرتے ہیں۔",

        trusted: "قابل اعتماد ڈاکٹرز",
        trustedDesc:
          "تجربہ کار اور تصدیق شدہ طبی ماہرین۔",

        booking: "تیز بکنگ",
        bookingDesc:
          "کسی بھی ڈیوائس سے چند منٹ میں اپائنٹمنٹ حاصل کریں۔",

        patient: "مریضوں پر توجہ",
        patientDesc:
          "ہر مریض کی ضروریات کے مطابق ذاتی نوعیت کی صحت کی سہولت۔",

        flexible: "لچکدار شیڈول",
        flexibleDesc:
          "اپنی پسندیدہ تاریخ اور وقت کے مطابق اپائنٹمنٹ بک کریں۔",
      },

      cta: {
        badge: "اعلیٰ معیار کی صحت",
        title: "اپنی اپائنٹمنٹ بک کریں",
        highlight: "ماہر ڈاکٹروں کے ساتھ",
        desc:
          "قابل اعتماد ڈاکٹروں سے پیشہ ورانہ طبی سہولت حاصل کریں۔ اپائنٹمنٹ بک کریں، آن لائن مشاورت حاصل کریں اور جہاں بھی ہوں معیاری طبی رہنمائی حاصل کریں۔",

        easy: "آسان اپائنٹمنٹ",
        choose: "ڈاکٹر، تاریخ اور وقت منتخب کریں",
      },
    },

    ar: {
      badge: "القسم 03",
      title: "خدمات صحية احترافية للجميع",
      highlight: "أطباء خبراء",
      desc:
        "احصل على استشارة طبية من أي مكان مع أفضل الأطباء واحجز موعدك بسهولة.",

      services: [
        {
          title: "استشارة أونلاين",
          description:
            "احصل على إرشادات صحية من أطباء ذوي خبرة دون مغادرة منزلك.",
          icon: Video,
          color: "green",
          bg: "bg-green-100",
          text: "text-green-600",
        },
        {
          title: "حجز موعد بسهولة",
          description:
            "اختر الطبيب والتاريخ والوقت المناسب لك واحجز موعدك بسهولة.",
          icon: CalendarDays,
          color: "cyan",
          bg: "bg-cyan-100",
          text: "text-cyan-700",
        },
        {
          title: "استشارة بالفيديو",
          description:
            "تحدث مع الأطباء من خلال استشارات فيديو آمنة وعالية الجودة.",
          icon: Video,
          color: "purple",
          bg: "bg-purple-100",
          text: "text-purple-600",
        },
        {
          title: "رعاية صحية موثوقة",
          description:
            "احصل على خدمات صحية احترافية تركز على احتياجات المرضى.",
          icon: ShieldCheck,
          color: "yellow",
          bg: "bg-yellow-100",
          text: "text-yellow-600",
        },
      ],

      online: "استشارة أونلاين",
      available: "الأطباء متاحون",
      appointment: "احجز الآن",

      features: {
        specialists: "الأطباء المتخصصون",
        specialistsDesc:
          "يمكنك الوصول إلى أطباء ذوي خبرة في الطب العام والعناية بالبشرة والأسنان والعلاج الطبيعي والتغذية وطب الأطفال وغيرها من التخصصات.",

        quick: "استشارة سريعة مجانية",
        quickDesc:
          "أرسل أسئلتك الطبية عبر الدردشة واحصل على إرشادات سريعة من المتخصصين قبل حجز استشارة كاملة.",

        video: "استشارة بالفيديو",
        videoDesc:
          "تواصل مع الأطباء بأمان من خلال استشارات فيديو عالية الجودة من منزلك، مما يوفر الوقت وتكاليف السفر.",
      },

      why: {
        badge: "لماذا تختارنا",
        title: "رعاية صحية تناسب أسلوب حياتك",
        desc:
          "نجمع بين الأطباء المؤهلين والاستشارات الآمنة عبر الإنترنت وحجز المواعيد السهل والاستجابة السريعة لتقديم تجربة صحية متكاملة.",

        trusted: "أطباء موثوقون",
        trustedDesc:
          "متخصصون صحيون موثوقون وذوو خبرة.",

        booking: "حجز سريع",
        bookingDesc:
          "احجز موعدك خلال دقائق من أي جهاز.",

        patient: "رعاية تركز على المريض",
        patientDesc:
          "رعاية صحية مصممة وفق احتياجات كل مريض.",

        flexible: "جدول مرن",
        flexibleDesc:
          "احجز موعدك حسب التاريخ والوقت المفضل لديك.",
      },

      cta: {
        badge: "رعاية صحية متميزة",
        title: "احجز موعدك",
        highlight: "مع أطباء مؤهلين",
        desc:
          "احصل على رعاية صحية احترافية من أطباء موثوقين. احجز موعدًا واستشر الطبيب عبر الإنترنت واحصل على المشورة الطبية أينما كنت.",

        easy: "حجز موعد بسهولة",
        choose: "اختر الطبيب والتاريخ والوقت",
      },
    },
  };

  const t = content[lang] || content.en;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-yellow-50 py-24"
      dir={lang === "ar" || lang === "ur" ? "rtl" : "ltr"}
    >
      {/* ================= Background Effects ================= */}

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-200 rounded-full blur-[120px] opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-30"></div>

      {/* ================= Hero Content ================= */}

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

          {/* ================= Healthcare Services ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            {t.services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:-translate-y-2 hover:shadow-xl transition duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center group-hover:scale-110 transition duration-300`}
                  >
                    <Icon
                      size={24}
                      className={service.text}
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 leading-6">
                    {service.description}
                  </p>
                </div>
              );
            })}
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

          {/* ================= Floating Online Card ================= */}

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

          {/* ================= Floating Appointment Card ================= */}

          <div className="absolute bottom-10 -right-6 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <CalendarDays
                  className="text-yellow-500"
                  size={28}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Easy
                </h3>

                <p className="text-sm text-slate-500">
                  {t.appointment}
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
              {t.features.specialists}
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              {t.features.specialistsDesc}
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
              {t.features.quick}
            </h3>

            <p className="mt-4 text-slate-700 leading-7">
              {t.features.quickDesc}
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
              {t.features.video}
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              {t.features.videoDesc}
            </p>
          </div>
        </div>
      </div>

      {/* ================= Why Choose Us ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-white rounded-[35px] shadow-xl border border-slate-100 p-10">

          <div className="text-center">
            <span className="text-cyan-700 font-semibold uppercase tracking-widest">
              {t.why.badge}
            </span>

            <h2 className="text-4xl font-extrabold text-slate-900 mt-4">
              {t.why.title}
            </h2>

            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
              {t.why.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            {/* Trusted Doctors */}

            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center">
                <ShieldCheck
                  className="text-cyan-700"
                  size={34}
                />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {t.why.trusted}
              </h3>

              <p className="mt-3 text-slate-600">
                {t.why.trustedDesc}
              </p>
            </div>

            {/* Fast Booking */}

            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <Clock3
                  className="text-green-600"
                  size={34}
                />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {t.why.booking}
              </h3>

              <p className="mt-3 text-slate-600">
                {t.why.bookingDesc}
              </p>
            </div>

            {/* Patient Focused */}

            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                <Users
                  className="text-yellow-600"
                  size={34}
                />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {t.why.patient}
              </h3>

              <p className="mt-3 text-slate-600">
                {t.why.patientDesc}
              </p>
            </div>

            {/* Flexible Schedule */}

            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
                <CalendarDays
                  className="text-purple-600"
                  size={34}
                />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {t.why.flexible}
              </h3>

              <p className="mt-3 text-slate-600">
                {t.why.flexibleDesc}
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
                {t.cta.badge}
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {t.cta.title}

                <span className="block text-yellow-400 mt-2">
                  {t.cta.highlight}
                </span>
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
                {t.cta.desc}
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
                      {t.cta.easy}
                    </h3>

                    <p className="text-slate-300 text-sm">
                      {t.cta.choose}
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

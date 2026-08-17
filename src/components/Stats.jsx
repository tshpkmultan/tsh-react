import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  UserCheck,
  Stethoscope,
  BadgeCheck,
} from "lucide-react";

const BASE_URL =
  "https://800junkuae.online/tsh-api/API";

export default function Stats({ lang = "en" }) {

  /* =========================================
     STATES
  ========================================= */

  const [stats, setStats] = useState({
    students: 0,
    verified_students: 0,
    teachers: 0,
    doctors: 0,
  });

  const [loading, setLoading] = useState(true);


  /* =========================================
     FETCH REAL TIME STATS
  ========================================= */

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/home/stats.php`
      );

      console.log("Stats API Response:", res.data);

      if (res.data.status === "success") {

        setStats({

          students:
            Number(res.data.stats.students) || 0,

          verified_students:
            Number(res.data.stats.verified_students) || 0,

          teachers:
            Number(res.data.stats.teachers) || 0,

          doctors:
            Number(res.data.stats.doctors) || 0,

        });

      }

    } catch (error) {

      console.error(
        "Stats API Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  /* =========================================
     LOAD STATS
  ========================================= */

  useEffect(() => {

    fetchStats();

    // Refresh every 30 seconds
    const interval = setInterval(
      fetchStats,
      30000
    );

    return () => clearInterval(interval);

  }, []);


  /* =========================================
     FORMAT NUMBERS
  ========================================= */

  const formatNumber = (number) => {

    return new Intl.NumberFormat().format(
      number
    );

  };


  /* =========================================
     TRANSLATIONS
  ========================================= */

  const content = {

    // =======================================
    // ENGLISH
    // =======================================

    en: {

      badge: "Platform Statistics",

      title: "Trusted By Thousands",

      highlight: "Growing Every Day",

      description:
        "Our platform continues to empower students, teachers and healthcare professionals through quality education and trusted medical services.",

      stats: [

        {
          icon: Users,

          value: stats.students,

          label: "Active Students",

          color:
            "from-cyan-500 to-sky-500",
        },

        {
          icon: UserCheck,

          value: stats.teachers,

          label: "Expert Mentors",

          color:
            "from-yellow-500 to-orange-400",
        },

        {
          icon: Stethoscope,

          value: stats.doctors,

          label: "Specialist Doctors",

          color:
            "from-emerald-500 to-green-400",
        },

        {
          icon: BadgeCheck,

          value: stats.verified_students,

          label: "Verified Students",

          color:
            "from-violet-500 to-purple-500",
        },

      ],
    },


    // =======================================
    // URDU
    // =======================================

    ur: {

      badge: "اعداد و شمار",

      title: "ہزاروں افراد کا اعتماد",

      highlight: "روز بروز ترقی",

      description:
        "ہماری خدمات طلبہ، اساتذہ اور مریضوں کو معیاری تعلیم اور قابل اعتماد طبی سہولیات فراہم کر رہی ہیں۔",

      stats: [

        {
          icon: Users,

          value: stats.students,

          label: "فعال طلبہ",

          color:
            "from-cyan-500 to-sky-500",
        },

        {
          icon: UserCheck,

          value: stats.teachers,

          label: "ماہر اساتذہ",

          color:
            "from-yellow-500 to-orange-400",
        },

        {
          icon: Stethoscope,

          value: stats.doctors,

          label: "ماہر ڈاکٹرز",

          color:
            "from-emerald-500 to-green-400",
        },

        {
          icon: BadgeCheck,

          value: stats.verified_students,

          label: "مصدقہ طلبہ",

          color:
            "from-violet-500 to-purple-500",
        },

      ],
    },


    // =======================================
    // ARABIC
    // =======================================

    ar: {

      badge: "إحصائيات",

      title: "موثوق من الآلاف",

      highlight: "نمو مستمر",

      description:
        "منصتنا تساعد الطلاب والمعلمين والأطباء على تحقيق النجاح من خلال التعليم الجيد والخدمات الطبية الموثوقة.",

      stats: [

        {
          icon: Users,

          value: stats.students,

          label: "الطلاب النشطون",

          color:
            "from-cyan-500 to-sky-500",
        },

        {
          icon: UserCheck,

          value: stats.teachers,

          label: "المرشدون الخبراء",

          color:
            "from-yellow-500 to-orange-400",
        },

        {
          icon: Stethoscope,

          value: stats.doctors,

          label: "الأطباء المتخصصون",

          color:
            "from-emerald-500 to-green-400",
        },

        {
          icon: BadgeCheck,

          value: stats.verified_students,

          label: "الطلاب الموثقون",

          color:
            "from-violet-500 to-purple-500",
        },

      ],
    },

  };


  const t =
    content[lang] || content.en;


  /* =========================================
     UI
  ========================================= */

  return (

    <section
      className="
        relative
        overflow-hidden
        py-24
        bg-gradient-to-br
        from-[#071f27]
        via-[#0b2d36]
        to-[#123d47]
      "
    >

      {/* =====================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div
        className="
          absolute
          -top-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-cyan-500/20
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-yellow-400/20
          blur-[140px]
        "
      />


      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
        "
      >

        {/* =====================================
            HEADING
        ====================================== */}

        <div
          className="
            text-center
            max-w-3xl
            mx-auto
          "
        >

          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-cyan-500/10
              border
              border-cyan-400/20
              px-5
              py-2
              text-cyan-300
              font-semibold
            "
          >
            {t.badge}
          </span>


          <h2
            className="
              mt-6
              text-4xl
              lg:text-5xl
              font-extrabold
              text-white
            "
          >

            {t.title}

            <span
              className="
                block
                mt-3
                bg-gradient-to-r
                from-yellow-300
                to-yellow-500
                bg-clip-text
                text-transparent
              "
            >
              {t.highlight}
            </span>

          </h2>


          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-300
            "
          >
            {t.description}
          </p>

        </div>


        {/* =====================================
            CARDS
        ====================================== */}

        <div
          className="
            mt-20
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {t.stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/10
                  backdrop-blur-xl
                  p-8
                  text-center
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-cyan-400/30
                  hover:bg-white/15
                  hover:shadow-[0_25px_60px_rgba(0,0,0,.25)]
                "
              >

                {/* ICON */}

                <div
                  className={`
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    ${item.color}
                    text-white
                    shadow-xl
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  `}
                >

                  <Icon size={38} />

                </div>


                {/* NUMBER */}

                <h3
                  className="
                    mt-8
                    text-4xl
                    font-extrabold
                    bg-gradient-to-r
                    from-white
                    to-cyan-200
                    bg-clip-text
                    text-transparent
                  "
                >

                  {loading
                    ? "..."
                    : formatNumber(item.value)
                  }

                  {!loading && "+"}

                </h3>


                {/* LABEL */}

                <p
                  className="
                    mt-3
                    text-base
                    font-medium
                    text-slate-300
                  "
                >
                  {item.label}
                </p>


                {/* LINE */}

                <div
                  className="
                    mx-auto
                    mt-6
                    h-1
                    w-16
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-yellow-400
                    transition-all
                    duration-500
                    group-hover:w-24
                  "
                />

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

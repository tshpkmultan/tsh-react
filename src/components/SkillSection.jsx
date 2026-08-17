// src/components/SkillSection.jsx

import React, { useEffect, useState } from "react";
import {
  Clock,
  Calendar,
  DollarSign,
  User,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function SkillSection({ lang }) {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = {

    en: {
      small: "DEPARTMENT 1",
      title: "Digital Skills & Freelancing",
      desc:
        "Learn today's most in-demand digital skills from professional trainers and build your online career.",
      trainer: "Trainer",
      duration: "Duration",
      level: "Level",
      fee: "Fee",
      classDays: "Class Days",
      classTime: "Class Time",
      admission: "Admission",
      enroll: "Enroll Now",
      viewAll: "View All Courses",
      noData: "No Courses Available",
      loading: "Loading Courses..."
    },

    ur: {
      small: "ڈیپارٹمنٹ 1",
      title: "ڈیجیٹل مہارتیں اور فری لانسنگ",
      desc:
        "پیشہ ور ٹرینرز سے جدید ڈیجیٹل مہارتیں سیکھیں اور آن لائن کیریئر بنائیں۔",
      trainer: "ٹرینر",
      duration: "مدت",
      level: "لیول",
      fee: "فیس",
      classDays: "کلاس کے دن",
      classTime: "کلاس کا وقت",
      admission: "داخلہ",
      enroll: "ابھی داخلہ لیں",
      viewAll: "تمام کورسز",
      noData: "کوئی کورس موجود نہیں",
      loading: "کورسز لوڈ ہو رہے ہیں..."
    },

    ar: {
      small: "القسم الأول",
      title: "المهارات الرقمية والعمل الحر",
      desc:
        "تعلم أحدث المهارات الرقمية من مدربين محترفين وابدأ حياتك المهنية.",
      trainer: "المدرب",
      duration: "المدة",
      level: "المستوى",
      fee: "الرسوم",
      classDays: "أيام الدراسة",
      classTime: "وقت الدراسة",
      admission: "التسجيل",
      enroll: "سجل الآن",
      viewAll: "عرض جميع الدورات",
      noData: "لا توجد دورات",
      loading: "جار تحميل الدورات..."
    }

  };

  const t = content[lang];

  useEffect(() => {

    fetch(`${BASE_URL}/home/digital_courses.php`)
      .then((res) => res.json())
      .then((data) => {

        if (data.status === "success") {
          setCourses(data.courses);
        }

        setLoading(false);

      })
      .catch((err) => {

        console.error(err);
        setLoading(false);

      });

  }, []);

  return (

<section
  id="digital-skills"
  className="bg-gray-100 py-20 px-5"
>
<div className="max-w-7xl mx-auto">

{/* Heading */}

<div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-14">

<div>

<p className="uppercase tracking-[4px] text-yellow-500 font-semibold">

{t.small}

</p>

<h2 className="text-4xl lg:text-5xl font-bold text-[#0b2d36] mt-3">

{t.title}

</h2>

<p className="text-gray-600 mt-5 max-w-2xl leading-8">

{t.desc}

</p>

</div>



</div>

{/* Loading */}

{
loading ?

<div className="text-center py-20 text-xl">

{t.loading}

</div>

:

courses.length===0 ?

<div className="text-center py-20 text-xl">

{t.noData}

</div>

:

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (

            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group"
            >

              {/* Image */}

              <div className="relative">

                <img
                  src={
                    course.image && course.image !== ""
                      ? course.image
                      : "https://placehold.co/600x400?text=Digital+Course"
                  }
                  alt={course.title}
                  className="w-full h-56 object-contain group-hover:scale-110 transition duration-500"
                />

                <span
                  className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold text-white ${
                    course.admission_status === "open"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {course.admission_status}
                </span>

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="text-2xl font-bold text-[#0b2d36] mb-3">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm leading-6 mb-5 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-3">

                  {/* Trainer */}

                  <div className="flex items-center gap-3">

                    <User
                      size={18}
                      className="text-blue-600"
                    />

                    <span className="font-semibold">
                      {t.trainer}:
                    </span>

                    <span className="text-gray-600">
                      {course.trainer_name || "-"}
                    </span>

                  </div>

                  {/* Duration */}

                  <div className="flex items-center gap-3">

                    <Clock
                      size={18}
                      className="text-yellow-600"
                    />

                    <span className="font-semibold">
                      {t.duration}:
                    </span>

                    <span className="text-gray-600">
                      {course.duration}
                    </span>

                  </div>

                  {/* Level */}

                  <div className="flex items-center gap-3">

                    <GraduationCap
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="font-semibold">
                      {t.level}:
                    </span>

                    <span className="text-gray-600">
                      {course.level}
                    </span>

                  </div>

                  {/* Class Days */}

                  <div className="flex items-center gap-3">

                    <Calendar
                      size={18}
                      className="text-green-600"
                    />

                    <span className="font-semibold">
                      {t.classDays}:
                    </span>

                    <span className="text-gray-600">
                      {course.class_days}
                    </span>

                  </div>

                  {/* Class Time */}

                  <div className="flex items-center gap-3">

                    <Clock
                      size={18}
                      className="text-red-600"
                    />

                    <span className="font-semibold">
                      {t.classTime}:
                    </span>

                    <span className="text-gray-600">
                      {course.class_time}
                    </span>

                  </div>

                  {/* Fee */}

                  <div className="flex items-center gap-3">

                    <DollarSign
                      size={18}
                      className="text-green-700"
                    />

                    <span className="font-semibold">
                      {t.fee}:
                    </span>

                    <span className="text-[#0b2d36] font-bold">
                      Rs. {course.fee}
                    </span>

                  </div>

                </div>

                {/* Button */}

             <Link
  to="/enrollment-education"
  className="mt-6 w-full bg-[#0b2d36] hover:bg-[#15414b] text-white py-3 rounded-xl font-semibold transition flex items-center justify-center"
>
  {t.enroll}
</Link>

              </div>

            </div>

          ))}

        </div>

      }

    </div>

</section>

  );

}

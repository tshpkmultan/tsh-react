// src/components/IslamicSection.jsx

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Book,
  Users,
  Scale,
  Clock,
  User,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function IslamicSection({ lang }) {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = {
    en: {
      small: "DEPARTMENT 2",
      title: "Islamic Education",
      subtitle: "(التعليم الإسلامي)",
      desc:
        "Learn authentic Islamic knowledge from qualified scholars. Browse our latest Islamic courses below.",
      duration: "Duration",
      teacher: "Teacher",
      fee: "Fee",
      enroll: "Enroll Now",
      noCourse: "No Islamic Courses Available",
    },

    ur: {
      small: "ڈیپارٹمنٹ 2",
      title: "اسلامی تعلیم",
      subtitle: "",
      desc:
        "مستند علماء کرام سے اسلامی تعلیم حاصل کریں۔ ہمارے جدید اسلامی کورسز دیکھیں۔",
      duration: "مدت",
      teacher: "استاد",
      fee: "فیس",
      enroll: "ابھی داخلہ لیں",
      noCourse: "کوئی کورس دستیاب نہیں",
    },

    ar: {
      small: "القسم الثاني",
      title: "التعليم الإسلامي",
      subtitle: "",
      desc:
        "تعلم العلوم الإسلامية من علماء مؤهلين وتصفح أحدث الدورات الإسلامية.",
      duration: "المدة",
      teacher: "المعلم",
      fee: "الرسوم",
      enroll: "سجل الآن",
      noCourse: "لا توجد دورات",
    },
  };

  const t = content[lang];

  useEffect(() => {

    fetch(`${BASE_URL}/islamic/home_courses.php`)
      .then((res) => res.json())
      .then((data) => {

        if (data.status === "success") {
          setCourses(data.courses);
        }

        setLoading(false);

      })
      .catch((err) => {

        console.log(err);
        setLoading(false);

      });

  }, []);

  const icons = [
    <BookOpen size={30} />,
    <Book size={30} />,
    <Users size={30} />,
    <Scale size={30} />,
  ];

  return (

<section
  id="islamic-courses"
  className="bg-[#0b2d36] text-white py-20 px-5 relative overflow-hidden"
>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            {t.small}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">

            {t.title}

            <span className="text-gray-300 text-2xl ml-3">
              {t.subtitle}
            </span>

          </h2>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto leading-8">
            {t.desc}
          </p>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="text-center text-xl py-20">
            Loading Courses...
          </div>

        ) : courses.length === 0 ? (

          <div className="text-center text-xl py-20">
            {t.noCourse}
          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {courses.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >

                {/* Course Image */}

                <div className="relative h-52 overflow-hidden">

                  <img
                    src={
                      course.image && course.image !== ""
                        ? course.image
                        : "https://placehold.co/600x400?text=Islamic+Course"
                    }
                    alt={course.course_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-4 left-4 w-14 h-14 rounded-full bg-yellow-400 text-[#0b2d36] flex items-center justify-center shadow-lg">
                    {icons[index % icons.length]}
                  </div>

                </div>

                {/* Content */}

                <div className="p-6">

                  <h3 className="text-xl font-bold mb-3">
                    {course.course_name}
                  </h3>

                  <p className="text-gray-300 text-sm leading-6 line-clamp-3 mb-5">
                    {course.description}
                  </p>

                  <div className="space-y-3 text-sm">

                    <div className="flex items-center gap-2">
                      <User
                        size={18}
                        className="text-yellow-400"
                      />
                      <span className="font-semibold">
                        {t.teacher}:
                      </span>

                      <span className="text-gray-300">
                        {course.teacher_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="font-semibold">
                        {t.duration}:
                      </span>

                      <span className="text-gray-300">
                        {course.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="font-semibold">
                        {t.fee}:
                      </span>

                      <span className="text-gray-300">
                        Rs. {course.fee}
                      </span>
                    </div>

                  </div>

                  <Link
  to="/enrollment-islamic"
  className="w-full mt-6 bg-yellow-400 hover:bg-yellow-300 text-[#0b2d36] font-bold py-3 rounded-xl transition flex items-center justify-center"
>
  {t.enroll}
</Link>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

    </section>

  );

}

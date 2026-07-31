import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBookOpen,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Courses = () => {

  const [course, setCourse] = useState({});

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
  `https://800junkuae.online/tsh-api/API/digital_student/course/index.php?user_id=${user.user_id}`
);

      if (res.data.success) {

        setCourse(res.data.course);

      }

    }

    catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      <h1 className="text-4xl font-bold text-[#062B3A] mb-8">

        My Course

      </h1>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="bg-gradient-to-r from-[#062B3A] to-[#18495B] p-8 text-white">

          <div className="flex items-center gap-5">

            <FaBookOpen className="text-6xl text-yellow-400"/>

            <div>

              <h2 className="text-4xl font-bold">

                {course.course_name}

              </h2>

              <p className="text-gray-300 mt-2">

                {course.description}

              </p>

            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-8">

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <FaClock className="text-blue-500 text-2xl"/>

              <div>

                <h3 className="font-bold">

                  Duration

                </h3>

                <p>

                  {course.duration}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaMoneyBillWave className="text-green-500 text-2xl"/>

              <div>

                <h3 className="font-bold">

                  Fee

                </h3>

                <p>

                  Rs. {course.fee}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaCalendarAlt className="text-yellow-500 text-2xl"/>

              <div>

                <h3 className="font-bold">

                  Class Days

                </h3>

                <p>

                  {course.class_days}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaClock className="text-red-500 text-2xl"/>

              <div>

                <h3 className="font-bold">

                  Class Time

                </h3>

                <p>

                  {course.class_time}

                </p>

              </div>

            </div>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-[#062B3A]">

              Teacher Information

            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <FaUserTie className="text-2xl text-blue-500"/>

                <div>

                  <h3 className="font-bold">

                    Teacher

                  </h3>

                  <p>

                    {course.teacher_name}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaEnvelope className="text-2xl text-green-500"/>

                <div>

                  <h3 className="font-bold">

                    Email

                  </h3>

                  <p>

                    {course.email}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaPhone className="text-2xl text-red-500"/>

                <div>

                  <h3 className="font-bold">

                    Phone

                  </h3>

                  <p>

                    {course.phone}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaGraduationCap className="text-2xl text-purple-500"/>

                <div>

                  <h3 className="font-bold">

                    Qualification

                  </h3>

                  <p>

                    {course.qualification}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Courses;
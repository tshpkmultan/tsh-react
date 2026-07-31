
  import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaBookOpen,
  FaChalkboardTeacher,
  FaUsers,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Schedule = () => {

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.user_id) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `https://800junkuae.online/tsh-api/API/student/schedule/index.php?user_id=${user.user_id}`
      );

      if (res.data.success) {

        setSchedule(res.data.schedule || []);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const getStatusColor = (status) => {

    switch (status) {

      case "Live":
        return "bg-green-600";

      case "Upcoming":
        return "bg-yellow-500";

      case "Completed":
        return "bg-blue-600";

      case "Cancelled":
        return "bg-red-600";

      default:
        return "bg-gray-500";

    }

  };

  return (

    <div className="min-h-screen bg-[#F3F4F6]">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      <div className="max-w-7xl mx-auto p-6">

        {/* Hero */}

        <div className="bg-gradient-to-r from-[#062B3A] via-[#0B4255] to-[#18495B] rounded-3xl shadow-xl overflow-hidden mb-8">

          <div className="flex flex-col lg:flex-row justify-between items-center p-10 gap-8">

            <div>

              <span className="bg-yellow-400 text-[#062B3A] font-bold px-4 py-2 rounded-full">

                Student Portal

              </span>

              <h1 className="text-5xl font-bold text-white mt-6">

                Weekly Class Schedule

              </h1>

              <p className="text-gray-300 text-lg mt-4 max-w-2xl">

                View all your online and physical classes, teachers,
                meeting links and class timings.

              </p>

            </div>

            <div className="hidden lg:flex">

              <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center">

                <FaCalendarAlt className="text-7xl text-yellow-400" />

              </div>

            </div>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-3xl shadow-lg py-24 flex flex-col items-center">

            <FaSpinner className="text-6xl animate-spin text-[#062B3A]" />

            <h2 className="text-2xl font-bold text-[#062B3A] mt-6">

              Loading Schedule...

            </h2>

          </div>

        ) : (

          <>
                      {/* Today's Class */}

            {schedule.length > 0 && (

              <div className="bg-white rounded-3xl shadow-xl border-l-4 border-yellow-400 p-8 mb-8">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

                  <div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                      TODAY'S CLASS

                    </span>

                    <h2 className="text-4xl font-bold text-[#062B3A] mt-5">
    {schedule[0].title}
</h2>

                    <div className="flex items-center gap-3 mt-4 text-lg text-gray-600">

                      <FaChalkboardTeacher />

                      <span>{schedule[0].teacher_name}</span>

                    </div>

                    <div className="flex items-center gap-3 mt-3 text-gray-500">

                      <FaClock />

                      <span>

                        {schedule[0].start_time} - {schedule[0].end_time}

                      </span>

                    </div>

                  </div>

                  <div>

                    <span
                      className={`${getStatusColor(
                        schedule[0].status
                      )} text-white px-6 py-3 rounded-full font-bold`}
                    >

                      {schedule[0].status}

                    </span>

                  </div>

                </div>

              </div>

            )}

            {/* Weekly Schedule */}

            <div className="mb-6">

              <h2 className="text-4xl font-bold text-[#062B3A]">

                All Scheduled Classes

              </h2>

              <p className="text-gray-500 mt-2">

                Below are all classes assigned to you.

              </p>

            </div>

            <div className="space-y-8">

              {schedule.map((item, index) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-[#062B3A]"
                >

                  <div className="p-8">

                    <div className="flex flex-col xl:flex-row justify-between gap-8">

                      {/* Left Side */}

                      <div className="flex gap-6">

                        <div className="w-20 h-20 rounded-full bg-[#062B3A] text-white flex items-center justify-center">

                          <FaBookOpen className="text-3xl" />

                        </div>

                        <div>

                          <span
                            className={`${getStatusColor(
                              item.status
                            )} text-white px-4 py-2 rounded-full text-sm font-bold`}
                          >

                            {item.status}

                          </span>

                          <h2 className="text-3xl font-bold text-[#062B3A] mt-5">
{item.title}
                            

                          </h2>

                          <p className="text-gray-500 mt-2">

                            {item.course_name}

                          </p>

                          <div className="flex items-center gap-3 mt-4 text-gray-600">

                            <FaChalkboardTeacher />

                            <span>{item.teacher_name}</span>

                          </div>

                        </div>

                      </div>

                      {/* Right Side */}

                      <div className="grid grid-cols-2 gap-5 min-w-[360px]">
                                                {/* Class Date */}

                        <div className="bg-[#F8FAFC] rounded-2xl p-5">

                          <div className="flex items-center gap-3 text-[#062B3A] font-bold">

                            <FaCalendarAlt />

                            <span>Class Date</span>

                          </div>

                          <p className="mt-3 text-gray-600">

                            {item.class_date}

                          </p>

                        </div>

                        {/* Class Time */}

                        <div className="bg-[#F8FAFC] rounded-2xl p-5">

                          <div className="flex items-center gap-3 text-[#062B3A] font-bold">

                            <FaClock />

                            <span>Class Time</span>

                          </div>

                          <p className="mt-3 text-gray-600">

                            {item.start_time} - {item.end_time}

                          </p>

                        </div>

                        {/* Batch */}

                        <div className="bg-[#F8FAFC] rounded-2xl p-5">

                          <div className="flex items-center gap-3 text-[#062B3A] font-bold">

                            <FaUsers />

                            <span>Batch</span>

                          </div>

                          <p className="mt-3 text-gray-600">

                            {item.batch_name || "General Batch"}

                          </p>

                        </div>

                        {/* Location */}

                        <div className="bg-[#F8FAFC] rounded-2xl p-5">

                          <div className="flex items-center gap-3 text-[#062B3A] font-bold">

                            <FaMapMarkerAlt />

                            <span>Location</span>

                          </div>

                          <p className="mt-3 text-gray-600">

                            {item.class_type === "Online"
                              ? "Google Meet / Zoom"
                              : item.location || "Institute"}

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Footer */}

                    <div className="border-t mt-8 pt-6 flex flex-col lg:flex-row justify-between items-center gap-6">

                      <div>

                        <h3 className="font-bold text-[#062B3A]">

                          Teacher

                        </h3>

                        <p className="text-gray-500">

                          {item.teacher_name}

                        </p>

                      </div>

                      <div>

                        <h3 className="font-bold text-[#062B3A]">

                          Class Type

                        </h3>

                        <p className="text-gray-500">

                          {item.class_type}

                        </p>

                      </div>

                      <div>

                        {item.class_type === "Online" ? (

                          item.meeting_link ? (

                            <a
                              href={item.meeting_link}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition"
                            >

                              <FaVideo />

                              Join Live Class

                            </a>

                          ) : (

                            <button
                              disabled
                              className="bg-gray-400 cursor-not-allowed text-white px-8 py-4 rounded-2xl flex items-center gap-3"
                            >

                              <FaVideo />

                              Meeting Not Available

                            </button>

                          )

                        ) : (

                          <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold">

                            Physical Class

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}
                                  </div>

            {/* Empty State */}

            {schedule.length === 0 && (

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                <div className="flex flex-col items-center justify-center py-24 px-6">

                  <div className="w-32 h-32 rounded-full bg-[#EEF6FA] flex items-center justify-center mb-8">

                    <FaCalendarAlt className="text-6xl text-[#062B3A]" />

                  </div>

                  <h2 className="text-4xl font-bold text-[#062B3A] text-center">

                    No Schedule Found

                  </h2>

                  <p className="text-gray-500 text-lg mt-5 max-w-2xl text-center">

                    Your teacher has not assigned any classes yet.
                    Once a schedule is created, it will automatically
                    appear here.

                  </p>

                  <button
                    onClick={fetchSchedule}
                    className="mt-8 bg-[#062B3A] hover:bg-[#0B4255] text-white px-8 py-4 rounded-2xl font-semibold transition duration-300"
                  >

                    Refresh Schedule

                  </button>

                </div>

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

};

export default Schedule;

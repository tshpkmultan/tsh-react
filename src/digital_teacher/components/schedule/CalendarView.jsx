import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CalendarView = () => {
  const API = "https://800junkuae.online/tsh-api/API";

  const trainer = JSON.parse(localStorage.getItem("trainer"));

  const trainerId = trainer?.role_id;

  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCalendar();
  }, [month, year]);

  const loadCalendar = async () => {
    if (!trainerId) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/digital_trainer/schedule/calendar.php`,
        {
          params: {
            trainer_id: trainerId,
            month,
            year,
          },
        }
      );

      if (res.data.success) {
        setEvents(res.data.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.log(error);
      setEvents([]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow">
        Loading Calendar...
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {events.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <FaCalendarAlt
            className="mx-auto text-5xl text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No Schedule Found
          </h2>

          <p className="text-gray-500 mt-2">
            No classes scheduled for this month.
          </p>
        </div>
      ) : (
        events.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg border-l-4 border-blue-600 p-6"
          >
            <div className="flex justify-between flex-wrap gap-4">

              <div>

                <h2 className="text-2xl font-bold text-[#082B3A]">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.description}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-white font-semibold ${
                  item.status === "Completed"
                    ? "bg-green-600"
                    : item.status === "Live"
                    ? "bg-red-500"
                    : "bg-blue-600"
                }`}
              >
                {item.status}
              </span>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

              <div>
                <strong>Date</strong>
                <br />
                {item.date}
              </div>

              <div className="flex items-center gap-2">
                <FaClock />
                {item.start} - {item.end}
              </div>

              <div>
                <strong>Course</strong>
                <br />
                {item.course_name}
              </div>

              <div>
                <strong>Batch</strong>
                <br />
                {item.batch_name || "-"}
              </div>

            </div>

            {item.schedule_type === "individual" && (
              <div className="mt-4">
                <strong>Student</strong>
                <br />
                {item.student_name}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-6">

              {item.class_type === "Online" ? (
                <a
                  href={item.meeting_link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <FaVideo />
                  Join Meeting
                </a>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt />
                  {item.location}
                </div>
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CalendarView;
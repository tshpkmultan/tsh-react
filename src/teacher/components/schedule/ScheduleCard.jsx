import axios from "axios";
import {
  FaVideo,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API = "https://800junkuae.online/tsh-api/API";

const ScheduleCard = ({ item, refresh, onEdit }) => {

  const deleteSchedule = async () => {

    if (!window.confirm("Are you sure you want to delete this schedule?")) {
      return;
    }

    try {

      const res = await axios.post(
        `${API}/teacher/schedule/delete.php`,
        {
          schedule_id: item.id,
        }
      );

      if (res.data.success) {

        alert(res.data.message);

        refresh();

      } else {

        alert(res.data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Unable to delete schedule.");

    }

  };

  const joinMeeting = () => {

    if (!item.meeting_link) {

      alert("Live session link is not available.");

      return;

    }

    window.open(item.meeting_link, "_blank");

  };

  const statusColor = () => {

    switch (item.status) {

      case "Upcoming":
        return "bg-blue-100 text-blue-700";

      case "Live":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-gray-100 text-gray-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition duration-300">

      <div className="flex flex-col lg:flex-row justify-between gap-8">

        {/* Left */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-4">

            <h2 className="text-3xl font-bold text-[#082B3A]">

              {item.title}

            </h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor()}`}
            >
              {item.status}
            </span>

          </div>

          <p className="text-gray-500 mt-4">

            {item.description || "No description available."}

          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            <div>

              <div className="flex items-center gap-2 text-blue-600">

                <FaBook />

                <span className="font-semibold">

                  Skill Course

                </span>

              </div>

              <p className="mt-2">

                {item.course_name || "-"}

              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-green-600">

                <FaUsers />

                <span className="font-semibold">

                  Batch / Student

                </span>

              </div>

              <p className="mt-2">

                {item.display_name || "-"}

              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-orange-600">

                <FaCalendarAlt />

                <span className="font-semibold">

                  Session Date

                </span>

              </div>

              <p className="mt-2">

                {item.class_date}

              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-purple-600">

                <FaClock />

                <span className="font-semibold">

                  Session Time

                </span>

              </div>

              <p className="mt-2">

                {item.start_time} - {item.end_time}

              </p>

            </div>

            <div>

              <div className="flex items-center gap-2 text-red-600">

                <FaMapMarkerAlt />

                <span className="font-semibold">

                  Location

                </span>

              </div>

              <p className="mt-2">

                {item.location || "-"}

              </p>

            </div>

            <div>

              <span className="font-semibold">

                Session Type

              </span>

              <p className="mt-2">

                {item.class_type}

              </p>

              {item.class_type === "Online" && item.meeting_link && (

                <a
                  href={item.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  <FaVideo />

                  Join Live Class

                </a>

              )}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="w-full lg:w-56 flex flex-col gap-4">

          <button
            onClick={joinMeeting}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
          >

            <FaVideo />

            Join Live Class

          </button>

          <button
  onClick={() => onEdit(item)}
  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
>
  <FaEdit />
  Edit Session
</button>

          <button
            onClick={deleteSchedule}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
          >

            <FaTrash />

            Delete

          </button>

        </div>

      </div>

    </div>

  );

};

export default ScheduleCard;
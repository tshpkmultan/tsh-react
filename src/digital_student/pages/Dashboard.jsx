import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardCheck,
  FaBookOpen,
  FaAward,
  FaChalkboardTeacher,
  FaClock,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    loading: true,

    student: {},

    attendance: 0,

    progress: 0,

    pendingAssignments: 0,

    assignments: [],

    assignmentStats: {},

    attendanceHistory: [],

    notices: [],

    todayClass: null,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.user_id) {
        console.log("User not found");
        return;
      }

      const { data } = await axios.get(
        "https://800junkuae.online/tsh-api/API/digital_student/dashboard/index.php",
        {
          params: {
            user_id: user.user_id,
          },
        }
      );

      console.log("Dashboard:", data);

      if (data.success) {
        setDashboard({
    loading: false,

    student: data.student || {},

    stats: data.stats || {},

    attendance: data.stats?.attendance_percentage || 0,

    progress: data.stats?.progress || 0,

    pendingAssignments:
      data.assignment_stats?.pending ||
      data.stats?.pending_assignments ||
      0,

    assignments: data.assignments || [],

    assignmentStats: data.assignment_stats || {},

    attendanceHistory: data.attendance || [],

    notices: data.notices || [],

    todayClass: data.today_class || null,
});
      } else {
        setDashboard((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    } catch (err) {
      console.error(err);

      setDashboard((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  if (dashboard.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl font-bold text-[#062B3A]">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const student = dashboard.student;
  return (
  <div className="bg-[#F3F4F6] min-h-screen">

    <div className="flex justify-center md:justify-end mb-8">
      <GoogleTranslate />
    </div>

    <div className="p-4 md:p-6 lg:p-8">

      {/* Welcome */}

      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#082B3A] flex flex-wrap items-center gap-3">

          Welcome back,

          <span className="text-yellow-500">

            {student.full_name || "Student"}

          </span>

          🎓

        </h1>

        <p className="text-gray-500 text-lg md:text-xl mt-2">

          Ready to continue your learning journey?

        </p>

      </div>

      {/* Hero Card */}

      <div className="bg-gradient-to-r from-[#062B3A] to-[#18495B] rounded-3xl overflow-hidden shadow-xl border-l-4 border-yellow-400">

        <div className="flex flex-col lg:flex-row justify-between items-center p-8 gap-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">

              <FaChalkboardTeacher className="text-white text-4xl" />

            </div>

            <div>

              <div className="flex flex-wrap gap-3 mb-4">

                <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">

                  ENROLLED

                </span>

                <span className="bg-yellow-400 text-[#062B3A] px-4 py-2 rounded-lg text-sm font-bold">

                  DIGITAL COURSE

                </span>

              </div>

              <h2 className="text-white text-4xl font-bold">

                {student.course_name || "No Course Assigned"}

              </h2>

              <p className="text-gray-300 mt-3 text-xl">

                Trainer :

                <span className="text-yellow-400 font-semibold ml-2">

                  {student.trainer_name || "-"}

                </span>

              </p>

              <div className="flex items-center gap-3 mt-4 text-yellow-400 font-semibold text-lg">

                <FaClock />

                <span>

                  {dashboard.todayClass?.start_time

                    ? `${dashboard.todayClass.start_time} - ${dashboard.todayClass.end_time}`

                    : student.start_time

                    ? `${student.start_time} - ${student.end_time}`

                    : "Not Scheduled"}

                </span>

              </div>

              <div className="mt-3 text-gray-300">

                <strong>Batch :</strong>{" "}

                {dashboard.todayClass?.batch_name ||

                  student.batch_name ||

                  "Not Assigned"}

              </div>

              <div className="mt-2 text-gray-300">

                <strong>Days :</strong>{" "}

                {dashboard.todayClass?.class_days ||

                  student.class_days ||

                  "Not Assigned"}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

  {/* Attendance */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-blue-500">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 font-semibold">

          Attendance

        </p>

        <h2 className="text-5xl font-bold text-[#062B3A] mt-2">

          {dashboard.attendance}%

        </h2>

      </div>

      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

        <FaClipboardCheck className="text-blue-500 text-4xl" />

      </div>

    </div>

  </div>

  {/* Pending Assignments */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-yellow-500">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 font-semibold">

          Pending Assignments

        </p>

        <h2 className="text-5xl font-bold text-[#062B3A] mt-2">

          {dashboard.assignmentStats?.pending || 0}

        </h2>

      </div>

      <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

        <FaBookOpen className="text-yellow-500 text-4xl" />

      </div>

    </div>

  </div>

  {/* Total Assignments */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-purple-500">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 font-semibold">

          Total Assignments

        </p>

        <h2 className="text-5xl font-bold text-[#062B3A] mt-2">

          {dashboard.assignmentStats?.total || 0}

        </h2>

      </div>

      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">

        <FaBookOpen className="text-purple-500 text-4xl" />

      </div>

    </div>

  </div>

  {/* Progress */}

  <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-green-500">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 font-semibold">

          Progress

        </p>

        <h2 className="text-5xl font-bold text-[#062B3A] mt-2">

          {dashboard.progress}%

        </h2>

      </div>

      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

        <FaAward className="text-green-500 text-4xl" />

      </div>

    </div>

  </div>

</div>

{/* Recent Assignments */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

  <h2 className="text-2xl font-bold text-[#062B3A] mb-6">

    Recent Assignments

  </h2>

  {dashboard.assignments.length === 0 ? (

    <div className="text-center text-gray-500 py-10">

      No Assignments Found

    </div>

  ) : (

    <div className="space-y-4">

      {dashboard.assignments.slice(0,5).map((assignment) => (

        <div
          key={assignment.id}
          className="border rounded-xl p-4 hover:bg-gray-50 transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold text-lg">

                {assignment.title}

              </h3>

              <p className="text-gray-500">

                {assignment.description}

              </p>

              <p className="text-sm text-blue-600 mt-2">

                Trainer : {assignment.trainer_name}

              </p>

            </div>

            <div className="text-right">

              <div className="font-semibold">

                Due Date

              </div>

              <div className="text-red-500">

                {assignment.due_date || "-"}

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

{/* Recent Notices */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

  <h2 className="text-2xl font-bold text-[#062B3A] mb-6">

    Latest Notices

  </h2>

  {dashboard.notices.length === 0 ? (

    <div className="text-center text-gray-500 py-10">

      No Notices Available

    </div>

  ) : (

    <div className="space-y-4">

      {dashboard.notices.slice(0,5).map((notice) => (

        <div
          key={notice.id}
          className="border rounded-xl p-4"
        >

          <h3 className="font-bold text-lg">

            {notice.title}

          </h3>

          <p className="text-gray-600 mt-2">

            {notice.description}

          </p>

        </div>

      ))}

    </div>

  )}

</div>
{/* Recent Attendance */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

  <h2 className="text-2xl font-bold text-[#062B3A] mb-6">

    Recent Attendance

  </h2>

  {dashboard.attendanceHistory.length === 0 ? (

    <div className="text-center py-10 text-gray-500">

      No Attendance Found

    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Date</th>

            <th className="text-left py-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {dashboard.attendanceHistory.map((item, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-3">

                {item.attendance_date}

              </td>

              <td className="py-3">

              

<span
  className={`px-3 py-1 rounded-full text-white text-sm ${
    status === "present"
      ? "bg-green-500"
      : status === "late"
      ? "bg-yellow-500"
      : "bg-red-500"
  }`}
>
  {item.status}
</span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>

{/* Today's Class */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

  <h2 className="text-2xl font-bold text-[#062B3A] mb-6">
    Today's Class
  </h2>

  {dashboard.todayClass ? (

    <div className="grid md:grid-cols-2 gap-6">

      <div className="space-y-2">

        <p>
          <strong>Title:</strong> {dashboard.todayClass.title}
        </p>

        <p>
          <strong>Course:</strong>{" "}
          {dashboard.todayClass.course_name}
        </p>

        <p>
          <strong>Trainer:</strong>{" "}
          {dashboard.todayClass.trainer_name}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {dashboard.todayClass.class_date}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            {dashboard.todayClass.status}
          </span>
        </p>

      </div>

      <div className="space-y-2">

        <p>
          <strong>Time:</strong>{" "}
          {dashboard.todayClass.start_time}
          {" - "}
          {dashboard.todayClass.end_time}
        </p>

        <p>
          <strong>Class Type:</strong>{" "}
          {dashboard.todayClass.class_type}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {dashboard.todayClass.description}
        </p>

        {dashboard.todayClass.location && (
          <p>
            <strong>Location:</strong>{" "}
            {dashboard.todayClass.location}
          </p>
        )}

        {dashboard.todayClass.meeting_link && (
          <div className="pt-3">

          {dashboard.todayClass.status === "Live" &&
 dashboard.todayClass.meeting_link && (
  <a
    href={dashboard.todayClass.meeting_link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
  >
    Join Live Class
  </a>
)}

{dashboard.todayClass.status === "Upcoming" && (
  <button
    disabled
    className="bg-yellow-500 text-white px-5 py-3 rounded-xl"
  >
    Upcoming
  </button>
)}

{dashboard.todayClass.status === "Completed" && (
  <button
    disabled
    className="bg-gray-500 text-white px-5 py-3 rounded-xl"
  >
    Completed
  </button>
)}

          </div>
        )}

      </div>

    </div>

  ) : (

    <div className="text-gray-500">
      No Class Scheduled
    </div>

  )}

</div>
{/* Quick Stats */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white p-6">

    <h3 className="text-lg font-semibold">

      Present

    </h3>

    <h2 className="text-4xl font-bold mt-3">

      {dashboard.attendanceHistory.filter(
    a => a.status?.toLowerCase() === "present"
).length}
    </h2>

  </div>

  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-6">

    <h3 className="text-lg font-semibold">

      Absent

    </h3>

    <h2 className="text-4xl font-bold mt-3">

      {dashboard.attendanceHistory.filter(
    a => a.status?.toLowerCase() === "absent"
).length}

    </h2>

  </div>

  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl text-white p-6">

    <h3 className="text-lg font-semibold">

      Late

    </h3>

    <h2 className="text-4xl font-bold mt-3">

     {dashboard.attendanceHistory.filter(
    a => a.status?.toLowerCase() === "late"
).length}

    </h2>

  </div>

</div>

</div>

</div>

);

};

export default Dashboard;
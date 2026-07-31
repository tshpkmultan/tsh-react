import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaVideo,
  FaClock,
  FaClipboardCheck,
  FaBookOpen,
  FaAward,
  FaChalkboardTeacher,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Dashboard = () => {
  const [remainingTime, setRemainingTime] = useState("");
const [classStatus, setClassStatus] = useState("");
  const [dashboard, setDashboard] = useState({

    student: {},

    attendance: 0,

    pendingAssignments: 0,

    progress: 0,

    attendanceHistory: [],

    assignments: [],

    notices: [],

    assignmentStats: {},

    todayClass: null,

});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.user_id) {
      console.log("User not found");
      return;
    }

    const res = await axios.get(
      `https://800junkuae.online/tsh-api/API/student/dashboard/index.php`,
      {
        params: {
          user_id: user.user_id,
        },
      }
    );

    console.log("Dashboard API:", res.data);

    if (res.data.success) {
      setDashboard({
        student: res.data.student || {},

        attendance:
          res.data.stats?.attendance_percentage || 0,

        pendingAssignments:
          res.data.stats?.pending_assignments || 0,

        progress:
          res.data.stats?.progress || 0,

        attendanceHistory:
          res.data.attendance || [],

        assignments:
          res.data.assignments || [],

        notices:
          res.data.notices || [],

        assignmentStats:
          res.data.assignment_stats || {},

        todayClass:
          res.data.today_class || null,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {

    if (!dashboard.todayClass?.start_time || !dashboard.todayClass?.end_time)
        return;

    const updateTimer = () => {

        const now = new Date();

        const today = new Date().toISOString().split("T")[0];

        const start = new Date(`${today}T${dashboard.todayClass.start_time}`);

        const end = new Date(`${today}T${dashboard.todayClass.end_time}`);

        if (now < start) {

            const diff = start - now;

            const hours = Math.floor(diff / 1000 / 60 / 60);

            const minutes = Math.floor((diff / 1000 / 60) % 60);

            const seconds = Math.floor((diff / 1000) % 60);

            setClassStatus("Starts In");

            setRemainingTime(
                `${hours}h ${minutes}m ${seconds}s`
            );

        } else if (now >= start && now <= end) {

            const diff = end - now;

            const hours = Math.floor(diff / 1000 / 60 / 60);

            const minutes = Math.floor((diff / 1000 / 60) % 60);

            const seconds = Math.floor((diff / 1000) % 60);

            setClassStatus("Class Ends In");

            setRemainingTime(
                `${hours}h ${minutes}m ${seconds}s`
            );

        } else {

            setClassStatus("Status");

            setRemainingTime("Class Ended");

        }

    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);

}, [dashboard.todayClass]);
const viewSubmission = (assignment) => {

    console.log("Submission:", assignment);

};

const openGradeModal = (assignment) => {

    console.log("Grade:", assignment);

};
  return (
    
    <div className="bg-[#F3F4F6] min-h-screen">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      <div className="p-4 md:p-6 lg:p-8">

        {/* Welcome */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#082B3A] flex items-center gap-3">

            Welcome back,

            <span className="text-yellow-500">

              {dashboard.student.full_name || "Student"}

            </span>

            🎓

          </h1>

          <p className="text-gray-500 text-lg md:text-xl mt-2">

            Ready to learn something new today?

          </p>

        </div>

        {/* Course Card */}

        <div className="bg-gradient-to-r from-[#062B3A] to-[#18495B] rounded-3xl overflow-hidden shadow-lg border-l-4 border-yellow-400">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-8">

            <div className="flex items-center gap-6 w-full">

              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">

                <FaChalkboardTeacher className="text-white text-3xl" />

              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3 mb-4">

                  <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">

                    ENROLLED

                  </span>

                  <span className="text-yellow-400 text-xl font-bold tracking-wider">

                    CURRENT COURSE

                  </span>

                </div>

                <h2 className="text-white text-3xl md:text-5xl font-bold">

                  {dashboard.student.course_name || "No Course"}

                </h2>

                <p className="text-gray-300 text-lg md:text-2xl mt-2">

                  Teacher: {dashboard.student.teacher_name || "-"}

                </p>

                <div className="flex items-center gap-3 text-yellow-400 text-lg md:text-2xl mt-4 font-semibold">

                  <FaClock />

                  <span>

                  {dashboard.todayClass?.start_time &&
dashboard.todayClass?.end_time
  ? `${dashboard.todayClass.start_time} - ${dashboard.todayClass.end_time}`
  : dashboard.student.start_time && dashboard.student.end_time
  ? `${dashboard.student.start_time} - ${dashboard.student.end_time}`
  : "Not Scheduled"}

                  </span>

                </div>

                <div className="text-gray-300 mt-3">

                  <strong>Batch:</strong>{" "}

                  {dashboard.todayClass?.batch_name ||
dashboard.student.batch_name ||
"Not Assigned"}

                </div>

                <div className="text-gray-300 mt-2">

                  <strong>Days:</strong>{" "}

                  {dashboard.todayClass?.class_days ||
dashboard.student.class_days ||
"Not Assigned"}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow-sm border-t-4 border-blue-500 p-6 flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

              <FaClipboardCheck className="text-blue-500 text-3xl" />

            </div>

            <div>

              <h3 className="text-gray-500 text-xl">

                Attendance

              </h3>

              <h2 className="text-5xl font-bold text-[#082B3A]">

             {dashboard.attendance || 0}%

              </h2>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border-t-4 border-yellow-400 p-6 flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

              <FaBookOpen className="text-yellow-500 text-3xl" />

            </div>

            <div>

              <h3 className="text-gray-500 text-xl">

                Pending Assignments

              </h3>

              <h2 className="text-5xl font-bold text-[#082B3A]">

                {dashboard.assignmentStats.pending || 0}

              </h2>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border-t-4 border-green-500 p-6 flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

              <FaAward className="text-green-500 text-3xl" />

            </div>

            <div>

              <h3 className="text-gray-500 text-xl">

                Progress

              </h3>

              <h2 className="text-5xl font-bold text-[#082B3A]">

                {dashboard.progress || 0}%

              </h2>

            </div>

          </div>

        </div>
{/* Recent Assignments */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

    <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-[#082B3A]">
            Recent Assignments
        </h2>

        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
            {dashboard.assignmentStats.total || 0} Total
        </span>

    </div>

    {dashboard.assignments.length === 0 ? (

        <div className="text-center py-8 text-gray-500">
            No Assignments Found
        </div>

    ) : (

        <div className="space-y-4">

            {dashboard.assignments.map((assignment) => (

                <div
                    key={assignment.id}
                    className="border rounded-2xl p-5 hover:bg-gray-50 transition"
                >

                    <div className="flex justify-between">

                        <div>

                            <h3 className="text-xl font-bold">

                                {assignment.title}

                            </h3>

                            <p className="text-gray-500 mt-2">

                                {assignment.description}

                            </p>

                            <p className="text-blue-600 mt-3">

                                Teacher :
                                {" "}
                                {assignment.teacher_name}

                            </p>

                        </div>

                        <div className="text-right">

                            <span className="text-red-500 font-semibold">

                                Due :
                                {" "}
                                {assignment.due_date}

                            </span>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>
{/* Latest Notices */}

<div className="bg-white rounded-3xl shadow-lg mt-8 p-6">

    <h2 className="text-2xl font-bold text-[#082B3A] mb-6">

        Latest Notices

    </h2>

    {dashboard.notices.length === 0 ? (

        <div className="text-center py-8 text-gray-500">

            No Notices Available

        </div>

    ) : (

        <div className="space-y-4">

            {dashboard.notices.map((notice) => (

                <div
                    key={notice.id}
                    className="border-l-4 border-yellow-500 bg-gray-50 rounded-xl p-5"
                >

                    <h3 className="font-bold text-xl">

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

    <h2 className="text-2xl font-bold text-[#082B3A] mb-6">

        Attendance History

    </h2>

    {dashboard.attendanceHistory.length === 0 ? (

        <div className="text-center py-8 text-gray-500">

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

                            <td className="py-4">

                                {item.attendance_date}

                            </td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded-full text-white text-sm
                                    ${
                                        item.status === "present"
                                            ? "bg-green-500"
                                            : item.status === "late"
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

<div className="mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

    {/* Header */}

    <div className="bg-gradient-to-r from-[#082B3A] via-[#0D4B63] to-[#156B88] p-8">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

                <h2 className="text-4xl font-bold text-white">
                    📚 Today's Class
                </h2>

                <p className="text-slate-200 mt-2">
                    Be ready for your upcoming session.
                </p>

            </div>

            {dashboard.todayClass && (

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-8 py-5 text-center">

                    <p className="text-xs uppercase tracking-[3px] text-yellow-300 font-semibold">

                        {classStatus}

                    </p>

                    <h3 className="text-3xl font-bold text-white mt-2">

                        {remainingTime}

                    </h3>

                </div>

            )}

        </div>

    </div>

    {dashboard.todayClass ? (

        <div className="p-8">

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Title
                    </p>

                    <h3 className="text-2xl font-bold text-[#082B3A] mt-1">

                        {dashboard.todayClass.title || "Regular Class"}

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Batch
                    </p>

                    <h3 className="text-2xl font-bold text-[#082B3A] mt-1">

                        {dashboard.todayClass.batch_name || "Not Assigned"}

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Class Days
                    </p>

                    <h3 className="text-xl font-semibold mt-1">

                        {dashboard.todayClass.class_days || "Not Available"}

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Class Type
                    </p>

                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">

                        {dashboard.todayClass.class_type || "Batch"}

                    </span>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Time
                    </p>

                    <h3 className="text-xl font-bold mt-1">

                        <FaClock className="inline mr-2 text-yellow-500" />

                        {dashboard.todayClass.start_time}

                        {" - "}

                        {dashboard.todayClass.end_time}

                    </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">
                        Location
                    </p>

                    <h3 className="text-xl font-semibold mt-1">

                        {dashboard.todayClass.location || "Online"}

                    </h3>

                </div>

            </div>

            {dashboard.todayClass.meeting_link && (

                <a
                    href={dashboard.todayClass.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.01]"
                >

                    <FaVideo className="text-2xl" />

                    Join Live Class

                </a>

            )}

        </div>

    ) : (

        <div className="text-center py-20">

            <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto flex items-center justify-center">

                <FaVideo className="text-4xl text-slate-400" />

            </div>

            <h3 className="text-3xl font-bold text-[#082B3A] mt-8">

                No Class Scheduled Today

            </h3>

            <p className="text-gray-500 mt-3">

                Your teacher has not scheduled any class today.

            </p>

        </div>

    )}

</div>

      </div>

    </div>
    
  );
  
};

export default Dashboard;
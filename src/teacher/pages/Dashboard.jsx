import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaClock,
  FaVideo,
  FaCalendarAlt,
  FaBookOpen,
  FaClipboardCheck,
  FaUserGraduate,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import {
  MdChecklist,
  MdAssignment,
  MdPendingActions,
} from "react-icons/md";
import GoogleTranslate from "../../components/GoogleTranslate";

const Dashboard = () => {

    const API = "https://800junkuae.online/tsh-api/API";

    const teacher = JSON.parse(
        localStorage.getItem("teacher")
    );

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    const [loading,setLoading]=useState(true);

    /*
    |--------------------------------------------------------------------------
    | Dashboard Stats
    |--------------------------------------------------------------------------
    */

    const [stats,setStats]=useState({

        today_classes:0,

        upcoming_classes:0,

        total_students:0,

        total_batches:0,

        pending_assignments:0,

        submitted_assignments:0,

        today_attendance:0,

        attendance_percentage:0

    });

    /*
    |--------------------------------------------------------------------------
    | Schedule
    |--------------------------------------------------------------------------
    */
const [upcomingSchedule,setUpcomingSchedule]=useState([]);
    const [todaySchedule,setTodaySchedule]=useState([]);

    /*
    |--------------------------------------------------------------------------
    | Assignments
    |--------------------------------------------------------------------------
    */

    const [pendingAssignments,setPendingAssignments]=useState([]);

    /*
    |--------------------------------------------------------------------------
    | Recent Students
    |--------------------------------------------------------------------------
    */

    const [recentStudents,setRecentStudents]=useState([]);

    /*
    |--------------------------------------------------------------------------
    | Attendance
    |--------------------------------------------------------------------------
    */

    const [attendance,setAttendance]=useState({

        present:0,

        absent:0,

        late:0

    });

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    const [notifications,setNotifications]=useState([]);

    /*
    |--------------------------------------------------------------------------
    | Dashboard Load
    |--------------------------------------------------------------------------
    */

    useEffect(()=>{

        loadDashboard();

    },[]);

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard
    |--------------------------------------------------------------------------
    */

    const loadDashboard=async()=>{

        setLoading(true);

        try{
const res = await axios.get(
    `${API}/teacher/dashboard.php?teacher_id=${teacher.teacher_id}`
);

           

            if(res.data.success){

                setStats(res.data.stats);

                setTodaySchedule(res.data.today_schedule || []);

                setPendingAssignments(
                    res.data.pending_assignments || []
                );

                setRecentStudents(
                    res.data.recent_students || []
                );

                setAttendance(
                    res.data.attendance || {
                        present:0,
                        absent:0,
                        late:0
                    }
                );

                setNotifications(
                    res.data.notifications || []
                );

            }

        }catch(error){

            console.log(error);

        }

        setLoading(false);

    };

    /*
    |--------------------------------------------------------------------------
    | Join Meeting
    |--------------------------------------------------------------------------
    */

    const joinMeeting=(meetingLink)=>{

        if(!meetingLink){

            alert("Meeting link not available.");

            return;

        }

        window.open(
            meetingLink,
            "_blank"
        );

    };
const viewSubmission = (assignment) => {

    console.log("Submission:", assignment);

};

const openGradeModal = (assignment) => {

    console.log("Grade:", assignment);

};
const [selectedAssignment, setSelectedAssignment] = useState(null);

const [showSubmissionModal, setShowSubmissionModal] = useState(false);

const [showGradeModal, setShowGradeModal] = useState(false);



    /*
    |--------------------------------------------------------------------------
    | Status Color
    |--------------------------------------------------------------------------
    */

    const getStatusColor=(status)=>{

        switch(status){

            case "Live":

                return "bg-green-100 text-green-600";

            case "Upcoming":

                return "bg-yellow-100 text-yellow-700";

            case "Completed":

                return "bg-blue-100 text-blue-600";

            case "Cancelled":

                return "bg-red-100 text-red-600";

            default:

                return "bg-gray-100 text-gray-600";

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Greeting
    |--------------------------------------------------------------------------
    */

    const greeting=()=>{

        const hour=new Date().getHours();

        if(hour<12){

            return "Good Morning";

        }

        if(hour<17){

            return "Good Afternoon";

        }

        return "Good Evening";

    }; 
    const navigate = useNavigate();

const quickActions = [
  {
    title: "Mark Attendance",
    description: "Record today's attendance",
    icon: <FaClipboardCheck className="text-white" size={24} />,
    bg: "bg-blue-50",
    iconBg: "bg-blue-500",
    hover: "hover:bg-blue-100",
    path: "/teacher/attendance",
  },
  {
    title: "Create Assignment",
    description: "Assign new work",
    icon: <MdAssignment className="text-white" size={24} />,
    bg: "bg-green-50",
    iconBg: "bg-green-500",
    hover: "hover:bg-green-100",
    path: "/teacher/assignments",
  },
  {
    title: "Create Schedule",
    description: "Add today's class",
    icon: <FaCalendarAlt className="text-white" size={24} />,
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
    hover: "hover:bg-purple-100",
    path: "/teacher/schedule",
  },
  {
    title: "My Students",
    description: "View enrolled students",
    icon: <FaUsers className="text-white" size={24} />,
    bg: "bg-orange-50",
    iconBg: "bg-orange-500",
    hover: "hover:bg-orange-100",
    path: "/teacher/students",
  },
];
    return (

<div className="bg-[#F3F4F6] min-h-screen">

{/* ===========================================================
    Welcome Section
=========================================================== */}

<div className="bg-gradient-to-r from-[#082B3A] to-[#0F4C63] rounded-3xl p-8 text-white shadow-xl mb-8">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
    <div className="flex flex-col lg:flex-row justify-between items-center">

        <div>

            <h2 className="text-4xl lg:text-5xl font-bold">

                {greeting()}, {teacher?.name} 👋

            </h2>

            <p className="mt-4 text-gray-200 text-lg">

                Welcome back to your Teacher Dashboard.

                Manage your classes, students, attendance,

                assignments and schedules from one place.

            </p>

        </div>

        <div className="hidden lg:flex">

            <div className="w-36 h-36 rounded-full bg-white/10 flex items-center justify-center">

                <FaChalkboardTeacher
                    size={65}
                    className="text-yellow-400"
                />

            </div>

        </div>

    </div>

</div>

{/* ===========================================================
    Dashboard Statistics
=========================================================== */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

{/* Today Classes */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Today's Classes

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.today_classes}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

<FaCalendarAlt

className="text-blue-600"

size={28}

/>

</div>

</div>

</div>

{/* Upcoming */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Upcoming Classes

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.upcoming_classes}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">

<FaClock

className="text-indigo-600"

size={28}

/>

</div>

</div>

</div>

{/* Students */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Students

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.total_students}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

<FaUsers

className="text-green-600"

size={28}

/>

</div>

</div>

</div>

{/* Batches */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Batches

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.total_batches}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">

<FaBookOpen

className="text-purple-600"

size={28}

/>

</div>

</div>

</div>

{/* Pending Assignment */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Pending Assignment

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.pending_assignments}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">

<MdPendingActions

className="text-yellow-600"

size={30}

/>

</div>

</div>

</div>

{/* Submitted */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Submitted

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.submitted_assignments}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center">

<MdAssignment

className="text-cyan-600"

size={30}

/>

</div>

</div>

</div>

{/* Attendance */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Attendance

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.today_attendance}

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">

<FaClipboardCheck

className="text-orange-600"

size={28}

/>

</div>

</div>

</div>

{/* Percentage */}

<div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">

<div className="flex justify-between items-center">

<div>

<p className="text-gray-500">

Attendance %

</p>

<h1 className="text-5xl font-bold text-[#082B3A] mt-3">

{loading ? "..." : stats.attendance_percentage}%

</h1>

</div>

<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">

<FaUserGraduate

className="text-emerald-600"

size={28}

/>

</div>

</div>

</div>

</div>
{/* ===========================================================
    Today's Schedule & Quick Actions
=========================================================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

    {/* =======================================================
        Today's Schedule
    ======================================================= */}

    <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

                <h2 className="text-3xl font-bold text-[#082B3A]">

                    Today's Schedule

                </h2>

                <p className="text-gray-500 mt-2">

                    Your upcoming classes for today

                </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#082B3A] flex items-center justify-center">

                <FaCalendarAlt
                    className="text-yellow-400"
                    size={24}
                />

            </div>

        </div>

        {todaySchedule.length === 0 ? (

            <div className="py-20 text-center">

                <FaCalendarAlt
                    size={60}
                    className="mx-auto text-gray-300"
                />

                <h3 className="text-2xl font-bold mt-6 text-gray-600">

                    No Classes Today

                </h3>

                <p className="text-gray-400 mt-2">

                    Enjoy your free time 🎉

                </p>

            </div>

        ) : (

            <div className="space-y-6">

                {todaySchedule.map((item) => (

                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-3xl p-6 hover:shadow-lg duration-300"
                    >

                        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                            <div>

                                <div className="flex items-center gap-3 flex-wrap">

                                    <h2 className="text-2xl font-bold text-[#082B3A]">

                                        {item.title}

                                    </h2>

                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>

                                </div>

                                <p className="text-gray-500 mt-3">

                                    {item.course_name}

                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-6">

                                    <div className="flex items-center gap-3">

                                        <FaClock className="text-blue-500" />

                                        <span>

                                            {item.start_time} - {item.end_time}

                                        </span>

                                    </div>

                                    <div>

                                        <span
                                            className={`px-4 py-2 rounded-xl text-sm font-bold ${
                                                item.class_type === "Online"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-orange-100 text-orange-600"
                                            }`}
                                        >

                                            {item.class_type}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col justify-between gap-4">

                                <button
                                    onClick={() =>
                                        joinMeeting(item.meeting_link)
                                    }
                                    className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 px-6 py-3 rounded-2xl font-bold flex items-center gap-3 justify-center"
                                >

                                    <FaVideo />

                                    Join Class

                                </button>

                                <button
                                    className="border border-[#082B3A] text-[#082B3A] hover:bg-[#082B3A] hover:text-white duration-300 px-6 py-3 rounded-2xl font-semibold"
                                >

                                    View Details

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>

    {/* =======================================================
        Quick Actions
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

    <div className="flex items-center justify-between mb-8">

        <div>

            <h2 className="text-3xl font-bold text-[#082B3A]">
                Quick Actions
            </h2>

            <p className="text-gray-500 mt-2">
                Quickly access your daily teaching tools.
            </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#082B3A] flex items-center justify-center text-yellow-400 text-2xl">
            ⚡
        </div>

    </div>

    <div className="space-y-5">

        {quickActions.map((action, index) => (

            <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`w-full ${action.bg} ${action.hover}
                rounded-2xl p-5 flex justify-between items-center
                transition-all duration-300
                hover:shadow-xl hover:scale-[1.02]
                active:scale-95 cursor-pointer`}
            >

                <div className="flex items-center gap-5">

                    <div
                        className={`w-14 h-14 rounded-2xl ${action.iconBg}
                        flex items-center justify-center shadow-lg`}
                    >
                        {action.icon}
                    </div>

                    <div className="text-left">

                        <h3 className="font-bold text-xl text-[#082B3A]">
                            {action.title}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                            {action.description}
                        </p>

                    </div>

                </div>

                <div className="text-gray-400">

                    <FaArrowRight
                        className="group-hover:translate-x-2 duration-300"
                        size={22}
                    />

                </div>

            </button>

        ))}

    </div>

</div>

</div>
{/* ===========================================================
    Pending Assignments & Notifications
=========================================================== */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

    {/* =======================================================
        Pending Assignments
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

                <h2 className="text-3xl font-bold text-[#082B3A]">

                    Pending Assignments

                </h2>

                <p className="text-gray-500 mt-2">

                    Assignments waiting for grading

                </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <MdAssignment
                    className="text-yellow-600"
                    size={26}
                />

            </div>

        </div>

        {pendingAssignments.length === 0 ? (

            <div className="py-20 text-center">

                <MdAssignment
                    size={60}
                    className="mx-auto text-gray-300"
                />

                <h3 className="text-2xl font-bold mt-6 text-gray-600">

                    No Pending Assignments

                </h3>

                <p className="text-gray-400 mt-2">

                    Great! Everything has been graded.

                </p>

            </div>

        ) : (

            <div className="space-y-5">

                {pendingAssignments.map((assignment)=>(

                    <div
                        key={assignment.id}
                        className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg duration-300"
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h3 className="text-xl font-bold text-[#082B3A]">

                                    {assignment.title}

                                </h3>

                                <p className="text-gray-500 mt-2">

                                    {assignment.student_name}

                                </p>

                            </div>

                            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold">

                                Pending

                            </span>

                        </div>

                        <div className="mt-5 flex flex-wrap gap-4">

                            <button className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 px-5 py-3 rounded-xl font-bold">

                                View Submission

                            </button>

                            <button className="bg-green-100 hover:bg-green-200 text-green-700 px-5 py-3 rounded-xl font-bold">

                                Grade

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>

    {/* =======================================================
        Notifications
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

                <h2 className="text-3xl font-bold text-[#082B3A]">

                    Notifications

                </h2>

                <p className="text-gray-500 mt-2">

                    Latest activities

                </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                🔔

            </div>

        </div>

        {notifications.length===0 ? (

            <div className="py-20 text-center">

                <div className="text-6xl">

                    🔕

                </div>

                <h3 className="text-2xl font-bold mt-5 text-gray-600">

                    No Notifications

                </h3>

            </div>

        ) : (

            <div className="space-y-4">

                {notifications.map((notification)=>(

                    <div
                        key={notification.id}
                        className="flex items-start gap-4 border-b pb-5"
                    >

                        <div className="w-12 h-12 rounded-full bg-[#082B3A] flex items-center justify-center text-yellow-400 font-bold">

                            🔔

                        </div>

                        <div className="flex-1">

                            <h3 className="font-bold text-lg text-[#082B3A]">

                                {notification.title}

                            </h3>

                            <p className="text-gray-500 mt-1">

                                {notification.message}

                            </p>

                            <p className="text-sm text-gray-400 mt-2">

                                {notification.created_at}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>

</div>
{/* ===========================================================
    Recent Students & Attendance Summary
=========================================================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

    {/* =======================================================
        Recent Students
    ======================================================= */}

    <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

                <h2 className="text-3xl font-bold text-[#082B3A]">

                    Recent Students

                </h2>

                <p className="text-gray-500 mt-2">

                    Latest enrolled students

                </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <FaUsers
                    className="text-green-600"
                    size={24}
                />

            </div>

        </div>

        {recentStudents.length === 0 ? (

            <div className="text-center py-20">

                <FaUsers
                    size={60}
                    className="mx-auto text-gray-300"
                />

                <h3 className="text-2xl font-bold text-gray-600 mt-5">

                    No Students

                </h3>

            </div>

        ) : (

            <div className="space-y-5">

                {recentStudents.map((student) => (

                    <div
                        key={student.id}
                        className="flex flex-col lg:flex-row lg:justify-between lg:items-center border rounded-2xl p-5 hover:shadow-lg duration-300"
                    >

                        <div className="flex items-center gap-5">

                            <div className="w-16 h-16 rounded-full bg-[#082B3A] text-yellow-400 flex items-center justify-center text-2xl font-bold">

                                {student.full_name
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>

                            <div>

                                <h3 className="text-xl font-bold text-[#082B3A]">

                                    {student.full_name}

                                </h3>

                                <p className="text-gray-500 mt-1">

                                    {student.course_name}

                                </p>

                                <p className="text-sm text-gray-400">

                                    {student.batch_name}

                                </p>

                            </div>

                        </div>

                        <div className="mt-5 lg:mt-0">

           <button
    onClick={() => {
        console.log("Student:", student);

        navigate(`/teacher/student-profile/${student.id}`);
    }}
    className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 px-6 py-3 rounded-xl font-bold"
>
    View Profile
</button>


                        </div>

                    </div>

                ))}

            </div>

        )}

    </div>

    {/* =======================================================
        Attendance Summary
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <h2 className="text-3xl font-bold text-[#082B3A] mb-8">

            Attendance Summary

        </h2>

        {/* Percentage */}

        <div className="text-center">

            <div className="relative w-40 h-40 mx-auto">

                <div className="absolute inset-0 rounded-full border-[12px] border-green-100"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <h1 className="text-5xl font-bold text-green-600">

                        {stats.attendance_percentage}%

                    </h1>

                    <p className="text-gray-500">

                        Today

                    </p>

                </div>

            </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

            <div className="flex justify-between text-sm mb-2">

                <span>Attendance Progress</span>

                <span>

                    {stats.attendance_percentage}%

                </span>

            </div>

            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

                <div

                    className="bg-green-500 h-full"

                    style={{

                        width:

                        `${stats.attendance_percentage}%`

                    }}

                />

            </div>

        </div>

        {/* Cards */}

        <div className="space-y-4 mt-8">

            <div className="flex justify-between items-center bg-green-50 rounded-2xl p-5">

                <div>

                    <h3 className="font-bold text-green-700">

                        Present

                    </h3>

                </div>

                <div className="text-3xl font-bold text-green-600">

                    {attendance.present}

                </div>

            </div>

            <div className="flex justify-between items-center bg-red-50 rounded-2xl p-5">

                <div>

                    <h3 className="font-bold text-red-700">

                        Absent

                    </h3>

                </div>

                <div className="text-3xl font-bold text-red-600">

                    {attendance.absent}

                </div>

            </div>

            <div className="flex justify-between items-center bg-yellow-50 rounded-2xl p-5">

                <div>

                    <h3 className="font-bold text-yellow-700">

                        Late

                    </h3>

                </div>

                <div className="text-3xl font-bold text-yellow-600">

                    {attendance.late}

                </div>

            </div>

        </div>

    </div>

</div>
{/* ===========================================================
    Weekly Analytics
=========================================================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

    {/* =======================================================
        Weekly Attendance
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <div>

                <h2 className="text-3xl font-bold text-[#082B3A]">

                    Weekly Attendance

                </h2>

                <p className="text-gray-500 mt-2">

                    Last 7 Days

                </p>

            </div>

            <FaClipboardCheck
                size={28}
                className="text-green-600"
            />

        </div>

        <div className="space-y-6">

            <div>

                <div className="flex justify-between mb-2">

                    <span>Present</span>

                    <span>{attendance.present}</span>

                </div>

                <div className="h-3 rounded-full bg-gray-200">

                    <div
                        className="h-3 rounded-full bg-green-500"
                        style={{ width: "85%" }}
                    ></div>

                </div>

            </div>

            <div>

                <div className="flex justify-between mb-2">

                    <span>Absent</span>

                    <span>{attendance.absent}</span>

                </div>

                <div className="h-3 rounded-full bg-gray-200">

                    <div
                        className="h-3 rounded-full bg-red-500"
                        style={{ width: "20%" }}
                    ></div>

                </div>

            </div>

            <div>

                <div className="flex justify-between mb-2">

                    <span>Late</span>

                    <span>{attendance.late}</span>

                </div>

                <div className="h-3 rounded-full bg-gray-200">

                    <div
                        className="h-3 rounded-full bg-yellow-500"
                        style={{ width: "10%" }}
                    ></div>

                </div>

            </div>

        </div>

    </div>

    {/* =======================================================
        Upcoming Classes
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-[#082B3A]">

                Upcoming Classes

            </h2>

            <FaCalendarAlt
                size={26}
                className="text-blue-600"
            />

        </div>

        {todaySchedule.length === 0 ? (

            <div className="text-center py-10 text-gray-400">

                No Upcoming Classes

            </div>

        ) : (

            <div className="space-y-5">

                {todaySchedule.slice(0,4).map((item)=>(

                    <div
                        key={item.id}
                        className="border-l-4 border-blue-500 pl-5"
                    >

                        <h3 className="font-bold text-[#082B3A]">

                            {item.title}

                        </h3>

                        <p className="text-gray-500 mt-2">

                            {item.start_time} - {item.end_time}

                        </p>

                        <span
                            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}
                        >

                            {item.status}

                        </span>

                    </div>

                ))}

            </div>

        )}

    </div>

    {/* =======================================================
        Top Students
    ======================================================= */}

    <div className="bg-white rounded-3xl shadow-md p-8">

        <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-[#082B3A]">

                Top Students

            </h2>

            🏆

        </div>

        {recentStudents.length===0 ? (

            <div className="text-center py-10">

                No Data

            </div>

        ) : (

            <div className="space-y-5">

                {recentStudents.slice(0,5).map((student,index)=>(

                    <div
                        key={student.id}
                        className="flex justify-between items-center"
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-full bg-[#082B3A] text-yellow-400 flex items-center justify-center font-bold">

                                {index+1}

                            </div>

                            <div>

                                <h3 className="font-bold">

                                    {student.full_name}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    {student.course_name}

                                </p>

                            </div>

                        </div>

                        <span className="font-bold text-green-600">

                            ⭐⭐⭐⭐⭐

                        </span>

                    </div>

                ))}

            </div>

        )}

    </div>

</div>

{/* ===========================================================
    Footer
=========================================================== */}

<div className="mt-10 bg-gradient-to-r from-[#082B3A] to-[#0F4C63] rounded-3xl p-8 text-white">

    <div className="flex flex-col lg:flex-row justify-between items-center">

        <div>

            <h2 className="text-3xl font-bold">

                Have a productive teaching day! 🚀

            </h2>

            <p className="mt-3 text-gray-200">

                Continue inspiring your students and managing your classes efficiently.

            </p>

        </div>

        <div className="mt-6 lg:mt-0">

            <button className="bg-yellow-400 text-[#082B3A] px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300">

                Go to My Classes

            </button>

        </div>

    </div>
</div>
</div>

);

};

export default Dashboard;
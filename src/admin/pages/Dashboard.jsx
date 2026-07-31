import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUsers,
  FaLaptopCode,
  FaLayerGroup,
} from "react-icons/fa";
import MonthlyEnrollmentChart from "../components/dashboard/charts/MonthlyEnrollmentChart";
import AppointmentChart from "../components/dashboard/charts/AppointmentChart";
import StudentStatusPie from "../components/dashboard/charts/StudentStatusPie";
const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    total_doctors: 0,
    total_appointments: 0,
    today_appointments: 0,
    pending_appointments: 0,
    completed_appointments: 0,

    islamic_teachers: 0,
    islamic_courses: 0,
    islamic_batches: 0,
    islamic_total_enrollments: 0,
    islamic_approved: 0,
    islamic_pending: 0,
    islamic_rejected: 0,

    digital_trainers: 0,
    digital_courses: 0,
    digital_batches: 0,
    digital_total_enrollments: 0,
    digital_approved: 0,
    digital_pending: 0,
    digital_rejected: 0,

    total_teachers_trainers: 0,
    total_courses: 0,
    total_batches: 0,
    total_students: 0,

    recent_appointments: [],
    recent_islamic_enrollments: [],
    recent_digital_enrollments: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const response = await fetch(
        `${BASE_URL}/admin/dashboard/dashboard.php`
      );

      const data = await response.json();

      if (data.success) {
        setDashboard(data);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [

    {
      title: "Doctors",
      value: dashboard.total_doctors,
      icon: <FaUserMd size={28} />,
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "Appointments",
      value: dashboard.total_appointments,
      icon: <FaCalendarCheck size={28} />,
      color: "from-purple-500 to-pink-500",
    },

    {
      title: "Today's Appointments",
      value: dashboard.today_appointments,
      icon: <FaClock size={28} />,
      color: "from-orange-500 to-red-500",
    },

    {
      title: "Completed",
      value: dashboard.completed_appointments,
      icon: <FaCheckCircle size={28} />,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Islamic Teachers",
      value: dashboard.islamic_teachers,
      icon: <FaChalkboardTeacher size={28} />,
      color: "from-indigo-500 to-violet-500",
    },

    {
      title: "Islamic Courses",
      value: dashboard.islamic_courses,
      icon: <FaBookOpen size={28} />,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Islamic Batches",
      value: dashboard.islamic_batches,
      icon: <FaLayerGroup size={28} />,
      color: "from-teal-500 to-green-500",
    },

    {
      title: "Islamic Students",
      value: dashboard.islamic_total_enrollments,
      icon: <FaUsers size={28} />,
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "Digital Trainers",
      value: dashboard.digital_trainers,
      icon: <FaLaptopCode size={28} />,
      color: "from-sky-500 to-blue-600",
    },

    {
      title: "Digital Courses",
      value: dashboard.digital_courses,
      icon: <FaBookOpen size={28} />,
      color: "from-fuchsia-500 to-purple-600",
    },

    {
      title: "Digital Batches",
      value: dashboard.digital_batches,
      icon: <FaLayerGroup size={28} />,
      color: "from-lime-500 to-green-600",
    },

    {
      title: "Digital Students",
      value: dashboard.digital_total_enrollments,
      icon: <FaUsers size={28} />,
      color: "from-red-500 to-pink-500",
    },

    {
      title: "Teachers + Trainers",
      value: dashboard.total_teachers_trainers,
      icon: <FaUsers size={28} />,
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Total Courses",
      value: dashboard.total_courses,
      icon: <FaBookOpen size={28} />,
      color: "from-amber-500 to-yellow-500",
    },

    {
      title: "Total Batches",
      value: dashboard.total_batches,
      icon: <FaLayerGroup size={28} />,
      color: "from-emerald-500 to-green-700",
    },

    {
      title: "Approved Students",
      value: dashboard.total_students,
      icon: <FaUsers size={28} />,
      color: "from-violet-500 to-indigo-600",
    },

  ];
  const enrollmentData = [
  { month:"Jan", islamic:18, digital:12 },
  { month:"Feb", islamic:25, digital:19 },
  { month:"Mar", islamic:32, digital:26 },
  { month:"Apr", islamic:40, digital:30 },
  { month:"May", islamic:45, digital:35 },
  { month:"Jun", islamic:50, digital:42 },
];

const appointmentData = [
  { day:"Mon", appointments:5 },
  { day:"Tue", appointments:8 },
  { day:"Wed", appointments:6 },
  { day:"Thu", appointments:9 },
  { day:"Fri", appointments:7 },
  { day:"Sat", appointments:4 },
];
    if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-[#032B38] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h1 className="text-5xl font-black text-[#032B38]">
          Dashboard Overview
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Complete overview of Hospital, Islamic Academy & Digital Academy
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-7 shadow-xl text-white hover:scale-105 duration-300`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80 text-lg">
                  {card.title}
                </p>

                <h2 className="text-5xl font-black mt-5">
                  {card.value}
                </h2>

              </div>

              <div className="bg-white/20 p-5 rounded-2xl">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Islamic + Digital Statistics */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8 text-[#032B38]">
            Islamic Academy
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Enrollments</span>
              <strong>{dashboard.islamic_total_enrollments}</strong>
            </div>

            <div className="flex justify-between">
              <span>Approved</span>
              <strong className="text-green-600">
                {dashboard.islamic_approved}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>
              <strong className="text-yellow-500">
                {dashboard.islamic_pending}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Rejected</span>
              <strong className="text-red-500">
                {dashboard.islamic_rejected}
              </strong>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8 text-[#032B38]">
            Digital Academy
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Enrollments</span>
              <strong>{dashboard.digital_total_enrollments}</strong>
            </div>

            <div className="flex justify-between">
              <span>Approved</span>
              <strong className="text-green-600">
                {dashboard.digital_approved}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>
              <strong className="text-yellow-500">
                {dashboard.digital_pending}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Rejected</span>
              <strong className="text-red-500">
                {dashboard.digital_rejected}
              </strong>
            </div>

          </div>

        </div>

      </div>
      {/* ============================
    Dashboard Charts
============================ */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

  <MonthlyEnrollmentChart
    data={enrollmentData}
  />

  <StudentStatusPie
    approved={
      dashboard.islamic_approved +
      dashboard.digital_approved
    }
    pending={
      dashboard.islamic_pending +
      dashboard.digital_pending
    }
    rejected={
      dashboard.islamic_rejected +
      dashboard.digital_rejected
    }
  />

</div>

<div className="mt-8 mb-8">

  <AppointmentChart
    data={appointmentData}
  />

</div>
            {/* Recent Activities */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Recent Appointments */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#032B38] mb-6">
            Recent Appointments
          </h2>

          {dashboard.recent_appointments.length === 0 ? (

            <div className="text-center text-slate-400 py-10">
              No Appointments Found
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.recent_appointments.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-4 hover:bg-slate-50 transition"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-bold text-[#032B38]">
                        {item.patient_name || "Patient"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.appointment_date}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Islamic Enrollments */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#032B38] mb-6">
            Recent Islamic Enrollments
          </h2>

          {dashboard.recent_islamic_enrollments.length === 0 ? (

            <div className="text-center text-slate-400 py-10">
              No Records Found
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.recent_islamic_enrollments.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-4 hover:bg-slate-50"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold text-[#032B38]">
                        {item.full_name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.created_at}
                      </p>

                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full
                      ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Digital Enrollments */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#032B38] mb-6">
            Recent Digital Enrollments
          </h2>

          {dashboard.recent_digital_enrollments.length === 0 ? (

            <div className="text-center text-slate-400 py-10">
              No Records Found
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.recent_digital_enrollments.map((item, index) => (

                <div
                  key={index}
                  className="border rounded-2xl p-4 hover:bg-slate-50"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold text-[#032B38]">
                        {item.full_name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.created_at}
                      </p>

                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full
                      ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );

}
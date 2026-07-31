import React from "react";
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

import StatCard from "./StatCard";

export default function StatsGrid({ dashboard }) {

  const cards = [

    // =============================
    // Hospital
    // =============================

    {
      title: "Doctors",
      value: dashboard.total_doctors,
      icon: <FaUserMd size={26} />,
      color: "from-blue-500 to-cyan-500",
      percentage: 15,
      trend: "up",
    },

    {
      title: "Appointments",
      value: dashboard.total_appointments,
      icon: <FaCalendarCheck size={26} />,
      color: "from-purple-500 to-pink-500",
      percentage: 10,
      trend: "up",
    },

    {
      title: "Today's Appointments",
      value: dashboard.today_appointments,
      icon: <FaClock size={26} />,
      color: "from-orange-500 to-red-500",
      percentage: 6,
      trend: "up",
    },

    {
      title: "Completed",
      value: dashboard.completed_appointments,
      icon: <FaCheckCircle size={26} />,
      color: "from-green-500 to-emerald-500",
      percentage: 18,
      trend: "up",
    },

    // =============================
    // Islamic
    // =============================

    {
      title: "Islamic Teachers",
      value: dashboard.islamic_teachers,
      icon: <FaChalkboardTeacher size={26} />,
      color: "from-indigo-500 to-violet-500",
      percentage: 8,
      trend: "up",
    },

    {
      title: "Islamic Courses",
      value: dashboard.islamic_courses,
      icon: <FaBookOpen size={26} />,
      color: "from-yellow-500 to-orange-500",
      percentage: 12,
      trend: "up",
    },

    {
      title: "Islamic Batches",
      value: dashboard.islamic_batches,
      icon: <FaLayerGroup size={26} />,
      color: "from-teal-500 to-green-500",
      percentage: 5,
      trend: "up",
    },

    {
      title: "Islamic Students",
      value: dashboard.islamic_total_enrollments,
      icon: <FaUsers size={26} />,
      color: "from-pink-500 to-rose-500",
      percentage: 20,
      trend: "up",
    },

    // =============================
    // Digital
    // =============================

    {
      title: "Digital Trainers",
      value: dashboard.digital_trainers,
      icon: <FaLaptopCode size={26} />,
      color: "from-sky-500 to-blue-500",
      percentage: 9,
      trend: "up",
    },

    {
      title: "Digital Courses",
      value: dashboard.digital_courses,
      icon: <FaBookOpen size={26} />,
      color: "from-fuchsia-500 to-purple-600",
      percentage: 13,
      trend: "up",
    },

    {
      title: "Digital Batches",
      value: dashboard.digital_batches,
      icon: <FaLayerGroup size={26} />,
      color: "from-lime-500 to-green-600",
      percentage: 7,
      trend: "up",
    },

    {
      title: "Digital Students",
      value: dashboard.digital_total_enrollments,
      icon: <FaUsers size={26} />,
      color: "from-red-500 to-pink-500",
      percentage: 11,
      trend: "up",
    },

    // =============================
    // Overall
    // =============================

    {
      title: "Teachers + Trainers",
      value: dashboard.total_teachers_trainers,
      icon: <FaUsers size={26} />,
      color: "from-cyan-500 to-blue-600",
      percentage: 14,
      trend: "up",
    },

    {
      title: "Total Courses",
      value: dashboard.total_courses,
      icon: <FaBookOpen size={26} />,
      color: "from-amber-500 to-yellow-500",
      percentage: 16,
      trend: "up",
    },

    {
      title: "Total Batches",
      value: dashboard.total_batches,
      icon: <FaLayerGroup size={26} />,
      color: "from-emerald-500 to-green-700",
      percentage: 8,
      trend: "up",
    },

    {
      title: "Approved Students",
      value: dashboard.total_students,
      icon: <FaUsers size={26} />,
      color: "from-violet-500 to-indigo-600",
      percentage: 22,
      trend: "up",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

      {cards.map((card, index) => (

        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          percentage={card.percentage}
          trend={card.trend}
        />

      ))}

    </div>

  );
}
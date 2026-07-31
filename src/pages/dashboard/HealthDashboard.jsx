// pages/dashboard/HealthDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HealthDashboard() {

  const navigate = useNavigate();

  const lang = localStorage.getItem("lang") || "en";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Health Dashboard
        </h2>

        <p className="text-blue-600 text-lg mb-4">
          🏥 You are enrolled in Health Course
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
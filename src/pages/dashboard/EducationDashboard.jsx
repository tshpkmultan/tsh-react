// pages/dashboard/EducationDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EducationDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Education Dashboard
        </h2>

        <p className="text-yellow-600 text-lg mb-4">
          📚 You are enrolled in Education Course
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
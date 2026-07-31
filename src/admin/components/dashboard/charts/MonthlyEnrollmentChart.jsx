import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyEnrollmentChart({ data }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-[#032B38]">
            Monthly Enrollments
          </h2>

          <p className="text-slate-500">
            Islamic + Digital Students
          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="islamic"
            stroke="#10B981"
            strokeWidth={4}
          />

          <Line
            type="monotone"
            dataKey="digital"
            stroke="#3B82F6"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}
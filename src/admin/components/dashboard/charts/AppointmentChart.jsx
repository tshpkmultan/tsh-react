import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";

export default function AppointmentChart({ data }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-[#032B38] mb-6">
        Weekly Appointments
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="appointments"
            fill="#8B5CF6"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}
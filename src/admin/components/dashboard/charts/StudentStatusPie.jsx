import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export default function StudentStatusPie({
  approved,
  pending,
  rejected,
}) {

  const data = [
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-[#032B38] mb-6">
        Student Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >

            {data.map((entry,index)=>(

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip/>

          <Legend/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}
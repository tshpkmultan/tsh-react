import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  icon,
  color = "from-blue-500 to-cyan-500",
  percentage = 0,
  trend = "up",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="relative overflow-hidden rounded-3xl p-6 shadow-xl bg-white group"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 group-hover:opacity-20 transition-all duration-300`}
      />

      {/* Decorative Circle */}
      <div
        className={`absolute -right-10 -top-10 w-36 h-36 rounded-full bg-gradient-to-r ${color} opacity-20`}
      />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">
              {title}
            </p>

            <h2 className="text-4xl font-black text-[#032B38] mt-4">

              <CountUp
                end={value}
                duration={1.5}
                separator=","
              />

            </h2>

          </div>

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-white shadow-lg`}
          >
            {icon}
          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 flex justify-between items-center">

          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              trend === "up"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            )}

            {percentage}%
          </div>

          <span className="text-xs text-slate-400">
            Compared to last month
          </span>

        </div>

        {/* Progress */}

        <div className="mt-5">

          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(percentage, 100)}%`,
              }}
              transition={{ duration: 1 }}
              className={`h-full bg-gradient-to-r ${color}`}
            />

          </div>

        </div>

      </div>

    </motion.div>
  );
}
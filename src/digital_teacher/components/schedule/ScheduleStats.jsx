import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaSchool,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";

const cards = [
  {
    key: "total",
    title: "Total Classes",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: <FaCalendarAlt size={28} />,
  },
  {
    key: "today",
    title: "Today's Classes",
    color: "bg-green-100",
    iconColor: "text-green-600",
    icon: <FaClock size={28} />,
  },
  {
    key: "online",
    title: "Online Classes",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: <FaVideo size={28} />,
  },
  {
    key: "offline",
    title: "Physical Classes",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    icon: <FaSchool size={28} />,
  },
  {
    key: "live",
    title: "Live Classes",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: <FaPlayCircle size={28} />,
  },
  {
    key: "completed",
    title: "Completed",
    color: "bg-gray-100",
    iconColor: "text-gray-600",
    icon: <FaCheckCircle size={28} />,
  },
];

const ScheduleStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold text-[#082B3A] mt-3">
                {stats[card.key] || 0}
              </h2>
            </div>

            <div
              className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center ${card.iconColor}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleStats;
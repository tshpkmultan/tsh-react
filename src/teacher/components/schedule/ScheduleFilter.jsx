import {
  FaSearch,
  FaFilter,
  FaSyncAlt,
  FaList,
  FaCalendarAlt,
} from "react-icons/fa";

const ScheduleFilter = ({
  search,
  setSearch,
  month,
  setMonth,
  year,
  setYear,
  view,
  setView,
  reload,
}) => {

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex flex-col xl:flex-row xl:items-center gap-5">

        {/* Search */}

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by class, course, batch or student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#082B3A] outline-none"
          />

        </div>

        {/* Month */}

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded-xl px-4 py-3"
        >

          {months.map((monthName, index) => (

            <option
              key={index}
              value={index + 1}
            >

              {monthName}

            </option>

          ))}

        </select>

        {/* Year */}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-xl px-4 py-3"
        >

          {Array.from({ length: 6 }).map((_, index) => (

            <option
              key={index}
              value={currentYear - 2 + index}
            >

              {currentYear - 2 + index}

            </option>

          ))}

        </select>

        {/* Refresh */}

        <button
          onClick={reload}
          className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition"
        >

          <FaSyncAlt />

          Refresh

        </button>

      </div>

      {/* Bottom */}

      <div className="flex flex-col lg:flex-row justify-between items-center mt-6 gap-4">

        <div className="flex items-center gap-2 text-gray-600">

          <FaFilter />

          <span className="font-medium">

            Digital Class Filters

          </span>

        </div>

        {/* View Switch */}

        <div className="flex rounded-xl overflow-hidden border">

          <button
            onClick={() => setView("list")}
            className={`px-6 py-3 flex items-center gap-2 transition ${
              view === "list"
                ? "bg-[#082B3A] text-yellow-400"
                : "bg-white hover:bg-gray-100"
            }`}
          >

            <FaList />

            List View

          </button>

          <button
            onClick={() => setView("calendar")}
            className={`px-6 py-3 flex items-center gap-2 transition ${
              view === "calendar"
                ? "bg-[#082B3A] text-yellow-400"
                : "bg-white hover:bg-gray-100"
            }`}
          >

            <FaCalendarAlt />

            Calendar View

          </button>

        </div>

      </div>

    </div>

  );

};

export default ScheduleFilter;
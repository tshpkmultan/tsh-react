import {
  FaSearch,
  FaFilter,
  FaSyncAlt,
  FaList,
  FaCalendarAlt,
  FaCalendarDay,
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
  status,
  setStatus,
  total = 0,
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

  const goToday = () => {
    const today = new Date();

    setMonth(today.getMonth() + 1);

    setYear(today.getFullYear());

    reload();
  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      {/* Top */}

      <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-4">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by course, trainer, batch or student..."
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

          {months.map((m, i) => (

            <option key={i} value={i + 1}>

              {m}

            </option>

          ))}

        </select>

        {/* Year */}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-xl px-4 py-3"
        >

          {Array.from({ length: 6 }).map((_, i) => (

            <option
              key={i}
              value={currentYear - 2 + i}
            >

              {currentYear - 2 + i}

            </option>

          ))}

        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >

          <option value="">All Status</option>
          <option>Upcoming</option>
          <option>Live</option>
          <option>Ended</option>
          <option>Completed</option>
          <option>Cancelled</option>

        </select>

        {/* Refresh */}

        <button
          onClick={reload}
          className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 rounded-xl font-semibold flex items-center justify-center gap-2"
        >

          <FaSyncAlt />

          Refresh

        </button>

      </div>

      {/* Bottom */}

      <div className="flex flex-col lg:flex-row justify-between items-center mt-6 gap-5">

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2 text-gray-600">

            <FaFilter />

            <span className="font-medium">

              Filters Applied

            </span>

          </div>

          <span className="bg-[#082B3A] text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">

            {total} Sessions

          </span>

        </div>

        <div className="flex gap-3">

          <button
            onClick={goToday}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
          >

            <FaCalendarDay />

            Today

          </button>

          <div className="flex rounded-xl overflow-hidden border">

            <button
              onClick={() => setView("list")}
              className={`px-6 py-3 flex items-center gap-2 ${
                view === "list"
                  ? "bg-[#082B3A] text-yellow-400"
                  : "bg-white hover:bg-gray-100"
              }`}
            >

              <FaList />

              List

            </button>

            <button
              onClick={() => setView("calendar")}
              className={`px-6 py-3 flex items-center gap-2 ${
                view === "calendar"
                  ? "bg-[#082B3A] text-yellow-400"
                  : "bg-white hover:bg-gray-100"
              }`}
            >

              <FaCalendarAlt />

              Calendar

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ScheduleFilter;
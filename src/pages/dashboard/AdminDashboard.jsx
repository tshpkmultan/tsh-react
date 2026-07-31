export default function AdminDashboard() {
  const [stats, setStats] = React.useState([]);
  const [enrollments, setEnrollments] = React.useState([]);
  const [department, setDepartment] = React.useState("all");

  // FETCH DASHBOARD DATA
  React.useEffect(() => {

    fetch(
      `https://800junkuae.online/tsh-api/API/admin/dashboard.php?department=${department}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats || []);
        setEnrollments(data.enrollments || []);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [department]);

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#032B3A] text-white flex flex-col justify-between shadow-xl">
        <div>
          {/* LOGO */}
          <div className="p-6 border-b border-[#0c4257]">
            <h1 className="text-3xl font-extrabold text-yellow-300 flex items-center gap-3">
              ⚡ Admin Panel
            </h1>
          </div>

          {/* MENU */}
          <nav className="mt-6 px-4 space-y-3">
            <button className="w-full bg-yellow-300 text-black px-5 py-4 rounded-2xl text-left font-semibold shadow hover:scale-[1.02] transition-all">
              🏠 Dashboard
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              🖼 Hero Section
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              👥 User Approvals
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              📚 Courses & Skills
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              👨‍🏫 Teachers
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              📝 Enrollments
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              🏥 Departments
            </button>

            <button className="w-full px-5 py-4 rounded-2xl text-left hover:bg-[#0a3b4f] transition-all">
              ⚙ Settings
            </button>
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="p-5 border-t border-[#0c4257]">
          <button className="w-full bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl font-semibold">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* TOPBAR */}
        <div className="bg-white h-20 shadow flex items-center justify-between px-10">
          <h2 className="text-3xl font-bold text-[#032B3A]">
            Platform Management System
          </h2>

          <div className="flex items-center gap-5">
            <div className="relative text-2xl">
              🔔
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#032B3A] text-yellow-300 flex items-center justify-center font-bold text-lg">
                AD
              </div>
              <div>
                <h4 className="font-bold text-lg">Super Admin</h4>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* STATS */}
          <h3 className="text-4xl font-bold text-[#032B3A] mb-8">
            Overview Statistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-6 border-l-8 ${item.color} shadow-md hover:shadow-xl transition-all`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-lg">{item.title}</p>
                    <h2 className="text-5xl font-extrabold mt-2 text-[#032B3A]">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`w-20 h-20 rounded-full ${item.bg} flex items-center justify-center text-4xl`}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ENROLLMENTS TABLE */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#032B3A]">
                Recent Enrollments
              </h3>

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded-xl px-4 py-2 outline-none"
              >
                <option value="all">All Departments</option>
                <option value="islamic">Islamic</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-5">Student</th>
                    <th className="p-5">Department</th>
                    <th className="p-5">Course</th>
                    <th className="p-5">Teacher</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {enrollments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-5 font-semibold">{item.name}</td>

                      <td className="p-5">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item.department}
                        </span>
                      </td>

                      <td className="p-5">{item.course}</td>

                      <td className="p-5">{item.teacher}</td>

                      <td className="p-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-5 flex gap-3">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">
                          Approve
                        </button>

                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

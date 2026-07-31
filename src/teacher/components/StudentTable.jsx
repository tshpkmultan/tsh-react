import { FaEdit, FaUserGraduate } from "react-icons/fa";

const StudentTable = ({ students, onEdit }) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-16">
        <FaUserGraduate className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">
          No Students Found
        </h2>
        <p className="text-gray-500 mt-2">
          There are no students assigned to you.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Batch
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student, index) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">

                      {student.full_name?.charAt(0)}

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {student.full_name}

                      </h3>

                      <p className="text-gray-500 text-sm">

                        {student.email}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  {student.phone}
                </td>

                <td className="p-4">
                  {student.course_name}
                </td>

                <td className="p-4">
                  {student.batch_name || "-"}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.student_type === "Batch"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {student.student_type}
                  </span>

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      student.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : student.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onEdit(student)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="grid gap-4 lg:hidden p-4">

        {students.map((student) => (

          <div
            key={student.id}
            className="border rounded-xl p-4 shadow-sm"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-bold text-lg">

                  {student.full_name}

                </h3>

                <p className="text-gray-500 text-sm">

                  {student.email}

                </p>

              </div>

              <button
                onClick={() => onEdit(student)}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                Edit
              </button>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

              <div>

                <span className="text-gray-500">
                  Phone
                </span>

                <p>{student.phone}</p>

              </div>

              <div>

                <span className="text-gray-500">
                  Course
                </span>

                <p>{student.course_name}</p>

              </div>

              <div>

                <span className="text-gray-500">
                  Batch
                </span>

                <p>{student.batch_name || "-"}</p>

              </div>

              <div>

                <span className="text-gray-500">
                  Type
                </span>

                <p>{student.student_type}</p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </>
  );
};

export default StudentTable;
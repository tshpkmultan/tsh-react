import { FaUserGraduate, FaEye } from "react-icons/fa";

const StudentTable = ({ students, onEdit }) => {

  if (!students || students.length === 0) {

    return (

      <div className="flex flex-col items-center justify-center py-20">

        <FaUserGraduate className="text-7xl text-gray-300 mb-5" />

        <h2 className="text-2xl font-bold text-gray-700">
          No Students Found
        </h2>

        <p className="text-gray-500 mt-2">
          No students are assigned to your courses yet.
        </p>

      </div>

    );

  }

  return (

    <>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead className="bg-[#082B3A] text-white">

            <tr>

              <th className="px-6 py-4 text-left">#</th>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Course
              </th>

              <th className="px-6 py-4 text-left">
                Batch
              </th>

              <th className="px-6 py-4 text-left">
                Timing
              </th>

              <th className="px-6 py-4 text-left">
                Enrolled
              </th>

              <th className="px-6 py-4 text-center">
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

                <td className="px-6 py-4 font-semibold">
                  {index + 1}
                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-[#082B3A] text-yellow-400 flex items-center justify-center font-bold">

                      {student.full_name?.charAt(0).toUpperCase()}

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

                <td className="px-6 py-4">
                  {student.phone}
                </td>

                <td className="px-6 py-4">
                  {student.course_name}
                </td>

                <td className="px-6 py-4">
                  {student.batch_name || "Individual"}
                </td>

                <td className="px-6 py-4">
                  {student.timing || "-"}
                </td>

                <td className="px-6 py-4">
                  {student.created_at?.substring(0,10)}
                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() => onEdit(student)}
                    className="bg-[#082B3A] hover:bg-[#0E4258] text-white px-5 py-2 rounded-xl flex items-center gap-2 mx-auto"
                  >

                    <FaEye />

                    View

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="grid gap-5 lg:hidden">

        {students.map((student) => (

          <div
            key={student.id}
            className="bg-white rounded-2xl shadow p-5"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-lg">

                  {student.full_name}

                </h3>

                <p className="text-gray-500">

                  {student.email}

                </p>

              </div>

              <button
                onClick={() => onEdit(student)}
                className="bg-[#082B3A] text-white px-4 py-2 rounded-lg"
              >

                <FaEye />

              </button>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

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

                <p>{student.batch_name || "Individual"}</p>

              </div>

              <div>

                <span className="text-gray-500">
                  Timing
                </span>

                <p>{student.timing || "-"}</p>

              </div>

              <div className="col-span-2">

                <span className="text-gray-500">
                  Enrolled
                </span>

                <p>{student.created_at?.substring(0,10)}</p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </>

  );

};

export default StudentTable;
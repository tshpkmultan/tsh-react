import { useEffect, useState } from "react";
import axios from "axios";
const API = "https://800junkuae.online/tsh-api/API";
const trainer = JSON.parse(localStorage.getItem("trainer"));
const Students = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);
const trainer = JSON.parse(localStorage.getItem("trainer"));


    const fetchStudents = async () => {

    try {

        const res = await axios.get(
            `${API}/admin/digital_students/list.php`,
            {
               params: {
    trainer_id: trainer.id
}
            }
        );

        if (res.data.success) {
            setStudents(res.data.students);
        }

    } catch (err) {
        console.log(err);
    }

    setLoading(false);

};
const handleEdit = (student) => {

    console.log(student);

    // Later:
    // navigate(`/admin/digital-students/edit/${student.id}`);

};

const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {

        const res = await axios.post(
            `${API}/admin/digital_students/delete.php`,
            {
                id
            }
        );

        if (res.data.success) {

            alert("Student deleted successfully.");

            fetchStudents();

        } else {

            alert(res.data.message);

        }

    } catch (error) {

        console.log(error);

    }

};
    return (
  <div className="p-4 md:p-6">

    {/* Header */}

    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Digital Students
        </h1>
        <p className="text-gray-500">
          Manage all batch & individual students
        </p>
      </div>

      <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow">
        <p className="text-sm">Total Students</p>
        <h2 className="text-2xl font-bold">
          {students.length}
        </h2>
      </div>

    </div>

    {/* Search */}

    <div className="bg-white rounded-xl shadow p-4 mb-5">

      <input
        type="text"
        placeholder="Search student..."
        className="w-full md:w-80 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* Table */}

    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-4 py-3 text-left">#</th>

            <th className="px-4 py-3 text-left">Student</th>

            <th className="px-4 py-3 text-left">Email</th>

            <th className="px-4 py-3 text-left">Phone</th>

            <th className="px-4 py-3 text-left">Course</th>

            <th className="px-4 py-3 text-left">Trainer</th>

            <th className="px-4 py-3 text-left">Type</th>

            <th className="px-4 py-3 text-left">Batch</th>

            <th className="px-4 py-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan="9" className="text-center py-8">
                Loading...
              </td>
            </tr>

          ) : students.length === 0 ? (

            <tr>
              <td colSpan="9" className="text-center py-8">
                No Students Found
              </td>
            </tr>

          ) : (

            students.map((student, index) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {index + 1}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {student.name}
                </td>

                <td className="px-4 py-3">
                  {student.email}
                </td>

                <td className="px-4 py-3">
                  {student.phone}
                </td>

                <td className="px-4 py-3">
                  {student.course_name}
                </td>

                <td className="px-4 py-3">
                  {student.trainer_name}
                </td>

                <td className="px-4 py-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      student.student_type === "Batch"
                        ? "bg-green-600"
                        : "bg-purple-600"
                    }`}
                  >
                    {student.student_type}
                  </span>

                </td>

                <td className="px-4 py-3">
                  {student.batch_name}
                </td>

                <td className="px-4 py-3">

                  <div className="flex justify-center gap-2">

                    

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </div>
);
};

export default Students;
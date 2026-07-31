import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserGraduate,
  FaLayerGroup,
  FaSearch,
} from "react-icons/fa";

import StudentTable from "../components/StudentTable";
import StudentEditModal from "../components/StudentEditModal";

const Students = () => {
  const API = "https://800junkuae.online/tsh-api/API";

  const teacher = JSON.parse(localStorage.getItem("teacher"));

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/teacher/students/list.php?teacher_id=${teacher.id}`
      );

      if (res.data.success) {
        setStudents(res.data.students);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (filter === "individual") {
      data = data.filter(
        (s) => s.student_type === "Individual"
      );
    }

    if (filter === "batch") {
      data = data.filter(
        (s) => s.student_type === "Batch"
      );
    }

    if (search) {
      data = data.filter((s) =>
        s.full_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return data;
  }, [students, search, filter]);

  const total = students.length;

  const individual = students.filter(
    (s) => s.student_type === "Individual"
  ).length;

  const batch = students.filter(
    (s) => s.student_type === "Batch"
  ).length;

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenEdit(true);
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">

            My Students

          </h1>

          <p className="text-gray-500">

            Manage students assigned to you

          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p>Total Students</p>

              <h2 className="text-3xl font-bold">

                {total}

              </h2>

            </div>

            <FaUsers className="text-4xl text-blue-600"/>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p>Individual</p>

              <h2 className="text-3xl font-bold">

                {individual}

              </h2>

            </div>

            <FaUserGraduate className="text-4xl text-green-600"/>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p>Batch</p>

              <h2 className="text-3xl font-bold">

                {batch}

              </h2>

            </div>

            <FaLayerGroup className="text-4xl text-purple-600"/>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400"/>

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full border rounded-lg pl-12 py-3"
          />

        </div>

      </div>

      {/* Filter */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={()=>setFilter("all")}
          className={`px-5 py-2 rounded ${
            filter==="all"
              ?"bg-blue-600 text-white"
              :"bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={()=>setFilter("individual")}
          className={`px-5 py-2 rounded ${
            filter==="individual"
              ?"bg-green-600 text-white"
              :"bg-gray-200"
          }`}
        >
          Individual
        </button>

        <button
          onClick={()=>setFilter("batch")}
          className={`px-5 py-2 rounded ${
            filter==="batch"
              ?"bg-purple-600 text-white"
              :"bg-gray-200"
          }`}
        >
          Batch
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow">

        {loading ? (

          <div className="text-center py-20">

            Loading...

          </div>

        ) : (

          <StudentTable
            students={filteredStudents}
            onEdit={handleEdit}
          />

        )}

      </div>

      <StudentEditModal
        open={openEdit}
        student={selectedStudent}
        onClose={() => setOpenEdit(false)}
        refresh={fetchStudents}
      />

    </div>
  );
};

export default Students;
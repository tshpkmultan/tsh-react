import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import StudentTable from "../components/digital-students/StudentTable";
import StudentViewModal from "../components/digital-students/StudentViewModal";
import StudentEditModal from "../components/digital-students/StudentEditModal";
import StudentStatusModal from "../components/digital-students/StudentStatusModal";
import DeleteStudentModal from "../components/digital-students/DeleteStudentModal";

import {
  Search,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";

const API = "https://800junkuae.online/tsh-api/API";

const DigitalStudents = () => {

  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);

  const [trainers, setTrainers] = useState([]);

  const [courses, setCourses] = useState([]);

  const [batches, setBatches] = useState([]);

  /*
  |--------------------------------------------------------------------------
  | Search & Filters
  |--------------------------------------------------------------------------
  */

  const [search, setSearch] = useState("");

  const [trainerFilter, setTrainerFilter] = useState("");

  const [courseFilter, setCourseFilter] = useState("");

  const [batchFilter, setBatchFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Modals
  |--------------------------------------------------------------------------
  */

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadStudents();

    loadTrainers();

    loadCourses();

    loadBatches();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Students
  |--------------------------------------------------------------------------
  */

  const loadStudents = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API}/admin/digital_students/list1.php`
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

  /*
  |--------------------------------------------------------------------------
  | Trainers
  |--------------------------------------------------------------------------
  */

  const loadTrainers = async () => {

    try {

      const res = await axios.get(
        `${API}/digital_trainer/get-trainers.php`
      );

      if (res.data.success) {

        setTrainers(res.data.trainers);

      }

    } catch (err) {

      console.log(err);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Courses
  |--------------------------------------------------------------------------
  */

  const loadCourses = async () => {

    try {

      const res = await axios.get(
        `${API}/digital_courses/get-courses.php`
      );

      if (res.data.success) {

        setCourses(res.data.data);

      }

    } catch (err) {

      console.log(err);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Batches
  |--------------------------------------------------------------------------
  */

  const loadBatches = async () => {

    try {

      const res = await axios.get(
        `${API}/admin/digital_batches/list.php`
      );

      if (res.data.success) {

        setBatches(res.data.batches);

      }

    } catch (err) {

      console.log(err);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Dashboard Statistics
  |--------------------------------------------------------------------------
  */

  const totalStudents = students.length;

  const approvedStudents = students.filter(
    (s) => s.status === "Approved"
  ).length;

  const pendingStudents = students.filter(
    (s) => s.status === "Pending"
  ).length;

  const rejectedStudents = students.filter(
    (s) => s.status === "Rejected"
  ).length;

  /*
  |--------------------------------------------------------------------------
  | Filtered Students
  |--------------------------------------------------------------------------
  */

  const filteredStudents = useMemo(() => {

    return students.filter((student) => {

      const searchMatch =
        student.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        student.phone
          ?.includes(search);

      const trainerMatch =
        trainerFilter === "" ||
        student.trainer_id == trainerFilter;

      const courseMatch =
        courseFilter === "" ||
        student.course_id == courseFilter;

      const batchMatch =
        batchFilter === "" ||
        student.batch_id == batchFilter;

      const statusMatch =
        statusFilter === "" ||
        student.status === statusFilter;

      return (
        searchMatch &&
        trainerMatch &&
        courseMatch &&
        batchMatch &&
        statusMatch
      );

    });

  }, [
    students,
    search,
    trainerFilter,
    courseFilter,
    batchFilter,
    statusFilter,
  ]);
    /*
  |--------------------------------------------------------------------------
  | Modal Handlers
  |--------------------------------------------------------------------------
  */

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };

  const handleStatus = (student) => {
    setSelectedStudent(student);
    setStatusOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setDeleteOpen(true);
  };

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Digital Students
          </h1>

          <p className="text-gray-500">
            Manage Digital Course Students
          </p>

        </div>

        <button
          onClick={loadStudents}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg mt-4 md:mt-0"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Students
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalStudents}
              </h2>

            </div>

            <Users
              className="text-blue-600"
              size={42}
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Approved
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {approvedStudents}
              </h2>

            </div>

            <CheckCircle
              className="text-green-600"
              size={42}
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                {pendingStudents}
              </h2>

            </div>

            <Clock
              className="text-yellow-500"
              size={42}
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Rejected
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {rejectedStudents}
              </h2>

            </div>

            <XCircle
              className="text-red-600"
              size={42}
            />

          </div>

        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="bg-white rounded-xl shadow p-5 mb-8">

        <div className="grid md:grid-cols-5 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="border rounded-lg pl-10 pr-4 py-3 w-full"
            />

          </div>

          {/* Trainer */}

          <select
            value={trainerFilter}
            onChange={(e)=>setTrainerFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              All Trainers
            </option>

            {trainers.map((trainer)=>(

              <option
                key={trainer.id}
                value={trainer.id}
              >
                {trainer.name}
              </option>

            ))}

          </select>

          {/* Course */}

          <select
            value={courseFilter}
            onChange={(e)=>setCourseFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              All Courses
            </option>

            {courses.map((course)=>(

              <option
                key={course.id}
                value={course.id}
              >
                {course.title}
              </option>

            ))}

          </select>

          {/* Batch */}

          <select
            value={batchFilter}
            onChange={(e)=>setBatchFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              All Batches
            </option>

            {batches.map((batch)=>(

              <option
                key={batch.id}
                value={batch.id}
              >
                {batch.batch_name}
              </option>

            ))}

          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              All Status
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <StudentTable
        students={filteredStudents}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onStatus={handleStatus}
        onDelete={handleDelete}
      />
            {/* ================= VIEW MODAL ================= */}

      <StudentViewModal
        open={viewOpen}
        student={selectedStudent}
        onClose={() => {
          setViewOpen(false);
          setSelectedStudent(null);
        }}
      />

      {/* ================= EDIT MODAL ================= */}

      <StudentEditModal
        open={editOpen}
        student={selectedStudent}
        trainers={trainers}
        courses={courses}
        batches={batches}
        onClose={() => {
          setEditOpen(false);
          setSelectedStudent(null);
        }}
        onUpdated={loadStudents}
      />

      {/* ================= STATUS MODAL ================= */}

      <StudentStatusModal
        open={statusOpen}
        student={selectedStudent}
        onClose={() => {
          setStatusOpen(false);
          setSelectedStudent(null);
        }}
        onUpdated={loadStudents}
      />

      {/* ================= DELETE MODAL ================= */}

      <DeleteStudentModal
        open={deleteOpen}
        student={selectedStudent}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedStudent(null);
        }}
        onDeleted={loadStudents}
      />

    </div>
  );
};

export default DigitalStudents;
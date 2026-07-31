import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckDouble } from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Attendance = () => {
  const API = "https://800junkuae.online/tsh-api/API";

  const [attendanceLocked, setAttendanceLocked] = useState(false);

  const [batches, setBatches] = useState([]);

  // Students inside selected batch
  const [students, setStudents] = useState([]);

  // Students that are NOT in any batch
  const [individualStudents, setIndividualStudents] = useState([]);

  // Selected Individual Student
  const [individualAttendance, setIndividualAttendance] = useState(null);

  const [batchId, setBatchId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchBatches();
    fetchIndividualStudents();
  }, []);

  /*
  ======================================
  Fetch All Batches
  ======================================
  */

  const fetchBatches = async () => {

    try {

        const teacher = JSON.parse(
            localStorage.getItem("teacher")
        );

        const res = await axios.get(
            `${API}/admin/islamic_batches/list.php?teacher_id=${teacher.teacher_id}`
        );

        if (res.data.success) {

            setBatches(res.data.batches);

        } else {

            setBatches([]);

        }

    } catch (error) {

        console.log(error);

    }

};
  /*
  ======================================
  Fetch Students of Selected Batch
  ======================================
  */
const fetchStudents = async (batch_id) => {

    try {

        const teacher = JSON.parse(
            localStorage.getItem("teacher")
        );

        const res = await axios.get(

            `${API}/admin/attendance/get_students.php`,

            {
                params: {
                    batch_id: batch_id,
                    teacher_id: teacher.teacher_id
                }
            }

        );

        const data = (res.data.students || []).map(student => ({

            ...student,

            status: "present"

        }));

        setStudents(data);

    } catch (error) {

        console.log(error);

        setStudents([]);

    }

};

  /*
  ======================================
  Fetch Individual Students
  ======================================
  */

 const fetchIndividualStudents = async () => {

    try {

        const teacher = JSON.parse(
            localStorage.getItem("teacher")
        );

        const res = await axios.get(

            `${API}/admin/attendance/get_individual_students.php`,

            {
                params: {
                    teacher_id: teacher.teacher_id
                }
            }

        );

        if (res.data.success) {

            setIndividualStudents(res.data.students);

        } else {

            setIndividualStudents([]);

        }

    } catch (error) {

        console.log(error);

    }

};

  /*
  ======================================
  Check Attendance Lock
  ======================================
  */

  const checkAttendanceStatus = async (
    batch_id,
    attendance_date
  ) => {
    try {
      const res = await axios.get(
        `${API}/admin/attendance/check.php`,
        {
          params: {
            batch_id,
            attendance_date,
          },
        }
      );

      setAttendanceLocked(res.data.submitted);
    } catch (error) {
      console.log(error);
      setAttendanceLocked(false);
    }
  };

  /*
  ======================================
  Change Student Status
  ======================================
  */

const updateStatus = (index, status) => {

  // Individual Student Mode
  if (selectedStudent) {

    setIndividualAttendance(prev => ({
      ...prev,
      status
    }));

    return;
  }

  // Batch Mode
  const updated = [...students];

  updated[index].status = status;

  setStudents(updated);

};

  /*
  ======================================
  Individual Student Status
  ======================================
  */

  const updateIndividualStatus = (status) => {
    setIndividualAttendance({
      ...individualAttendance,
      status,
    });
  };
  const checkIndividualAttendance = async (studentId, attendanceDate) => {

    try {

        const res = await axios.get(

            `${API}/admin/attendance/check_individual.php`,

            {
                params: {

                    student_id: studentId,

                    attendance_date: attendanceDate

                }
            }

        );

        setAttendanceLocked(
            res.data.submitted || false
        );

    } catch (error) {

        console.log(error);

        setAttendanceLocked(false);

    }

};
 const saveAttendance = async () => {

    try {

        // Individual Student Attendance
        if (selectedStudent && !batchId) {

            const res = await axios.post(
                `${API}/admin/attendance/save_individual.php`,
                {
                    student_id: selectedStudent,
                    attendance_date: date,
                    status: individualAttendance.status,
                }
            );

            alert(res.data.message);
            return;
        }

        // Batch Attendance
        if (!batchId) {
            alert("Please Select Batch");
            return;
        }

        const res = await axios.post(
            `${API}/admin/attendance/save.php`,
            {
                batch_id: batchId,
                attendance_date: date,
                students,
            }
        );

        alert(res.data.message);

    } catch (error) {

        console.error(error);

        alert("Failed To Save Attendance");

    }

};
const displayedStudents = batchId
  ? students
  : individualAttendance
  ? [individualAttendance]
  : [];
return (
  <div className="bg-[#F3F4F6] min-h-screen p-8">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      {/* ================= TOP FILTER ================= */}

      <div className="p-8 flex flex-col lg:flex-row justify-between items-center gap-6">

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Batch */}

          <div>

            <label className="block mb-2 font-semibold text-gray-600">
              Select Batch
            </label>

            <select
              value={batchId}
            onChange={(e) => {

    const selectedBatch = e.target.value;

    setBatchId(selectedBatch);

    // Clear Individual Mode
    setSelectedStudent("");
    setIndividualAttendance(null);

    if (selectedBatch) {

        fetchStudents(selectedBatch);

        checkAttendanceStatus(
            selectedBatch,
            date
        );

    } else {

        setStudents([]);
        setAttendanceLocked(false);

    }

}}
              className="w-72 border rounded-xl p-3"
            >

              <option value="">
                Select Batch
              </option>

              {batches.map((batch) => (

                <option
                  key={batch.id}
                  value={batch.id}
                >

                  {batch.batch_name}

                </option>

              ))}

            </select>

          </div>

          {/* Individual Student */}

          <div>

            <label className="block mb-2 font-semibold text-gray-600">
              Individual Student
            </label>

            <select
              value={selectedStudent}
              onChange={(e) => {

    const id = e.target.value;

    setSelectedStudent(id);

    // Exit Batch Mode
    setBatchId("");
    setStudents([]);

    if (id === "") {

        setIndividualAttendance(null);
        setAttendanceLocked(false);

        return;
    }

    const student = individualStudents.find(
        student => student.id.toString() === id
    );

    if (student) {

        setIndividualAttendance({

            ...student,

            status: "present"

        });

    }

    checkIndividualAttendance(id, date);

}}
              className="w-72 border rounded-xl p-3"
            >

              <option value="">

                Select Individual Student

              </option>

              {individualStudents.map((student) => (

                <option
                  key={student.id}
                  value={student.id}
                >

                  {student.full_name}

                </option>

              ))}

            </select>

          </div>

          {/* Date */}

          <div>

            <label className="block mb-2 font-semibold text-gray-600">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => {

    const selectedDate = e.target.value;

    setDate(selectedDate);

    if (batchId) {

        checkAttendanceStatus(
            batchId,
            selectedDate
        );

    }

    if (selectedStudent) {

        checkIndividualAttendance(
            selectedStudent,
            selectedDate
        );

    }

}}
              className="border rounded-xl p-3"
            />

          </div>

        </div>

        {/* Save Button */}

        <button
          onClick={saveAttendance}
          disabled={attendanceLocked}
          className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all

            ${
              attendanceLocked
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-[#082B3A]"
            }

          `}
        >

          <FaCheckDouble />

          {

            attendanceLocked

              ? "Attendance Submitted"

              : "Save Attendance"

          }

        </button>

      </div>

      <div className="border-t"></div>

      {/* ================= TABLE ================= */}

      <div className="p-6">

        <div className="bg-[#082B3A] text-white rounded-t-2xl grid grid-cols-12 px-5 py-5 font-bold text-xl">

          <div className="col-span-2">

            ID

          </div>

          <div className="col-span-4">

            Student Name

          </div>

          <div className="col-span-6 text-center">

            Attendance

          </div>

        </div>
                {displayedStudents.length === 0 ? (

          <div className="bg-white p-10 text-center text-gray-500 text-lg">
            No Students Found
          </div>

        ) : (

          displayedStudents.map((student, index) => (

            <div
              key={student.id}
              className="grid grid-cols-12 px-5 py-5 border-b border-gray-200 items-center bg-white"
            >

              {/* Student ID */}

              <div className="col-span-2 text-xl font-semibold text-gray-500">
                {student.id}
              </div>

              {/* Student Name */}

              <div className="col-span-4 text-xl font-semibold text-gray-800">
                {student.full_name}
              </div>

              {/* Attendance */}

              <div className="col-span-6 flex justify-center gap-5">

                {/* PRESENT */}

                <label className="cursor-pointer">

                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={
    batchId
        ? student.status === "present"
        : individualAttendance?.status === "present"
}
                    disabled={attendanceLocked}
                    onChange={() => {

    if (batchId) {

        updateStatus(index, "present");

    } else {

        updateIndividualStatus("present");

    }

}}
                    className="hidden"
                  />

                  <div
                    className={`px-6 py-3 rounded-xl border font-bold transition ${
                      student.status === "present"
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    Present
                  </div>

                </label>

                {/* ABSENT */}

                <label className="cursor-pointer">

                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={
    batchId
        ? student.status === "absent"
        : individualAttendance?.status === "absent"
}
                    disabled={attendanceLocked}
                   onChange={() => {

    if (batchId) {

        updateStatus(index, "absent");

    } else {

        updateIndividualStatus("absent");

    }

}}
                    className="hidden"
                  />

                  <div
                    className={`px-6 py-3 rounded-xl border font-bold transition ${
                      student.status === "absent"
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    Absent
                  </div>

                </label>

                {/* LATE */}

                <label className="cursor-pointer">

                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={
    batchId
        ? student.status === "late"
        : individualAttendance?.status === "late"
}
                    disabled={attendanceLocked}
                   onChange={() => {

    if (batchId) {

        updateStatus(index, "late");

    } else {

        updateIndividualStatus("late");

    }

}}
                    className="hidden"
                  />

                  <div
                    className={`px-6 py-3 rounded-xl border font-bold transition ${
                      student.status === "late"
                        ? "bg-yellow-100 border-yellow-500 text-yellow-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    Late
                  </div>

                </label>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  </div>

);

};

export default Attendance;
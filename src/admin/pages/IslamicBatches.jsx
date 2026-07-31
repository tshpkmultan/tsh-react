import { useEffect, useState } from "react";
import axios from "axios";

export default function IslamicBatches() {
  const API = "https://800junkuae.online/tsh-api";
const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
  batch_name: "",
  course_id: "",
  teacher_id: "",
  students: [],
  class_days: "",
  start_time: "",
  end_time: "",
  max_students: 20,
});

  useEffect(() => {
    loadData();
  }, []);


const handleEdit = (batch) => {
  setEditingId(batch.id);

  setForm({
    batch_name: batch.batch_name || "",
    course_id: batch.course_id || "",
    teacher_id: batch.teacher_id || "",
    students: [],
    class_days: batch.class_days || "",
    start_time: batch.start_time || "",
    end_time: batch.end_time || "",
    max_students: batch.max_students || 20,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this batch?"
  );

  if (!confirmDelete) return;

  try {
    const res = await axios.post(
      `${API}/admin/islamic_batches/delete.php`,
      { id }
    );

    console.log(res.data);

    alert("Batch Deleted Successfully");

    fetchBatches();
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};
 const loadData = async () => {
  try {
  await Promise.all([
    fetchBatches(),
    fetchCourses(),
    fetchTeachers(),
]);

setStudents([]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const fetchStudents = async (courseId = "") => {
  try {
    const res = await axios.get(
      `${API}/admin/islamic_batches/get_students.php?course_id=${courseId}`
    );

    setStudents(res.data.students || []);
  } catch (error) {
    console.error(error);
    setStudents([]);
  }
};
  const fetchBatches = async () => {
    try {
      const res = await axios.get(
        `${API}/admin/islamic_batches/list.php`
      );

      console.log("RAW Batches Response:", res.data);

      if (Array.isArray(res.data)) {
        setBatches(res.data);
      } else if (res.data.batches) {
        setBatches(res.data.batches);
      } else {
        setBatches([]);
      }
    } catch (error) {
      console.error("Batch Error:", error);
      setBatches([]);
    }
  };

  const fetchCourses = async () => {
  try {
    const res = await axios.get(
      `${API}/courses/get-courses.php`
    );

    console.log("RAW Courses Response:", res);

    if (Array.isArray(res.data)) {
      setCourses(res.data);
    } else if (res.data.courses) {
      setCourses(res.data.courses);
    } else {
      setCourses([]);
    }
  } catch (error) {
    console.error("COURSE API ERROR:", error);
  }
};

  const fetchTeachers = async () => {
  try {
    const res = await axios.get(
      `${API}/islamic-teachers/get-teachers.php`
    );

    console.log("Teachers API:", res.data);

    if (Array.isArray(res.data)) {
      setTeachers(res.data);
    } else {
      setTeachers(res.data.teachers || []);
    }

  } catch (error) {
    console.error("Teacher Error:", error);
    setTeachers([]);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/admin/islamic_batches/create.php`,
        form
      );

      console.log("Create Batch:", res.data);

      await fetchBatches();

      alert("Batch Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Create Batch");
    }
  };

  console.log("Courses State:", courses);
  console.log("Teachers State:", teachers);

  if (courses.length > 0) {
    console.log("First Course Object:", courses[0]);
  }

  if (teachers.length > 0) {
    console.log("First Teacher Object:", teachers[0]);
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }


return (
  <div className="p-6">

    <h1 className="text-2xl font-bold mb-6">
      Islamic Batches
    </h1>

    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow"
    >

      {/* Batch Name */}
      <div>
        <label className="block mb-2 font-medium">
          Batch Name
        </label>

        <input
          type="text"
          placeholder="Batch Name"
          className="w-full border p-3 rounded"
          value={form.batch_name}
          onChange={(e) =>
            setForm({
              ...form,
              batch_name: e.target.value,
            })
          }
        />
      </div>

      {/* Course */}
      <div>
        <label className="block mb-2 font-medium">
          Course
        </label>

        <select
          className="w-full border p-3 rounded"
          value={form.course_id}
         onChange={(e) => {
  const courseId = e.target.value;

  setForm({
    ...form,
    course_id: courseId,
    students: [],
  });

  fetchStudents(courseId);
}}
        >
          <option value="">
            Select Course
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher */}
      <div>
        <label className="block mb-2 font-medium">
          Teacher
        </label>

        <select
          className="w-full border p-3 rounded"
          value={form.teacher_id}
          onChange={(e) =>
            setForm({
              ...form,
              teacher_id: e.target.value,
            })
          }
        >
          <option value="">
            Select Teacher
          </option>

          {teachers.map((teacher) => (
            <option
              key={teacher.id}
              value={teacher.id}
            >
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      {/* Max Students */}
      <div>
        <label className="block mb-2 font-medium">
          Maximum Students
        </label>

        <input
          type="number"
          className="w-full border p-3 rounded"
          value={form.max_students}
          onChange={(e) =>
            setForm({
              ...form,
              max_students: e.target.value,
            })
          }
        />
      </div>

      {/* Students */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Select Students
        </label>

        <select
          multiple
          size={8}
          className="w-full border p-3 rounded"
          value={form.students}
        onChange={(e) => {
  const values = Array.from(
    e.target.selectedOptions,
    (option) => option.value
  );

  setForm({
    ...form,
    students: values,
  });
}}
        >
          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.full_name}
            </option>
          ))}
        </select>

        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl and click to select multiple students
        </p>

        <p className="text-sm text-blue-600 mt-2">
          Selected Students: {form.students.length}
        </p>
      </div>

      {/* Class Days */}
      <div>
        <label className="block mb-2 font-medium">
          Class Days
        </label>

        <input
          type="text"
          placeholder="Mon, Wed, Fri"
          className="w-full border p-3 rounded"
          value={form.class_days}
          onChange={(e) =>
            setForm({
              ...form,
              class_days: e.target.value,
            })
          }
        />
      </div>

      {/* Start Time */}
      <div>
        <label className="block mb-2 font-medium">
          Start Time
        </label>

        <input
          type="time"
          className="w-full border p-3 rounded"
          value={form.start_time}
          onChange={(e) =>
            setForm({
              ...form,
              start_time: e.target.value,
            })
          }
        />
      </div>

      {/* End Time */}
      <div>
        <label className="block mb-2 font-medium">
          End Time
        </label>

        <input
          type="time"
          className="w-full border p-3 rounded"
          value={form.end_time}
          onChange={(e) =>
            setForm({
              ...form,
              end_time: e.target.value,
            })
          }
        />
      </div>

      {/* Submit */}
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {editingId
            ? "Update Batch"
            : "Create Batch"}
        </button>
      </div>

    </form>

    {/* Batches Table */}

    <div className="bg-white rounded-lg shadow mt-6 overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">
              Batch
            </th>

            <th className="p-3 text-left">
              Course
            </th>

            <th className="p-3 text-left">
              Teacher
            </th>

            <th className="p-3 text-left">
              Students
            </th>

            <th className="p-3 text-left">
              Days
            </th>

            <th className="p-3 text-left">
              Time
            </th>

            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {batches.length === 0 ? (

            <tr>
              <td
                colSpan="7"
                className="text-center p-5"
              >
                No Batches Found
              </td>
            </tr>

          ) : (

            batches.map((batch) => (

              <tr
                key={batch.id}
                className="border-b"
              >
                <td className="p-3">
                  {batch.batch_name}
                </td>

                <td className="p-3">
                  {batch.course_name}
                </td>

                <td className="p-3">
                  {batch.teacher_name}
                </td>

                <td className="p-3">
                  {batch.total_students || 0}
                </td>

                <td className="p-3">
                  {batch.class_days}
                </td>

                <td className="p-3">
                  {batch.start_time} - {batch.end_time}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(batch)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(batch.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
}

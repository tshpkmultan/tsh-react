import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {

const [courses, setCourses] = useState([]);
const [teachers, setTeachers] = useState([]);
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
  id: "",
  title: "",
  description: "",
  teacher_id: "",
  duration: "",
  class_days: [],
  class_time: "",
  fee: "",
  image: null,
  admission_status: "open",
  status: "active",
});
/* ===========================
FETCH COURSES
=========================== */

const fetchCourses = async () => {
  try {
    const res = await axios.get(
      "https://800junkuae.online/tsh-api/API/courses/get-courses.php"
    );

    console.log("COURSES RESPONSE:", res.data);

    setCourses(
      Array.isArray(res.data)
        ? res.data
        : res.data.data || []
    );

  } catch (error) {
    console.log("COURSES ERROR:", error);

    if (error.response) {
      console.log(error.response.data);
    }
  }
};

/* ===========================
FETCH TEACHERS
=========================== */

const fetchTeachers = async () => {
try {


  const res = await axios.get(
    "https://800junkuae.online/tsh-api/API/islamic-teachers/get-teachers.php"
  );

  setTeachers(res.data || []);

} catch (error) {
  console.log(error);
}


};

useEffect(() => {
fetchCourses();
fetchTeachers();
}, []);

/* ===========================
HANDLE CHANGE
=========================== */

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

/* ===========================
RESET FORM
=========================== */
const resetForm = () => {
  setFormData({
    id: "",
    title: "",
    description: "",
    teacher_id: "",
    duration: "",
    class_days: [],
    class_time: "",
    fee: "",
    admission_status: "open",
    status: "active",
  });
};
/* ===========================
SAVE COURSE
=========================== */

const saveCourse = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
  if (key === "class_days") {
    form.append("class_days", formData.class_days.join(","));
  } else if (key === "image") {
    if (formData.image) {
      form.append("image", formData.image);
    }
  } else {
    form.append(key, formData[key]);
  }
});

    const url = formData.id
      ? "https://800junkuae.online/tsh-api/API/courses/update-course.php"
      : "https://800junkuae.online/tsh-api/API/courses/create-course.php";

    const res = await axios.post(url, form);

    alert(res.data.message);

    fetchCourses();
    resetForm();
    setShowModal(false);

  } catch (error) {
    console.log(error);
  }
};



/* ===========================
DELETE COURSE
=========================== */

const deleteCourse = async (id) => {

if (!window.confirm("Delete Course?"))
  return;

try {

  const form = new FormData();
  form.append("id", id);

  await axios.post(
    "https://800junkuae.online/tsh-api/API/courses/delete-course.php",
    form
  );

  fetchCourses();

} catch (error) {
  console.log(error);
}


};

const openAddModal = () => {
resetForm();
setShowModal(true);
};
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const handleDayChange = (day) => {
  setFormData((prev) => ({
    ...prev,
    class_days: prev.class_days.includes(day)
      ? prev.class_days.filter((d) => d !== day)
      : [...prev.class_days, day],
  }));
};
const form = new FormData();

Object.keys(formData).forEach((key) => {
  if (key === "class_days") {
    form.append("class_days", formData.class_days.join(","));
  } else {
    form.append(key, formData[key]);
  }
});
const editCourse = (course) => {
  setFormData({
    id: course.id || "",
    title: course.title || "",
    description: course.description || "",
    teacher_id: course.teacher_id || "",
    duration: course.duration || "",
    class_days: course.class_days
      ? course.class_days.split(",")
      : [],
    class_time: course.class_time || "",
    fee: course.fee || "",
    admission_status:
      course.admission_status || "open",
    status: course.status || "active",
  });

  setShowModal(true);
};
return (

<div className="min-h-screen bg-slate-100 p-8">

  {/* HEADER */}

  <div className="flex justify-between items-center mb-10">

    <div>

      <h1 className="text-5xl font-black text-[#032B38]">
        Courses
      </h1>

      <p className="text-slate-500 mt-2">
        Manage Islamic Courses
      </p>

    </div>

    <button
      onClick={openAddModal}
      className="
      bg-[#032B38]
      text-white
      px-6
      py-3
      rounded-xl
      font-bold
      "
    >
      + Add Course
    </button>

  </div>

  {/* MODAL */}

  {showModal && (

    <div
  className="
  fixed
  inset-0
  bg-black/50
  flex
  items-center
  justify-center
  z-50
  p-5
  overflow-y-auto
  "
>

      <div
  className="
  bg-white
  rounded-[35px]
  w-full
  max-w-5xl
  max-h-[90vh]
  overflow-y-auto
  shadow-xl
  "
>

        <div className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] p-8 flex justify-between items-center">

          <div>

            <h2 className="text-3xl text-white font-black">

              {formData.id
                ? "Update Course"
                : "Add New Course"}

            </h2>

            <p className="text-slate-200 mt-2">
              Fill course information
            </p>

          </div>

          <button
            onClick={() => setShowModal(false)}
            className="text-white text-4xl"
          >
            ×
          </button>

        </div>

        <form
  onSubmit={saveCourse}
  className="p-8"
>

  <div className="grid md:grid-cols-2 gap-5">

<input
  type="text"
  name="title"
  placeholder="Course Title"
  value={formData.title ?? ""}
  onChange={handleChange}
  className="border p-4 rounded-xl"
  required
/>
<div className="md:col-span-2">
  <label className="block mb-2 font-semibold">
    Course Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setFormData({
        ...formData,
        image: e.target.files[0],
      })
    }
    className="border p-3 rounded-xl w-full"
  />
</div>
<input
  type="text"
  name="duration"
  placeholder="Duration"
  value={formData.duration}
  onChange={handleChange}
  className="border p-4 rounded-xl"
/>
<input
  type="text"
  name="duration"
  placeholder="Duration (e.g. 1 Month)"
  value={formData.duration}
  onChange={handleChange}
  className="border p-4 rounded-xl"
/>

<div className="md:col-span-2">
  <label className="block font-bold mb-3 text-slate-700">
    Class Days
  </label>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {weekDays.map((day) => (
      <label
        key={day}
        className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer hover:bg-slate-50"
      >
        <input
          type="checkbox"
          checked={formData.class_days.includes(day)}
          onChange={() => handleDayChange(day)}
        />
        {day}
      </label>
    ))}
  </div>
</div>
<input
  type="text"
  name="class_time"
  placeholder="Class Time (e.g. 7:00 PM - 8:00 PM)"
  value={formData.class_time}
  onChange={handleChange}
  className="border p-4 rounded-xl"
/>
<input
  type="number"
  name="fee"
  placeholder="Course Fee"
  value={formData.fee}
  onChange={handleChange}
  className="border p-4 rounded-xl"
/>

<select
  name="teacher_id"
  value={formData.teacher_id}
  onChange={handleChange}
  className="border p-4 rounded-xl"
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

<textarea
  name="description"
  placeholder="Description"
  value={formData.description}
  onChange={handleChange}
  rows="4"
  className="border p-4 rounded-xl md:col-span-2"
/>


<select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="border p-4 rounded-xl"
>
  <option value="active">
    Active
  </option>

  <option value="inactive">
    Inactive
  </option>
</select>


  </div>

<button
type="submit"
className="
w-full
mt-8
bg-gradient-to-r
from-[#032B38]
to-[#0B4A5A]
text-white
py-5
rounded-2xl
font-black
text-xl
"

>

{formData.id

  ? "Update Course"
  : "Save Course"}

  </button>

</form>


      </div>

    </div>

  )}

  {/* TABLE */}

  <div className="bg-white rounded-[30px] shadow-2xl border border-slate-200 overflow-hidden">

  <div className="overflow-x-auto">

    <table className="min-w-[1200px] w-full">

      <thead>

        <tr className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] text-white">
<th className="px-6 py-5 text-left font-bold">
  Image
</th>
          <th className="px-6 py-5 text-left font-bold">
            Course
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Admission
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Duration
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Class Days
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Time
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Fee
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Teacher
          </th>

          <th className="px-6 py-5 text-left font-bold">
            Status
          </th>

          <th className="px-6 py-5 text-center font-bold">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {courses.map((course) => (

          <tr
            key={course.id}
            className="
            border-b
            hover:bg-slate-50
            transition-all
            duration-300
            "
          >
<td className="px-6 py-5">
  {course.image ? (
    <img
      src={course.image}
      alt={course.title}
      className="w-16 h-16 rounded-xl object-cover border"
    />
  ) : (
    <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-xs">
      No Image
    </div>
  )}
</td>
            <td className="px-6 py-5">

              <div>
                <h3 className="font-bold text-[#032B38]">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500">
                  Islamic Course
                </p>
              </div>

            </td>

            <td className="px-6 py-5">

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.admission_status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {course.admission_status}
              </span>

            </td>

            <td className="px-6 py-5 font-medium">
              {course.duration}
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-wrap gap-1">

                {course.class_days
                  ?.split(",")
                  .map((day, index) => (
                    <span
                      key={index}
                      className="
                      bg-blue-50
                      text-blue-700
                      px-2
                      py-1
                      rounded-lg
                      text-xs
                      "
                    >
                      {day}
                    </span>
                  ))}

              </div>
            </td>

            <td className="px-6 py-5 font-medium">
              {course.class_time}
            </td>

            <td className="px-6 py-5">

              <span
                className="
                bg-green-50
                text-green-700
                px-3
                py-1
                rounded-xl
                font-bold
                "
              >
                Rs. {course.fee}
              </span>

            </td>

            <td className="px-6 py-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                  h-10
                  w-10
                  rounded-full
                  bg-gradient-to-r
                  from-[#032B38]
                  to-[#0B4A5A]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  "
                >
                  {course.teacher_name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold">
                    {course.teacher_name}
                  </p>
                </div>

              </div>

            </td>

            <td className="px-6 py-5">

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {course.status}
              </span>

            </td>

            <td className="px-6 py-5">

              <div className="flex justify-center gap-2">

                <button
                  onClick={() => editCourse(course)}
                  className="
                  px-4
                  py-2
                  bg-amber-400
                  hover:bg-amber-500
                  rounded-xl
                  font-bold
                  transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  className="
                  px-4
                  py-2
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  rounded-xl
                  font-bold
                  transition
                  "
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

</div>
);
}

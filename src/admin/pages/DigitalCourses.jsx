import { useEffect, useState } from "react";
import axios from "axios";

export default function DigitalCourses() {

  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    trainer_id: "",
    duration: "",
    class_days: [],
    class_time: "",
    fee: "",
    admission_status: "open",
    status: "active",
  });

  /* =====================================
      FETCH COURSES
  ===================================== */

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "https://800junkuae.online/tsh-api/API/digital_courses/get-courses.php"
      );

      console.log("DIGITAL COURSES:", res.data);

      setCourses(
        Array.isArray(res.data)
          ? res.data
          : res.data.data || []
      );

    } catch (error) {

      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

    }

  };

  /* =====================================
      FETCH TRAINERS
  ===================================== */

  const fetchTrainers = async () => {
  try {
    const res = await axios.get(
      "https://800junkuae.online/tsh-api/API/digital_trainer/get-trainers.php"
    );

    console.log("TRAINERS:", res.data);

    if (res.data.success) {
      setTrainers(res.data.trainers || []);
    } else {
      setTrainers([]);
    }

  } catch (error) {
    console.error(error);
    setTrainers([]);
  }
};

  useEffect(() => {

    fetchCourses();
    fetchTrainers();

  }, []);

  /* =====================================
      HANDLE CHANGE
  ===================================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  /* =====================================
      RESET FORM
  ===================================== */

  const resetForm = () => {

    setFormData({

      id: "",
      title: "",
      description: "",
      trainer_id: "",
      duration: "",
      class_days: [],
      class_time: "",
      fee: "",
      admission_status: "open",
      status: "active",

    });

  };

  /* =====================================
      SAVE COURSE
  ===================================== */

  const saveCourse = async (e) => {

    e.preventDefault();

    try {

     const form = new FormData();

Object.keys(formData).forEach((key) => {

    if (key === "class_days") {

        form.append(
            "class_days",
            formData.class_days.join(",")
        );

    } else {

        form.append(key, formData[key]);

    }

});

if (image) {
    form.append("image", image);
}

     

      const url = formData.id

        ? "https://800junkuae.online/tsh-api/API/digital_courses/update-course.php"

        : "https://800junkuae.online/tsh-api/API/digital_courses/create-course.php";

      const res = await axios.post(url, form);

      alert(res.data.message);

      fetchCourses();

      resetForm();

      setShowModal(false);

    } catch (error) {

      console.log(error);

    }

  };

  /* =====================================
      DELETE COURSE
  ===================================== */

  const deleteCourse = async (id) => {

    if (!window.confirm("Delete Course?")) return;

    try {

      const form = new FormData();

      form.append("id", id);

      await axios.post(

        "https://800junkuae.online/tsh-api/API/digital_courses/delete-course.php",

        form

      );

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };

  /* =====================================
      WEEK DAYS
  ===================================== */

  const weekDays = [

    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"

  ];

  const handleDayChange = (day) => {

    setFormData((prev) => ({

      ...prev,

      class_days: prev.class_days.includes(day)

        ? prev.class_days.filter((d) => d !== day)

        : [...prev.class_days, day],

    }));

  };

  /* =====================================
      EDIT COURSE
  ===================================== */

  const editCourse = (course) => {

    setFormData({

      id: course.id || "",

      title: course.title || "",

      description: course.description || "",

      trainer_id: course.trainer_id || "",

      duration: course.duration || "",

      class_days: course.class_days
        ? course.class_days.split(",")
        : [],

      class_time: course.class_time || "",

      fee: course.fee || "",

      admission_status:
        course.admission_status || "open",

      status:
        course.status || "active",

    });

    setShowModal(true);

  };

  const openAddModal = () => {

    resetForm();

    setShowModal(true);

  };

  return (

    <><div className="min-h-screen bg-slate-100 p-8">

  {/* HEADER */}

  <div className="flex justify-between items-center mb-10">

    <div>

      <h1 className="text-5xl font-black text-[#032B38]">
        Digital Courses
      </h1>

      <p className="text-slate-500 mt-2">
        Manage Digital Skills Courses
      </p>

    </div>

    <button
      onClick={openAddModal}
      className="bg-[#032B38] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#054255]"
    >
      + Add Course
    </button>

  </div>

  {/* MODAL */}

  {showModal && (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 overflow-y-auto">

      <div className="bg-white rounded-[35px] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] p-8 flex justify-between items-center">

          <div>

            <h2 className="text-3xl text-white font-black">

              {formData.id

                ? "Update Digital Course"

                : "Add Digital Course"}

            </h2>

            <p className="text-slate-200 mt-2">

              Fill all course information.

            </p>

          </div>

          <button

            onClick={() => setShowModal(false)}

            className="text-white text-4xl"

          >

            ×

          </button>

        </div>

        {/* FORM */}

      <form
  onSubmit={saveCourse}
  className="p-8"
>
  <div className="grid md:grid-cols-2 gap-5">

    {/* Course Title */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Course Title
      </label>
      <input
        type="text"
        name="title"
        placeholder="Enter Course Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
        required
      />
    </div>

    {/* Course Image */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Course Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full border p-3 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#032B38] file:text-white file:font-semibold hover:file:bg-[#0B4A5A]"
      />
    </div>

    {/* Duration */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Course Duration
      </label>
      <input
        type="text"
        name="duration"
        placeholder="e.g. 3 Months"
        value={formData.duration}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Course Fee */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Course Fee
      </label>
      <input
        type="number"
        name="fee"
        placeholder="Enter Course Fee"
        value={formData.fee}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Class Time */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Class Time
      </label>
      <input
        type="text"
        name="class_time"
        placeholder="e.g. 7:00 PM - 8:00 PM"
        value={formData.class_time}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Trainer */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Trainer
      </label>
      <select
        name="trainer_id"
        value={formData.trainer_id}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      >
        <option value="">Select Trainer</option>

        {trainers.map((trainer) => (
          <option
            key={trainer.id}
            value={trainer.id}
          >
            {trainer.name}
          </option>
        ))}
      </select>
    </div>

    {/* Class Days */}
    <div className="md:col-span-2">
      <label className="block mb-3 font-semibold text-slate-700">
        Class Days
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {weekDays.map((day) => (
          <label
            key={day}
            className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:bg-slate-50"
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

    {/* Admission Status */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Admission Status
      </label>
      <select
        name="admission_status"
        value={formData.admission_status}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      >
        <option value="open">Admission Open</option>
        <option value="closed">Admission Closed</option>
      </select>
    </div>

    {/* Course Status */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Course Status
      </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <label className="block mb-2 font-semibold text-slate-700">
        Course Description
      </label>
      <textarea
        rows="5"
        name="description"
        placeholder="Write Course Description..."
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

  </div>

  <button
    type="submit"
    className="w-full mt-8 bg-gradient-to-r from-[#032B38] to-[#0B4A5A] text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition"
  >
    {formData.id ? "Update Course" : "Save Course"}
  </button>
</form>

      </div>

    </div>

  )}
  {/* ===========================
    COURSES TABLE
=========================== */}

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-[#032B38] text-white">

        <tr>

          <th className="p-4 text-left">Title</th>

          <th className="p-4 text-left">Trainer</th>

          <th className="p-4 text-left">Duration</th>

          <th className="p-4 text-left">Fee</th>

          <th className="p-4 text-left">Days</th>

          <th className="p-4 text-left">Time</th>

          <th className="p-4 text-left">Admission</th>

          <th className="p-4 text-left">Status</th>

          <th className="p-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {courses.length > 0 ? (

          courses.map((course) => (

            <tr
              key={course.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-4">

                <div className="font-bold">

                  {course.title}

                </div>

                <div className="text-sm text-gray-500">

                  {course.description}

                </div>

              </td>

              <td className="p-4">

                {course.trainer_name || "-"}

              </td>

              <td className="p-4">

                {course.duration || "-"}

              </td>

              <td className="p-4">

                Rs. {course.fee || 0}

              </td>

              <td className="p-4">

                {course.class_days || "-"}

              </td>

              <td className="p-4">

                {course.class_time || "-"}

              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    course.admission_status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {course.admission_status || "Closed"}
                </span>

              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    course.status === "active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {course.status || "Inactive"}
                </span>

              </td>

              <td className="p-4">

                <div className="flex gap-2 justify-center">

                  <button
                    onClick={() => editCourse(course)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="9"
              className="text-center p-8 text-gray-500"
            >

              No Digital Courses Found

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
</div>
</>

);
}

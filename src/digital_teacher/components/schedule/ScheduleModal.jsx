import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTimes,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

const API = "https://800junkuae.online/tsh-api/API";

const ScheduleModal = ({
  open,
  close,
  trainerId,
  refresh,
  editData = null,
}) => {

  const [saving, setSaving] = useState(false);

  const [courses, setCourses] = useState([]);

  const [batches, setBatches] = useState([]);

  const [students, setStudents] = useState([]);

  const initialForm = {

    id: "",

   trainer_id: trainerId,

    schedule_type: "batch",

    batch_id: "",

    student_id: "",

    course_id: "",

    title: "",

    description: "",

    class_date: "",

    start_time: "",

    end_time: "",

    meeting_link: "",

    location: "",

    class_type: "Online",

    status: "Upcoming",

  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (!open) return;

    loadCourses();

    loadBatches();

    loadStudents();

  }, [open]);

  useEffect(() => {

    if (!editData) {

      setForm({

        ...initialForm,

       trainer_id: trainerId,

      });

      return;

    }

    setForm({

      id: editData.id,

      trainer_id: trainerId,

      schedule_type: editData.schedule_type,

      batch_id: editData.batch_id || "",

      student_id: editData.student_id || "",

      course_id: editData.course_id || "",

      title: editData.title,

      description: editData.description,

      class_date: editData.class_date,

      start_time: editData.start_time,

      end_time: editData.end_time,

      meeting_link: editData.meeting_link,

      location: editData.location,

      class_type: editData.class_type,

      status: editData.status,

    });

  }, [editData, trainerId]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  const loadCourses = async () => {
  try {
    const res = await axios.get(`${API}/digital/get-data.php`);

    console.log("Courses API Response:", res.data);

    if (res.data.status === "success") {
      setCourses(res.data.courses);
      console.log("Courses State:", res.data.courses);
    }

  } catch (err) {
    console.log(err);
  }
};

  const loadBatches = async () => {

    try {

      const res = await axios.get(

        `${API}/admin/digital_batches/list.php?trainer_id=${trainerId}`

      );

      if (res.data.success) {

        setBatches(res.data.batches || []);

      }

    } catch (err) {

      console.log(err);

    }

  };

  const loadStudents = async () => {

    try {

      const res = await axios.get(

        `${API}/admin/digital_attendance/get_individual_students.php?trainer_id=${trainerId}`

      );

      if (res.data.success) {

        setStudents(res.data.students || []);

      }

    } catch (err) {

      console.log(err);

    }

  };

  if (!open) return null;
const handleSubmit = async () => {

    if (!form.title) {
        alert("Please enter class title.");
        return;
    }

    if (!form.course_id) {
        alert("Please select course.");
        return;
    }

    if (!form.class_date) {
        alert("Please select class date.");
        return;
    }

    if (!form.start_time || !form.end_time) {
        alert("Please select start and end time.");
        return;
    }

    setSaving(true);

    try {

        const url = editData
            ? `${API}/digital_trainer/schedule/update.php`
            : `${API}/digital_trainer/schedule/create.php`

      const res = await axios.post(url, form);

console.log("API Response:", res.data);

if (res.data.success) {

    alert(res.data.message || "Schedule Created Successfully");

    refresh();

    close();

} else {

    alert(res.data.message || "Something went wrong.");

}

    } catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

    setSaving(false);

};
  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-[#082B3A]">

              {editData ? "Update Schedule" : "Create Schedule"}

            </h2>

            <p className="text-gray-500 mt-2">

              Manage Digital Skills live and physical sessions.

            </p>

          </div>

          <button

            onClick={close}

            className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center"

          >

            <FaTimes size={22} />

          </button>

        </div>

        {/* Body */}

        <div className="p-8">
        <div className="grid md:grid-cols-2 gap-6">

    {/* Class Title */}

    <div>

        <label className="block mb-2 font-semibold">
           Session Title
        </label>

        <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Web Development Bootcamp"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

    </div>

    {/* Course */}

    <div>

        <label className="block mb-2 font-semibold">
           Digital Course
        </label>

        <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
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

    {/* Schedule Type */}

    <div>

        <label className="block mb-2 font-semibold">
            Schedule Type
        </label>

        <select
            name="schedule_type"
            value={form.schedule_type}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
        >

            <option value="batch">
                Batch
            </option>

            <option value="individual">
                Individual
            </option>

        </select>

    </div>

    {/* Batch */}

    {form.schedule_type === "batch" && (

        <div>

            <label className="block mb-2 font-semibold">
                Batch
            </label>

            <select
                name="batch_id"
                value={form.batch_id}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
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

    )}

    {/* Student */}

    {form.schedule_type === "individual" && (

        <div>

            <label className="block mb-2 font-semibold">
                Student
            </label>

            <select
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
            >

                <option value="">
                    Select Student
                </option>

                {students.map((student) => (

                    <option
                        key={student.id}
                        value={student.id}
                    >

                        {student.full_name}

                    </option>

                ))}

            </select>

        </div>

    )}

</div>

{/* Description */}

<div className="mt-6">

    <label className="block mb-2 font-semibold">
       Session Description
    </label>

    <textarea
        rows="4"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
        placeholder="Write session description..."
    />

</div>

{/* Date & Time */}

<div className="grid md:grid-cols-3 gap-6 mt-6">

    <div>

        <label className="block mb-2 font-semibold">
            Session Date
        </label>

        <input
            type="date"
            name="class_date"
            value={form.class_date}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
        />

    </div>

    <div>

        <label className="block mb-2 font-semibold">
            Session Start
        </label>

        <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
        />

    </div>

    <div>

        <label className="block mb-2 font-semibold">
          Session End
        </label>

        <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
        />

    </div>

</div>

</div>
<div className="flex justify-end gap-4 mt-8">

    <button
        onClick={close}
        className="px-6 py-3 rounded-xl border"
    >
        Cancel
    </button>

    <button
        onClick={handleSubmit}
        disabled={saving}
        className="bg-[#082B3A] hover:bg-[#0B516C] text-white px-8 py-3 rounded-xl flex items-center gap-3"
    >

        {

            saving

            ?

            <>

                <FaSpinner className="animate-spin"/>

                Saving...

            </>

            :

            <>

                <FaSave/>

                {editData ? "Update Schedule" : "Create Schedule"}

            </>

        }

    </button>

</div>
        </div>

      </div>

    

  );

};

export default ScheduleModal;
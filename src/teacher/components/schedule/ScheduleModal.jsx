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
  teacherId,
  refresh,
  editData = null,
}) => {

  const [saving, setSaving] = useState(false);

  const [courses, setCourses] = useState([]);

  const [batches, setBatches] = useState([]);

  const [students, setStudents] = useState([]);

  const initialForm = {

    id: "",

    teacher_id: teacherId,

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

    

  }, [open]);
useEffect(() => {

    if (form.schedule_type !== "individual") {
        setStudents([]);
        return;
    }

    if (!form.course_id) {
        setStudents([]);
        return;
    }

    loadStudents(form.course_id);

}, [form.course_id, form.schedule_type]);
  useEffect(() => {

    if (!editData) {

      setForm({

        ...initialForm,

        teacher_id: teacherId,

      });

      return;

    }

    setForm({

      id: editData.id,

      teacher_id: teacherId,

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

  }, [editData, teacherId]);

const handleChange = async (e) => {

    const { name, value } = e.target;

    if (name === "course_id") {

        setForm(prev => ({
            ...prev,
            course_id: value,
            student_id: "",
            batch_id: ""
        }));

        setStudents([]);

        if (form.schedule_type === "individual") {
            await loadStudents(value);
        }

        return;
    }

    setForm(prev => ({
        ...prev,
        [name]: value
    }));
};

const loadCourses = async () => {

    try {

        const res = await axios.get(
            `${API}/islamic/get-data.php`,
            {
                params:{
                    teacher_id: teacherId
                }
            }
        );

        if(res.data.status==="success"){
            setCourses(res.data.courses);
        }

    } catch(err){
        console.log(err);
    }

}

  const loadBatches = async () => {

    try {

      const res = await axios.get(

        `${API}/admin/islamic_batches/list.php?teacher_id=${teacherId}`

      );

      if (res.data.success) {

        setBatches(res.data.batches || []);

      }

    } catch (err) {

      console.log(err);

    }

  };
const loadStudents = async (courseId) => {

    try {

        const res = await axios.get(
            `${API}/teacher/schedule/get_students.php`,
            {
                params: {
                    teacher_id: teacherId,
                    course_id: courseId,
                },
            }
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

    if (form.start_time >= form.end_time) {
        alert("End time must be later than the start time.");
        return;
    }

    setSaving(true);

    try {

        const url = editData
            ? `${API}/teacher/schedule/update.php`
            : `${API}/teacher/schedule/create.php`;

        console.log("Submitting:", form);

        const res = await axios.post(url, form);

        console.log("Response:", res.data);

        if (res.data?.success) {

            alert(res.data.message || "Schedule Created Successfully");

            refresh();
            close();

        } else {

            alert(
                res.data?.message ||
                res.data?.error ||
                JSON.stringify(res.data) ||
                "Unknown Error"
            );

        }

    } catch (error) {

        console.log(error);

        if (error.response) {

            console.log("Status:", error.response.status);
            console.log("Headers:", error.response.headers);
            console.log("Data:", error.response.data);

            // If backend returned HTML (PHP error)
            if (typeof error.response.data === "string") {

                console.log(error.response.data);

                if (error.response.data.includes("invalid_grant")) {
                    alert("Google Calendar token has expired.");
                } else {
                    alert(error.response.data);
                }

            } else {

                alert(
                    error.response.data?.message ||
                    JSON.stringify(error.response.data)
                );

            }

        } else {

            alert(error.message);

        }

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

              Manage Islamic classes and Quran sessions.

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
            placeholder="Quran Nazra Class"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

    </div>

    {/* Course */}

    <div>

        <label className="block mb-2 font-semibold">
           Islamic Course
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
        placeholder="Write Islamic class description..."
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
    min={form.start_time}
    className="w-full border rounded-xl p-3"
/>
    </div>

</div>
{/* Class Type */}

<div className="grid md:grid-cols-2 gap-6 mt-6">

  <div>

    <label className="block mb-2 font-semibold">
      Class Type
    </label>

    <select
      name="class_type"
      value={form.class_type}
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
    >
      <option value="Online">Online (Google Meet)</option>
      <option value="Physical">Physical</option>
    </select>

  </div>

  {form.class_type === "Physical" && (

    <div>

      <label className="block mb-2 font-semibold">
        Classroom Location
      </label>

      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Room 101 / Masjid Hall"
        className="w-full border rounded-xl p-3"
      />

    </div>

  )}

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
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://800junkuae.online/tsh-api";

export default function DigitalBatches() {

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [batches, setBatches] = useState([]);
    const [courses, setCourses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [students, setStudents] = useState([]);

    const [editing, setEditing] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [viewBatch, setViewBatch] = useState(null);

    const [formData, setFormData] = useState({

        id: "",

        batch_name: "",

        trainer_id: "",

        course_id: "",

        students: [],

        class_days: "",

        start_time: "",

        end_time: "",

        max_students: 20,

        status: "Active",

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        setLoading(true);

        await Promise.all([

            fetchBatches(),

            fetchCourses(),

            fetchTrainers(),

            fetchStudents(),

        ]);

        setLoading(false);

    };

    // ===========================
    // Fetch Batches
    // ===========================

    const fetchBatches = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/digital_batch/list.php`
            );

            if (res.data.success) {

                setBatches(res.data.batches);

            }

        } catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Fetch Courses
    // ===========================

    const fetchCourses = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/digital_batch/get-courses.php`
            );

            if (res.data.success) {

                setCourses(res.data.courses);

            }

        } catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Fetch Trainers
    // ===========================

    const fetchTrainers = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/digital_trainer/get-trainers.php`
            );

            if (res.data.success) {

                setTrainers(res.data.trainers);

            }

        } catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Fetch Students
    // ===========================

  const fetchStudents = async (courseId = "", batchId = "") => {
    try {
        const res = await axios.get(
            `${BASE_URL}/digital_batch/get_students.php?course_id=${courseId}&batch_id=${batchId}`
        );

        if (res.data.success) {
            setStudents(res.data.students);
        }
    } catch (err) {
        console.log(err);
    }
};

    // ===========================
    // Handle Change
    // ===========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    // ===========================
    // Reset Form
    // ===========================

    const resetForm = () => {

        setEditing(false);

        setShowModal(false);

        setShowViewModal(false);

        setViewBatch(null);

      setFormData({
    id: data.id,
    batch_name: data.batch_name,
    trainer_id: data.trainer_id,
    course_id: data.course_id,
    students: data.students
        ? data.students.map((s) => String(s.id))
        : [],
    class_days: data.class_days,
    start_time: data.start_time,
    end_time: data.end_time,
    max_students: data.max_students,
    status: data.status,
});

fetchStudents(data.course_id, data.id);
    };
    // ===========================
// Handle Submit
// ===========================

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const url = editing
            ? `${BASE_URL}/digital_batch/update.php`
            : `${BASE_URL}/digital_batch/create.php`;

        const res = await axios.post(url, formData);

        alert(res.data.message);

        if (res.data.success) {

            resetForm();

            loadData();

        }

    } catch (err) {

        console.log(err);

    }

};

// ===========================
// View Batch
// ===========================

const viewBatchDetails = async (batch) => {

    try {

        const res = await axios.get(
            `${BASE_URL}/digital_batch/view.php?id=${batch.id}`
        );

        if (res.data.success) {

            setViewBatch(res.data.batch);

            setShowViewModal(true);

        }

    } catch (err) {

        console.log(err);

    }

};

// ===========================
// Edit Batch
// ===========================

const editBatch = async (batch) => {

    try {

        const res = await axios.get(
            `${BASE_URL}/digital_batch/view.php?id=${batch.id}`
        );

        if (!res.data.success) return;

        const data = res.data.batch;

        setEditing(true);

        setShowModal(true);

        setFormData({

            id: data.id,

            batch_name: data.batch_name,

            trainer_id: data.trainer_id,

            course_id: data.course_id,

            students: data.students
                ? data.students.map((s) => String(s.id))
                : [],

            class_days: data.class_days,

            start_time: data.start_time,

            end_time: data.end_time,

            max_students: data.max_students,

            status: data.status,

        });

    } catch (err) {

        console.log(err);

    }

};

// ===========================
// Delete
// ===========================

const deleteBatch = async (id) => {

    if (!window.confirm("Delete this batch?")) return;

    try {

        const res = await axios.post(

            `${BASE_URL}/digital_batch/delete.php`,

            { id }

        );

        alert(res.data.message);

        if (res.data.success) {

            loadData();

        }

    } catch (err) {

        console.log(err);

    }

};

// ===========================
// Search
// ===========================

const filteredBatches = batches.filter((item) =>
    item.batch_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
);

// ===========================
// RETURN
// ===========================

return (

<div className="p-6 bg-gray-50 min-h-screen">

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-3xl font-bold text-[#082B3A]">

Digital Batches

</h1>

<p className="text-gray-500">

Manage Digital Training Batches

</p>

</div>

<button

onClick={()=>{
resetForm();
setShowModal(true);
}}

className="bg-[#082B3A] text-white px-6 py-3 rounded-xl"

>

+ Create Batch

</button>

</div>

{/* Statistics */}

<div className="grid md:grid-cols-4 gap-5 mb-8">

<div className="bg-white shadow rounded-xl p-5">

<h4>Total Batches</h4>

<h2 className="text-3xl font-bold">

{batches.length}

</h2>

</div>

<div className="bg-white shadow rounded-xl p-5">

<h4>Courses</h4>

<h2 className="text-3xl font-bold">

{courses.length}

</h2>

</div>

<div className="bg-white shadow rounded-xl p-5">

<h4>Trainers</h4>

<h2 className="text-3xl font-bold">

{trainers.length}

</h2>

</div>

<div className="bg-white shadow rounded-xl p-5">

<h4>Students</h4>

<h2 className="text-3xl font-bold">

{students.length}

</h2>

</div>

</div>

{/* Search */}

<div className="bg-white rounded-xl shadow p-5 mb-6">

<input

type="text"

placeholder="Search Batch..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full border rounded-xl p-3"

/>

</div>

{/* Table */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<table className="w-full">

<thead className="bg-[#082B3A] text-white">

<tr>

<th className="p-4">Batch</th>

<th className="p-4">Course</th>

<th className="p-4">Trainer</th>

<th className="p-4">Students</th>

<th className="p-4">Schedule</th>

<th className="p-4">Status</th>

<th className="p-4">Actions</th>

</tr>

</thead>

<tbody>

{loading ? (

<tr>

<td colSpan="7" className="text-center p-8">

Loading...

</td>

</tr>

) : filteredBatches.length===0 ? (

<tr>

<td colSpan="7" className="text-center p-8">

No Batch Found

</td>

</tr>

) : (

filteredBatches.map((batch)=>(

<tr

key={batch.id}

className="border-b hover:bg-gray-50"

>

<td className="p-4">

{batch.batch_name}

</td>

<td className="p-4">

{batch.course_name}

</td>

<td className="p-4">

{batch.trainer_name}

</td>

<td className="p-4">

{batch.total_students}

</td>

<td className="p-4">

<div>{batch.class_days}</div>

<div className="text-sm text-gray-500">

{batch.start_time} - {batch.end_time}

</div>

</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm ${
batch.status==="Active"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-700"
}`}>

{batch.status}

</span>

</td>

<td className="p-4">

<div className="flex gap-2">

<button

onClick={()=>viewBatchDetails(batch)}

className="bg-blue-500 text-white px-3 py-2 rounded"

>

View

</button>

<button

onClick={()=>editBatch(batch)}

className="bg-yellow-500 text-white px-3 py-2 rounded"

>

Edit

</button>

<button

onClick={()=>deleteBatch(batch.id)}

className="bg-red-600 text-white px-3 py-2 rounded"

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
{/* ============================================================
   CREATE / EDIT BATCH MODAL
============================================================ */}

{showModal && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

{/* Header */}

<div className="flex justify-between items-center p-6 border-b">

<div>

<h2 className="text-2xl font-bold text-[#082B3A]">

{editing ? "Update Batch" : "Create Batch"}

</h2>

<p className="text-gray-500">

Digital Training Batch Information

</p>

</div>

<button

onClick={resetForm}

className="text-3xl hover:text-red-600"

>

×

</button>

</div>

<form

onSubmit={handleSubmit}

className="grid md:grid-cols-2 gap-6 p-6"

>

{/* Batch Name */}

<div>

<label className="block font-semibold mb-2">

Batch Name

</label>

<input

type="text"

name="batch_name"

value={formData.batch_name}

onChange={handleChange}

className="w-full border rounded-xl p-3"

required

/>

</div>

{/* Course */}

<div>

<label className="block font-semibold mb-2">

Course

</label>

<select

name="course_id"

value={formData.course_id}

onChange={(e) => {
    const courseId = e.target.value;

    setFormData({
        ...formData,
        course_id: courseId,
        students: [],
    });

    fetchStudents(courseId, editing ? formData.id : "");
}}

className="w-full border rounded-xl p-3"

required

>

<option value="">

Select Course

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

</div>

{/* Trainer */}

<div>

<label className="block font-semibold mb-2">

Trainer

</label>

<select

name="trainer_id"

value={formData.trainer_id}

onChange={handleChange}

className="w-full border rounded-xl p-3"

required

>

<option value="">

Select Trainer

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

</div>

{/* Maximum Students */}

<div>

<label className="block font-semibold mb-2">

Maximum Students

</label>

<input

type="number"

name="max_students"

value={formData.max_students}

onChange={handleChange}

className="w-full border rounded-xl p-3"

min="1"

required

/>

</div>

{/* Students */}

<div className="md:col-span-2">

<label className="block font-semibold mb-2">

Assign Students

</label>

<select

multiple

size={8}

value={formData.students}

className="w-full border rounded-xl p-3"

onChange={(e)=>{

const selected = Array.from(

e.target.selectedOptions,

(option)=>option.value

);

setFormData({

...formData,

students:selected,

});

}}

>

{students.map((student)=>(

<option

key={student.id}

value={student.id}

>

{student.full_name} ({student.email})

</option>

))}

</select>

<p className="text-sm text-blue-600 mt-2">

Selected Students : {formData.students.length}

</p>

<p className="text-xs text-gray-500">

Hold Ctrl (Windows) or Cmd (Mac) to select multiple students.

</p>

</div>
{/* Class Days */}

<div>

    <label className="block font-semibold mb-2">
        Class Days
    </label>

    <input
        type="text"
        name="class_days"
        value={formData.class_days}
        onChange={handleChange}
        placeholder="Monday, Wednesday, Friday"
        className="w-full border rounded-xl p-3"
    />

</div>

{/* Start Time */}

<div>

    <label className="block font-semibold mb-2">
        Start Time
    </label>

    <input
        type="time"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
        required
    />

</div>

{/* End Time */}

<div>

    <label className="block font-semibold mb-2">
        End Time
    </label>

    <input
        type="time"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
        required
    />

</div>

{/* Status */}

<div>

    <label className="block font-semibold mb-2">
        Status
    </label>

    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
    >

        <option value="Active">
            Active
        </option>

        <option value="Inactive">
            Inactive
        </option>

    </select>

</div>

{/* Summary */}

<div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-xl p-5">

    <h3 className="text-lg font-bold text-[#082B3A] mb-4">

        Batch Summary

    </h3>

    <div className="grid md:grid-cols-4 gap-4">

        <div>

            <p className="text-gray-500 text-sm">
                Students
            </p>

            <h2 className="font-bold text-xl">
                {formData.students.length}
            </h2>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Max Students
            </p>

            <h2 className="font-bold text-xl">
                {formData.max_students}
            </h2>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Trainer
            </p>

            <h2 className="font-bold">

                {
                    trainers.find(
                        t => String(t.id) === String(formData.trainer_id)
                    )?.name || "-"
                }

            </h2>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Course
            </p>

            <h2 className="font-bold">

                {
                    courses.find(
                        c => String(c.id) === String(formData.course_id)
                    )?.title || "-"
                }

            </h2>

        </div>

    </div>

</div>

{/* Footer */}

<div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">

    <button
        type="button"
        onClick={resetForm}
        className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
    >

        Cancel

    </button>

    <button
        type="submit"
        className="px-8 py-3 rounded-xl bg-[#082B3A] text-white hover:bg-[#0b3b50]"
    >

        {editing ? "Update Batch" : "Create Batch"}

    </button>

</div>

</form>

</div>

</div>

)}
{/* ============================================================
    VIEW BATCH MODAL
============================================================ */}

{showViewModal && viewBatch && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">

{/* Header */}

<div className="bg-[#082B3A] text-white p-6 flex justify-between items-center">

<div>

<h2 className="text-3xl font-bold">

{viewBatch.batch_name}

</h2>

<p className="text-blue-100">

Digital Batch Details

</p>

</div>

<button

onClick={()=>{
setShowViewModal(false);
setViewBatch(null);
}}

className="text-4xl"

>

×

</button>

</div>

<div className="p-6">

{/* Information Cards */}

<div className="grid md:grid-cols-4 gap-5 mb-8">

<div className="bg-gray-50 rounded-xl p-5">

<p className="text-gray-500 text-sm">

Course

</p>

<h2 className="font-bold text-lg">

{viewBatch.course_name}

</h2>

</div>

<div className="bg-gray-50 rounded-xl p-5">

<p className="text-gray-500 text-sm">

Trainer

</p>

<h2 className="font-bold text-lg">

{viewBatch.trainer_name}

</h2>

</div>

<div className="bg-gray-50 rounded-xl p-5">

<p className="text-gray-500 text-sm">

Students

</p>

<h2 className="font-bold text-lg">

{viewBatch.total_students}

</h2>

</div>

<div className="bg-gray-50 rounded-xl p-5">

<p className="text-gray-500 text-sm">

Status

</p>

<span

className={`px-3 py-1 rounded-full text-sm

${viewBatch.status==="Active"

?"bg-green-100 text-green-700"

:"bg-red-100 text-red-700"

}

`}

>

{viewBatch.status}

</span>

</div>

</div>

{/* Schedule */}

<div className="grid md:grid-cols-3 gap-5 mb-8">

<div className="bg-white border rounded-xl p-5">

<p className="text-gray-500">

Class Days

</p>

<h3 className="font-bold mt-2">

{viewBatch.class_days}

</h3>

</div>

<div className="bg-white border rounded-xl p-5">

<p className="text-gray-500">

Start Time

</p>

<h3 className="font-bold mt-2">

{viewBatch.start_time}

</h3>

</div>

<div className="bg-white border rounded-xl p-5">

<p className="text-gray-500">

End Time

</p>

<h3 className="font-bold mt-2">

{viewBatch.end_time}

</h3>

</div>

</div>

{/* Students */}

<div className="bg-white rounded-xl border overflow-hidden">

<div className="bg-[#082B3A] text-white p-4">

<h3 className="text-xl font-bold">

Assigned Students

</h3>

</div>

<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">

#

</th>

<th className="p-4 text-left">

Student

</th>

<th className="p-4 text-left">

Email

</th>

<th className="p-4 text-left">

Phone

</th>

<th className="p-4 text-left">

Education

</th>

<th className="p-4 text-left">

Status

</th>

</tr>

</thead>

<tbody>

{viewBatch.students &&
viewBatch.students.length>0 ? (

viewBatch.students.map((student,index)=>(

<tr

key={student.id}

className="border-b hover:bg-gray-50"

>

<td className="p-4">

{index+1}

</td>

<td className="p-4 font-medium">

{student.full_name}

</td>

<td className="p-4">

{student.email}

</td>

<td className="p-4">

{student.phone}

</td>

<td className="p-4">

{student.education}

</td>

<td className="p-4">

<span

className={`px-3 py-1 rounded-full text-sm

${student.status==="Approved"

?"bg-green-100 text-green-700"

:"bg-yellow-100 text-yellow-700"

}

`}

>

{student.status}

</span>

</td>

</tr>

))

):(


<tr>

<td

colSpan="6"

className="text-center p-10"

>

No Students Assigned

</td>

</tr>

)}

</tbody>

</table>

</div>

<div className="flex justify-end mt-8">

<button

onClick={()=>{
setShowViewModal(false);
setViewBatch(null);
}}

className="bg-[#082B3A] text-white px-8 py-3 rounded-xl"

>

Close

</button>

</div>

</div>

</div>

</div>

)}

</div>

);

}
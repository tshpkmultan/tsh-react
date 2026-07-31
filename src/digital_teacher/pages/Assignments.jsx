import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaPlus,
  FaListUl,
  FaUsers,
  FaEye,
  FaStar,
  FaTrash,
  FaEdit
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Assignments = () => {

    const API = "https://800junkuae.online/tsh-api/API";

    /*
    |--------------------------------------------------------------------------
    | Modal States
    |--------------------------------------------------------------------------
    */

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
const [viewData, setViewData] = useState(null);

const [gradeData, setGradeData] = useState(null);

const [marks, setMarks] = useState("");



const [showEditModal, setShowEditModal] = useState(false);

const [editAssignment, setEditAssignment] = useState(null);
    /*
    |--------------------------------------------------------------------------
    | Main Data
    |--------------------------------------------------------------------------
    */

    const [assignments, setAssignments] = useState([]);
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [batches, setBatches] = useState([]);
const [individualStudents, setIndividualStudents] = useState([]);

const [assignmentType, setAssignmentType] = useState("batch");
    /*
    |--------------------------------------------------------------------------
    | Selected Assignment
    |--------------------------------------------------------------------------
    */

    const [selectedAssignment, setSelectedAssignment] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Selected Submission
    |--------------------------------------------------------------------------
    */

    const [selectedSubmission, setSelectedSubmission] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Teacher
    |--------------------------------------------------------------------------
    */

    const trainer =
    JSON.parse(localStorage.getItem("trainer")) || {};

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

   const [formData,setFormData]=useState({

title:"",

description:"",

batch_id:"",

student_id:"",

due_date:""

});

    /*
    |--------------------------------------------------------------------------
    | Grade
    |--------------------------------------------------------------------------
    */


    const [feedback, setFeedback] = useState("");
    useEffect(() => {

    fetchAssignments();

    fetchPendingSubmissions();

    fetchBatches();
fetchIndividualStudents();
}, []);
/*
|--------------------------------------------------------------------------
| Fetch Assignments
|--------------------------------------------------------------------------
*/

const fetchAssignments = async () => {

    try {

        const res = await axios.get(
            `${API}/admin/digital_assignments/list.php`,
            {
                params: {
                    trainer_id: trainer.id,
                },
            }
        );

        console.log(res.data.assignments);

        if (res.data.success) {

            setAssignments(res.data.assignments || []);

        } else {

            setAssignments([]);

        }

    } catch (error) {

        console.log(error);

        setAssignments([]);

    }

};

/*
|--------------------------------------------------------------------------
| Fetch Pending Submissions
|--------------------------------------------------------------------------
*/

const fetchPendingSubmissions = async () => {

    try {

        const res = await axios.get(
            `${API}/admin/digital_assignments/pending.php`,
            {
                params: {
                    trainer_id: trainer.id,
                },
            }
        );

        console.log("Pending:", res.data);

        if (res.data.success) {

            setPendingSubmissions(res.data.students || []);

        } else {

            setPendingSubmissions([]);

        }

    } catch (error) {

        console.log(error);

        setPendingSubmissions([]);

    }

};

const viewSubmission = async (assignmentId) => {

    console.log("Assignment ID:", assignmentId);

    try {

        const res = await axios.get(
            `${API}/admin/digital_assignments/details.php`,
            {
                params: {
                    assignment_id: assignmentId
                }
            }
        );

        console.log(res.data);

        if (res.data.success) {
            setViewData(res.data.students || []);
            setShowViewModal(true);
        } else {
            alert(res.data.message);
        }

    } catch (error) {
        console.log(error);
    }

};
const openGradeModal = (submission) => {

    console.log(submission);

    setSelectedSubmission(submission);

    setMarks(submission.marks || "");

    setFeedback(submission.feedback || "");

    setShowGradeModal(true);

};

/*
|--------------------------------------------------------------------------
| Fetch Batches
|--------------------------------------------------------------------------
*/

const fetchBatches = async () => {

    try {

        const res = await axios.get(
            `${API}/admin/digital_batches/list.php`,
            {
               params: {
    trainer_id: trainer.id,
}
            }
        );

        console.log("Batches API:", res.data);

        if (res.data.success) {

            setBatches(res.data.batches || []);

        } else {

            setBatches([]);

        }

    } catch (error) {

        console.log(error);

        setBatches([]);

    }

};

/*
|--------------------------------------------------------------------------
| Fetch Individual Students
|--------------------------------------------------------------------------
*/

const fetchIndividualStudents = async () => {

    try {

        const res = await axios.get(
            `${API}/admin/digital_attendance/get_individual_students.php`,
            {
               params: {
    trainer_id: trainer.id,
}
            }
        );

        console.log("Students API:", res.data);

        if (res.data.success) {

            setIndividualStudents(res.data.students || []);

        } else {

            setIndividualStudents([]);

        }

    } catch (error) {

        console.log(error);

        setIndividualStudents([]);

    }

};
const openEditModal = (assignment) => {

    setEditAssignment({

        id: assignment.id,

        title: assignment.title,

        description: assignment.description,

        batch_id: assignment.batch_id,

        due_date: assignment.due_date

    });

    setShowEditModal(true);

};
const handleEditChange = (e) => {

    setEditAssignment({

        ...editAssignment,

        [e.target.name]: e.target.value

    });

};
const updateAssignment = async () => {

    try {

        const res = await axios.post(

            `${API}/admin/digital_assignments/update.php`,

            {

                ...editAssignment,

                trainer_id: trainer.id

            }

        );

        alert(res.data.message);

        if(res.data.success){

            setShowEditModal(false);

            fetchAssignments();

        }

    } catch (error) {

        console.log(error);

    }

};
const deleteAssignment = async (id) => {

    if(!window.confirm("Delete this assignment?")){

        return;

    }

    try{

        const res = await axios.post(

            `${API}/admin/digital_assignments/delete.php`,

            {

               id:id

            }

        );

        alert(res.data.message);

        if(res.data.success){

            fetchAssignments();

            fetchPendingSubmissions();

        }

    }catch(error){

        console.log(error);

    }

};
const handleChange = (e) => {

    setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));

};
const saveGrade = async () => {

    if (!selectedSubmission) {

        alert("No submission selected.");

        return;

    }

    console.log("Selected Submission:", selectedSubmission);

    try {

        const payload = {

            id: selectedSubmission.id,

            marks: Number(marks),

            feedback: feedback

        };

        console.log(payload);

        const res = await axios.post(

            `${API}/admin/digital_assignments/grade.php`,

            payload,

            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );

        console.log(res.data);

        alert(res.data.message);

        if (res.data.success) {

            setShowGradeModal(false);

            fetchPendingSubmissions();

            fetchAssignments();

        }

    } catch (error) {

        console.log(error);

    }

};
const createAssignment = async () => {

    try {

        const res = await axios.post(
            `${API}/admin/digital_assignments/create.php`,
            {
                ...formData,
               trainer_id: trainer.id,
                assignment_type: assignmentType
            }
        );

        alert(res.data.message);

        if (res.data.success) {

            setShowModal(false);

            setFormData({
                title: "",
                description: "",
                batch_id: "",
                student_id: "",
                due_date: ""
            });

            fetchAssignments();

        }

    } catch (error) {

        console.log(error);

    }

};
return ( <div className="p-8 bg-[#F3F4F6] min-h-screen">

  {/* Header */}
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-0  lg:items-center mb-10">
<div className="flex justify-center md:justify-end mb-5">
    <GoogleTranslate />
</div>
   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-5 gap-6">

    {/* Left Side */}
    <div>
        <h1 className="text-5xl font-bold text-[#082B3A]">
            Manage Assignments
        </h1>

        <p className="text-gray-500 mt-2">
            Create, Edit and Manage Student Assignments
        </p>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-4">

        <GoogleTranslate />

        <button
            onClick={() => setShowModal(true)}
            className="
                bg-gradient-to-r
                from-[#082B3A]
                to-[#124760]
                hover:scale-105
                duration-300
                text-yellow-400
                px-8
                py-4
                rounded-2xl
                font-bold
                flex
                items-center
                gap-3
                shadow-xl
            "
        >
            <FaPlus />
            Create Assignment
        </button>

    </div>

</div>

</div>
  {/* Cards */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

    {/* Active Assignments */}
    {/* ================= Active Assignments ================= */}
{/* ================= Active Assignments ================= */}

<div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 md:p-8">

    {/* Header */}

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

        <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-[#082B3A] flex items-center justify-center shadow-lg">

                <FaListUl className="text-yellow-400 text-2xl" />

            </div>

            <div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#082B3A]">

                    Active Assignments

                </h2>

                <p className="text-gray-500 text-sm md:text-base">

                    Manage all digital trainer assignments

                </p>

            </div>

        </div>

        <div className="bg-yellow-100 text-[#082B3A] px-5 py-2 rounded-full font-semibold">

            {assignments.length} Assignment{assignments.length !== 1 && "s"}

        </div>

    </div>

    <hr className="mb-8" />

    <div className="space-y-6">

        {assignments.length === 0 ? (

            <div className="text-center py-16">

                <FaListUl
                    size={50}
                    className="mx-auto text-gray-300 mb-4"
                />

                <h3 className="text-2xl font-bold text-gray-500">

                    No Assignments Found

                </h3>

                <p className="text-gray-400 mt-2">

                    Create your first assignment to get started.

                </p>

            </div>

        ) : (

            assignments.map((assignment) => (

                <div
                    key={assignment.id}
                    className="
                        bg-gradient-to-br
                        from-white
                        to-gray-50
                        border
                        border-gray-200
                        rounded-3xl
                        p-5
                        md:p-7
                        shadow-sm
                        hover:shadow-2xl
                        hover:-translate-y-1
                        transition-all
                        duration-300
                    "
                >

                    {/* Top */}

                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                        {/* Left */}

                        <div className="flex-1">

                            <h3 className="text-2xl md:text-3xl font-bold text-[#082B3A] break-words">

                                {assignment.title}

                            </h3>
{assignment.assignment_type === "batch" ? (

<p>

Batch :

<span>

{assignment.assignment_type === "batch"
    ? assignment.batch_name
    : assignment.student_name}

</span>

</p>

) : (

<p>

Student :

<span>

{assignment.student_name}

</span>

</p>

)}

                            <p className="mt-4 text-gray-600 leading-7">

                                {assignment.description}

                            </p>

                        </div>

                        {/* Right */}

                        <div className="flex flex-col items-start lg:items-end gap-4">

                            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 text-center w-full lg:w-auto">

                                <p className="text-red-500 text-sm font-semibold uppercase">

                                    Due Date

                                </p>

                                <p className="text-red-600 text-lg font-bold mt-1">

                                    {new Date(
                                        assignment.due_date
                                    ).toLocaleDateString()}

                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        openEditModal(assignment)
                                    }
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-yellow-100
                                        hover:bg-yellow-400
                                        hover:text-white
                                        text-yellow-600
                                        flex
                                        items-center
                                        justify-center
                                        transition
                                    "
                                >

                                    <FaEdit />

                                </button>

                                <button
                                    onClick={() =>
                                        deleteAssignment(assignment.id)
                                    }
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-red-100
                                        hover:bg-red-500
                                        hover:text-white
                                        text-red-600
                                        flex
                                        items-center
                                        justify-center
                                        transition
                                    "
                                >

                                    <FaTrash />

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Divider */}

                    <div className="border-t border-gray-200 my-6"></div>

                    {/* Bottom */}

                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* Students */}

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                                <FaUsers className="text-blue-600 text-xl" />

                            </div>

                            <div>

                                <p className="text-gray-500 text-sm">

                                    Student Progress

                                </p>

                                <h4 className="text-xl font-bold text-[#082B3A]">

                                    {assignment.submitted} /

                                    {" "}

                                    {assignment.total_students}

                                    {" "}Submitted

                                </h4>

                            </div>

                        </div>

                        {/* Progress */}

                        <div className="w-full md:w-64">

                            <div className="flex justify-between text-sm mb-2">

                                <span className="text-gray-500">

                                    Progress

                                </span>

                                <span className="font-semibold text-[#082B3A]">

                                    {assignment.total_students > 0
                                        ? Math.round(
                                              (assignment.submitted /
                                                  assignment.total_students) *
                                                  100
                                          )
                                        : 0}
                                    %

                                </span>

                            </div>

                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700"
                                    style={{
                                        width:
                                            assignment.total_students > 0
                                                ? `${
                                                      (assignment.submitted /
                                                          assignment.total_students) *
                                                      100
                                                  }%`
                                                : "0%",
                                    }}
                                ></div>

                            </div>

                        </div>

                    </div>

                </div>

            ))

        )}

    </div>

</div>

    {/* Pending Submissions */}
    {/* ================= Pending ================= */}

<div className="bg-white rounded-3xl shadow-sm p-8">

    <div className="flex items-center gap-4 mb-5">

        <FaListUl
            className="text-yellow-400"
            size={24}
        />

        <h2 className="text-3xl font-bold">

            Pending Submissions to Grade

        </h2>

    </div>

    <hr className="mb-6" />

    {

        pendingSubmissions.length === 0 ?

        (

            <div className="text-center py-12 text-gray-500">

                No Pending Submission

            </div>

        )

        :

        (

            pendingSubmissions.map((submission)=>(

                <div
                    key={submission.id}
                    className="py-4 border-b"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <h3 className="text-2xl font-bold">

                                {submission.full_name}

                            </h3>

                            <p className="text-gray-500 text-lg">

                                {submission.course_name}

                            </p>

                        </div>

                        <div className="flex gap-3">

                           <button
onClick={() => viewSubmission(submission.assignment_id)}

className="bg-blue-100 text-blue-600 px-5 py-3 rounded-xl flex items-center gap-2"

>

<FaEye />

View

</button>

                          <button
onClick={() => openGradeModal(submission)}

className="bg-green-100 text-green-600 px-5 py-3 rounded-xl flex items-center gap-2"

>

<FaStar />

Grade

</button>

                        </div>

                    </div>

                </div>

            ))

        )

    }

</div>
  </div>

  {/* Create Assignment Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">

    <div className="bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

      {/* Header */}
      <div className="bg-[#082B3A] px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center sticky top-0">

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">
          Create Assignment
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-white text-3xl hover:text-yellow-400"
        >
          ×
        </button>

      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5">

        {/* Assignment Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Assignment Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Assignment Title"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Assignment Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Assignment Type
          </label>

          <select
            value={assignmentType}
            onChange={(e) => setAssignmentType(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            <option value="batch">
              Batch Assignment
            </option>

            <option value="individual">
              Individual Assignment
            </option>
          </select>
        </div>

        {/* Batch / Student */}
        {assignmentType === "batch" ? (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Batch
            </label>

            <select
              name="batch_id"
              value={formData.batch_id}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">Select Batch</option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batch_name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Student
            </label>

            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">Select Student</option>

             {individualStudents.map((student) => (
    <option
        key={student.id || student.user_id}
        value={student.user_id || student.id}
    >
        {student.full_name}
    </option>
))}
            </select>
          </div>
        )}

        {/* Due Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Due Date
          </label>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Assignment Description
          </label>

          <textarea
            rows="6"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write assignment details..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="border-t bg-white p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-3 sticky bottom-0">

        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={createAssignment}
          className="w-full sm:w-auto bg-[#082B3A] hover:bg-[#0d3d52] text-yellow-400 px-6 py-3 rounded-xl font-semibold transition"
        >
          Save Assignment
        </button>

      </div>

    </div>

  </div>
)}
{
showViewModal &&
viewData &&
viewData.length > 0 && (

<div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto p-4">

    <div className="min-h-full flex items-center justify-center py-8">

        <div
            className="
                bg-white
                w-full
                max-w-5xl
                h-auto
                max-h-[90vh]
                rounded-3xl
                shadow-2xl
                flex
                flex-col
                overflow-hidden
            "
        >

<div className="bg-[#082B3A] px-5 md:px-8 py-5 flex justify-between items-center flex-shrink-0">
 {viewData[0]?.file_url && (

<div className="flex gap-3">

<a
href={viewData[0].file_url}
target="_blank"
rel="noopener noreferrer"
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
>
👁 View File
</a>

<a
href={viewData[0].file_url}
download
className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
>
⬇ Download
</a>

</div>

)}

    <button
        onClick={() => setShowViewModal(false)}
        className="text-white text-4xl hover:text-red-400 transition"
    >
        ×
    </button>

</div>

<div className="flex-1 overflow-y-auto p-5 md:p-8">

  {/* Top Information */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div className="bg-gray-50 rounded-2xl border p-5">
      <p className="text-sm text-gray-500 font-medium">
        Student
      </p>

      <h3 className="text-xl md:text-2xl font-bold text-[#082B3A] mt-2 break-words">
        {viewData[0].full_name}
      </h3>
    </div>

    <div className="bg-gray-50 rounded-2xl border p-5">
      <p className="text-sm text-gray-500 font-medium">
        Teacher
      </p>

      <h3 className="text-xl md:text-2xl font-bold text-[#082B3A] mt-2 break-words">
        {trainer.name || "Not Assigned"}
      </h3>
    </div>

    <div className="bg-gray-50 rounded-2xl border p-5">
      <p className="text-sm text-gray-500 font-medium">
       Course
      </p>

      <h3 className="text-lg md:text-xl font-bold text-[#082B3A] mt-2 break-words">
        {viewData[0].course_name || "Individual Assignment"}
      </h3>
    </div>

    <div className="bg-gray-50 rounded-2xl border p-5">
      <p className="text-sm text-gray-500 font-medium">
        Due Date
      </p>

      <h3 className="text-lg md:text-xl font-bold text-red-500 mt-2">
        {
assignments.find(
a=>a.id===viewData[0].assignment_id
)?.due_date
}
      </h3>
    </div>

  </div>

  {/* Assignment */}

  <div className="mt-8 bg-white border rounded-2xl p-6">

    <p className="text-sm uppercase text-gray-500 font-semibold">

      Assignment

    </p>

    <h2 className="text-2xl md:text-3xl font-bold text-[#082B3A] mt-2">

      {assignments.find(

a=>a.id===viewData[0].assignment_id

)?.title}

    </h2>

    <p className="mt-5 text-gray-600 leading-8 whitespace-pre-line">

      {assignments.find(

a=>a.id===viewData[0].assignment_id

)?.description}

    </p>

  </div>

  {/* Student Submission */}

  <div className="mt-8">

    <h3 className="text-2xl font-bold text-[#082B3A] mb-4">

      Student Submission

    </h3>

    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">

      <p className="leading-8 text-gray-700 whitespace-pre-line">

        {viewData[0].submission || "No submission notes."}

      </p>

    </div>

  </div>

  {/* Uploaded File */}

  

  {/* Bottom */}

  <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between gap-6">

    <div>

      <p className="text-gray-500 text-sm">

        Submitted At

      </p>

      <h4 className="font-bold text-[#082B3A] text-lg mt-2">

        {viewData[0].submitted_at}

      </h4>

    </div>

    <div>

      <span
        className="
        inline-block
        bg-green-100
        text-green-700
        px-6
        py-3
        rounded-full
        font-bold
        "
      >

        {viewData[0].status}

      </span>

    </div>

  </div>

</div>

</div>

</div>
</div>
)
}

{showGradeModal && (

<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">

    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        <div className="bg-[#082B3A] px-6 py-5 flex justify-between items-center">

            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
                Grade Assignment
            </h2>

            <button
                onClick={() => setShowGradeModal(false)}
                className="text-white text-3xl"
            >
                ×
            </button>

        </div>

        <div className="p-6 space-y-5 overflow-y-auto">

            <div>

                <label className="block font-semibold mb-2">
                    Marks
                </label>

                <input
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3"
                />

            </div>

            <div>

                <label className="block font-semibold mb-2">
                    Feedback
                </label>

                <textarea
                    rows="5"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3"
                />

            </div>

        </div>

        <div className="border-t p-5 flex flex-col sm:flex-row gap-3 justify-end">

            <button
                onClick={() => setShowGradeModal(false)}
                className="border px-6 py-3 rounded-xl"
            >
                Cancel
            </button>

            <button
                onClick={saveGrade}
                className="bg-[#082B3A] text-yellow-400 px-6 py-3 rounded-xl"
            >
                Save Grade
            </button>

        </div>

    </div>

</div>

)}

{/* Update Assignment Modal */}
{showEditModal && editAssignment && (

<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">

  <div className="bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

    {/* Header */}
    <div className="bg-[#082B3A] px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center sticky top-0">

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">
        Update Assignment
      </h2>

      <button
        onClick={() => setShowEditModal(false)}
        className="text-white text-3xl hover:text-yellow-400 transition"
      >
        ×
      </button>

    </div>

    {/* Body */}
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

      {/* Assignment Title */}
      <div>

        <label className="block text-gray-700 font-semibold mb-2">
          Assignment Title
        </label>

        <input
          type="text"
          name="title"
          value={editAssignment.title}
          onChange={handleEditChange}
          placeholder="Enter Assignment Title"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

      </div>

      {/* Batch */}
      <div>

        <label className="block text-gray-700 font-semibold mb-2">
          Select Batch
        </label>

        <select
          name="batch_id"
          value={editAssignment.batch_id}
          onChange={handleEditChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >

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

      {/* Due Date */}
      <div>

        <label className="block text-gray-700 font-semibold mb-2">
          Due Date
        </label>

        <input
          type="date"
          name="due_date"
          value={editAssignment.due_date}
          onChange={handleEditChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

      </div>

      {/* Description */}
      <div>

        <label className="block text-gray-700 font-semibold mb-2">
          Assignment Description
        </label>

        <textarea
          rows="6"
          name="description"
          value={editAssignment.description}
          onChange={handleEditChange}
          placeholder="Write assignment details..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

      </div>

    </div>

    {/* Footer */}
    <div className="border-t bg-white p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-3 sticky bottom-0">

      <button
        type="button"
        onClick={() => setShowEditModal(false)}
        className="w-full sm:w-auto border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={updateAssignment}
        className="w-full sm:w-auto bg-[#082B3A] hover:bg-[#0c3b4f] text-yellow-400 px-6 py-3 rounded-xl font-semibold transition"
      >
        Update Assignment
      </button>

    </div>

  </div>

</div>

)}

</div>

);
};

export default Assignments;

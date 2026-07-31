import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://800junkuae.online/tsh-api/API";
export default function IslamicStudents() {

    // ===========================
    // STATES
    // ===========================
const [showViewModal, setShowViewModal] = useState(false);
const [viewStudentData, setViewStudentData] = useState(null);
    const [batchStudents, setBatchStudents] = useState([]);
    const [individualStudents, setIndividualStudents] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [activeTab, setActiveTab] = useState("batch");

    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        full_name: "",
        father_name: "",
        email: "",
        phone: "",
        whatsapp: "",
        dob: "",
        gender: "",
        education: "",
        course_id: "",
        teacher_id: "",
        batch_id: "",
        status: "Pending",
    });

    // ===========================
    // LOAD DATA
    // ===========================

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);

        await Promise.all([
            fetchBatchStudents(),
            fetchIndividualStudents(),
            fetchTeachers(),
            fetchCourses(),
            fetchBatches(),
        ]);

        setLoading(false);
    };

    // ===========================
    // FETCH BATCH STUDENTS
    // ===========================

    const fetchBatchStudents = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/islamic_student/get-batch-students.php`
            );

            if (res.data.success) {
                setBatchStudents(res.data.students);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // FETCH INDIVIDUAL STUDENTS
    // ===========================

    const fetchIndividualStudents = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/islamic_student/get-individual-students.php`
            );

            if (res.data.success) {
                setIndividualStudents(res.data.students);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // FETCH TEACHERS
    // ===========================

    const fetchTeachers = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/islamic_teacher/get-teachers.php`
            );

            if (res.data.success) {
                setTeachers(res.data.teachers);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // FETCH COURSES
    // ===========================

    const fetchCourses = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/islamic_course/get-courses.php`
            );

            if (res.data.success) {
                setCourses(res.data.courses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // FETCH BATCHES
    // ===========================

    const fetchBatches = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/islamic_batch/get-batches.php`
            );

            if (res.data.success) {
                setBatches(res.data.batches);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ===========================
    // HANDLE INPUT CHANGE
    // ===========================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ===========================
    // RESET FORM
    // ===========================

    const resetForm = () => {
        setEditing(false);
        setShowModal(false);
        setImage(null);

        setFormData({
            id: "",
            full_name: "",
            father_name: "",
            email: "",
            phone: "",
            whatsapp: "",
            dob: "",
            gender: "",
            education: "",
            course_id: "",
            teacher_id: "",
            batch_id: "",
            status: "Pending",
        });
    };

    // ===========================
    // SEARCH FILTERS
    // ===========================

    const filteredBatch = batchStudents.filter((student) =>
        student.full_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const filteredIndividual = individualStudents.filter((student) =>
        student.full_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );
    // ===========================
    // VIEW STUDENT
    // ===========================

   const viewStudent = (student) => {
    setViewStudentData(student);
    setShowViewModal(true);
};
    // ===========================
    // EDIT STUDENT
    // ===========================

    const editStudent = (student) => {

        setEditing(true);
        setShowModal(true);
        setImage(null);

        setFormData({
            id: student.id,
            full_name: student.full_name,
            father_name: student.father_name,
            email: student.email,
            phone: student.phone,
            whatsapp: student.whatsapp,
            dob: student.dob,
            gender: student.gender,
            education: student.education,
            course_id: student.course_id,
            teacher_id: student.teacher_id,
            batch_id: student.batch_id,
            status: student.status,
            profile_image: student.profile_image,
        });

    };

    // ===========================
    // UPDATE STUDENT
    // ===========================

    const updateStudent = async (e) => {

        e.preventDefault();

        try {

            const form = new FormData();

            Object.keys(formData).forEach((key) => {
                form.append(key, formData[key]);
            });

            if (image) {
                form.append("profile_image", image);
            }

            const res = await axios.post(
                `${BASE_URL}/islamic_student/update.php`,
                form
            );

            alert(res.data.message);

            if (res.data.success) {

                resetForm();

                await loadData();

            }

        } catch (error) {

            console.error(error);

        }

    };

    // ===========================
    // DELETE STUDENT
    // ===========================

    const deleteStudent = async (id) => {

        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {

            const form = new FormData();

            form.append("id", id);

            const res = await axios.post(
                `${BASE_URL}/islamic_student/delete.php`,
                form
            );

            alert(res.data.message);

            if (res.data.success) {
                await loadData();
            }

        } catch (error) {

            console.error(error);

        }

    };

    // ===========================
    // RETURN
    // ===========================

    return (

        <div className="p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-[#082B3A]">
                        Islamic Students
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage Batch & Individual Students
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search Student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-xl px-4 py-3 w-full md:w-80 focus:ring-2 focus:ring-[#082B3A] outline-none"
                />

            </div>

            {/* Tabs */}

            <div className="flex gap-4 mb-6">

                <button
                    onClick={() => setActiveTab("batch")}
                    className={`px-6 py-3 rounded-xl font-semibold transition ${
                        activeTab === "batch"
                            ? "bg-[#082B3A] text-white"
                            : "bg-white border"
                    }`}
                >
                    Batch Students ({batchStudents.length})
                </button>

                <button
                    onClick={() => setActiveTab("individual")}
                    className={`px-6 py-3 rounded-xl font-semibold transition ${
                        activeTab === "individual"
                            ? "bg-green-600 text-white"
                            : "bg-white border"
                    }`}
                >
                    Individual Students ({individualStudents.length})
                </button>

            </div>
                        {/* ==========================
                BATCH STUDENTS
            ========================== */}

            {activeTab === "batch" && (

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-[#082B3A] text-white">

                                <tr>

                                    <th className="px-4 py-4 text-left">Photo</th>

                                    <th className="px-4 py-4 text-left">Student</th>

                                    <th className="px-4 py-4 text-left">Teacher</th>

                                    <th className="px-4 py-4 text-left">Course</th>

                                    <th className="px-4 py-4 text-left">Batch</th>

                                    <th className="px-4 py-4 text-left">Status</th>

                                    <th className="px-4 py-4 text-center">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-16 text-gray-500"
                                        >
                                            Loading students...
                                        </td>

                                    </tr>

                                ) : filteredBatch.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-16 text-gray-500"
                                        >
                                            No Batch Students Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredBatch.map((student) => (

                                        <tr
                                            key={student.id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >

                                            {/* Photo */}

                                            <td className="px-4 py-3">

                                                <img
                                                    src={
                                                        student.profile_image
                                                            ? `${BASE_URL}/${student.profile_image}`
                                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                  student.full_name
                                                              )}&background=082B3A&color=fff`
                                                    }
                                                    alt={student.full_name}
                                                    className="w-14 h-14 rounded-full object-cover border"
                                                />

                                            </td>

                                            {/* Student */}

                                            <td className="px-4 py-3">

                                                <h3 className="font-semibold text-gray-800">
                                                    {student.full_name}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {student.email}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    {student.phone}
                                                </p>

                                            </td>

                                            {/* Teacher */}

                                            <td className="px-4 py-3">

                                                {student.teacher_name}

                                            </td>

                                            {/* Course */}

                                            <td className="px-4 py-3">

                                                {student.course_name}

                                            </td>

                                            {/* Batch */}

                                            <td className="px-4 py-3">

                                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                                                    {student.batch_name}

                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td className="px-4 py-3">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold

                                                    ${
                                                        student.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : student.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >

                                                    {student.status}

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="px-4 py-3">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() =>
                                                            viewStudent(student)
                                                        }
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            editStudent(student)
                                                        }
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteStudent(student.id)
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
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

                            
            )}
                        {/* ==========================
                INDIVIDUAL STUDENTS
            ========================== */}

            {activeTab === "individual" && (

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead className="bg-green-700 text-white">

                                <tr>

                                    <th className="px-4 py-4 text-left">Photo</th>

                                    <th className="px-4 py-4 text-left">Student</th>

                                    <th className="px-4 py-4 text-left">Teacher</th>

                                    <th className="px-4 py-4 text-left">Course</th>

                                    <th className="px-4 py-4 text-left">Status</th>

                                    <th className="px-4 py-4 text-center">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-16 text-gray-500"
                                        >
                                            Loading students...
                                        </td>

                                    </tr>

                                ) : filteredIndividual.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-16 text-gray-500"
                                        >
                                            No Individual Students Found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredIndividual.map((student) => (

                                        <tr
                                            key={student.id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >

                                            {/* Photo */}

                                            <td className="px-4 py-3">

                                                <img
                                                    src={
                                                        student.profile_image
                                                            ? `${BASE_URL}/${student.profile_image}`
                                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(student.full_name)}&background=16a34a&color=fff`
                                                    }
                                                    alt={student.full_name}
                                                    className="w-14 h-14 rounded-full object-cover border"
                                                />

                                            </td>

                                            {/* Student */}

                                            <td className="px-4 py-3">

                                                <h3 className="font-semibold">
                                                    {student.full_name}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {student.email}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    {student.phone}
                                                </p>

                                            </td>

                                            {/* Teacher */}

                                            <td className="px-4 py-3">
                                                {student.teacher_name}
                                            </td>

                                            {/* Course */}

                                            <td className="px-4 py-3">
                                                {student.course_name}
                                            </td>

                                            {/* Status */}

                                            <td className="px-4 py-3">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                                    ${
                                                        student.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : student.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {student.status}
                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="px-4 py-3">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() => viewStudent(student)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() => editStudent(student)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleteStudent(student.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
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

            )}
                        {/* ==========================
                EDIT STUDENT MODAL
            ========================== */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

                        {/* Header */}

                        <div className="flex justify-between items-center p-6 border-b">

                            <h2 className="text-2xl font-bold text-[#082B3A]">
                                Edit Student
                            </h2>

                            <button
                                onClick={resetForm}
                                className="text-3xl hover:text-red-600"
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={updateStudent}
                            className="grid md:grid-cols-2 gap-5 p-6"
                        >

                            {/* Full Name */}

                            <div>
                                <label className="font-semibold">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                    required
                                />
                            </div>

                            {/* Father Name */}

                            <div>
                                <label className="font-semibold">
                                    Father Name
                                </label>

                                <input
                                    type="text"
                                    name="father_name"
                                    value={formData.father_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* Email */}

                            <div>
                                <label className="font-semibold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* Phone */}

                            <div>
                                <label className="font-semibold">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* WhatsApp */}

                            <div>
                                <label className="font-semibold">
                                    WhatsApp
                                </label>

                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* DOB */}

                            <div>
                                <label className="font-semibold">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* Gender */}

                            <div>
                                <label className="font-semibold">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* Education */}

                            <div>
                                <label className="font-semibold">
                                    Education
                                </label>

                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* Course */}

                            <div>
                                <label className="font-semibold">
                                    Course
                                </label>

                                <select
                                    name="course_id"
                                    value={formData.course_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                >
                                    <option value="">Select Course</option>

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
                                <label className="font-semibold">
                                    Teacher
                                </label>

                                <select
                                    name="teacher_id"
                                    value={formData.teacher_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                >
                                    <option value="">Select Teacher</option>

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

                            {/* Batch */}

                            <div>
                                <label className="font-semibold">
                                    Batch
                                </label>

                                <select
                                    name="batch_id"
                                    value={formData.batch_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                >
                                    <option value="">
                                        Individual Student
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

                            {/* Status */}

                            <div>
                                <label className="font-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 mt-2"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Profile Image */}

                            <div className="md:col-span-2">

                                <label className="font-semibold">
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full border rounded-xl p-3 mt-2"
                                />

                            </div>

                            {/* Preview */}

                            {(image || formData.profile_image) && (

                                <div className="md:col-span-2">

                                    <img
                                        src={
                                            image
                                                ? URL.createObjectURL(image)
                                                : `${BASE_URL.replace("/API", "")}/${formData.profile_image}`
                                        }
                                        alt=""
                                        className="w-28 h-28 rounded-full border object-cover"
                                    />

                                </div>

                            )}

                            {/* Buttons */}

                            <div className="md:col-span-2 flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-300 px-6 py-3 rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-[#082B3A] text-white px-8 py-3 rounded-xl"
                                >
                                    Update Student
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}
{/* ==========================================
    VIEW STUDENT MODAL
========================================== */}

{showViewModal && viewStudentData && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

{/* Header */}

<div className="flex justify-between items-center border-b p-6 bg-[#082B3A] text-white">

<div className="flex items-center gap-4">

<img
src={
viewStudentData.profile_image
? `${BASE_URL}/${viewStudentData.profile_image}`
: `https://ui-avatars.com/api/?name=${encodeURIComponent(viewStudentData.full_name)}`
}
alt=""
className="w-20 h-20 rounded-full border-4 border-white object-cover"
/>

<div>

<h2 className="text-2xl font-bold">
{viewStudentData.full_name}
</h2>

<p>
{viewStudentData.email}
</p>

</div>

</div>

<button
onClick={()=>{
setShowViewModal(false);
setViewStudentData(null);
}}
className="text-4xl"
>
×
</button>

</div>

<div className="grid md:grid-cols-2 gap-6 p-6">

{/* Personal Information */}

<div className="bg-gray-50 rounded-xl p-5">

<h3 className="text-xl font-bold text-[#082B3A] mb-4">
Personal Information
</h3>

<div className="space-y-3">

<div className="flex justify-between">
<strong>Full Name</strong>
<span>{viewStudentData.full_name}</span>
</div>

<div className="flex justify-between">
<strong>Father Name</strong>
<span>{viewStudentData.father_name}</span>
</div>

<div className="flex justify-between">
<strong>Date of Birth</strong>
<span>{viewStudentData.dob}</span>
</div>

<div className="flex justify-between">
<strong>Gender</strong>
<span>{viewStudentData.gender}</span>
</div>

<div className="flex justify-between">
<strong>CNIC</strong>
<span>{viewStudentData.cnic}</span>
</div>

</div>

</div>

{/* Contact */}

<div className="bg-gray-50 rounded-xl p-5">

<h3 className="text-xl font-bold text-[#082B3A] mb-4">
Contact Information
</h3>

<div className="space-y-3">

<div className="flex justify-between">
<strong>Email</strong>
<span>{viewStudentData.email}</span>
</div>

<div className="flex justify-between">
<strong>Phone</strong>
<span>{viewStudentData.phone}</span>
</div>

<div className="flex justify-between">
<strong>WhatsApp</strong>
<span>{viewStudentData.whatsapp}</span>
</div>

</div>

</div>

{/* Address */}

<div className="bg-gray-50 rounded-xl p-5">

<h3 className="text-xl font-bold text-[#082B3A] mb-4">
Address Information
</h3>

<div className="space-y-3">

<div className="flex justify-between">
<strong>Country</strong>
<span>{viewStudentData.country}</span>
</div>

<div className="flex justify-between">
<strong>City</strong>
<span>{viewStudentData.city}</span>
</div>

<div>

<strong>Address</strong>

<p className="mt-2 text-gray-600">
{viewStudentData.address}
</p>

</div>

</div>

</div>

{/* Education */}

<div className="bg-gray-50 rounded-xl p-5">

<h3 className="text-xl font-bold text-[#082B3A] mb-4">
Education Information
</h3>

<div className="space-y-3">

<div className="flex justify-between">
<strong>Education</strong>
<span>{viewStudentData.education}</span>
</div>

<div className="flex justify-between">
<strong>Previous Education</strong>
<span>{viewStudentData.previous_education}</span>
</div>

<div className="flex justify-between">
<strong>Hafiz</strong>
<span>{viewStudentData.hafiz}</span>
</div>

<div className="flex justify-between">
<strong>Prayer</strong>
<span>{viewStudentData.prayer}</span>
</div>

</div>

</div>
                        {/* Course Information */}

                        <div className="bg-gray-50 rounded-xl p-5">

                            <h3 className="text-xl font-bold text-[#082B3A] mb-4">
                                Course Information
                            </h3>

                            <div className="space-y-3">

                                <div className="flex justify-between">
                                    <strong>Course</strong>
                                    <span>{viewStudentData.course_name}</span>
                                </div>

                                <div className="flex justify-between">
                                    <strong>Teacher</strong>
                                    <span>{viewStudentData.teacher_name}</span>
                                </div>

                                <div className="flex justify-between">
                                    <strong>Batch</strong>
                                    <span>
                                        {viewStudentData.batch_name || "Individual Student"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <strong>Timing</strong>
                                    <span>{viewStudentData.timing}</span>
                                </div>

                                <div className="flex justify-between">
                                    <strong>Category</strong>
                                    <span>{viewStudentData.category}</span>
                                </div>

                                <div className="flex justify-between">
                                    <strong>Status</strong>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${
                                            viewStudentData.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : viewStudentData.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {viewStudentData.status}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Notes */}

                        <div className="md:col-span-2 bg-gray-50 rounded-xl p-5">

                            <h3 className="text-xl font-bold text-[#082B3A] mb-4">
                                Notes
                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">
                                {viewStudentData.notes || "No Notes"}
                            </p>

                        </div>

                        {/* Documents */}

                        <div className="md:col-span-2 bg-gray-50 rounded-xl p-5">

                            <h3 className="text-xl font-bold text-[#082B3A] mb-6">
                                Uploaded Documents
                            </h3>

                            <div className="grid md:grid-cols-4 gap-6">

                                {/* Profile */}

                                <div>

                                    <h4 className="font-semibold mb-3">
                                        Profile Image
                                    </h4>

                                    {viewStudentData.profile_image ? (

                                        <img
                                            src={`${BASE_URL}/${viewStudentData.profile_image}`}
                                            alt=""
                                            className="w-full h-48 object-cover rounded-xl border"
                                        />

                                    ) : (

                                        <div className="border rounded-xl h-48 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>

                                    )}

                                </div>

                                {/* CNIC Front */}

                                <div>

                                    <h4 className="font-semibold mb-3">
                                        CNIC Front
                                    </h4>

                                    {viewStudentData.cnic_front ? (

                                        <img
                                            src={`${BASE_URL}/${viewStudentData.cnic_front}`}
                                            alt=""
                                            className="w-full h-48 object-cover rounded-xl border cursor-pointer"
                                            onClick={() =>
                                                window.open(
                                                    `${BASE_URL}/${viewStudentData.cnic_front}`
                                                )
                                            }
                                        />

                                    ) : (

                                        <div className="border rounded-xl h-48 flex items-center justify-center text-gray-400">
                                            No File
                                        </div>

                                    )}

                                </div>

                                {/* CNIC Back */}

                                <div>

                                    <h4 className="font-semibold mb-3">
                                        CNIC Back
                                    </h4>

                                    {viewStudentData.cnic_back ? (

                                        <img
                                            src={`${BASE_URL}/${viewStudentData.cnic_back}`}
                                            alt=""
                                            className="w-full h-48 object-cover rounded-xl border cursor-pointer"
                                            onClick={() =>
                                                window.open(
                                                    `${BASE_URL}/${viewStudentData.cnic_back}`
                                                )
                                            }
                                        />

                                    ) : (

                                        <div className="border rounded-xl h-48 flex items-center justify-center text-gray-400">
                                            No File
                                        </div>

                                    )}

                                </div>

                                {/* Education Document */}

                                <div>

                                    <h4 className="font-semibold mb-3">
                                        Education Document
                                    </h4>

                                    {viewStudentData.education_doc ? (

                                        <img
                                            src={`${BASE_URL}/${viewStudentData.education_doc}`}
                                            alt=""
                                            className="w-full h-48 object-cover rounded-xl border cursor-pointer"
                                            onClick={() =>
                                                window.open(
                                                    `${BASE_URL}/${viewStudentData.education_doc}`
                                                )
                                            }
                                        />

                                    ) : (

                                        <div className="border rounded-xl h-48 flex items-center justify-center text-gray-400">
                                            No File
                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="border-t p-6 flex justify-end">

                        <button
                            onClick={() => {
                                setShowViewModal(false);
                                setViewStudentData(null);
                            }}
                            className="bg-[#082B3A] text-white px-8 py-3 rounded-xl hover:bg-[#0d3b4f]"
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

)}
        </div>

    );

}
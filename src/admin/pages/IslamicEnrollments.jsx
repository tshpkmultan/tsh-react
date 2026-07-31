import React, {
  useState,
  useEffect,
  useMemo,
} from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  CreditCard,
  Download,
  FileText,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
const API = "https://800junkuae.online/tsh-api/API";
const FILE_URL = "https://800junkuae.online/tsh-api/";
export default function IslamicEnrollments() {
  const navigate = useNavigate();
  /* =========================================
     STATES
  ========================================= */

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
const [courses, setCourses] = useState([]);
const [teachers, setTeachers] = useState([]);
const [batches, setBatches] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [processing, setProcessing] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const [editForm, setEditForm] = useState({
  full_name: "",
  father_name: "",
  email: "",
  phone: "",
  whatsapp: "",
  dob: "",
  gender: "",

  cnic: "",

  city: "",
  country: "",
  address: "",

  education: "",
  previous_education: "",

  hafiz: "",
  prayer: "",
  experience: "",
  computer_knowledge: "",

  course_id: "",
  teacher_id: "",
  batch_id: "",

  timing: "",
  notes: "",

  paid_amount: "",
  payment_method: "",
  transaction_id: "",
  payment_details: "",

  profile_image: null,
  cnic_front: null,
  cnic_back: null,
  education_doc: null,
  payment_screenshot: null,
});
  /* =========================================
     FETCH ENROLLMENTS
  ========================================= */

  const fetchEnrollments = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/islamic/get_enrollments.php`
      );

      const data = await res.json();

      setStudents(data.students || []);
    } catch (error) {
      console.log(error);
      alert("Unable to load enrollments.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {

  fetchEnrollments();

  fetchData();

}, []);

const fetchData = async () => {
  try {

    const res = await fetch(
      `${API}/islamic/get-data.php`
    );

    const data = await res.json();

    setCourses(data.courses || []);
    setTeachers(data.teachers || []);
    setBatches(data.batches || []);

  } catch (error) {

    console.log(error);

  }
};



  /* =========================================
     UPDATE STATUS
  ========================================= */

 const updateStudent = async () => {

  try {

    const formData = new FormData();

    formData.append("id", selectedStudent.id);

    // Text Fields
    Object.keys(editForm).forEach((key) => {

      if (
        key !== "profile_image" &&
        key !== "cnic_front" &&
        key !== "cnic_back" &&
        key !== "education_doc" &&
        key !== "payment_screenshot"
      ) {
        formData.append(key, editForm[key]);
      }

    });

    // Upload Files (Only if user selected a new file)
    if (editForm.profile_image) {
      formData.append("profile_image", editForm.profile_image);
    }

    if (editForm.cnic_front) {
      formData.append("cnic_front", editForm.cnic_front);
    }

    if (editForm.cnic_back) {
      formData.append("cnic_back", editForm.cnic_back);
    }

    if (editForm.education_doc) {
      formData.append("education_doc", editForm.education_doc);
    }

    if (editForm.payment_screenshot) {
      formData.append("payment_screenshot", editForm.payment_screenshot);
    }

    const res = await fetch(
      `${API}/islamic/update_enrollment.php`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      setShowEditModal(false);
      fetchEnrollments();
    }

  } catch (err) {

    console.log(err);

    alert("Update failed");

  }

};
 
const editStudent = (student) => {

  setSelectedStudent(student);

  setEditForm({

  full_name: student.full_name || "",
  father_name: student.father_name || "",
  email: student.email || "",
  phone: student.phone || "",
  whatsapp: student.whatsapp || "",

  dob: student.dob || "",
  gender: student.gender || "",

  cnic: student.cnic || "",

  city: student.city || "",
  country: student.country || "",
  address: student.address || "",

  education: student.education || "",
  previous_education: student.previous_education || "",

  hafiz: student.hafiz || "",
  prayer: student.prayer || "",
  experience: student.experience || "",
  computer_knowledge: student.computer_knowledge || "",

  course_id: student.course_id || "",
  teacher_id: student.teacher_id || "",
  batch_id: student.batch_id || "",

  timing: student.timing || "",
  notes: student.notes || "",

  paid_amount: student.paid_amount || "",
  payment_method: student.payment_method || "",
  transaction_id: student.transaction_id || "",
  payment_details: student.payment_details || "",

});

  setShowEditModal(true);

};

const deleteStudent = async (id) => {

  if (!window.confirm("Are you sure you want to delete this enrollment?")) {
    return;
  }

  try {

    const res = await fetch(
      `${API}/islamic/delete_enrollment.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    alert(data.message);

    fetchEnrollments();

  } catch (err) {

    console.log(err);

    alert("Delete failed.");

  }

};

const changeStatus = (student, status) => {

  if (status === "Rejected") {

    setSelectedStudent(student);

    setShowRejectModal(true);

    return;
  }

  updateStatus(student.id, status);

};
const updateStatus = async (id, status, reason = "") => {
  try {
    setProcessing(true);

    const res = await fetch(
      `${API}/islamic/update_status.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          rejection_reason: reason,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      fetchEnrollments();
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedStudent(null);
      setShowModal(false);
    }
  } catch (err) {
    console.log(err);
    alert("Unable to update status.");
  } finally {
    setProcessing(false);
  }
};
  /* =========================================
     SEARCH + FILTER
  ========================================= */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        student.full_name?.toLowerCase().includes(keyword) ||
        student.email?.toLowerCase().includes(keyword) ||
        student.phone?.toLowerCase().includes(keyword) ||
        student.cnic?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  /* =========================================
     STATUS BADGE
  ========================================= */

  const badgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Active":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* =========================================
     DOCUMENT URL
  ========================================= */

  const fileUrl = (file) => {
  if (!file) return "";

  return `${FILE_URL}${file.replace(/^\/+/, "")}`;
};
    /* =========================================
     RETURN
  ========================================= */

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Islamic Student Enrollments
          </h1>

          <p className="text-slate-500 mt-1">
            Manage admissions, approvals and student records
          </p>

        </div>

        <button
          onClick={fetchEnrollments}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl shadow border p-6 mb-8">

        <div className="grid lg:grid-cols-3 gap-5">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by Name, Email, Phone or CNIC..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

          {/* Filter */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none"
            >

              <option>All</option>

              <option>Pending</option>

              <option>Approved</option>

              <option>Rejected</option>

              <option>Active</option>

              <option>Inactive</option>

            </select>

          </div>

          {/* Count */}

          <div className="rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700 font-bold text-lg">

            Total Students : {filteredStudents.length}

          </div>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="py-20 flex justify-center">

          <div className="w-14 h-14 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>

        </div>

      ) : (

        <div className="bg-white rounded-2xl shadow border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-green-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Contact
                  </th>

                  <th className="p-4 text-left">
                    Course
                  </th>

                  <th className="p-4 text-left">
                    Teacher
                  </th>

                  <th className="p-4 text-center">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-14 text-gray-500"
                    >

                      No Student Found

                    </td>

                  </tr>

                ) : (

                  filteredStudents.map((student) => (

                    <tr
                      key={student.id}
                      className="border-b hover:bg-green-50 transition"
                    >

                      {/* Student */}

                      <td className="p-4">

                        <div className="flex items-center gap-4">

                          {student.profile_image ? (

                            <img
                              src={fileUrl(student.profile_image)}
                              alt=""
                              className="w-14 h-14 rounded-full object-cover border"
                            />

                          ) : (

                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">

                              <User size={24} />

                            </div>

                          )}

                          <div>

                            <h3 className="font-bold">

                              {student.full_name}

                            </h3>

                            <p className="text-sm text-gray-500">

                              {student.cnic}

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Contact */}

                      <td className="p-4">

                        <div className="space-y-1">

                          <div className="flex items-center gap-2">

                            <Mail size={15} />

                            {student.email}

                          </div>

                          <div className="flex items-center gap-2">

                            <Phone size={15} />

                            {student.phone}

                          </div>

                        </div>

                      </td>

                      {/* Course */}

                      <td className="p-4">

                        {student.course_name}

                      </td>

                      {/* Teacher */}

                      <td className="p-4">

                        {student.teacher_name}

                      </td>

                      {/* Status */}

                      <td className="p-4 text-center">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
                            student.status
                          )}`}
                        >

                          {student.status}

                        </span>

                      </td>

                      {/* Actions */}

                      <td className="p-4">

                        <div className="flex justify-center gap-2 flex-wrap">
 <button
      onClick={() => {
        setSelectedStudent(student);
        setShowModal(true);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
      title="View"
    >
      <Eye size={16} />
    </button>
  <button
  type="button"
  onClick={() => editStudent(student)}
  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg"
>
  <Edit size={16} />
</button>

  <button
    onClick={() => deleteStudent(student.id)}
    className="bg-red-700 text-white px-3 py-2 rounded-lg"
  >
    <Trash2 size={16} />
  </button>

  <select
  value={student.status}
  onChange={(e) =>
    changeStatus(student, e.target.value)
  }
  className="border rounded-lg px-3 py-2"
>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>

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
            {/* =========================================
          STUDENT DETAILS MODAL
      ========================================= */}

      {showModal && selectedStudent && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5">

          <div className="bg-white w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">

            {/* Header */}

            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-8 flex justify-between items-center">

              <div>

                <h2 className="text-3xl font-bold">

                  Student Profile

                </h2>

                <p className="opacity-90 mt-2">

                  Complete Admission Information

                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-xl"
              >
                <X size={24} />
              </button>

            </div>

            <div className="p-8">

              {/* Profile */}

              <div className="flex flex-col lg:flex-row gap-8 items-center border-b pb-8">

                <div>

                  {selectedStudent.profile_image ? (

                    <img
                      src={fileUrl(selectedStudent.profile_image)}
                      alt=""
                      className="w-44 h-44 rounded-full object-cover border-4 border-green-600"
                    />

                  ) : (

                    <div className="w-44 h-44 rounded-full bg-gray-100 flex items-center justify-center">

                      <User size={90} />

                    </div>

                  )}

                </div>

                <div className="flex-1">

                  <h2 className="text-4xl font-bold">

                    {selectedStudent.full_name}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    Student ID : #{selectedStudent.id}

                  </p>

                  <div className="mt-4">

                    <span
                      className={`px-5 py-2 rounded-full font-semibold ${badgeColor(
                        selectedStudent.status
                      )}`}
                    >

                      {selectedStudent.status}

                    </span>

                  </div>

                </div>

              </div>

              {/* Information */}

              <div className="grid lg:grid-cols-2 gap-8 mt-10">

                {/* Personal */}

                <div className="bg-gray-50 rounded-2xl p-6">

                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">

                    <User />

                    Personal Information

                  </h3>

                  <div className="space-y-4">

                    <p><b>Full Name:</b> {selectedStudent.full_name}</p>

                    <p><b>Father Name:</b> {selectedStudent.father_name}</p>

                    <p><b>Email:</b> {selectedStudent.email}</p>

                    <p><b>Phone:</b> {selectedStudent.phone}</p>

                    <p><b>WhatsApp:</b> {selectedStudent.whatsapp}</p>

                    <p><b>CNIC:</b> {selectedStudent.cnic}</p>

                    <p><b>Gender:</b> {selectedStudent.gender}</p>

                    <p><b>Date of Birth:</b> {selectedStudent.dob}</p>

                  </div>

                </div>

                {/* Islamic */}

                <div className="bg-gray-50 rounded-2xl p-6">

                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">

                    <BookOpen />

                    Islamic Information

                  </h3>

                  <div className="space-y-4">

                    <p><b>Education:</b> {selectedStudent.education}</p>

                    <p><b>Previous Education:</b> {selectedStudent.previous_education}</p>

                    <p><b>Hafiz:</b> {selectedStudent.hafiz}</p>

                    <p><b>Prayer:</b> {selectedStudent.prayer}</p>

                    <p><b>Experience:</b> {selectedStudent.experience}</p>

                    <p><b>Computer Knowledge:</b> {selectedStudent.computer_knowledge}</p>

                  </div>

                </div>

                {/* Address */}

                <div className="bg-gray-50 rounded-2xl p-6">

                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">

                    <MapPin />

                    Address

                  </h3>

                  <div className="space-y-4">

                    <p><b>Address:</b> {selectedStudent.address}</p>

                    <p><b>City:</b> {selectedStudent.city}</p>

                    <p><b>Country:</b> {selectedStudent.country}</p>

                    <p><b>Timing:</b> {selectedStudent.timing}</p>

                  </div>

                </div>

                {/* Course */}

                <div className="bg-gray-50 rounded-2xl p-6">

                  <h3 className="text-2xl font-bold mb-6">

                    Course Details

                  </h3>

                  <div className="space-y-4">

                    <p><b>Course:</b> {selectedStudent.course_name}</p>

                    <p><b>Teacher:</b> {selectedStudent.teacher_name}</p>

                    <p><b>Batch:</b> {selectedStudent.batch_name}</p>

                    <p><b>Status:</b> {selectedStudent.status}</p>

                  </div>

                </div>

              </div>
                            {/* =========================================
                  PAYMENT INFORMATION
              ========================================= */}

              <div className="mt-10 bg-gray-50 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard />
                  Payment Information
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">

                  <div className="space-y-4">

                    <p>
                      <b>Paid Amount:</b>{" "}
                      Rs. {Number(selectedStudent.paid_amount || 0).toLocaleString()}
                    </p>

                    <p>
                      <b>Payment Method:</b>{" "}
                      {selectedStudent.payment_method}
                    </p>

                    <p>
                      <b>Transaction ID:</b>{" "}
                      {selectedStudent.transaction_id || "-"}
                    </p>

                    <p>
                      <b>Payment Details:</b>{" "}
                      {selectedStudent.payment_details || "-"}
                    </p>

                  </div>

                  <div className="bg-white rounded-xl border p-5">

                    <div className="flex justify-between mb-3">
                      <span>Course Fee</span>

                      <strong>
                        Rs. {Number(selectedStudent.course_fee || 0).toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between mb-3">
                      <span>Paid</span>

                      <strong className="text-green-600">
                        Rs. {Number(selectedStudent.paid_amount || 0).toLocaleString()}
                      </strong>
                    </div>

                    <div className="border-t pt-4 flex justify-between">

                      <span className="font-bold text-red-600">
                        Remaining
                      </span>

                      <strong className="text-red-600 text-xl">
                        Rs. {Number(selectedStudent.remaining_fee || 0).toLocaleString()}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

              {/* =========================================
                  DOCUMENTS
              ========================================= */}

              <div className="mt-10">

                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText />
                  Uploaded Documents
                </h3>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                  {/* Profile */}

                  <div className="border rounded-2xl overflow-hidden bg-white">

                    <div className="bg-green-700 text-white text-center py-3 font-semibold">
                      Profile Image
                    </div>

                    {selectedStudent.profile_image ? (
                      

<img
  src={fileUrl(selectedStudent.profile_image)}
  alt=""
  className="w-44 h-44 rounded-full object-cover border"
/>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* CNIC Front */}

                  <div className="border rounded-2xl overflow-hidden bg-white">

                    <div className="bg-blue-700 text-white text-center py-3 font-semibold">
                      CNIC Front
                    </div>

                    {selectedStudent.cnic_front ? (
                      <img
                        src={fileUrl(selectedStudent.cnic_front)}
                        className="w-full h-64 object-contain bg-gray-50"
                        alt=""
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        Not Uploaded
                      </div>
                    )}

                  </div>

                  {/* CNIC Back */}

                  <div className="border rounded-2xl overflow-hidden bg-white">

                    <div className="bg-purple-700 text-white text-center py-3 font-semibold">
                      CNIC Back
                    </div>

                    {selectedStudent.cnic_back ? (
                      <img
                        src={fileUrl(selectedStudent.cnic_back)}
                        className="w-full h-64 object-contain bg-gray-50"
                        alt=""
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        Not Uploaded
                      </div>
                    )}

                  </div>

                  {/* Education */}

                  <div className="border rounded-2xl overflow-hidden bg-white">

                    <div className="bg-yellow-600 text-white text-center py-3 font-semibold">
                      Education Document
                    </div>

                    <div className="p-6 flex flex-col gap-4">

                      <FileText className="mx-auto" size={60} />

                      <a
                        href={fileUrl(selectedStudent.education_doc)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-yellow-600 text-white text-center py-3 rounded-xl"
                      >
                        View Document
                      </a>

                      <a
                        href={fileUrl(selectedStudent.education_doc)}
                        download
                        className="bg-gray-700 text-white text-center py-3 rounded-xl flex justify-center items-center gap-2"
                      >
                        <Download size={18} />
                        Download
                      </a>

                    </div>

                  </div>

                  {/* Payment Screenshot */}

                  <div className="border rounded-2xl overflow-hidden bg-white">

                    <div className="bg-green-700 text-white text-center py-3 font-semibold">
                      Payment Screenshot
                    </div>

                    {selectedStudent.payment_screenshot ? (
                      <img
                        src={fileUrl(selectedStudent.payment_screenshot)}
                        className="w-full h-64 object-contain bg-gray-50"
                        alt=""
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        Not Uploaded
                      </div>
                    )}

                  </div>

                </div>

              </div>
                            {/* =========================================
                  ACTION BUTTONS
              ========================================= */}

              <div className="flex flex-wrap justify-end gap-4 mt-10 border-t pt-8">

                <button
                  onClick={() =>
                    updateStatus(
                      selectedStudent.id,
                      "Approved"
                    )
                  }
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle size={20} />
                  {processing ? "Processing..." : "Approve Student"}
                </button>

                <button
                  onClick={() => {
                    setShowRejectModal(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
                >
                  <XCircle size={20} />
                  Reject Student
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-xl"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
{showEditModal && (

<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">

<div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl">

{/* HEADER */}

<div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center rounded-t-3xl z-10">

<h2 className="text-3xl font-bold text-green-700">
Edit Islamic Enrollment
</h2>

<button
type="button"
onClick={()=>setShowEditModal(false)}
className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
>
<X size={22}/>
</button>

</div>

<div className="p-8">

{/* =========================
PERSONAL INFORMATION
========================= */}

<h3 className="text-2xl font-bold text-green-700 mb-6 border-b pb-3">
Personal Information
</h3>

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

<input
className="border rounded-xl p-3"
placeholder="Full Name"
value={editForm.full_name}
onChange={(e)=>setEditForm({...editForm,full_name:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Father Name"
value={editForm.father_name}
onChange={(e)=>setEditForm({...editForm,father_name:e.target.value})}
/>

<input
type="email"
className="border rounded-xl p-3"
placeholder="Email"
value={editForm.email}
onChange={(e)=>setEditForm({...editForm,email:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Phone"
value={editForm.phone}
onChange={(e)=>setEditForm({...editForm,phone:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="WhatsApp"
value={editForm.whatsapp}
onChange={(e)=>setEditForm({...editForm,whatsapp:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="CNIC"
value={editForm.cnic}
onChange={(e)=>setEditForm({...editForm,cnic:e.target.value})}
/>

<input
type="date"
className="border rounded-xl p-3"
value={editForm.dob}
onChange={(e)=>setEditForm({...editForm,dob:e.target.value})}
/>

<select
className="border rounded-xl p-3"
value={editForm.gender}
onChange={(e)=>setEditForm({...editForm,gender:e.target.value})}
>

<option value="">Gender</option>

<option value="Male">Male</option>

<option value="Female">Female</option>

</select>

</div>

{/* =========================
ADDRESS
========================= */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">
Address
</h3>

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

<input
className="border rounded-xl p-3"
placeholder="City"
value={editForm.city}
onChange={(e)=>setEditForm({...editForm,city:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Country"
value={editForm.country}
onChange={(e)=>setEditForm({...editForm,country:e.target.value})}
/>

<textarea
rows="4"
className="border rounded-xl p-3 lg:col-span-3"
placeholder="Address"
value={editForm.address}
onChange={(e)=>setEditForm({...editForm,address:e.target.value})}
/>

</div>

{/* =========================
EDUCATION
========================= */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">
Education
</h3>

<div className="grid lg:grid-cols-2 gap-5">

<input
className="border rounded-xl p-3"
placeholder="Education"
value={editForm.education}
onChange={(e)=>setEditForm({...editForm,education:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Previous Education"
value={editForm.previous_education}
onChange={(e)=>setEditForm({...editForm,previous_education:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Experience"
value={editForm.experience}
onChange={(e)=>setEditForm({...editForm,experience:e.target.value})}
/>

<input
className="border rounded-xl p-3"
placeholder="Computer Knowledge"
value={editForm.computer_knowledge}
onChange={(e)=>setEditForm({...editForm,computer_knowledge:e.target.value})}
/>

</div>

{/* =========================
ISLAMIC INFORMATION
========================= */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">
Islamic Information
</h3>

<div className="grid lg:grid-cols-2 gap-5">

<select
className="border rounded-xl p-3"
value={editForm.hafiz}
onChange={(e)=>setEditForm({...editForm,hafiz:e.target.value})}
>

<option value="">Hafiz-e-Quran</option>

<option value="Yes">Yes</option>

<option value="No">No</option>

</select>

<select
className="border rounded-xl p-3"
value={editForm.prayer}
onChange={(e)=>setEditForm({...editForm,prayer:e.target.value})}
>

<option value="">Prayer</option>

<option value="Regular">Regular</option>

<option value="Sometimes">Sometimes</option>

<option value="No">No</option>

</select>

</div>

{/* =========================
ENROLLMENT
========================= */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">
Enrollment
</h3>

<div className="grid lg:grid-cols-2 gap-5"> 
  {/* Course */}

<select
className="border rounded-xl p-3"
value={editForm.course_id}
onChange={(e)=>
setEditForm({
...editForm,
course_id:e.target.value
})
}
>

<option value="">
Select Course
</option>

{courses.map(course=>(

<option
key={course.id}
value={course.id}
>

{course.title}

</option>

))}

</select>

{/* Teacher */}

<select
className="border rounded-xl p-3"
value={editForm.teacher_id}
onChange={(e)=>
setEditForm({
...editForm,
teacher_id:e.target.value
})
}
>

<option value="">
Select Teacher
</option>

{teachers.map(teacher=>(

<option
key={teacher.id}
value={teacher.id}
>

{teacher.name}

</option>

))}

</select>

{/* Batch */}

<select
className="border rounded-xl p-3"
value={editForm.batch_id}
onChange={(e)=>
setEditForm({
...editForm,
batch_id:e.target.value
})
}
>

<option value="">
Select Batch
</option>

{batches.map(batch=>(

<option
key={batch.id}
value={batch.id}
>

{batch.batch_name}

</option>

))}

</select>

{/* Timing */}

<input
className="border rounded-xl p-3"
placeholder="Preferred Timing"
value={editForm.timing}
onChange={(e)=>
setEditForm({
...editForm,
timing:e.target.value
})
}
/>

</div>

{/* =====================================
PAYMENT INFORMATION
===================================== */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">

Payment Information

</h3>

<div className="grid lg:grid-cols-2 gap-6">

<div>

<label className="font-semibold mb-2 block">

Paid Amount

</label>

<input
type="number"
className="border rounded-xl p-3 w-full"
value={editForm.paid_amount}
onChange={(e)=>
setEditForm({
...editForm,
paid_amount:e.target.value
})
}
/>

</div>

<div>

<label className="font-semibold mb-2 block">

Payment Method

</label>

<select
className="border rounded-xl p-3 w-full"
value={editForm.payment_method}
onChange={(e)=>
setEditForm({
...editForm,
payment_method:e.target.value
})
}
>

<option value="JazzCash">
JazzCash
</option>

<option value="EasyPaisa">
EasyPaisa
</option>

<option value="Bank Transfer">
Bank Transfer
</option>

<option value="Cash">
Cash
</option>

</select>

</div>

<div>

<label className="font-semibold mb-2 block">

Transaction ID

</label>

<input
className="border rounded-xl p-3 w-full"
value={editForm.transaction_id}
onChange={(e)=>
setEditForm({
...editForm,
transaction_id:e.target.value
})
}
/>

</div>

<div className="lg:col-span-2">

<label className="font-semibold mb-2 block">

Payment Details

</label>

<textarea
rows="4"
className="border rounded-xl p-3 w-full"
value={editForm.payment_details}
onChange={(e)=>
setEditForm({
...editForm,
payment_details:e.target.value
})
}
/>

</div>

</div>

{/* =====================================
DOCUMENTS
===================================== */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">

Documents

</h3>

<div className="grid lg:grid-cols-2 gap-6">
  {/* =========================
PROFILE IMAGE
========================= */}

<div>

<label className="block font-semibold mb-2">
Profile Image
</label>

<input
type="file"
accept="image/*"
className="w-full border rounded-xl p-3"
onChange={(e)=>
setEditForm({
...editForm,
profile_image:e.target.files[0]
})
}
/>

{selectedStudent?.profile_image && (

<img
src={fileUrl(selectedStudent.profile_image)}
alt=""
className="mt-4 h-40 w-40 object-cover rounded-xl border"
/>

)}

</div>

{/* =========================
CNIC FRONT
========================= */}

<div>

<label className="block font-semibold mb-2">
CNIC Front
</label>

<input
type="file"
accept="image/*"
className="w-full border rounded-xl p-3"
onChange={(e)=>
setEditForm({
...editForm,
cnic_front:e.target.files[0]
})
}
/>

{selectedStudent?.cnic_front && (

<img
src={fileUrl(selectedStudent.cnic_front)}
alt=""
className="mt-4 h-40 w-full object-contain border rounded-xl"
/>

)}

</div>

{/* =========================
CNIC BACK
========================= */}

<div>

<label className="block font-semibold mb-2">
CNIC Back
</label>

<input
type="file"
accept="image/*"
className="w-full border rounded-xl p-3"
onChange={(e)=>
setEditForm({
...editForm,
cnic_back:e.target.files[0]
})
}
/>

{selectedStudent?.cnic_back && (

<img
src={fileUrl(selectedStudent.cnic_back)}
alt=""
className="mt-4 h-40 w-full object-contain border rounded-xl"
/>

)}

</div>

{/* =========================
EDUCATION DOCUMENT
========================= */}

<div>

<label className="block font-semibold mb-2">
Education Document
</label>

<input
type="file"
className="w-full border rounded-xl p-3"
onChange={(e)=>
setEditForm({
...editForm,
education_doc:e.target.files[0]
})
}
/>

{selectedStudent?.education_doc && (

<a
href={fileUrl(selectedStudent.education_doc)}
target="_blank"
rel="noreferrer"
className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
>

View Current Document

</a>

)}

</div>

{/* =========================
PAYMENT SCREENSHOT
========================= */}

<div className="lg:col-span-2">

<label className="block font-semibold mb-2">
Payment Screenshot
</label>

<input
type="file"
accept="image/*"
className="w-full border rounded-xl p-3"
onChange={(e)=>
setEditForm({
...editForm,
payment_screenshot:e.target.files[0]
})
}
/>

{selectedStudent?.payment_screenshot && (

<img
src={fileUrl(selectedStudent.payment_screenshot)}
alt=""
className="mt-4 h-72 object-contain border rounded-xl"
/>

)}

</div>

</div>

{/* =========================
NOTES
========================= */}

<h3 className="text-2xl font-bold text-green-700 mt-10 mb-6 border-b pb-3">

Notes

</h3>

<textarea
rows="5"
className="border rounded-xl p-3 w-full"
placeholder="Notes"
value={editForm.notes}
onChange={(e)=>
setEditForm({
...editForm,
notes:e.target.value
})
}
/>
{/* =====================================
FOOTER
===================================== */}

<div className="flex flex-wrap justify-end gap-4 mt-10 border-t pt-8">

<button
type="button"
onClick={() => setShowEditModal(false)}
className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold"
>
Cancel
</button>

<button
type="button"
onClick={updateStudent}
className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
>
Update Student
</button>

</div>

</div>

</div>

</div>

)}

      {/* =========================================
          REJECT MODAL
      ========================================= */}

      {showRejectModal && selectedStudent && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-5">

          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl">

            <div className="bg-red-600 text-white px-8 py-6 rounded-t-3xl">

              <h2 className="text-2xl font-bold">
                Reject Enrollment
              </h2>

              <p className="opacity-90 mt-1">
                Please provide the rejection reason.
              </p>

            </div>

            <div className="p-8">

              <textarea
                rows={6}
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(e.target.value)
                }
                placeholder="Enter rejection reason..."
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-red-500"
              />

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => {
                    setRejectReason("");
                    setShowRejectModal(false);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  disabled={
                    processing ||
                    rejectReason.trim() === ""
                  }
                  onClick={() =>
                    updateStatus(
                      selectedStudent.id,
                      "Rejected",
                      rejectReason
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                >
                  {processing
                    ? "Rejecting..."
                    : "Reject Student"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://800junkuae.online/tsh-api/API";

export default function IslamicEnrollment() {

  const navigate = useNavigate();

  /* =========================================
     Loading
  ========================================= */

  const [loading, setLoading] = useState(false);

  /* =========================================
     Lists
  ========================================= */

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  /* =========================================
     Course Fee
  ========================================= */

  const [courseFee, setCourseFee] = useState(0);
  const [remainingFee, setRemainingFee] = useState(0);

  /* =========================================
     Image Preview
  ========================================= */

  const [profilePreview, setProfilePreview] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState(null);

  /* =========================================
     File Names
  ========================================= */

  const [profileName, setProfileName] = useState("");
  const [cnicFrontName, setCnicFrontName] = useState("");
  const [cnicBackName, setCnicBackName] = useState("");
  const [educationDocName, setEducationDocName] = useState("");
  const [paymentName, setPaymentName] = useState("");

  /* =========================================
     Form State
  ========================================= */

  const [form, setForm] = useState({

    full_name: "",
    father_name: "",
    email: "",
    phone: "",
    whatsapp: "",

    dob: "",
    gender: "",

    address: "",
    city: "",
    country: "Pakistan",

    education: "",
    previous_education: "",

    cnic: "",

    hafiz: "",
    prayer: "",

    experience: "",
    computer_knowledge: "",

    course: "",
    teacher: "",
    batch: "",

    timing: "",
    notes: "",

    paid_amount: "",
    payment_method: "JazzCash",
    transaction_id: "",
    payment_details: ""

  });

  /* =========================================
     Language
  ========================================= */

  const lang =
    localStorage.getItem("lang") || "en";
    /* =========================================
   Handle Change
========================================= */

const handleChange = (e) => {

  const { name, value } = e.target;

  setForm((prev) => ({

    ...prev,

    [name]: value,

  }));

};
/* =========================================
   Preview Image
========================================= */

const previewImage = (file, type) => {

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {

    if (type === "profile") {

      setProfilePreview(e.target.result);
      setProfileName(file.name);

    }

    if (type === "payment") {

      setPaymentPreview(e.target.result);
      setPaymentName(file.name);

    }

  };

  reader.readAsDataURL(file);

};
/* =========================================
   Remaining Fee
========================================= */

useEffect(() => {

  const paid = Number(form.paid_amount) || 0;

  const remain = Number(courseFee) - paid;

  setRemainingFee(remain > 0 ? remain : 0);

}, [form.paid_amount, courseFee]);
/* =========================================
   Fetch Teachers
========================================= */

const fetchCourseAndTeachers = async () => {
  try {
    const res = await axios.get(
      "https://800junkuae.online/tsh-api/API/islamic/get-data.php"
    );

    setCourses(res.data.courses || []);
    setTeachers(res.data.teachers || []);

  } catch (err) {
    console.log(err);
  }
};


/* =========================================
   Fetch Batches
========================================= */

const fetchBatches = async () => {

  try {

    const res = await axios.get(
      `${API}/islamic/get-batches.php`
    );

    if (res.data.success) {

      setBatches(res.data.batches || []);

    }

  } catch (err) {

    console.log(err);

  }

};
useEffect(() => {
  fetchCourseAndTeachers();
  fetchBatches();
}, []);
/* =========================================
   Initial Load
========================================= */
useEffect(() => {
  if (selectedCourse) {
    setForm((prev) => ({
      ...prev,
      teacher: selectedCourse.teacher_id,
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      teacher: "",
    }));
  }
}, [form.course, courses]);
const selectedCourse = courses.find(
  (course) => Number(course.id) === Number(form.course)
);

const filteredTeachers = selectedCourse
  ? teachers.filter(
      (teacher) => Number(teacher.id) === Number(selectedCourse.teacher_id)
    )
  : [];
/* =========================================
   Auto Course Fee
========================================= */

useEffect(() => {

  if (!form.course) {

    setCourseFee(0);

    return;

  }

  const selectedCourse = courses.find(

    (course) => Number(course.id) === Number(form.course)

  );

  if (selectedCourse) {

    setCourseFee(Number(selectedCourse.fee));

  }

}, [form.course, courses]);
/* =========================================
   Remaining Fee
========================================= */

useEffect(() => {

  const fee = Number(courseFee) || 0;

  const paid = Number(form.paid_amount) || 0;

  setRemainingFee(

    Math.max(fee - paid, 0)

  );

}, [courseFee, form.paid_amount]);
/* =========================================
   Copy Text
========================================= */

const copyText = (text) => {

  navigator.clipboard.writeText(text);

  alert("Copied Successfully");

};
/* =========================================
   Reset Form
========================================= */


/* =========================================
   Reset Form
========================================= */

const resetForm = () => {

  setForm({

    full_name: "",
    father_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    country: "Pakistan",
    education: "",
    previous_education: "",
    cnic: "",
    hafiz: "",
    prayer: "",
    experience: "",
    computer_knowledge: "",
    course: "",
    teacher: "",
    batch: "",
    timing: "",
    notes: "",
    paid_amount: "",
    payment_method: "JazzCash",
    transaction_id: "",
    payment_details: ""

  });

  setProfilePreview(null);
  setPaymentPreview(null);

  setProfileName("");
  setCnicFrontName("");
  setCnicBackName("");
  setEducationDocName("");
  setPaymentName("");

  setCourseFee(0);
  setRemainingFee(0);

};
const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append("user_id", localStorage.getItem("user_id"));

    formData.append("full_name", form.full_name);
    formData.append("father_name", form.father_name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("whatsapp", form.whatsapp);
    formData.append("dob", form.dob);
    formData.append("gender", form.gender);

    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("country", form.country);

    formData.append("education", form.education);
    formData.append("previous_education", form.previous_education);

    formData.append("cnic", form.cnic);

    formData.append("hafiz", form.hafiz);
    formData.append("prayer", form.prayer);

    formData.append("experience", form.experience);
    formData.append("computer_knowledge", form.computer_knowledge);

    formData.append("course_id", form.course);
    formData.append("teacher_id", form.teacher);
    formData.append("batch_id", form.batch);

    formData.append("timing", form.timing);
    formData.append("notes", form.notes);

    formData.append("paid_amount", form.paid_amount);
    formData.append("payment_method", form.payment_method);
    formData.append("transaction_id", form.transaction_id);
    formData.append("payment_details", form.payment_details);

    formData.append("category", "islamic");

    if (e.target.profile_image.files[0]) {
      formData.append("profile_image", e.target.profile_image.files[0]);
    }

    if (e.target.cnic_front.files[0]) {
      formData.append("cnic_front", e.target.cnic_front.files[0]);
    }

    if (e.target.cnic_back.files[0]) {
      formData.append("cnic_back", e.target.cnic_back.files[0]);
    }

    if (e.target.education_doc.files[0]) {
      formData.append("education_doc", e.target.education_doc.files[0]);
    }

    if (e.target.payment_screenshot.files[0]) {
      formData.append("payment_screenshot", e.target.payment_screenshot.files[0]);
    }

    const res = await axios.post(
      `${API}/islamic/enrollment.php`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {

      alert(res.data.message);

      resetForm();

      navigate("/student/pending-approval");

    } else {

      alert(res.data.message);

    }

  } catch (err) {

    console.log(err);

    if (err.response?.data?.message) {

      alert(err.response.data.message);

    } else {

      alert("Server Error");

    }

  } finally {

    setLoading(false);

  }

};
/* =========================================
   RETURN
========================================= */

return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-12 px-4">

<div className="max-w-7xl mx-auto">

{/* =========================================
    HEADER
========================================= */}

<div className="bg-white rounded-3xl shadow-xl border border-green-100 p-10 mb-10">

<div className="flex flex-col lg:flex-row items-center justify-between gap-8">

<div>

<h1 className="text-4xl font-extrabold text-green-700">

Islamic Admission Form

</h1>

<p className="text-gray-600 mt-3 text-lg">

Please complete all required information before submitting your admission.

</p>

</div>

<div className="hidden lg:block">

<div className="w-36 h-36 rounded-full bg-green-100 flex items-center justify-center text-7xl">

📖

</div>

</div>

</div>

</div>

{/* =========================================
    FORM
========================================= */}

<form

onSubmit={handleSubmit}

encType="multipart/form-data"

className="space-y-10"

>

{/* =========================================
    PERSONAL INFORMATION
========================================= */}

<div className="bg-white rounded-3xl shadow-xl p-8 border">

<h2 className="text-3xl font-bold text-green-700 mb-8">

Personal Information

</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* Full Name */}

<div>

<label className="block font-semibold mb-2">

Full Name

</label>

<input

type="text"

name="full_name"

value={form.full_name}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* Father Name */}

<div>

<label className="block font-semibold mb-2">

Father Name

</label>

<input

type="text"

name="father_name"

value={form.father_name}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* Email */}

<div>

<label className="block font-semibold mb-2">

Email

</label>

<input

type="email"

name="email"

value={form.email}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* Phone */}

<div>

<label className="block font-semibold mb-2">

Phone Number

</label>

<input

type="text"

name="phone"

value={form.phone}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* WhatsApp */}

<div>

<label className="block font-semibold mb-2">

WhatsApp Number

</label>

<input

type="text"

name="whatsapp"

value={form.whatsapp}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* DOB */}

<div>

<label className="block font-semibold mb-2">

Date of Birth

</label>

<input

type="date"

name="dob"

value={form.dob}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"

/>

</div>

{/* Gender */}

<div>

<label className="block font-semibold mb-2">

Gender

</label>

<select

name="gender"

value={form.gender}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3"

>

<option value="">Select Gender</option>

<option value="Male">Male</option>

<option value="Female">Female</option>

</select>

</div>

{/* CNIC */}

<div>

<label className="block font-semibold mb-2">

CNIC

</label>

<input

type="text"

name="cnic"

value={form.cnic}

onChange={handleChange}

required

placeholder="35202-1234567-1"

className="w-full border rounded-xl px-4 py-3"

/>

</div>

{/* Education */}

<div>

<label className="block font-semibold mb-2">

Education

</label>

<input

type="text"

name="education"

value={form.education}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3"

/>

</div>

</div>

</div>
{/* =========================================
    ADDRESS & ISLAMIC INFORMATION
========================================= */}

<div className="bg-white rounded-3xl shadow-xl p-8 border">

  <h2 className="text-3xl font-bold text-green-700 mb-8">

    Address & Islamic Information

  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Address */}

    <div className="md:col-span-2">

      <label className="block font-semibold mb-2">

        Address

      </label>

      <textarea
        name="address"
        rows={4}
        value={form.address}
        onChange={handleChange}
        required
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* City */}

    <div>

      <label className="block font-semibold mb-2">

        City

      </label>

      <input
        type="text"
        name="city"
        value={form.city}
        onChange={handleChange}
        required
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* Country */}

    <div>

      <label className="block font-semibold mb-2">

        Country

      </label>

      <input
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* Previous Education */}

    <div>

      <label className="block font-semibold mb-2">

        Previous Education

      </label>

      <input
        type="text"
        name="previous_education"
        value={form.previous_education}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* Hafiz */}

    <div>

      <label className="block font-semibold mb-2">

        Hafiz-e-Quran

      </label>

      <select
        name="hafiz"
        value={form.hafiz}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      >

        <option value="">Select</option>

        <option value="Yes">

          Yes

        </option>

        <option value="No">

          No

        </option>

      </select>

    </div>

    {/* Prayer */}

    <div>

      <label className="block font-semibold mb-2">

        Offer 5 Daily Prayers?

      </label>

      <select
        name="prayer"
        value={form.prayer}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      >

        <option value="">Select</option>

        <option value="Yes">

          Yes

        </option>

        <option value="No">

          No

        </option>

      </select>

    </div>

    {/* Experience */}

    <div>

      <label className="block font-semibold mb-2">

        Experience

      </label>

      <input
        type="text"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Teaching / Islamic Experience"
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* Computer Knowledge */}

    <div>

      <label className="block font-semibold mb-2">

        Computer Knowledge

      </label>

      <select
        name="computer_knowledge"
        value={form.computer_knowledge}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      >

        <option value="">Select</option>

        <option value="Basic">

          Basic

        </option>

        <option value="Intermediate">

          Intermediate

        </option>

        <option value="Advanced">

          Advanced

        </option>

      </select>

    </div>

  </div>

</div>

{/* =========================================
    COURSE INFORMATION
========================================= */}

<div className="bg-white rounded-3xl shadow-xl p-8 border">

  <h2 className="text-3xl font-bold text-green-700 mb-8">

    Course Information

  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

    {/* Course */}

    <div>

      <label className="block font-semibold mb-2">

        Course

      </label>

      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        required
        className="w-full border rounded-xl px-4 py-3"
      >

        <option value="">

          Select Course

        </option>

        {courses.map((course) => (

          <option
            key={course.id}
            value={course.id}
          >

            {course.title} - Rs. {course.fee}

          </option>

        ))}

      </select>

    </div>

    {/* Teacher */}

    <div>

      <label className="block font-semibold mb-2">

        Teacher

      </label>

      <select
        name="teacher"
        value={form.teacher}
        onChange={handleChange}
        required
        className="w-full border rounded-xl px-4 py-3"
      >

        <option value="">

          Select Teacher

        </option>

        {filteredTeachers.map((teacher) => (
  <option key={teacher.id} value={teacher.id}>
    {teacher.name}
  </option>
))}

      

      </select>

    </div>

    {/* Batch */}

    {/* <div>

      <label className="block font-semibold mb-2">

        Batch

      </label>

      <select
        name="batch"
        value={form.batch}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
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

    </div> */}

    {/* Timing */}

    <div>

      <label className="block font-semibold mb-2">

        Preferred Timing

      </label>

      <input
        type="text"
        name="timing"
        value={form.timing}
        onChange={handleChange}
        placeholder="Morning / Evening"
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>

    {/* Notes */}

    <div className="md:col-span-2">

      <label className="block font-semibold mb-2">

        Additional Notes

      </label>

      <textarea
        rows={4}
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
        placeholder="Any additional information..."
      />

    </div>

  </div>

</div>
{/* =========================================
    DOCUMENTS
========================================= */}

<div className="bg-white rounded-3xl shadow-xl border p-8">

  <h2 className="text-3xl font-bold text-green-700 mb-8">

    Documents Upload

  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* =========================================
        PROFILE PICTURE
    ========================================= */}

    <div className="border-2 border-dashed border-green-300 rounded-3xl p-6 bg-green-50">

      <label className="block text-lg font-bold mb-5">

        Profile Picture

      </label>

      <div className="flex justify-center mb-6">

        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-600 bg-white">

          {profilePreview ? (

            <img
              src={profilePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">

              👤

            </div>

          )}

        </div>

      </div>

      <input
        type="file"
        name="profile_image"
        accept="image/*"
        required
        className="w-full
        file:bg-green-700
        file:text-white
        file:px-5
        file:py-3
        file:border-0
        file:rounded-xl
        file:cursor-pointer"
        onChange={(e) => {

          const file = e.target.files[0];

          if (file) {

            previewImage(file, "profile");

          }

        }}
      />

      {profileName && (

        <div className="mt-5 bg-green-100 rounded-xl p-3">

          <p className="font-semibold text-green-700">

            📄 {profileName}

          </p>

        </div>

      )}

    </div>

    {/* =========================================
        CNIC FRONT
    ========================================= */}

    <div className="border-2 border-dashed border-blue-300 rounded-3xl p-6 bg-blue-50">

      <label className="block text-lg font-bold mb-5">

        CNIC Front

      </label>

      <input
        type="file"
        name="cnic_front"
        accept="image/*,.pdf"
        required
        className="w-full
        file:bg-blue-700
        file:text-white
        file:px-5
        file:py-3
        file:border-0
        file:rounded-xl"
        onChange={(e)=>{

          const file=e.target.files[0];

          if(file){

            setCnicFrontName(file.name);

          }

        }}
      />

      {cnicFrontName && (

        <div className="mt-5 bg-blue-100 rounded-xl p-3">

          <p className="font-semibold text-blue-700">

            📄 {cnicFrontName}

          </p>

        </div>

      )}

    </div>

    {/* =========================================
        CNIC BACK
    ========================================= */}

    <div className="border-2 border-dashed border-purple-300 rounded-3xl p-6 bg-purple-50">

      <label className="block text-lg font-bold mb-5">

        CNIC Back

      </label>

      <input
        type="file"
        name="cnic_back"
        accept="image/*,.pdf"
        required
        className="w-full
        file:bg-purple-700
        file:text-white
        file:px-5
        file:py-3
        file:border-0
        file:rounded-xl"
        onChange={(e)=>{

          const file=e.target.files[0];

          if(file){

            setCnicBackName(file.name);

          }

        }}
      />

      {cnicBackName && (

        <div className="mt-5 bg-purple-100 rounded-xl p-3">

          <p className="font-semibold text-purple-700">

            📄 {cnicBackName}

          </p>

        </div>

      )}

    </div>

    {/* =========================================
        EDUCATION DOCUMENT
    ========================================= */}

    <div className="border-2 border-dashed border-yellow-300 rounded-3xl p-6 bg-yellow-50">

      <label className="block text-lg font-bold mb-5">

        Education Document

      </label>

      <input
        type="file"
        name="education_doc"
        accept="image/*,.pdf"
        required
        className="w-full
        file:bg-yellow-600
        file:text-white
        file:px-5
        file:py-3
        file:border-0
        file:rounded-xl"
        onChange={(e)=>{

          const file=e.target.files[0];

          if(file){

            setEducationDocName(file.name);

          }

        }}
      />

      {educationDocName && (

        <div className="mt-5 bg-yellow-100 rounded-xl p-3">

          <p className="font-semibold text-yellow-700">

            📄 {educationDocName}

          </p>

        </div>

      )}

    </div>

  </div>

</div>
{/* =========================================
    PAYMENT INFORMATION
========================================= */}

<div className="bg-white rounded-3xl shadow-xl border p-8">

  <h2 className="text-3xl font-bold text-green-700 mb-8">

    💳 Payment Information

  </h2>

  {/* Payment Cards */}

  <div className="grid lg:grid-cols-3 gap-6 mb-10">

    {/* JazzCash */}

    <div className="rounded-3xl border-2 border-red-200 bg-red-50 p-6 shadow hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-2xl font-bold text-red-600">
          JazzCash
        </h3>

        <button
          type="button"
          onClick={() => copyText("03097667058")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-500">
        Account Title
      </p>

      <h3 className="font-bold text-xl mb-5">
        Shahbaz Ahmad
      </h3>

      <p className="text-gray-500">
        Mobile Number
      </p>

      <h2 className="text-3xl font-bold">
        03097667058
      </h2>

    </div>

    {/* EasyPaisa */}

    <div className="rounded-3xl border-2 border-green-200 bg-green-50 p-6 shadow hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-2xl font-bold text-green-700">
          EasyPaisa
        </h3>

        <button
          type="button"
          onClick={() => copyText("03331627058")}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-500">
        Account Title
      </p>

      <h3 className="font-bold text-xl mb-5">
        Shahbaz Ahmad
      </h3>

      <p className="text-gray-500">
        Mobile Number
      </p>

      <h2 className="text-3xl font-bold">
        03331627058
      </h2>

    </div>

    {/* Bank */}

    <div className="rounded-3xl border-2 border-blue-200 bg-blue-50 p-6 shadow hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-2xl font-bold text-blue-700">
          Bank of Punjab
        </h3>

        <button
          type="button"
          onClick={() => copyText("6020224441600010")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-500">
        Account Title
      </p>

      <h3 className="font-bold text-xl mb-5">
        Shahbaz Ahmad
      </h3>

      <p className="text-gray-500">
        Account Number
      </p>

      <h3 className="font-bold break-all">
        6020224441600010
      </h3>

    </div>

  </div>

  {/* Payment Form */}

  <div className="grid lg:grid-cols-2 gap-10">

    {/* Left */}

    <div className="space-y-6">

      <div>

        <label className="font-semibold">

          Paid Amount

        </label>

        <input
          type="number"
          name="paid_amount"
          value={form.paid_amount}
          onChange={handleChange}
          required
          className="w-full border rounded-xl px-4 py-3 mt-2"
        />

      </div>

      <div>

        <label className="font-semibold">

          Payment Method

        </label>

        <select
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
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

        <label className="font-semibold">

          Transaction ID

        </label>

        <input
          type="text"
          name="transaction_id"
          value={form.transaction_id}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
        />

      </div>

      <div>

        <label className="font-semibold">

          Payment Details

        </label>

        <textarea
          rows={5}
          name="payment_details"
          value={form.payment_details}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
        />

      </div>

    </div>
        {/* Right Side */}

    <div>

      <label className="font-semibold block mb-3">

        Payment Screenshot

      </label>

      <div className="border-2 border-dashed border-green-300 rounded-3xl p-6 bg-green-50">

        {paymentPreview ? (

          <img
            src={paymentPreview}
            alt="Payment"
            className="w-full h-64 object-contain rounded-2xl"
          />

        ) : (

          <div className="h-64 flex items-center justify-center text-gray-400 text-lg">

            Upload Payment Screenshot

          </div>

        )}

        <input
          type="file"
          name="payment_screenshot"
          accept="image/*"
          required
          className="mt-6 w-full
          file:bg-green-700
          file:text-white
          file:px-5
          file:py-3
          file:border-0
          file:rounded-xl
          file:cursor-pointer"
          onChange={(e) => {

            const file = e.target.files[0];

            if (file) {

              previewImage(file, "payment");

            }

          }}
        />

        {paymentName && (

          <div className="mt-5 bg-green-100 rounded-xl p-3">

            <p className="font-semibold text-green-700 break-all">

              📄 {paymentName}

            </p>

          </div>

        )}

      </div>

      {/* Fee Summary */}

      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-3xl p-8 mt-8">

        <h3 className="text-2xl font-bold text-green-700 mb-6">

          Fee Summary

        </h3>

        <div className="flex justify-between mb-4">

          <span className="text-gray-600">

            Course Fee

          </span>

          <strong className="text-lg">

            Rs. {Number(courseFee).toLocaleString()}

          </strong>

        </div>

        <div className="flex justify-between mb-4">

          <span className="text-gray-600">

            Paid Amount

          </span>

          <strong className="text-blue-700 text-lg">

            Rs. {(Number(form.paid_amount) || 0).toLocaleString()}

          </strong>

        </div>

        <div className="border-t border-green-300 pt-5 flex justify-between">

          <span className="text-xl font-bold text-red-600">

            Remaining Fee

          </span>

          <span className="text-2xl font-bold text-red-600">

            Rs. {Number(remainingFee).toLocaleString()}

          </span>

        </div>

      </div>

    </div>

  </div>

</div>

{/* =========================================
    SUBMIT
========================================= */}

<div className="bg-white rounded-3xl shadow-xl border p-8">

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r
    from-green-700
    to-green-600
    hover:from-green-800
    hover:to-green-700
    text-white
    py-5
    rounded-2xl
    text-xl
    font-bold
    transition
    disabled:opacity-50"
  >

    {loading ? (

      <span className="flex items-center justify-center gap-3">

        <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>

        Submitting Admission...

      </span>

    ) : (

      "Submit Admission"

    )}

  </button>

</div>

</form>

</div>

</div>

);
}


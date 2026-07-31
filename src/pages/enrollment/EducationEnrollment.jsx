import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { User, GraduationCap, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API = "https://800junkuae.online/tsh-api/API";
const EducationEnrollment = () => {

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  const [trainers, setTrainers] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courseFee, setCourseFee] = useState(0);

  const [paidAmount, setPaidAmount] = useState(0);

  const [profilePreview, setProfilePreview] = useState("");

  const [certificatePreview, setCertificatePreview] = useState("");

  const [paymentPreview, setPaymentPreview] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const [form, setForm] = useState({

    full_name: "",

    father_name: "",

    email: "",

    phone: "",

    whatsapp: "",

    dob: "",

    gender: "",

    cnic: "",

    address: "",

    city: "",

    country: "Pakistan",

    education: "",

    trainer_id: "",

    course_id: "",

    timing: "",

    paid_amount: "",

    payment_method: "JazzCash",

    transaction_id: "",

    payment_details: ""

  });

  /*
  |--------------------------------------------------------------------------
  | Remaining Fee
  |--------------------------------------------------------------------------
  */

  const remainingFee = useMemo(() => {

  const fee = Number(courseFee) || 0;
  const paid = Number(form.paid_amount) || 0;

  return Math.max(0, fee - paid);

}, [courseFee, form.paid_amount]);
  /*
  |--------------------------------------------------------------------------
  | Handle Input
  |--------------------------------------------------------------------------
  */

const handleChange = (e) => {

  const { name, value } = e.target;

  if (name === "paid_amount") {

    setForm((prev) => ({
      ...prev,
      paid_amount: value,
    }));

    return;
  }

  if (name === "trainer_id") {

    setForm((prev) => ({
      ...prev,
      trainer_id: value,
      course_id: "",
    }));

    setSelectedCourse(null);
    setCourseFee(0);

    return;
  }

  if (name === "course_id") {

    const course = courses.find(
      (c) => String(c.id) === String(value)
    );

    if (course) {

      setSelectedCourse(course);

      setCourseFee(Number(course.fee));

      setForm((prev) => ({
        ...prev,
        trainer_id: course.trainer_id,
        course_id: value,
      }));

    }

    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

};

   

    
  /*
  |--------------------------------------------------------------------------
  | Image Preview
  |--------------------------------------------------------------------------
  */

  const previewImage = (file, type) => {

    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "profile") {

      setProfilePreview(url);

    }

    if (type === "certificate") {

      setCertificatePreview(url);

    }

    if (type === "payment") {

      setPaymentPreview(url);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | Load Courses & Trainers
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

  try {

    setLoading(true);

    const res = await axios.get(
      `${API}/digital_courses/get-courses.php`
    );

    if (res.data.success) {

      // API returns "data"
      setCourses(res.data.data || []);

      // Build trainer list from courses
      const uniqueTrainers = [];

      const ids = new Set();

      res.data.data.forEach((course) => {

        if (!ids.has(course.trainer_id)) {

          ids.add(course.trainer_id);

          uniqueTrainers.push({
            id: course.trainer_id,
            name: course.trainer_name,
          });

        }

      });

      setTrainers(uniqueTrainers);

    }

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }

};

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

 /*
|--------------------------------------------------------------------------
| Submit Admission
|--------------------------------------------------------------------------
*/

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const formData = new FormData();

    /* Personal Information */
/* Logged In User */

formData.append(
  "user_id",
  localStorage.getItem("user_id")
);
    formData.append("full_name", form.full_name);
    formData.append("father_name", form.father_name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("whatsapp", form.whatsapp);
    formData.append("dob", form.dob);
    formData.append("gender", form.gender);
    formData.append("cnic", form.cnic);
    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("country", form.country);

    /* Education */

    formData.append("education", form.education);
    formData.append(
      "student_status",
      form.student_status || ""
    );
    formData.append(
      "institute",
      form.institute || ""
    );
    formData.append(
      "passing_year",
      form.passing_year || ""
    );

    /* Course */

    formData.append("trainer_id", form.trainer_id);
    formData.append("course_id", form.course_id);
    formData.append("timing", form.timing);

    /* Payment */

    formData.append("paid_amount", form.paid_amount);
    formData.append(
      "payment_method",
      form.payment_method
    );
    formData.append(
      "transaction_id",
      form.transaction_id
    );
    formData.append(
      "payment_details",
      form.payment_details
    );

    /* Files */

    const profileFile =
      document.querySelector(
        'input[name="profile_image"]'
      )?.files[0];

    if (profileFile) {

      formData.append(
        "profile_image",
        profileFile
      );

    }

    const certificateFile =
      document.querySelector(
        'input[name="education_doc"]'
      )?.files[0];

    if (certificateFile) {

      formData.append(
        "education_doc",
        certificateFile
      );

    }

    const paymentFile =
      document.querySelector(
        'input[name="payment_screenshot"]'
      )?.files[0];

    if (paymentFile) {

      formData.append(
        "payment_screenshot",
        paymentFile
      );

    }

    const res = await axios.post(

      `${API}/digital/enrollment.php`,

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

    if (res.data.success) {

  alert(res.data.message);

 navigate("/digital-student/pending-approval");

} else {

  alert(res.data.message);

}

  } catch (err) {

    console.log(err);

    alert("Something went wrong.");

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-10">

          <h1 className="text-4xl font-bold">

            Digital Skills Admission Form

          </h1>

          <p className="mt-2 text-blue-100">

            Fill your information carefully before submitting your application.

          </p>

        </div>

        {/* Progress */}

        <div className="grid grid-cols-4 gap-4 p-8">

          <div className="bg-blue-50 rounded-xl p-5 text-center">

            <User className="mx-auto mb-2 text-blue-700"/>

            <p className="font-semibold">

              Personal

            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5 text-center">

            <GraduationCap className="mx-auto mb-2 text-green-700"/>

            <p className="font-semibold">

              Education

            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5 text-center">

            <GraduationCap className="mx-auto mb-2 text-purple-700"/>

            <p className="font-semibold">

              Course

            </p>

          </div>

          <div className="bg-yellow-50 rounded-xl p-5 text-center">

            <CreditCard className="mx-auto mb-2 text-yellow-700"/>

            <p className="font-semibold">

              Payment

            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-10"
        >

        {/* =======================================================
    PERSONAL INFORMATION
======================================================= */}

<div className="border rounded-2xl p-8">

  <h2 className="text-2xl font-bold text-blue-700 mb-8">

    Personal Information

  </h2>

  <div className="grid lg:grid-cols-4 gap-8">

    {/* Profile Picture */}

    <div className="lg:col-span-1">

      <label className="font-semibold block mb-3">

        Profile Picture

      </label>

      <div className="border-2 border-dashed rounded-xl p-5 text-center">

        <img

          src={
            profilePreview
              ? profilePreview
              : "https://ui-avatars.com/api/?name=Student"
          }

          alt="Profile"

          className="w-40 h-40 rounded-full object-cover mx-auto border"

        />

        <input

          type="file"

          name="profile_image"

          accept="image/*"

          className="mt-5 w-full"

          onChange={(e) =>
            previewImage(
              e.target.files[0],
              "profile"
            )
          }

        />

      </div>

    </div>

    {/* Personal Fields */}

    <div className="lg:col-span-3">

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}

        <div>

          <label className="font-semibold">

            Full Name

          </label>

          <input

            type="text"

            name="full_name"

            value={form.full_name}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

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

            value={form.father_name}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

        {/* Email */}

        <div>

          <label className="font-semibold">

            Email Address

          </label>

          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

        {/* Phone */}

        <div>

          <label className="font-semibold">

            Phone Number

          </label>

          <input

            type="text"

            name="phone"

            value={form.phone}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

        {/* WhatsApp */}

        <div>

          <label className="font-semibold">

            WhatsApp Number

          </label>

          <input

            type="text"

            name="whatsapp"

            value={form.whatsapp}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

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

            value={form.dob}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

        {/* Gender */}

        <div>

          <label className="font-semibold">

            Gender

          </label>

          <select

            name="gender"

            value={form.gender}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          >

            <option value="">

              Select Gender

            </option>

            <option value="Male">

              Male

            </option>

            <option value="Female">

              Female

            </option>

          </select>

        </div>

        {/* CNIC */}

        <div>

          <label className="font-semibold">

            CNIC Number

          </label>

          <input

            type="text"

            name="cnic"

            placeholder="35202-1234567-1"

            value={form.cnic}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

      </div>

      {/* Address */}

      <div className="mt-6">

        <label className="font-semibold">

          Complete Address

        </label>

        <textarea

          rows={3}

          name="address"

          value={form.address}

          onChange={handleChange}

          className="w-full border rounded-lg px-4 py-3 mt-2"

          required

        />

      </div>

      {/* City / Country */}

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>

          <label className="font-semibold">

            City

          </label>

          <input

            type="text"

            name="city"

            value={form.city}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          />

        </div>

        <div>

          <label className="font-semibold">

            Country

          </label>

          <input

            type="text"

            name="country"

            value={form.country}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

          />

        </div>

      </div>

    </div>

  </div>

</div>
{/* =======================================================
    EDUCATION INFORMATION
======================================================= */}

<div className="border rounded-2xl p-8">

  <h2 className="text-2xl font-bold text-green-700 mb-8">

    Education Information

  </h2>

  <div className="grid lg:grid-cols-4 gap-8">

    {/* Certificate Upload */}

    <div className="lg:col-span-1">

      <label className="font-semibold block mb-3">

        Education Certificate

      </label>

      <div className="border-2 border-dashed rounded-xl p-5 text-center">

        {certificatePreview ? (

          <img
            src={certificatePreview}
            alt="Certificate"
            className="w-full h-52 object-contain rounded-lg"
          />

        ) : (

          <div className="h-52 flex items-center justify-center text-gray-400">

            Certificate Preview

          </div>

        )}

        <input

          type="file"

          name="education_doc"

          accept=".jpg,.jpeg,.png,.pdf"

          className="mt-5 w-full"

          onChange={(e) =>
            previewImage(
              e.target.files[0],
              "certificate"
            )
          }

        />

        <p className="text-xs text-gray-500 mt-2">

          Upload Matric, Intermediate or Graduation Certificate

        </p>

      </div>

    </div>

    {/* Education Fields */}

    <div className="lg:col-span-3">

      <div className="grid md:grid-cols-2 gap-6">

        {/* Highest Qualification */}

        <div>

          <label className="font-semibold">

            Highest Qualification

          </label>

          <select

            name="education"

            value={form.education}

            onChange={handleChange}

            className="w-full border rounded-lg px-4 py-3 mt-2"

            required

          >

            <option value="">

              Select Qualification

            </option>

            <option value="Matric">

              Matric

            </option>

            <option value="Intermediate">

              Intermediate

            </option>

            <option value="DAE">

              DAE

            </option>

            <option value="Bachelor">

              Bachelor

            </option>

            <option value="BS">

              BS

            </option>

            <option value="Master">

              Master

            </option>

            <option value="MS/MPhil">

              MS / MPhil

            </option>

            <option value="PhD">

              PhD

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </div>

        {/* Current Status */}

        <div>

          <label className="font-semibold">

            Current Status

          </label>

          <select

            name="student_status"

            className="w-full border rounded-lg px-4 py-3 mt-2"

          >

            <option>

              Student

            </option>

            <option>

              Fresh Graduate

            </option>

            <option>

              Job Holder

            </option>

            <option>

              Business Owner

            </option>

            <option>

              Freelancer

            </option>

            <option>

              Unemployed

            </option>

          </select>

        </div>

        {/* Institute */}

        <div>

          <label className="font-semibold">

            Institute / University

          </label>

          <input

            type="text"

            name="institute"

            placeholder="University / College Name"

            className="w-full border rounded-lg px-4 py-3 mt-2"

          />

        </div>

        {/* Passing Year */}

        <div>

          <label className="font-semibold">

            Passing Year

          </label>

          <input

            type="number"

            name="passing_year"

            placeholder="2026"

            className="w-full border rounded-lg px-4 py-3 mt-2"

          />

        </div>

      </div>

      {/* Information Card */}

      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5">

        <h3 className="font-bold text-green-700 mb-2">

          Required Documents

        </h3>

        <ul className="list-disc ml-6 text-gray-700 space-y-2">

          <li>Latest Educational Certificate</li>

          <li>Certificate should be clear and readable.</li>

          <li>Accepted formats: JPG, PNG or PDF.</li>

          <li>Maximum file size: 5 MB.</li>

        </ul>

      </div>

    </div>

  </div>

</div>
{/* =======================================================
    COURSE INFORMATION
======================================================= */}

<div className="border rounded-2xl p-8">

  <h2 className="text-2xl font-bold text-purple-700 mb-8">

    Course Information

  </h2>

  <div className="grid lg:grid-cols-2 gap-8">

    {/* Left */}

    <div>

      {/* Trainer */}

      <div className="mb-6">

        <label className="font-semibold block mb-2">

          Select Trainer

        </label>

        <select
          name="trainer_id"
          value={form.trainer_id}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        >

          <option value="">

            Choose Trainer

          </option>

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

      {/* Course */}

      <div className="mb-6">

        <label className="font-semibold block mb-2">

          Select Course

        </label>

        <select
  name="course_id"
  value={form.course_id}
  onChange={handleChange}
  className="w-full border rounded-xl px-4 py-3"
>

  <option value="">
    Choose Course
  </option>

  {courses
    .filter(
      (course) =>
        !form.trainer_id ||
        String(course.trainer_id) ===
          String(form.trainer_id)
    )
    .map((course) => (

      <option
        key={course.id}
        value={course.id}
      >
        {course.title}
      </option>

    ))}

</select>

      </div>

      {/* Timing */}

      <div>

        <label className="font-semibold block mb-2">

          Preferred Timing

        </label>

        <select
          name="timing"
          value={form.timing}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        >

          <option value="">

            Select Timing

          </option>

          <option value="Morning">

            Morning

          </option>

          <option value="Evening">

            Evening

          </option>

          <option value="Weekend">

            Weekend

          </option>

        </select>

      </div>

    </div>

    {/* Right */}

    <div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-8 shadow">

        <h3 className="text-2xl font-bold mb-6">

          Selected Course

        </h3>

        <div className="space-y-4">

          <div>

            <p className="text-sm opacity-80">

              Course Name

            </p>

            <h4 className="text-xl font-bold">

              {selectedCourse?.title || "-"}

            </h4>

          </div>

          <div>

            <p className="text-sm opacity-80">

              Duration

            </p>

            <h4 className="text-lg">

              {selectedCourse?.duration || "-"}

            </h4>

          </div>

          <div>

            <p className="text-sm opacity-80">

              Trainer

            </p>

            <h4 className="text-lg">

              {trainers.find(
                (t) =>
                  String(t.id) ===
                  String(form.trainer_id)
              )?.name || "-"}

            </h4>

          </div>

          <div className="pt-5 border-t border-white/20">

            <p className="text-sm opacity-80">

              Course Fee

            </p>

            <h2 className="text-4xl font-bold mt-2">

              Rs. {Number(courseFee).toLocaleString()}

            </h2>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="bg-blue-50 rounded-2xl mt-6 p-5">

        <h4 className="font-bold text-blue-700 mb-3">

          Admission Information

        </h4>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>Admission is confirmed after payment verification.</li>

          <li>Course fee is selected automatically.</li>

          <li>Trainer will contact you after approval.</li>

        </ul>

      </div>

    </div>

  </div>

</div>
{/* =======================================================
    PAYMENT INFORMATION
======================================================= */}

<div className="border rounded-2xl p-8">

  <h2 className="text-2xl font-bold text-yellow-700 mb-8">

    Payment Information

  </h2>

  {/* Payment Methods */}

  <div className="grid lg:grid-cols-3 gap-6 mb-10">

    {/* JazzCash */}

    <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold text-red-600">

          JazzCash

        </h3>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText("03097667058")}
          className="text-sm bg-red-100 px-3 py-1 rounded"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-600">Account Title</p>

      <p className="font-semibold text-lg">

        Shahbaz Ahmad

      </p>

      <p className="text-gray-600 mt-4">

        Mobile Number

      </p>

      <p className="text-2xl font-bold">

        03097667058

      </p>

    </div>

    {/* EasyPaisa */}

    <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold text-green-600">

          EasyPaisa

        </h3>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText("03331627058")}
          className="text-sm bg-green-100 px-3 py-1 rounded"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-600">

        Account Title

      </p>

      <p className="font-semibold text-lg">

        Shahbaz Ahmad

      </p>

      <p className="text-gray-600 mt-4">

        Mobile Number

      </p>

      <p className="text-2xl font-bold">

        03331627058

      </p>

    </div>

    {/* BOP */}

    <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold text-blue-600">

          Bank of Punjab

        </h3>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText("6020224441600010")}
          className="text-sm bg-blue-100 px-3 py-1 rounded"
        >
          Copy
        </button>

      </div>

      <p className="text-gray-600">

        Account Title

      </p>

      <p className="font-semibold text-lg">

        Shahbaz Ahmad

      </p>

      <p className="text-gray-600 mt-4">

        Account Number

      </p>

      <p className="text-lg font-bold break-all">

        6020224441600010

      </p>

    </div>

  </div>

  {/* Payment Form */}

  <div className="grid lg:grid-cols-2 gap-8">

    <div className="space-y-6">

      {/* Paid Amount */}

      <div>

        <label className="font-semibold">

          Paid Amount (PKR)

        </label>

        <input
          type="number"
          name="paid_amount"
          value={form.paid_amount}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
          placeholder="Enter Paid Amount"
          required
        />

      </div>

      {/* Payment Method */}

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

          <option>JazzCash</option>

          <option>EasyPaisa</option>

          <option>Bank Transfer</option>

          <option>Cash</option>

        </select>

      </div>

      {/* Transaction */}

      <div>

        <label className="font-semibold">

          Transaction ID / Reference

        </label>

        <input
          type="text"
          name="transaction_id"
          value={form.transaction_id}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
          placeholder="Transaction ID"
        />

      </div>

      {/* Details */}

      <div>

        <label className="font-semibold">

          Payment Details

        </label>

        <textarea
          rows={4}
          name="payment_details"
          value={form.payment_details}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mt-2"
          placeholder="Optional"
        />

      </div>

    </div>

    {/* Screenshot + Summary */}

    <div>

      <label className="font-semibold block mb-3">

        Payment Screenshot

      </label>

      <div className="border-2 border-dashed rounded-xl p-6 text-center">

        {paymentPreview ? (

          <img
            src={paymentPreview}
            alt="Payment"
            className="w-full h-64 object-contain rounded"
          />

        ) : (

          <div className="h-64 flex items-center justify-center text-gray-400">

            Upload Payment Screenshot

          </div>

        )}

        <input
          type="file"
          name="payment_screenshot"
          accept="image/*"
          className="mt-5 w-full"
          onChange={(e) =>
            previewImage(
              e.target.files[0],
              "payment"
            )
          }
        />

      </div>

      {/* Fee Summary */}

      <div className="bg-green-50 rounded-2xl p-6 mt-8">

        <h3 className="text-xl font-bold text-green-700 mb-5">

          Fee Summary

        </h3>

        <div className="flex justify-between mb-3">

          <span>Course Fee</span>

          <strong>

            Rs. {Number(courseFee).toLocaleString()}

          </strong>

        </div>

        <div className="flex justify-between mb-3">

          <span>Paid</span>

          <strong>

            Rs. {(Number(form.paid_amount) || 0).toLocaleString()}

          </strong>

        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold text-green-700">

          <span>Remaining</span>

          <span>

            Rs. {Number(remainingFee).toLocaleString()}

          </span>

        </div>

      </div>

    </div>
<div className="text-center pt-8">

  <button

    type="submit"

    disabled={loading}

    className="bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 rounded-xl font-bold text-lg"

  >

    {loading

      ? "Submitting..."

      : "Submit Admission"}

  </button>

</div>
  </div>

</div>

        </form>

      </div>

    </div>

  );

};

export default EducationEnrollment;
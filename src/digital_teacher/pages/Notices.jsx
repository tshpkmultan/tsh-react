import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBullhorn,
  FaPaperPlane,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Notices = () => {

  const API = "https://800junkuae.online/tsh-api/API";

 
const [trainer, setTrainer] = useState(null);
  const [batches, setBatches] = useState([]);

  const [students, setStudents] = useState([]);

  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    notice_type: "all",

    batch_id: "",

    student_id: "",

    title: "",

    description: ""

  });
  
const [editModal, setEditModal] = useState(false);

const [editNotice, setEditNotice] = useState({

    id: "",

    notice_type: "all",

    batch_id: "",

    student_id: "",

    title: "",

    description: ""

});

useEffect(() => {

    const loginData = JSON.parse(localStorage.getItem("trainer"));

    console.log("Teacher Login:", loginData);

    if (!loginData) return;

    setTrainer(loginData);

    // role_id is the teacher id
   const trainerId = Number(loginData.id);

console.log("Trainer ID:", trainerId);

if (!trainerId) {
    alert("Trainer ID not found");
    return;
}

    fetchBatches(trainerId);
fetchStudents(trainerId);
fetchNotices(trainerId);

}, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Batches
  |--------------------------------------------------------------------------
  */

 const fetchBatches = async (trainer_id) => {

    try {

        const res = await axios.get(
           `${API}/digital_notices/batches.php?trainer_id=${trainer_id}`
        );

        console.log("Batches API:", res.data);

        if (res.data.success) {

            setBatches(res.data.batches || []);

        }

    } catch (err) {

        console.log(err);

    }

};

  /*
  |--------------------------------------------------------------------------
  | Fetch Students
  |--------------------------------------------------------------------------
  */

 const fetchStudents = async (trainer_id) => {

    try {

        const res = await axios.get(
            `${API}/digital_notices/students.php?trainer_id=${trainer_id}`
        );

        console.log("Students API:", res.data);

        if (res.data.success) {

            setStudents(res.data.students || []);

        }

    } catch (err) {

        console.log(err);

    }

};

  /*
  |--------------------------------------------------------------------------
  | Fetch Notices
  |--------------------------------------------------------------------------
  */

  const fetchNotices = async (trainer_id) => {

    try {

      const res = await axios.get(

       `${API}/digital_notices/index.php?trainer_id=${trainer_id}`

      );

      if (res.data.success) {

        setNotices(res.data.notices);

      }

    } catch (err) {

      console.log(err);

    }

  };
  /*
|--------------------------------------------------------------------------
| Handle Input Change
|--------------------------------------------------------------------------
*/

const handleChange = (e) => {
    setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
};

/*
|--------------------------------------------------------------------------
| Create Notice
|--------------------------------------------------------------------------
*/

const createNotice = async (e) => {

    e.preventDefault();

    if (!trainer) {
        alert("Trainer not found.");
        return;
    }

    if (!form.title.trim()) {
        alert("Please enter notice title.");
        return;
    }

    if (!form.description.trim()) {
        alert("Please enter notice description.");
        return;
    }

    if (form.notice_type === "batch" && !form.batch_id) {
        alert("Please select batch.");
        return;
    }

    if (form.notice_type === "individual" && !form.student_id) {
        alert("Please select student.");
        return;
    }

    try {

        setLoading(true);

        // role_id is teacher id
        const trainerId = Number(trainer.id);

        const payload = {
    trainer_id: Number(trainer.id),
    notice_type: form.notice_type,
    batch_id: form.notice_type === "batch"
        ? Number(form.batch_id)
        : null,
    student_id: form.notice_type === "individual"
        ? Number(form.student_id)
        : null,
    title: form.title,
    description: form.description,
};

        console.log(payload);

        const res = await axios.post(

           `${API}/digital_notices/create.php`,

            payload

        );

        if (res.data.success) {

            alert(res.data.message);

            setForm({

                notice_type: "all",

                batch_id: "",

                student_id: "",

                title: "",

                description: ""

            });

            fetchNotices(trainerId);

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
const openEditModal = (notice) => {

    setEditNotice({

        id: notice.id,

        notice_type: notice.notice_type,

        batch_id: notice.batch_id || "",

        student_id: notice.student_id || "",

        title: notice.title,

        description: notice.description

    });

    setEditModal(true);

};
const updateNotice = async () => {

    try {

        const trainer = JSON.parse(localStorage.getItem("trainer"));

        const res = await axios.post(

           `${API}/digital_notices/update.php`,

            {

                ...editNotice,

                trainer_id: trainer.id

            }

        );

        alert(res.data.message);

        if (res.data.success) {

            setEditModal(false);

            fetchNotices(trainer.id);

        }

    } catch (error) {

        console.log(error);

        alert("Update failed");

    }

};
const deleteNotice = async (id) => {

    if (!window.confirm("Delete this notice?")) {

        return;

    }

    try {

        const trainer = JSON.parse(localStorage.getItem("trainer"));

        const res = await axios.post(

            `${API}/digital_notices/delete.php`,

            {

                id,

               trainer_id: trainer.id

            }

        );

        alert(res.data.message);

        if (res.data.success) {

            fetchNotices(trainer.id);

        }

    } catch (error) {

        console.log(error);

    }

};
return (

<div className="bg-[#F3F4F6] min-h-screen">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
<div className="max-w-7xl mx-auto p-4 md:p-8">

{/* Header */}

<div className="bg-[#082B3A] rounded-3xl shadow-lg overflow-hidden mb-8">

<div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8">

<div>

<div className="flex items-center gap-4">

<div className="bg-yellow-400 p-4 rounded-2xl">

<FaBullhorn className="text-[#082B3A] text-3xl"/>

</div>

<div>

<h1 className="text-white text-3xl md:text-4xl font-bold">

Post Notice

</h1>

<p className="text-gray-300 mt-2">

Broadcast announcements to your digital students.
</p>

</div>

</div>

</div>

<div className="hidden lg:block">

<div className="bg-white/10 px-8 py-6 rounded-2xl">

<h2 className="text-yellow-400 text-4xl font-bold">

{notices.length}

</h2>

<p className="text-white">

Total Notices

</p>

</div>

</div>

</div>

</div>

{/* Form */}

<form

onSubmit={createNotice}

className="bg-white rounded-3xl shadow-lg p-6 md:p-10"

>

<div className="grid lg:grid-cols-2 gap-8">

{/* Audience */}

<div>

<label className="block text-xl font-semibold text-[#082B3A] mb-3">

Target Audience

</label>

<select
    name="notice_type"
    value={form.notice_type}
    onChange={(e) => {
        setForm({
            ...form,
            notice_type: e.target.value,
            batch_id: "",
            student_id: "",
        });
    }}
    className="w-full border rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-yellow-400 outline-none"
>
    <option value="all">📢 All Students</option>
    <option value="batch">👥 Specific Batch</option>
    <option value="individual">👤 Individual Student</option>
</select>
</div>

{/* Batch */}

{/* Batch */}

{form.notice_type === "batch" && (
    <select
        name="batch_id"
        value={form.batch_id}
        onChange={handleChange}
        className="w-full border rounded-2xl px-5 py-4"
    >
        <option value="">Select Batch</option>

        {batches.map((batch) => (
            <option
                key={batch.id}
                value={batch.id}
            >
                {batch.batch_name}
            </option>
        ))}
    </select>
)}

{/* Student */}

{form.notice_type === "individual" && (
    <select
        name="student_id"
        value={form.student_id}
        onChange={handleChange}
        className="w-full border rounded-2xl px-5 py-4"
    >
        <option value="">Select Student</option>

        {students.map((student) => (
            <option
                key={student.user_id}
                value={student.user_id}
            >
                {student.full_name}
            </option>
        ))}
    </select>
)} 


        {/* Notice Title */}

        <div className="lg:col-span-2">

          <label className="block text-xl font-semibold text-[#082B3A] mb-3">

            Notice Title

          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Tomorrow class will start at 10:00 AM"
            className="w-full border rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-yellow-400"
          />

        </div>

        {/* Description */}

        <div className="lg:col-span-2">

          <label className="block text-xl font-semibold text-[#082B3A] mb-3">

            Notice Description

          </label>

          <textarea
            rows={8}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write complete notice here..."
            className="w-full border rounded-2xl px-5 py-4 text-lg outline-none resize-none focus:ring-2 focus:ring-yellow-400"
          />

        </div>

      </div>

      {/* Submit Button */}

      <div className="mt-10">

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-[#082B3A] font-bold text-xl md:text-2xl py-5 rounded-2xl flex justify-center items-center gap-4 transition"
        >

          {loading ? (

            <>

              <div className="w-6 h-6 border-4 border-[#082B3A] border-t-transparent rounded-full animate-spin"></div>

              Publishing Notice...

            </>

          ) : (

            <>

              <FaPaperPlane />

              Broadcast Notice

            </>

          )}

        </button>

      </div>

    </form>
          {/* Recent Notices */}

      <div className="mt-10 bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-[#082B3A] px-6 py-5 flex items-center justify-between">

          <h2 className="text-2xl md:text-3xl font-bold text-white">

            Recent Notices

          </h2>

          <span className="bg-yellow-400 text-[#082B3A] font-bold px-5 py-2 rounded-full">

            {notices.length}

          </span>

        </div>

        {/* Empty */}

        {notices.length === 0 ? (

          <div className="py-20 text-center">

            <FaBullhorn className="text-7xl text-gray-300 mx-auto mb-6" />

            <h3 className="text-3xl font-bold text-gray-500">

              No Notices Posted

            </h3>

            <p className="text-gray-400 mt-3">

              Your published notices will appear here.

            </p>

          </div>

        ) : (

          <div className="divide-y">

            {notices.map((notice) => (

              <div
                key={notice.id}
                className="p-6 hover:bg-gray-50 transition"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                  {/* Left */}

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-2xl font-bold text-[#082B3A]">

                        {notice.title}

                      </h3>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold

                        ${
                          notice.notice_type === "all"
                            ? "bg-blue-100 text-blue-700"
                            : notice.notice_type === "batch"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }

                        `}
                      >

                        {notice.notice_type === "all"
                          ? "All Students"
                          : notice.notice_type === "batch"
                          ? "Batch"
                          : "Individual"}

                      </span>

                    </div>

                    <p className="text-gray-600 mt-4 leading-8">

                      {notice.description}

                    </p>

                  </div>

                  {/* Right */}

                  <div className="lg:w-72">

                    <div className="bg-[#F8FAFC] rounded-2xl p-5 space-y-3">

                      <div>

                        <p className="text-sm text-gray-500">

                          Audience

                        </p>

                        <h4 className="font-bold text-[#082B3A]">

                          {notice.audience}

                        </h4>

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">

                          Digital Trainer

                        </p>

                        <h4 className="font-bold text-[#082B3A]">

                          {notice.trainer_name}

                        </h4>

                      </div>

                      <div>

                        <p className="text-sm text-gray-500">

                          Created

                        </p>

                        <h4 className="font-bold text-[#082B3A]">

                          {notice.created_at}

                        </h4>

                      </div>

                    </div>

                  </div>

                </div>
<div className="flex gap-3 mt-5">

<button
    onClick={() => {
        console.log(notice);
        openEditModal(notice);
    }}
    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
>
    Edit
</button>

<button

onClick={() => deleteNotice(notice.id)}

className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"

>

Delete

</button>

</div>
              </div>

            ))}

          </div>

        )}

      </div>
            {/* Footer */}

      <div className="mt-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Notices */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-[#082B3A]">

            <h3 className="text-gray-500 text-lg">

              Total Notices

            </h3>

            <h2 className="text-5xl font-bold text-[#082B3A] mt-4">

              {notices.length}

            </h2>

          </div>

          {/* Batch Notices */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-green-500">

            <h3 className="text-gray-500 text-lg">

              Batch Notices

            </h3>

            <h2 className="text-5xl font-bold text-green-600 mt-4">

              {

                notices.filter(

                  (item) => item.notice_type === "batch"

                ).length

              }

            </h2>

          </div>

          {/* Individual Notices */}

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-purple-500">

            <h3 className="text-gray-500 text-lg">

              Individual Notices

            </h3>

            <h2 className="text-5xl font-bold text-purple-600 mt-4">

              {

                notices.filter(

                  (item) => item.notice_type === "individual"

                ).length

              }

            </h2>

          </div>

        </div>

      </div>

    </div>
{editModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4 sm:px-8">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#082B3A]">
          Edit Notice
        </h2>

        <button
          onClick={() => setEditModal(false)}
          className="text-gray-500 hover:text-red-500 text-3xl leading-none"
        >
          &times;
        </button>

      </div>

      {/* Body */}
      <div className="p-5 sm:p-8 space-y-6">

        {/* Notice Title */}
        <div>

          <label className="block mb-2 font-semibold text-[#082B3A]">
            Notice Title
          </label>

          <input
            type="text"
            value={editNotice.title}
            onChange={(e) =>
              setEditNotice({
                ...editNotice,
                title: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-base sm:text-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Enter Notice Title"
          />

        </div>

        {/* Description */}
        <div>

          <label className="block mb-2 font-semibold text-[#082B3A]">
            Description
          </label>

          <textarea
            rows={6}
            value={editNotice.description}
            onChange={(e) =>
              setEditNotice({
                ...editNotice,
                description: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-base sm:text-lg resize-none focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Write your notice..."
          />

        </div>

      </div>

      {/* Footer */}
      <div className="border-t p-5 sm:p-6 flex flex-col sm:flex-row gap-3 justify-end">

        <button
          onClick={() => setEditModal(false)}
          className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Cancel
        </button>

        <button
          onClick={updateNotice}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Update Notice
        </button>

      </div>

    </div>

  </div>
)}
  </div>

);

};

export default Notices;
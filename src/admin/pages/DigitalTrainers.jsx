import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://800junkuae.online/tsh-api/API/digital_trainer";

export default function DigitalTrainers() {

  const [trainers, setTrainers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(false);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({

    id: "",

    name: "",

    email: "",

    phone: "",

    qualification: "",

    specialization: "",

    experience_years: ""

  });
  const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value

    });

};
const resetForm = () => {

    setFormData({

        id: "",

        name: "",

        email: "",

        phone: "",

        qualification: "",

        specialization: "",

        experience_years: ""

    });

    setImage(null);

    setEditing(false);

};
useEffect(() => {

    fetchTrainers();

}, []);
/* ==========================================
FETCH TRAINERS
========================================== */

const fetchTrainers = async () => {

  setLoading(true);

  try {

    const res = await axios.get(
      `${API}/get-trainers.php`
    );

    if (res.data.success) {

      setTrainers(res.data.trainers || []);

    } else {

      setTrainers([]);

    }

  } catch (error) {

    console.error(error);

    setTrainers([]);

  }

  setLoading(false);

};


/* ==========================================
SAVE TRAINER
========================================== */

const saveTrainer = async (e) => {

  e.preventDefault();

  try {

    const form = new FormData();

    form.append("id", formData.id);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("qualification", formData.qualification);
    form.append("specialization", formData.specialization);
    form.append("experience_years", formData.experience_years);

    if (image) {
      form.append("profile_image", image);
    }

    const url = editing
      ? `${API}/update-trainer.php`
      : `${API}/create-trainer.php`;

    const res = await axios.post(url, form);

    alert(res.data.message);

    if (res.data.success) {

      fetchTrainers();

      resetForm();

      setShowModal(false);

    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }

};


/* ==========================================
EDIT TRAINER
========================================== */

const editTrainer = (trainer) => {

  setEditing(true);

  setShowModal(true);

  setFormData({

    id: trainer.id,

    name: trainer.name,

    email: trainer.email,

    phone: trainer.phone,

    qualification: trainer.qualification,

    specialization: trainer.specialization,

    experience_years: trainer.experience_years

  });

};


/* ==========================================
DELETE TRAINER
========================================== */

const deleteTrainer = async (id) => {

    if (!window.confirm("Delete this trainer?")) return;

    try {

        const res = await axios.post(
            `${API}/delete-trainer.php`,
            { id }
        );

        alert(res.data.message);

        if (res.data.success) {
            fetchTrainers();
        }

    } catch (error) {
        console.log(error);
    }

};


/* ==========================================
SEARCH
========================================== */

const filteredTrainers = trainers.filter((trainer) =>

  trainer.name.toLowerCase().includes(search.toLowerCase()) ||

  trainer.email.toLowerCase().includes(search.toLowerCase()) ||

  trainer.phone.toLowerCase().includes(search.toLowerCase())

);
return (
  <div className="p-6 bg-gray-100 min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Digital Trainers
        </h1>

        <p className="text-gray-500">
          Manage all digital trainers
        </p>

      </div>

      <button
        onClick={() => {
          resetForm();
          setEditing(false);
          setShowModal(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
      >
        + Add Trainer
      </button>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-gray-500">
          Total Trainers
        </h2>

        <h1 className="text-4xl font-bold text-blue-600 mt-2">
          {trainers.length}
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-gray-500">
          Active Trainers
        </h2>

        <h1 className="text-4xl font-bold text-green-600 mt-2">
          {trainers.length}
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-gray-500">
          Experience
        </h2>

        <h1 className="text-4xl font-bold text-purple-600 mt-2">
          {trainers.reduce(
            (sum, item) =>
              sum + Number(item.experience_years || 0),
            0
          )}
        </h1>

      </div>

    </div>

    {/* SEARCH */}

    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <input
        type="text"
        placeholder="Search trainer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-4"
      />

    </div>

    {/* TABLE */}

    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4">Image</th>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Qualification</th>

            <th>Specialization</th>

            <th>Experience</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan="8"
                className="text-center p-10"
              >
                Loading...
              </td>

            </tr>

          ) : filteredTrainers.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                className="text-center p-10"
              >
                No Trainers Found
              </td>

            </tr>

          ) : (

            filteredTrainers.map((trainer) => (

              <tr
                key={trainer.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">

                  <img
                    src={
                      trainer.profile_image
                        ? `https://800junkuae.online/tsh-api/${trainer.profile_image}`
                        : "https://via.placeholder.com/60"
                    }
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />

                </td>

                <td>{trainer.name}</td>

                <td>{trainer.email}</td>

                <td>{trainer.phone}</td>

                <td>{trainer.qualification}</td>

                <td>{trainer.specialization}</td>

                <td>
                  {trainer.experience_years} Years
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() => editTrainer(trainer)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTrainer(trainer.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
    {/* ==========================================
ADD / EDIT MODAL
========================================== */}

{showModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold">

{editing ? "Update Trainer" : "Add Trainer"}

</h2>

<button

onClick={() => {

setShowModal(false);

resetForm();

}}

className="text-3xl"

>

×

</button>

</div>

<form
onSubmit={saveTrainer}
className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

{/* Name */}

<div>

<label className="font-semibold">
Trainer Name
</label>

<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

className="w-full border rounded-xl p-3 mt-2"

required

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

{/* Qualification */}

<div>

<label className="font-semibold">
Qualification
</label>

<input

type="text"

name="qualification"

value={formData.qualification}

onChange={handleChange}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

{/* Specialization */}

<div>

<label className="font-semibold">
Specialization
</label>

<input

type="text"

name="specialization"

value={formData.specialization}

onChange={handleChange}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

{/* Experience */}

<div>

<label className="font-semibold">
Experience (Years)
</label>

<input

type="number"

name="experience_years"

value={formData.experience_years}

onChange={handleChange}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

{/* Image */}

<div className="md:col-span-2">

<label className="font-semibold">
Profile Image
</label>

<input

type="file"

accept="image/*"

onChange={(e)=>setImage(e.target.files[0])}

className="w-full border rounded-xl p-3 mt-2"

/>

</div>

{/* Preview */}

{image && (

<div className="md:col-span-2">

<img

src={URL.createObjectURL(image)}

alt="Preview"

className="w-28 h-28 rounded-xl object-cover border"

/>

</div>

)}

{/* Buttons */}

<div className="md:col-span-2 flex justify-end gap-4 mt-4">

<button

type="button"

onClick={() => {

setShowModal(false);

resetForm();

}}

className="px-6 py-3 rounded-xl bg-gray-300"

>

Cancel

</button>

<button

type="submit"

className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

>

{editing ? "Update Trainer" : "Save Trainer"}

</button>

</div>

</form>

</div>

</div>

)}

</div>

);

}
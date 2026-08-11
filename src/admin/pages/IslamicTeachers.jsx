import { useEffect, useState } from "react";
import axios from "axios";

export default function IslamicTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience_years: "",
    gender: "Male",
    address: "",
    bio: "",
    joining_date: "",
    status: "active",
    profile_image: null,
  });

  /* =====================================
     FETCH TEACHERS
  ===================================== */

  const fetchTeachers = async () => {
    try {
     const res = await axios.get(
  "https://800junkuae.online/tsh-api/API/islamic-teachers/get-teachers.php"
);

setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* =====================================
     HANDLE CHANGE
  ===================================== */

const handleChange = (e) => {
  const { name, value, files } = e.target;

  setFormData({
    ...formData,
    [name]: files ? files[0] : value,
  });
};

  /* =====================================
     RESET FORM
  ===================================== */

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      qualification: "",
      specialization: "",
      experience_years: "",
      gender: "Male",
      address: "",
      bio: "",
      joining_date: "",
      status: "active",
       profile_image: null,
    });
  };

  /* =====================================
     SAVE TEACHER
  ===================================== */

  const saveTeacher = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
  if (formData[key] !== null) {
    form.append(key, formData[key]);
  }
});

      const url = formData.id
        ? "https://800junkuae.online/tsh-api/API/islamic-teachers/update-teacher.php"
        : "https://800junkuae.online/tsh-api/API/islamic-teachers/create-teacher.php";

      const res = await axios.post(url, form);

      alert(res.data.message);

      fetchTeachers();

      resetForm();

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================
     EDIT
  ===================================== */

  const editTeacher = (teacher) => {
    setFormData(teacher);
    setShowModal(true);
  };

  /* =====================================
     DELETE
  ===================================== */

  const deleteTeacher = async (id) => {
    if (!window.confirm("Delete Teacher?")) return;

    try {
      const form = new FormData();
      form.append("id", id);

      await axios.post(
        "https://800junkuae.online/tsh-api/API/islamic-teachers/delete-teacher.php",
        form
      );

      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  /* =====================================
     OPEN ADD MODAL
  ===================================== */

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

        <div>
          <h1 className="text-5xl font-black text-[#032B38]">
            Islamic Teachers
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Manage teachers, qualifications and specializations
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="
            mt-5 md:mt-0
            bg-[#032B38]
            hover:bg-[#0B4A5A]
            text-white
            px-6
            py-3
            rounded-xl
            font-bold
          "
        >
          + Add New Teacher
        </button>

      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5">

          <div className="bg-white rounded-[35px] shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] p-8 flex justify-between items-center">

              <div>
                <h2 className="text-3xl font-black text-white">
                  {formData.id
                    ? "Update Teacher"
                    : "Add New Teacher"}
                </h2>

                <p className="text-slate-200 mt-2">
                  Fill all teacher information
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-white text-4xl font-bold"
              >
                ×
              </button>

            </div>

            {/* FORM */}

           <form
  onSubmit={saveTeacher}
  className="p-8"
>

  <div className="grid md:grid-cols-2 gap-5">

    {/* Teacher Name */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Teacher Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="Enter Teacher Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Phone Number
      </label>
      <input
        type="text"
        name="phone"
        placeholder="Enter Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Qualification */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Qualification
      </label>
      <input
        type="text"
        name="qualification"
        placeholder="Enter Qualification"
        value={formData.qualification}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Specialization */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Specialization
      </label>
      <input
        type="text"
        name="specialization"
        placeholder="Enter Specialization"
        value={formData.specialization}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Experience */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Experience (Years)
      </label>
      <input
        type="number"
        name="experience_years"
        placeholder="Enter Experience"
        value={formData.experience_years}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Gender
      </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    {/* Joining Date */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Joining Date
      </label>
      <input
        type="date"
        name="joining_date"
        value={formData.joining_date}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Address */}
    <div className="md:col-span-2">
      <label className="block mb-2 font-semibold text-slate-700">
        Address
      </label>
      <input
        type="text"
        name="address"
        placeholder="Enter Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Bio */}
    <div className="md:col-span-2">
      <label className="block mb-2 font-semibold text-slate-700">
        Teacher Bio
      </label>
      <textarea
        name="bio"
        placeholder="Write Teacher Bio..."
        value={formData.bio}
        onChange={handleChange}
        rows="4"
        className="w-full border p-4 rounded-xl"
      />
    </div>

    {/* Status */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Status
      </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    {/* Profile Picture */}
    <div>
      <label className="block mb-2 font-semibold text-slate-700">
        Profile Picture
      </label>

      <input
        type="file"
        name="profile_image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-3 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#032B38] file:text-white file:font-semibold hover:file:bg-[#0B4A5A]"
      />
    </div>

  </div>

  <button
    type="submit"
    className="
      w-full
      mt-8
      bg-gradient-to-r
      from-[#032B38]
      to-[#0B4A5A]
      text-white
      py-5
      rounded-2xl
      font-black
      text-xl
      hover:opacity-90
      transition
    "
  >
    {formData.id ? "Update Teacher" : "Save Teacher"}
  </button>

</form>

          </div>

        </div>
      )}

      {/* TABLE */}

     {/* =====================================
    RESPONSIVE TABLE
===================================== */}

<div className="bg-white rounded-[25px] md:rounded-[35px] shadow-xl overflow-hidden">

  <div className="w-full overflow-x-auto">

    <table className="w-full min-w-[600px]">

      <thead>
        <tr className="bg-[#032B38] text-white">

          {/* NAME - ALWAYS SHOW */}
          <th className="p-3 md:p-5 text-left">
            Name
          </th>

          {/* PHOTO - ALWAYS SHOW */}
          <th className="p-3 md:p-5 text-left">
            Photo
          </th>

          {/* QUALIFICATION - HIDE ON MOBILE */}
          <th className="hidden md:table-cell p-5 text-left">
            Qualification
          </th>

          {/* SPECIALIZATION - HIDE ON MOBILE */}
          <th className="hidden lg:table-cell p-5 text-left">
            Specialization
          </th>

          {/* EXPERIENCE - HIDE ON MOBILE */}
          <th className="hidden lg:table-cell p-5 text-left">
            Experience
          </th>

          {/* STATUS - SHOW TABLET/DESKTOP */}
          <th className="hidden sm:table-cell p-3 md:p-5 text-left">
            Status
          </th>

          {/* ACTIONS - ALWAYS SHOW */}
          <th className="p-3 md:p-5 text-center">
            Actions
          </th>

        </tr>
      </thead>


      <tbody>

        {teachers.map((teacher) => (

          <tr
            key={teacher.id}
            className="border-b hover:bg-slate-50 transition"
          >

            {/* =========================
                NAME
            ========================== */}

            <td className="p-3 md:p-5">

              <div className="min-w-[120px]">

                <h3 className="font-black text-sm md:text-lg text-[#032B38]">
                  {teacher.name}
                </h3>

                {/* Email only desktop */}
                <p className="hidden md:block text-slate-500 text-sm mt-1">
                  {teacher.email}
                </p>

              </div>

            </td>


            {/* =========================
                PHOTO
            ========================== */}

            <td className="p-3 md:p-5">

              <img
                src={
                  teacher.profile_image
                    ? `https://800junkuae.online/tsh-api/uploads/${teacher.profile_image}`
                    : "https://via.placeholder.com/60"
                }
                alt={teacher.name}
                className="
                  w-10 h-10
                  md:w-14 md:h-14
                  rounded-full
                  object-cover
                  border-2
                  border-slate-200
                "
              />

            </td>


            {/* =========================
                QUALIFICATION
                HIDDEN ON MOBILE
            ========================== */}

            <td className="hidden md:table-cell p-5">

              <span className="text-slate-700">
                {teacher.qualification || "-"}
              </span>

            </td>


            {/* =========================
                SPECIALIZATION
                HIDDEN ON MOBILE/TABLET
            ========================== */}

            <td className="hidden lg:table-cell p-5">

              <span className="text-slate-700">
                {teacher.specialization || "-"}
              </span>

            </td>


            {/* =========================
                EXPERIENCE
                HIDDEN ON MOBILE/TABLET
            ========================== */}

            <td className="hidden lg:table-cell p-5">

              <span className="font-semibold text-slate-700">
                {teacher.experience_years || "0"} Years
              </span>

            </td>


            {/* =========================
                STATUS
                HIDDEN ON SMALL MOBILE
            ========================== */}

            <td className="hidden sm:table-cell p-3 md:p-5">

              <span
                className={
                  teacher.status === "active"
                    ? "bg-green-100 text-green-700 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold"
                    : "bg-red-100 text-red-700 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold"
                }
              >
                {teacher.status}
              </span>

            </td>


            {/* =========================
                ACTIONS
            ========================== */}

            <td className="p-3 md:p-5">

              <div className="flex flex-col sm:flex-row gap-2 justify-center">

                <button
                  onClick={() => editTeacher(teacher)}
                  className="
                    bg-yellow-400
                    hover:bg-yellow-500
                    px-3 md:px-5
                    py-2
                    rounded-lg md:rounded-xl
                    font-bold
                    text-xs md:text-sm
                    whitespace-nowrap
                  "
                >
                  Edit
                </button>


                <button
                  onClick={() => deleteTeacher(teacher.id)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-3 md:px-5
                    py-2
                    rounded-lg md:rounded-xl
                    font-bold
                    text-xs md:text-sm
                    whitespace-nowrap
                  "
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
    </div>
  );
}

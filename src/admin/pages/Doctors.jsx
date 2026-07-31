import { useEffect, useState } from "react";
import axios from "axios";

export default function Doctors() {

    /* =========================================
       STATES
    ========================================= */

    const [doctors, setDoctors] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({

        id: "",

        /* ENGLISH */
        name: "",
        specialization: "",
        education: "",
        hospital: "",
        description: "",

        /* URDU */
        name_ur: "",
        specialization_ur: "",
        education_ur: "",
        hospital_ur: "",
        description_ur: "",

        /* ARABIC */
        name_ar: "",
        specialization_ar: "",
        education_ar: "",
        hospital_ar: "",
        description_ar: "",

        /* OTHER */
        email: "",
        phone: "",
        experience: "",
        city: "",
        country: "",
        consultation_fee: "",

        /* SCHEDULE */
        available_days: [],
        available_time: "",

        /* SLOTS */
        total_slots: "",

        manual_slots: "",

        /* IMAGE */
        image: "",

    });

    /* =========================================
       FETCH DOCTORS
    ========================================= */

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors = async () => {

        try {

            const res = await axios.get(
                "https://800junkuae.online/tsh-api/API/doctors/get_doctors.php"
            );

            if (res.data.status === "success") {

                setDoctors(res.data.data);
            }

        } catch (error) {

            console.log(error);
        }
    };

    /* =========================================
       HANDLE CHANGE
    ========================================= */

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });
    };

    /* =========================================
       EDIT DOCTOR
    ========================================= */

    const editDoctor = (doctor) => {

        setShowForm(true);

        setFormData({

            id: doctor.id,

            /* ENGLISH */
            name: doctor.name || "",
            specialization: doctor.specialization || "",
            education: doctor.education || "",
            hospital: doctor.hospital || "",
            description: doctor.description || "",

            /* URDU */
            name_ur: doctor.name_ur || "",
            specialization_ur:
                doctor.specialization_ur || "",
            education_ur:
                doctor.education_ur || "",
            hospital_ur:
                doctor.hospital_ur || "",
            description_ur:
                doctor.description_ur || "",

            /* ARABIC */
            name_ar: doctor.name_ar || "",
            specialization_ar:
                doctor.specialization_ar || "",
            education_ar:
                doctor.education_ar || "",
            hospital_ar:
                doctor.hospital_ar || "",
            description_ar:
                doctor.description_ar || "",

            /* OTHER */
            email: doctor.email || "",
            phone: doctor.phone || "",
            experience: doctor.experience || "",
            city: doctor.city || "",
            country: doctor.country || "",
            consultation_fee:
                doctor.consultation_fee || "",

            available_days:
                doctor.available_days
                    ? doctor.available_days.split(",")
                    : [],

            available_time:
                doctor.available_time || "",

            total_slots:
                doctor.total_slots || "",

            manual_slots:
                doctor.manual_slots || "",

            image:
                doctor.image || "",

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    /* =========================================
       ADD / UPDATE DOCTOR
    ========================================= */

    const saveDoctor = async (e) => {

        e.preventDefault();

        try {

            const form = new FormData();

            Object.keys(formData).forEach((key) => {

                if (key === "available_days") {

                    form.append(
                        key,
                        formData.available_days.join(",")
                    );

                } else {

                    form.append(
                        key,
                        formData[key]
                    );
                }
            });

            /*
            IMAGE
            */

            if (image) {

                form.append("image", image);
            }

            /*
            API URL
            */

            let apiURL =
                "https://800junkuae.online/tsh-api/API/doctors/add_doctor.php";

            if (formData.id) {

                apiURL =
                    "https://800junkuae.online/tsh-api/API/doctors/update_doctor.php";
            }

            /*
            REQUEST
            */

            const res = await axios.post(
                apiURL,
                form
            );

            console.log(res.data);

            /*
            SUCCESS
            */

            if (res.data.status === "success") {

                alert(

                    formData.id
                        ? "Doctor Updated Successfully"
                        : "Doctor Added Successfully"

                );

                setShowForm(false);

                fetchDoctors();

                /*
                RESET
                */

                setFormData({

                    id: "",

                    /* ENGLISH */
                    name: "",
                    specialization: "",
                    education: "",
                    hospital: "",
                    description: "",

                    /* URDU */
                    name_ur: "",
                    specialization_ur: "",
                    education_ur: "",
                    hospital_ur: "",
                    description_ur: "",

                    /* ARABIC */
                    name_ar: "",
                    specialization_ar: "",
                    education_ar: "",
                    hospital_ar: "",
                    description_ar: "",

                    /* OTHER */
                    email: "",
                    phone: "",
                    experience: "",
                    city: "",
                    country: "",
                    consultation_fee: "",

                    /* SCHEDULE */
                    available_days: [],
                    available_time: "",

                    /* SLOTS */
                    total_slots: "",

                    manual_slots: "",

                    /* IMAGE */
                    image: "",

                });

                setImage(null);
            }

        } catch (error) {

            console.log(error);
        }
    };

    /* =========================================
       DELETE DOCTOR
    ========================================= */

    const deleteDoctor = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmDelete) return;

        try {

            const form = new FormData();

            form.append("id", id);

            const res = await axios.post(
                "https://800junkuae.online/tsh-api/API/doctors/delete_doctor.php",
                form
            );

            if (res.data.status === "success") {

                alert("Doctor Deleted");

                fetchDoctors();
            }

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="w-full">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                <div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#032B38]">
                        Doctors Management
                    </h1>

                    <p className="text-slate-500 mt-3 text-lg">
                        Manage doctors, schedules, slots and appointments.
                    </p>

                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#032B38] text-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                    {showForm ? "Close Form" : "+ Add Doctor"}
                </button>

            </div>

            {/* FORM */}
            {showForm && (

                <form
                    onSubmit={saveDoctor}
                    encType="multipart/form-data"
                    className="bg-white rounded-[35px] shadow-xl overflow-hidden mb-10"
                >

                    {/* TOP HEADER */}
                    <div className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] p-8 text-white">

                        <h2 className="text-4xl font-black">

                            {formData.id
                                ? "Update Doctor"
                                : "Add New Doctor"}

                        </h2>

                        <p className="text-slate-200 mt-3 text-lg">
                            Manage multilingual doctor information, schedules and appointments.
                        </p>

                    </div>

                    <div className="p-6 md:p-10 space-y-10">

                        {/* IMAGE */}
                        <div className="flex flex-col items-center">

                            <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-[#032B38] shadow-xl mb-5">

                                <img
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : formData.image
                                                ? `https://800junkuae.online/tsh-api/${formData.image}`
                                                : "https://ui-avatars.com/api/?name=Doctor"
                                    }
                                    alt=""
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            <label className="bg-[#032B38] text-white px-6 py-3 rounded-2xl font-bold cursor-pointer hover:bg-[#021F28] transition-all">

                                Upload Doctor Image

                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />

                            </label>

                        </div>
{/* BASIC INFORMATION */}

<div>

    <h3 className="text-3xl font-black text-[#032B38] mb-6 border-b pb-4">

        👨‍⚕️ Doctor Information

    </h3>

    <div className="grid md:grid-cols-2 gap-6">

        <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="consultation_fee"
            placeholder="Consultation Fee"
            value={formData.consultation_fee}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

        <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="border-2 p-4 rounded-xl"
        />

    </div>

</div>
<div className="grid md:grid-cols-2 gap-6 mt-8">

    <textarea
        name="education"
        placeholder="Education"
        value={formData.education}
        onChange={handleChange}
        rows={4}
        className="border-2 p-4 rounded-xl"
    />

    <textarea
        name="hospital"
        placeholder="Hospital"
        value={formData.hospital}
        onChange={handleChange}
        rows={4}
        className="border-2 p-4 rounded-xl"
    />

</div>

<textarea
    name="description"
    placeholder="Doctor Description"
    value={formData.description}
    onChange={handleChange}
    rows={5}
    className="border-2 p-4 rounded-xl w-full mt-6"
/>
                        {/* PROFESSIONAL INFO */}
                        <div>

                            <h3 className="text-3xl font-black text-[#032B38] mb-6 border-b pb-4">
                                ⚙ Professional Information
                            </h3>

                            {/* AVAILABLE DAYS */}
                            <div className="md:col-span-2">

                                <label className="block mb-4 font-black text-[#032B38] text-xl">
                                    📅 Available Days
                                </label>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    {[
                                        "monday",
                                        "tuesday",
                                        "wednesday",
                                        "thursday",
                                        "friday",
                                        "saturday",
                                        "sunday",
                                    ].map((day) => (

                                        <label
                                            key={day}
                                            className={`flex items-center gap-3 border-2 p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                                                formData.available_days.includes(day)
                                                    ? "bg-[#032B38] border-[#032B38] text-white shadow-lg"
                                                    : "border-slate-200 bg-white hover:border-[#032B38]"
                                            }`}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.available_days.includes(day)
                                                }

                                                onChange={(e) => {

                                                    let updatedDays = [];

                                                    if (e.target.checked) {

                                                        updatedDays = [
                                                            ...formData.available_days,
                                                            day,
                                                        ];

                                                    } else {

                                                        updatedDays =
                                                            formData.available_days.filter(
                                                                (d) => d !== day
                                                            );
                                                    }

                                                    setFormData({

                                                        ...formData,

                                                        available_days: updatedDays,

                                                    });
                                                }}

                                                className="w-5 h-5"
                                            />

                                            <span className="capitalize font-bold text-lg">
                                                {day}
                                            </span>

                                        </label>

                                    ))}

                                </div>

                            </div>

                            {/* AVAILABLE TIME */}
                            <div className="mt-8">

                                <label className="block mb-4 font-black text-[#032B38] text-xl">
                                    ⏰ Available Time
                                </label>

                                <input
                                    type="text"
                                    name="available_time"
                                    placeholder="Example: 10am-5pm"
                                    onChange={handleChange}
                                    value={formData.available_time}
                                    className="w-full border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-[#032B38]"
                                />

                            </div>

                            {/* TOTAL SLOTS */}
                            <div className="mt-8">

                                <label className="block mb-4 font-black text-[#032B38] text-xl">
                                    🎟 Total Slots
                                </label>

                                <input
                                    type="number"
                                    name="total_slots"
                                    placeholder="Example: 10"
                                    onChange={handleChange}
                                    value={formData.total_slots}
                                    className="w-full border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-[#032B38]"
                                />

                            </div>

                            {/* MANUAL APPOINTMENT SLOTS */}
                            <div className="mt-8">

                                <label className="block mb-4 font-black text-[#032B38] text-xl">
                                    🕒 Manual Appointment Slots
                                </label>

                                <textarea
                                    name="manual_slots"
                                    placeholder={`Example:

09:00 AM,
10:00 AM,
11:30 AM,
02:00 PM,
05:30 PM`}
                                    onChange={handleChange}
                                    value={formData.manual_slots}
                                    rows="7"
                                    className="w-full border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-[#032B38]"
                                ></textarea>

                                <p className="text-slate-500 mt-3 leading-7">

                                    Enter slots separated with commas.

                                    <br />

                                    Example:

                                    <br />

                                    09:00 AM, 10:00 AM, 02:30 PM

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className={`w-full py-6 rounded-[25px] text-2xl font-black shadow-2xl transition-all duration-300 hover:scale-[1.01] ${
                            formData.id
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                                : "bg-gradient-to-r from-[#032B38] to-[#0B4A5A] text-white"
                        }`}
                    >

                        {formData.id ? (

                            <span className="flex items-center justify-center gap-3">
                                ✏️ Update Doctor
                            </span>

                        ) : (

                            <span className="flex items-center justify-center gap-3">
                                ➕ Save Doctor
                            </span>

                        )}

                    </button>

                </form>

            )}
{/* TABLE */}
<div className="w-full overflow-hidden mt-10">

    <div className="overflow-x-auto bg-white rounded-[30px] shadow-lg">

        <table className="w-full whitespace-nowrap">

            <thead className="bg-[#032B38] text-white">

                <tr>

                    <th className="p-5 text-left">
                        Image
                    </th>

                    <th className="p-5 text-left">
                        Doctor
                    </th>

                    <th className="p-5 text-left">
                        Specialization
                    </th>

                    <th className="p-5 text-left">
                        Experience
                    </th>

                    <th className="p-5 text-left">
                        Hospital
                    </th>

                    <th className="p-5 text-left">
                        Fee
                    </th>

                    <th className="p-5 text-left">
                        Available
                    </th>

                    <th className="p-5 text-left">
                        Slots
                    </th>

                    <th className="p-5 text-center">
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {doctors.length > 0 ? (

                    doctors.map((doctor) => (

                        <tr
                            key={doctor.id}
                            className="border-b hover:bg-slate-50 transition-all"
                        >

                            {/* IMAGE */}
                            <td className="p-5">

                                <img
                                    src={
                                        doctor.image
                                            ? `https://800junkuae.online/tsh-api/${doctor.image}`
                                            : `https://ui-avatars.com/api/?name=${doctor.name}`
                                    }
                                    alt=""
                                    className="w-20 h-20 rounded-2xl object-cover border"
                                />

                            </td>

                            {/* NAME */}
                            <td className="p-5">

                                <div>

                                    <h3 className="font-black text-lg text-[#032B38]">
                                        {doctor.name}
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        {doctor.email}
                                    </p>

                                </div>

                            </td>

                            {/* SPECIALIZATION */}
                            <td className="p-5">

                                {doctor.specialization}

                            </td>

                            {/* EXPERIENCE */}
                            <td className="p-5">

                                {doctor.experience}

                            </td>

                            {/* HOSPITAL */}
                            <td className="p-5">

                                {doctor.hospital}

                            </td>

                            {/* FEE */}
                            <td className="p-5">

                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold">

                                    {doctor.consultation_fee}

                                </span>

                            </td>

                            {/* AVAILABLE */}
                            <td className="p-5">

                                <div className="space-y-2">

                                    <div className="flex flex-wrap gap-2">

                                        {doctor.available_days
                                            ?.split(",")
                                            .map((day, index) => (

                                                <span
                                                    key={index}
                                                    className="bg-[#032B38] text-white px-3 py-1 rounded-xl text-sm capitalize"
                                                >

                                                    {day}

                                                </span>

                                            ))}

                                    </div>

                                    <div className="text-slate-500 text-sm">

                                        {doctor.available_time}

                                    </div>

                                </div>

                            </td>

                            {/* MANUAL SLOTS */}
                            <td className="p-5">

                                <div className="flex flex-wrap gap-2">

                                    {doctor.manual_slots
                                        ? doctor.manual_slots
                                              .split(",")
                                              .map((slot, index) => (

                                                  <span
                                                      key={index}
                                                      className="bg-green-100 text-green-700 px-3 py-2 rounded-xl text-sm font-bold"
                                                  >

                                                      {slot.trim()}

                                                  </span>

                                              ))

                                        : (

                                            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold">

                                                {doctor.total_slots} Slots

                                            </span>

                                        )}

                                </div>

                            </td>

                            {/* ACTIONS */}
                            <td className="p-5">

                                <div className="flex flex-wrap gap-3 justify-center">

                                    {/* EDIT */}
                                    <button
                                        onClick={() => editDoctor(doctor)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold transition-all"
                                    >

                                        ✏️ Edit

                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() =>
                                            deleteDoctor(doctor.id)
                                        }
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-bold transition-all"
                                    >

                                        🗑 Delete

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="9"
                            className="text-center p-10 text-slate-500 text-xl"
                        >

                            No Doctors Found

                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>
        </div>
    );
}
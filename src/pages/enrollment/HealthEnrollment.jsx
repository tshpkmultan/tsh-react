import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function HealthEnrollment() {

    const navigate = useNavigate();

    /* =========================================
       USER
    ========================================= */

    const user = JSON.parse(localStorage.getItem("user"));

    /* =========================================
       AUTH CHECK
    ========================================= */

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.category !== "health") {
            navigate("/category");
            return;
        }

    }, []);

    /* =========================================
       STATES
    ========================================= */

    const [loading, setLoading] = useState(false);

    const [doctors, setDoctors] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState("");

    const [doctorData, setDoctorData] = useState(null);

    const [appointmentDate, setAppointmentDate] = useState("");

    const [availableSlots, setAvailableSlots] = useState([]);

    const [appointmentSlot, setAppointmentSlot] = useState("");

    const [medicalPreview, setMedicalPreview] = useState([]);

    const [paymentPreview, setPaymentPreview] = useState("");

    /* =========================================
       FORM
    ========================================= */

    const [form, setForm] = useState({

        full_name: "",
        father_name: "",
        email: user?.username || "",
        phone: "",
        whatsapp: "",
        age: "",
        gender: "",
        blood_group: "",
        disease: "",
        address: "",
        city: "",
        country: "Pakistan",

        medical_history: "",

        medical_reports: [],

        payment_receipt: null,

    });

    /* =========================================
       INPUT CHANGE
    ========================================= */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    /* =========================================
       LOAD DOCTORS
    ========================================= */

    useEffect(() => {

        loadDoctors();

    }, []);

    const loadDoctors = async () => {

        try {

            const res = await fetch(
                `${BASE_URL}/doctors/get_doctors.php`
            );

            const data = await res.json();

            console.log(data);

            if (data.status === "success") {

                setDoctors(data.data);

            }

        } catch (err) {

            console.log(err);

        }

    };
    
        /* =========================================
       DOCTOR SELECT
    ========================================= */

    const handleDoctorSelect = (doctor) => {

        setSelectedDoctor(doctor.id);

        setDoctorData(doctor);

        setAppointmentSlot("");

        setAvailableSlots([]);

    };

    /* =========================================
       LOAD AVAILABLE SLOTS
    ========================================= */

    useEffect(() => {

        if (
            selectedDoctor &&
            appointmentDate
        ) {

            loadSlots();

        }

    }, [selectedDoctor, appointmentDate]);

    const loadSlots = async () => {

        try {

            const res = await fetch(

                `${BASE_URL}/doctors/get_available_slots.php?doctor_id=${selectedDoctor}&date=${appointmentDate}`

            );

            const data = await res.json();

            console.log("Slots:", data);

            if (data.status === "success") {

                setAvailableSlots(data.available_slots);

            } else {

                setAvailableSlots([]);

                alert(data.message);

            }

        } catch (err) {

            console.log(err);

        }

    };
/* =========================================
   COPY TO CLIPBOARD
========================================= */

const copyText = async (text) => {

    try {

        await navigator.clipboard.writeText(text);

        alert("Copied: " + text);

    } catch (err) {

        console.log(err);

        alert("Copy failed");

    }

};
    /* =========================================
       MEDICAL REPORTS
    ========================================= */

    const handleMedicalReports = (e) => {

        const files = Array.from(e.target.files);

        setForm((prev) => ({

            ...prev,

            medical_reports: files

        }));

        const previews = files.map((file) => ({

            name: file.name,

            url: URL.createObjectURL(file)

        }));

        setMedicalPreview(previews);

    };

    /* =========================================
       PAYMENT RECEIPT
    ========================================= */

    const handlePaymentReceipt = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setForm((prev) => ({

            ...prev,

            payment_receipt: file

        }));

        setPaymentPreview(file.name);

    };
        /* =========================================
       SUBMIT ENROLLMENT
    ========================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedDoctor) {

            alert("Please select a doctor.");

            return;

        }

        if (!appointmentDate) {

            alert("Please select appointment date.");

            return;

        }

        if (!appointmentSlot) {

            alert("Please select appointment slot.");

            return;

        }

        if (!form.payment_receipt) {

            alert("Please upload payment receipt.");

            return;

        }

        setLoading(true);

        try {

            const formData = new FormData();

            /* =========================================
               USER
            ========================================= */

            formData.append(
                "user_id",
                user.user_id
            );

            formData.append(
                "category",
                "patient"
            );

            /* =========================================
               DOCTOR
            ========================================= */

            formData.append(
                "doctor_id",
                selectedDoctor
            );

            formData.append(
                "appointment_date",
                appointmentDate
            );

            formData.append(
                "appointment_time",
                appointmentSlot
            );

            /* =========================================
               PERSONAL INFO
            ========================================= */

            formData.append(
                "full_name",
                form.full_name
            );

            formData.append(
                "father_name",
                form.father_name
            );

            formData.append(
                "email",
                form.email
            );

            formData.append(
                "phone",
                form.phone
            );

            formData.append(
                "whatsapp",
                form.whatsapp
            );

            formData.append(
                "age",
                form.age
            );

            formData.append(
                "gender",
                form.gender
            );

            formData.append(
                "blood_group",
                form.blood_group
            );

            formData.append(
                "disease",
                form.disease
            );

            formData.append(
                "address",
                form.address
            );

            formData.append(
                "city",
                form.city
            );

            formData.append(
                "country",
                form.country
            );

            formData.append(
                "medical_history",
                form.medical_history
            );

            /* =========================================
               PAYMENT RECEIPT
            ========================================= */

            formData.append(
                "payment_receipt",
                form.payment_receipt
            );

            /* =========================================
               MULTIPLE MEDICAL REPORTS
            ========================================= */

            form.medical_reports.forEach((file) => {

                formData.append(
                    "medical_reports[]",
                    file
                );

            });

            /* =========================================
               API
            ========================================= */

            const res = await fetch(

                `${BASE_URL}/patient/enrollment.php`,

                {

                    method: "POST",

                    body: formData

                }

            );

            const result = await res.json();

            console.log(result);

            if (result.status === "success") {

    alert(result.message);

    navigate("/patient/pending-approval");

} else {

                alert(result.message);

            }

        } catch (err) {

            console.log(err);

            alert("Server Error");

        } finally {

            setLoading(false);

        }

    };
        /* =========================================
       JSX
    ========================================= */

    return (

        <div className="min-h-screen bg-slate-100 py-10">

            <div className="max-w-7xl mx-auto">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="bg-gradient-to-r from-[#0F4C4C] to-[#15803d] rounded-3xl shadow-xl p-10 text-white mb-8">

                    <h1 className="text-4xl md:text-5xl font-black">

                        Health Enrollment

                    </h1>

                    <p className="mt-3 text-lg text-green-100">

                        Complete your enrollment and book your appointment.

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* =========================================
                        SELECT DOCTOR
                    ========================================= */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Select Doctor

                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {doctors.map((doctor) => (

                                <div

                                    key={doctor.id}

                                    onClick={() => handleDoctorSelect(doctor)}

                                    className={`cursor-pointer rounded-3xl overflow-hidden border-4 transition duration-300 hover:shadow-2xl

                                    ${

                                        selectedDoctor == doctor.id

                                            ? "border-green-600"

                                            : "border-gray-200"

                                    }`}

                                >

                                    <img

                                        src={`https://800junkuae.online/tsh-api/${doctor.image}`}

                                        alt={doctor.name}

                                        className="w-full h-72 object-cover"

                                    />

                                    <div className="p-6">

                                        <h3 className="text-2xl font-bold text-[#0F4C4C]">

                                            {doctor.name}

                                        </h3>

                                        <p className="text-slate-500 mt-2">

                                            {doctor.specialization}

                                        </p>

                                        <div className="mt-5 space-y-2">

                                            <p>

                                                <strong>Hospital:</strong>

                                                {" "}

                                                {doctor.hospital}

                                            </p>

                                            <p>

                                                <strong>Fee:</strong>

                                                Rs. {doctor.consultation_fee}

                                            </p>

                                            <p>

                                                <strong>Available:</strong>

                                                {" "}

                                                {doctor.available_time}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                                        {/* =========================================
                        SELECTED DOCTOR
                    ========================================= */}

                    {doctorData && (

                        <div className="bg-green-50 border border-green-200 rounded-3xl p-8">

                            <h2 className="text-2xl font-bold text-green-700 mb-6">

                                Selected Doctor

                            </h2>

                            <div className="grid md:grid-cols-4 gap-8">

                                <div>

                                    <img

                                        src={`https://800junkuae.online/tsh-api/${doctorData.image}`}

                                        alt={doctorData.name}

                                        className="rounded-2xl w-full"

                                    />

                                </div>

                                <div className="md:col-span-3">

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <p>

                                            <strong>Name:</strong>

                                            {" "}

                                            {doctorData.name}

                                        </p>

                                        <p>

                                            <strong>Specialization:</strong>

                                            {" "}

                                            {doctorData.specialization}

                                        </p>

                                        <p>

                                            <strong>Hospital:</strong>

                                            {" "}

                                            {doctorData.hospital}

                                        </p>

                                        <p>

                                            <strong>Experience:</strong>

                                            {" "}

                                            {doctorData.experience}

                                        </p>

                                        <p>

                                            <strong>Fee:</strong>

                                            Rs. {doctorData.consultation_fee}

                                        </p>

                                        <p>

                                            <strong>Available Time:</strong>

                                            {" "}

                                            {doctorData.available_time}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}
                                        {/* =========================================
                        APPOINTMENT
                    ========================================= */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Appointment Details

                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">

                            {/* Appointment Date */}

                            <div>

                                <label className="block font-semibold mb-3">

                                    Appointment Date

                                </label>

                                <input

                                    type="date"

                                    value={appointmentDate}

                                    min={new Date().toISOString().split("T")[0]}

                                    onChange={(e) => {

                                        setAppointmentDate(e.target.value);

                                        setAppointmentSlot("");

                                    }}

                                    className="w-full border-2 border-slate-200 rounded-xl p-4 focus:border-green-600 outline-none"

                                    required

                                />

                            </div>

                            {/* Selected Slot */}

                            <div>

                                <label className="block font-semibold mb-3">

                                    Selected Slot

                                </label>

                                <input

                                    type="text"

                                    value={appointmentSlot}

                                    readOnly

                                    placeholder="Select a slot"

                                    className="w-full bg-gray-100 border rounded-xl p-4"

                                />

                            </div>

                        </div>
                                                {/* =========================================
                            AVAILABLE SLOTS
                        ========================================= */}

                        {availableSlots.length > 0 && (

                            <div className="mt-8">

                                <h3 className="text-xl font-bold mb-5">

                                    Available Slots

                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    {availableSlots.map((slot, index) => (

                                        <button

                                            key={index}

                                            type="button"

                                            onClick={() =>

                                                setAppointmentSlot(slot)

                                            }

                                            className={`rounded-xl p-4 font-semibold border-2 transition

                                            ${

                                                appointmentSlot === slot

                                                ? "bg-green-600 text-white border-green-600"

                                                : "bg-white hover:bg-green-50"

                                            }`}

                                        >

                                            {slot}

                                        </button>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>
                                        {/* =========================================
                        PERSONAL INFORMATION
                    ========================================= */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Personal Information

                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="font-semibold">

                                    Full Name

                                </label>

                                <input

                                    type="text"

                                    name="full_name"

                                    value={form.full_name}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                    required

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Father Name

                                </label>

                                <input

                                    type="text"

                                    name="father_name"

                                    value={form.father_name}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                    required

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Email

                                </label>

                                <input

                                    type="email"

                                    value={form.email}

                                    readOnly

                                    className="w-full bg-gray-100 border rounded-xl p-4 mt-2"

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Phone

                                </label>

                                <input

                                    type="text"

                                    name="phone"

                                    value={form.phone}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                    required

                                />

                            </div>

                            <div>

                                <label className="font-semibold">

                                    WhatsApp

                                </label>

                                <input

                                    type="text"

                                    name="whatsapp"

                                    value={form.whatsapp}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                />

                            </div>

                           <div>

    <label className="font-semibold">

        Age

    </label>

    <input

        type="number"

        name="age"

        value={form.age}

        onChange={handleChange}

        placeholder="Enter Age"

        className="w-full border rounded-xl p-4 mt-2"

        required

    />

</div>

                        </div>

                    </div>
                                        {/* =========================================
                        MEDICAL INFORMATION
                    ========================================= */}

                    <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Medical Information

                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">

                            {/* Gender */}

                            <div>

                                <label className="font-semibold">

                                    Gender

                                </label>

                                <select

                                    name="gender"

                                    value={form.gender}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

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

                            {/* Blood Group */}

                            <div>

                                <label className="font-semibold">

                                    Blood Group

                                </label>

                                <select

                                    name="blood_group"

                                    value={form.blood_group}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                    required

                                >

                                    <option value="">Select</option>

                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>

                                </select>

                            </div>

                            {/* Disease */}

                            <div>

                                <label className="font-semibold">

                                    Disease / Problem

                                </label>

                                <input

                                    type="text"

                                    name="disease"

                                    value={form.disease}

                                    onChange={handleChange}

                                    className="w-full border rounded-xl p-4 mt-2"

                                    placeholder="Enter disease"

                                />

                            </div>

                        </div>

                    </div>
                                        <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Address

                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">

                            <input

                                type="text"

                                name="address"

                                value={form.address}

                                onChange={handleChange}

                                placeholder="Address"

                                className="border rounded-xl p-4"

                            />

                            <input

                                type="text"

                                name="city"

                                value={form.city}

                                onChange={handleChange}

                                placeholder="City"

                                className="border rounded-xl p-4"

                            />

                            <input

                                type="text"

                                name="country"

                                value={form.country}

                                onChange={handleChange}

                                placeholder="Country"

                                className="border rounded-xl p-4"

                            />

                        </div>

                    </div>
                                        <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Medical History

                        </h2>

                        <textarea

                            rows={6}

                            name="medical_history"

                            value={form.medical_history}

                            onChange={handleChange}

                            className="w-full border rounded-xl p-4"

                            placeholder="Describe your previous medical history..."

                        />

                    </div>
                                        <div className="bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-[#0F4C4C] mb-8">

                            Medical Reports

                        </h2>

                        <input

                            type="file"

                            multiple

                            accept=".jpg,.jpeg,.png,.pdf"

                            onChange={handleMedicalReports}

                            className="w-full border rounded-xl p-4"

                        />

                        {

                            medicalPreview.length > 0 &&

                            <div className="grid md:grid-cols-3 gap-5 mt-6">

                                {

                                    medicalPreview.map((file,index)=>(

                                        <div

                                            key={index}

                                            className="border rounded-xl p-4 bg-slate-50"

                                        >

                                            <p className="font-semibold">

                                                {file.name}

                                            </p>

                                        </div>

                                    ))

                                }

                            </div>

                        }

                    </div>
                              <div className="bg-green-50 border border-green-300 rounded-xl p-5 mb-6">

    <h3 className="font-bold text-xl text-green-700">

        Consultation Fee

    </h3>

    <p className="text-3xl font-black mt-2">

        Rs. {doctorData?.consultation_fee || 0}

    </p>

</div> 
<div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 mb-6">

    <h3 className="text-3xl font-bold text-[#0F4C4C] mb-6">

        Payment Methods

    </h3>

    <div className="space-y-6">

        {/* JazzCash */}

        <div className="bg-white rounded-2xl shadow border p-6">

            <div className="flex justify-between items-center">

                <h4 className="text-xl font-bold text-red-600">

                    JazzCash

                </h4>

                <button
                    type="button"
                    onClick={() => copyText("03097667058")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    Copy Number
                </button>

            </div>

            <div className="mt-4">

                <p>

                    <strong>Number:</strong>

                    03097667058

                </p>

                <p>

                    <strong>Account Name:</strong>

                    Shahbaz Ahmad

                </p>

            </div>

        </div>

        {/* EasyPaisa */}

        <div className="bg-white rounded-2xl shadow border p-6">

            <div className="flex justify-between items-center">

                <h4 className="text-xl font-bold text-pink-600">

                    EasyPaisa

                </h4>

                <button
                    type="button"
                    onClick={() => copyText("03331627058")}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                    Copy Number
                </button>

            </div>

            <div className="mt-4">

                <p>

                    <strong>Number:</strong>

                    03331627058

                </p>

                <p>

                    <strong>Account Name:</strong>

                    Shahbaz Ahmad

                </p>

            </div>

        </div>

        {/* BOP */}

        <div className="bg-white rounded-2xl shadow border p-6">

            <div className="flex justify-between items-center">

                <h4 className="text-xl font-bold text-blue-700">

                    Bank of Punjab (BOP)

                </h4>

                <button
                    type="button"
                    onClick={() => copyText("6020224441600010")}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
                >
                    Copy Account
                </button>

            </div>

            <div className="mt-4">

                <p>

                    <strong>Account Number:</strong>

                    6020224441600010

                </p>

                <p>

                    <strong>Account Name:</strong>

                    Shahbaz Ahmad

                </p>

            </div>

        </div>

    </div>

</div>
<label className="font-bold text-lg">

Upload Payment Receipt

</label>

<input

type="file"

accept=".jpg,.jpeg,.png,.pdf"

onChange={handlePaymentReceipt}

className="w-full border rounded-xl p-4 mt-3"

required

/>

{

paymentPreview &&

<div className="mt-5 p-4 rounded-xl bg-green-50 border">

<strong>

Selected File:

</strong>

{" "}

{paymentPreview}

</div>

}
                                        <div className="flex justify-end">

                        <button

                            type="submit"

                            disabled={loading}

                            className="px-10 py-5 rounded-2xl bg-[#0F4C4C] hover:bg-green-700 text-white text-xl font-bold shadow-lg"

                        >

                            {

                                loading

                                ?

                                "Submitting..."

                                :

                                "Submit Enrollment"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}
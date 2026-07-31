import { useEffect, useState } from "react";

const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function BookFollowUp() {

    /* =========================================
       USER
    ========================================= */

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const userId = user?.user_id;

    /* =========================================
       STATES
    ========================================= */

    const [loading, setLoading] = useState(false);

    const [appointments, setAppointments] = useState([]);

    const [selectedAppointment, setSelectedAppointment] = useState("");

    const [doctor, setDoctor] = useState(null);

    const [slots, setSlots] = useState([]);

    const [prescriptions, setPrescriptions] = useState([]);

    const [reports, setReports] = useState([]);

    const [form, setForm] = useState({

        appointment_date: "",

        appointment_slot: "",

        followup_reason: "",

        payment_method: "JazzCash",

        payment_receipt: null

    });

    /* =========================================
       LOAD COMPLETED APPOINTMENTS
    ========================================= */

    useEffect(() => {

        if (userId) {

            fetchCompletedAppointments();

        }

    }, [userId]);

    /* =========================================
       FETCH COMPLETED APPOINTMENTS
    ========================================= */

    const fetchCompletedAppointments = async () => {

        try {

            setLoading(true);

            const res = await fetch(

                `${BASE_URL}/patient/get_completed_appointments.php?user_id=${userId}`

            );

            const data = await res.json();

            console.log("Completed Appointments:", data);

            if (data.status === "success") {

                setAppointments(
                    data.appointments || []
                );

            } else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };
        /* =========================================
       SELECT PREVIOUS APPOINTMENT
    ========================================= */

    const handleAppointment = async (e) => {

        const id = e.target.value;

        setSelectedAppointment(id);

        const appointment = appointments.find(

            item => item.id == id

        );

        if (!appointment) {

            setDoctor(null);

            setSlots([]);

            setPrescriptions([]);

            setReports([]);

            return;

        }

        setDoctor(appointment);

        /* RESET */

        setSlots([]);

        setPrescriptions([]);

        setReports([]);

        setForm({

            appointment_date: "",

            appointment_slot: "",

            followup_reason: "",

            payment_method: "JazzCash",

            payment_receipt: null

        });

        /* LOAD OLD DATA */

        loadPreviousData(id);

    };

    /* =========================================
       INPUT CHANGE
    ========================================= */

    const handleChange = (e) => {

        setForm(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    /* =========================================
       FILE CHANGE
    ========================================= */

    const handleFile = (e) => {

        setForm(prev => ({

            ...prev,

            payment_receipt: e.target.files[0]

        }));

    };

    /* =========================================
       DATE CHANGE
    ========================================= */

    const handleDate = async (e) => {

        const date = e.target.value;

        setForm(prev => ({

            ...prev,

            appointment_date: date,

            appointment_slot: ""

        }));

        if (!doctor) return;

        try {

            const res = await fetch(

                `${BASE_URL}/doctors/get_available_slots.php?doctor_id=${doctor.doctor_id}&date=${date}`

            );

            const data = await res.json();

            console.log("Available Slots:", data);

            if (data.status === "success") {

                setSlots(

                    data.available_slots || []

                );

            }

            else {

                setSlots([]);

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

            setSlots([]);

        }

    };

    /* =========================================
       LOAD PREVIOUS DATA
    ========================================= */

    const loadPreviousData = async (appointmentId) => {

        try {

            /* PRESCRIPTIONS */

            const prescriptionRes = await fetch(

                `${BASE_URL}/patient/get_previous_prescriptions.php?appointment_id=${appointmentId}`

            );

            const prescriptionData = await prescriptionRes.json();

            console.log("Prescriptions:", prescriptionData);

            if (prescriptionData.status === "success") {

                setPrescriptions(

                    prescriptionData.prescriptions || []

                );

            }

            /* MEDICAL REPORTS */

            const reportRes = await fetch(

                `${BASE_URL}/patient/get_previous_reports.php?appointment_id=${appointmentId}`

            );

            const reportData = await reportRes.json();

            console.log("Reports:", reportData);

            if (reportData.status === "success") {

                setReports(

                    reportData.records || []

                );

            }

        }

        catch (error) {

            console.log(error);

        }

    };
        /* =========================================
       SUBMIT FOLLOW UP
    ========================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!doctor) {

            alert("Please select a previous appointment.");

            return;

        }

        if (!form.appointment_date) {

            alert("Please select appointment date.");

            return;

        }

        if (!form.appointment_slot) {

            alert("Please select appointment slot.");

            return;

        }

        if (!form.followup_reason.trim()) {

            alert("Please enter follow up reason.");

            return;

        }

        if (!form.payment_receipt) {

            alert("Please upload payment receipt.");

            return;

        }

        try {

            setLoading(true);

            const fd = new FormData();

            fd.append("user_id", userId);

            fd.append(
                "previous_appointment_id",
                selectedAppointment
            );

            fd.append(
                "doctor_id",
                doctor.doctor_id
            );

            fd.append(
                "appointment_date",
                form.appointment_date
            );

            fd.append(
                "appointment_slot",
                form.appointment_slot
            );

            fd.append(
                "followup_reason",
                form.followup_reason
            );

            fd.append(
                "payment_method",
                form.payment_method
            );

            fd.append(
                "payment_receipt",
                form.payment_receipt
            );

            const res = await fetch(

                `${BASE_URL}/patient/book_followup_appointment.php`,

                {

                    method: "POST",

                    body: fd

                }

            );

            const data = await res.json();

            console.log(data);

            if (data.status === "success") {

                alert(data.message);

                /* RESET FORM */

                setSelectedAppointment("");

                setDoctor(null);

                setSlots([]);

                setPrescriptions([]);

                setReports([]);

                setForm({

                    appointment_date: "",

                    appointment_slot: "",

                    followup_reason: "",

                    payment_method: "JazzCash",

                    payment_receipt: null

                });

                /* REFRESH COMPLETED APPOINTMENTS */

                fetchCompletedAppointments();

            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

            alert("Server Error");

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="max-w-7xl mx-auto p-6">

            {/* =========================================
               PAGE HEADER
            ========================================= */}

            <div className="mb-8">

                <h1 className="text-4xl font-black text-[#032B38]">

                    Book Follow-Up Appointment

                </h1>

                <p className="text-slate-500 mt-2 text-lg">

                    Select one of your completed appointments to schedule a follow-up consultation.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
 {

                    doctor && (

                        <div className="bg-white rounded-3xl shadow-xl p-8">

                            <h2 className="text-3xl font-black text-[#032B38] mb-8">

                                Book Follow-Up Appointment

                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">

                                {/* Appointment Date */}

                                <div>

                                    <label className="block font-bold mb-3">

                                        Appointment Date

                                    </label>

                                    <input

                                        type="date"

                                        name="appointment_date"

                                        value={form.appointment_date}

                                        onChange={handleDate}

                                        className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:border-[#032B38] outline-none"

                                        required

                                    />

                                </div>

                                {/* Slot */}

                                <div>

                                    <label className="block font-bold mb-3">

                                        Available Slots

                                    </label>

                                    <select

                                        name="appointment_slot"

                                        value={form.appointment_slot}

                                        onChange={handleChange}

                                        className="w-full border-2 border-slate-200 rounded-2xl p-4"

                                        required

                                    >

                                        <option value="">

                                            Select Available Slot

                                        </option>

                                        {

                                            slots.map((slot)=>(

                                                <option

                                                    key={slot}

                                                    value={slot}

                                                >

                                                    {slot}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                            </div>

                            {/* Follow Up Reason */}

                            <div className="mt-8">

                                <label className="block font-bold mb-3">

                                    Follow-Up Reason

                                </label>

                                <textarea

                                    rows="5"

                                    name="followup_reason"

                                    value={form.followup_reason}

                                    onChange={handleChange}

                                    placeholder="Explain why you need a follow-up appointment..."

                                    className="w-full border-2 border-slate-200 rounded-2xl p-4 resize-none"

                                    required

                                />

                            </div>

                            {/* Payment */}

                           {/* Payment */}
<div className="grid md:grid-cols-2 gap-8 mt-8">

  {/* Payment Method */}
  <div>
    <label className="block font-bold mb-3">
      Payment Method
    </label>

    <select
      name="payment_method"
      value={form.payment_method}
      onChange={handleChange}
      className="w-full border-2 border-slate-200 rounded-2xl p-4"
    >
      <option value="JazzCash">JazzCash</option>
      <option value="EasyPaisa">EasyPaisa</option>
      <option value="Bank Transfer">Bank Transfer</option>
    </select>
  </div>

  {/* Consultation Fee */}
  <div>
    <label className="block font-bold mb-3">
      Consultation Fee
    </label>

    <div className="border-2 border-green-300 bg-green-50 rounded-2xl p-4 text-xl font-bold text-green-700">
      Rs. {doctor?.consultation_fee || 0}
    </div>
  </div>

</div>

{/* Payment Information */}

<div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">

  <h3 className="text-2xl font-bold mb-5">
    Payment Details
  </h3>

  {form.payment_method === "JazzCash" && (
    <>
      <p><strong>Account Title:</strong> Shahbaz Ahmad</p>

      <div className="flex items-center justify-between mt-3 bg-white rounded-xl p-3">
        <span className="font-bold">03097667058</span>

        <button
          type="button"
          onClick={()=>{
            navigator.clipboard.writeText("03097667058");
            alert("JazzCash number copied.");
          }}
          className="bg-[#032B38] text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>
      </div>
    </>
  )}

  {form.payment_method === "EasyPaisa" && (
    <>
      <p><strong>Account Title:</strong> Shahbaz Ahmad</p>

      <div className="flex items-center justify-between mt-3 bg-white rounded-xl p-3">
        <span className="font-bold">03331627058</span>

        <button
          type="button"
          onClick={()=>{
            navigator.clipboard.writeText("03331627058");
            alert("EasyPaisa number copied.");
          }}
          className="bg-[#032B38] text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>
      </div>
    </>
  )}

  {form.payment_method === "Bank Transfer" && (
    <>
      <p><strong>Bank:</strong> BOP</p>

      <p><strong>Account Title:</strong> Shahbaz Ahmad</p>

      <div className="flex items-center justify-between mt-3 bg-white rounded-xl p-3">
        <span className="font-bold">6020224441600010</span>

        <button
          type="button"
          onClick={()=>{
            navigator.clipboard.writeText("6020224441600010");
            alert("Bank account copied.");
          }}
          className="bg-[#032B38] text-white px-4 py-2 rounded-lg"
        >
          Copy
        </button>
      </div>
    </>
  )}

</div>

{/* Upload Receipt */}

<div className="mt-8">
  <label className="block font-bold mb-3">
    Upload Payment Receipt
  </label>

  <input
    type="file"
    accept="image/*,.pdf"
    onChange={handleFile}
    className="w-full border-2 border-slate-200 rounded-2xl p-3"
    required
  />
</div>

                            {/* Receipt Preview */}

                            {

                                form.payment_receipt && (

                                    <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">

                                        <h3 className="font-bold text-green-700">

                                            Selected Receipt

                                        </h3>

                                        <p className="mt-2">

                                            {form.payment_receipt.name}

                                        </p>

                                    </div>

                                )

                            }

                            {/* Submit */}

                            <div className="mt-10">

                                <button

                                    type="submit"

                                    disabled={loading}

                                    className="w-full bg-[#032B38] hover:bg-[#05445E] text-white py-5 rounded-2xl text-2xl font-black transition-all"

                                >

                                    {

                                        loading

                                        ?

                                        "Booking Follow-Up Appointment..."

                                        :

                                        "Book Follow-Up Appointment"

                                    }

                                </button>

                            </div>

                        </div>

                    )

                }
                {/* =========================================
                   PREVIOUS APPOINTMENT
                ========================================= */}

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <label className="block text-xl font-black text-[#032B38] mb-4">

                        Previous Completed Appointment

                    </label>

                    <select

                        value={selectedAppointment}

                        onChange={handleAppointment}

                        className="w-full border-2 border-slate-200 rounded-2xl p-4 text-lg focus:outline-none focus:border-[#032B38]"

                        required

                    >

                        <option value="">

                            Select Previous Appointment

                        </option>

                        {

                            appointments.map((item)=>(

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    #{item.id} |
                                    {item.doctor_name}
                                    |
                                    {item.appointment_date}
                                    |
                                    {item.appointment_type}

                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* =========================================
                   DOCTOR PROFILE
                ========================================= */}

                {

                    doctor && (

                        <div className="bg-white rounded-3xl shadow-xl p-8">

                            <div className="flex flex-col lg:flex-row gap-8">

                                <img

                                    src={doctor.doctor_image}

                                    alt={doctor.doctor_name}

                                    className="w-40 h-40 rounded-full object-cover border-4 border-green-300"

                                />

                                <div className="flex-1">

                                    <h2 className="text-4xl font-black text-[#032B38]">

                                        {doctor.doctor_name}

                                    </h2>

                                    <p className="text-xl text-slate-600 mt-2">

                                        {doctor.specialization}

                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                                        <div>

                                            <p className="font-bold">

                                                🏥 Hospital

                                            </p>

                                            <p>

                                                {doctor.hospital}

                                            </p>

                                        </div>

                                        <div>

                                            <p className="font-bold">

                                                📍 Location

                                            </p>

                                            <p>

                                                {doctor.city},
                                                {" "}
                                                {doctor.country}

                                            </p>

                                        </div>

                                        <div>

                                            <p className="font-bold">

                                                💰 Consultation Fee

                                            </p>

                                            <p>

                                                Rs.
                                                {" "}
                                                {doctor.consultation_fee}

                                            </p>

                                        </div>

                                        <div>

                                            <p className="font-bold">

                                                📅 Previous Appointment

                                            </p>

                                            <p>

                                                {doctor.appointment_date}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )

                }
                                {/* =========================================
                   PREVIOUS PRESCRIPTIONS
                ========================================= */}

                {

                    doctor && (

                        <div className="bg-white rounded-3xl shadow-xl p-8">

                            <div className="flex items-center justify-between mb-8">

                                <h2 className="text-3xl font-black text-[#032B38]">

                                    Previous Prescriptions

                                </h2>

                                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                                    {prescriptions.length} Record(s)

                                </span>

                            </div>

                            {

                                prescriptions.length === 0 ? (

                                    <div className="bg-slate-50 rounded-2xl p-8 text-center">

                                        <h3 className="text-2xl font-bold text-slate-500">

                                            No Previous Prescription Found

                                        </h3>

                                    </div>

                                ) : (

                                    <div className="space-y-6">

                                        {

                                            prescriptions.map((item) => (

                                                <div
                                                    key={item.id}
                                                    className="border-2 border-slate-200 rounded-3xl p-6 hover:border-green-400 transition-all"
                                                >

                                                    <div className="flex justify-between items-center mb-6">

                                                        <h3 className="text-2xl font-black text-[#032B38]">

                                                            Prescription #{item.id}

                                                        </h3>

                                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                                                            {item.created_at}

                                                        </span>

                                                    </div>

                                                    {/* Diagnosis */}

                                                    <div className="mb-6">

                                                        <h4 className="font-black text-lg text-[#032B38]">

                                                            Diagnosis

                                                        </h4>

                                                        <div className="bg-slate-50 rounded-xl p-4 mt-2">

                                                            {

                                                                item.diagnosis ||

                                                                "No diagnosis available."

                                                            }

                                                        </div>

                                                    </div>

                                                    {/* Medicines */}

                                                    <div className="mb-6">

                                                        <h4 className="font-black text-lg text-[#032B38]">

                                                            Medicines

                                                        </h4>

                                                        <div className="bg-slate-50 rounded-xl p-4 mt-2 whitespace-pre-line">

                                                            {

                                                                item.medicines ||

                                                                "No medicines prescribed."

                                                            }

                                                        </div>

                                                    </div>

                                                    {/* Advice */}

                                                    <div>

                                                        <h4 className="font-black text-lg text-[#032B38]">

                                                            Doctor Advice

                                                        </h4>

                                                        <div className="bg-slate-50 rounded-xl p-4 mt-2 whitespace-pre-line">

                                                            {

                                                                item.advice ||

                                                                "No advice available."

                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            ))

                                        }

                                    </div>

                                )

                            }

                        </div>

                    )

                }
                                {/* =========================================
                   PREVIOUS MEDICAL REPORTS
                ========================================= */}

                {

                    doctor && (

                        <div className="bg-white rounded-3xl shadow-xl p-8">

                            <div className="flex justify-between items-center mb-8">

                                <h2 className="text-3xl font-black text-[#032B38]">

                                    Previous Medical Reports

                                </h2>

                                <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">

                                    {reports.length} Report(s)

                                </span>

                            </div>

                            {

                                reports.length === 0 ? (

                                    <div className="bg-slate-50 rounded-2xl p-10 text-center">

                                        <h3 className="text-2xl font-bold text-slate-500">

                                            No Medical Reports Found

                                        </h3>

                                    </div>

                                ) : (

                                    <div className="grid md:grid-cols-2 gap-6">

                                        {

                                            reports.map((report) => (

                                                <div
                                                    key={report.id}
                                                    className="border-2 border-slate-200 rounded-3xl p-6 hover:border-green-400 transition-all"
                                                >

                                                    {/* Doctor */}

                                                    <div className="flex items-center gap-4">

                                                        <img

                                                            src={report.doctor_image}

                                                            alt={report.doctor_name}

                                                            className="w-16 h-16 rounded-full object-cover border"

                                                        />

                                                        <div>

                                                            <h3 className="font-black text-xl">

                                                                {report.doctor_name}

                                                            </h3>

                                                            <p className="text-slate-500">

                                                                {report.specialization}

                                                            </p>

                                                        </div>

                                                    </div>

                                                    {/* Report */}

                                                    <div className="mt-6">

                                                        <p className="font-bold">

                                                            Appointment Date

                                                        </p>

                                                        <p>

                                                            {report.appointment_date}

                                                        </p>

                                                    </div>

                                                    <div className="mt-4">

                                                        <p className="font-bold">

                                                            Uploaded

                                                        </p>

                                                        <p>

                                                            {report.uploaded_at}

                                                        </p>

                                                    </div>

                                                    {/* Preview */}

                                                    {

                                                        report.report_url && (

                                                            <div className="mt-6">

                                                                <img

                                                                    src={report.report_url}

                                                                    alt="Medical Report"

                                                                    className="rounded-2xl border w-full h-56 object-cover"

                                                                />

                                                            </div>

                                                        )

                                                    }

                                                    {/* Buttons */}

                                                    <div className="flex gap-4 mt-6">

                                                        <a

                                                            href={report.report_url}

                                                            target="_blank"

                                                            rel="noreferrer"

                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-bold"

                                                        >

                                                            View Report

                                                        </a>

                                                        <a

                                                            href={report.report_url}

                                                            download

                                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-bold"

                                                        >

                                                            Download

                                                        </a>

                                                    </div>

                                                </div>

                                            ))

                                        }

                                    </div>

                                )

                            }

                        </div>

                    )

                }
                                {/* =========================================
                   FOLLOW UP BOOKING
                ========================================= */}

               

            </form>

        </div>

    );

}
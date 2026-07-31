import { useEffect, useState } from "react";

import {
  CheckCircle2,
  FileText,
  Send,
  X,
  Clock3,
  UserRound,
} from "lucide-react";

const Appointments = () => {

  const [appointments, setAppointments] =
    useState([]);

  const [upcomingAppointments,
    setUpcomingAppointments] =
    useState([]);

  const [previousPending,
    setPreviousPending] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedAppointment,
    setSelectedAppointment] =
    useState(null);

  const [showPrescription,
    setShowPrescription] =
    useState(false);

  const [showViewPrescription,
    setShowViewPrescription] =
    useState(false);

  const [viewPrescriptionData,
    setViewPrescriptionData] =
    useState(null);

  const [prescriptionData,
    setPrescriptionData] =
    useState({

      diagnosis: "",

      medicines: "",

      advice: "",
    });

  /* =========================================
     LOGGED IN DOCTOR
  ========================================= */

  const doctorData = JSON.parse(

    localStorage.getItem(
      "doctorData"
    )
  );

  const doctorId =
    doctorData?.role_id;

  /* =========================================
     FETCH APPOINTMENTS
  ========================================= */

  const fetchAppointments =
    async () => {

      try {

        const response =
          await fetch(

            `https://800junkuae.online/tsh-api/API/doctors/get_appointments.php?doctor_id=${doctorId}`
          );

        const data =
          await response.json();

        const now =
          new Date();

        const next24 =
          new Date();

        next24.setHours(
          now.getHours() + 24
        );

        /* UPCOMING */

        const upcoming =
          data.appointments.filter(
            (item) => {

              const appointmentDate =
                new Date(

                  `${item.appointment_date} ${item.appointment_slot}`
                );

              return (
                appointmentDate >= now &&
                appointmentDate <= next24
              );
            }
          );

        /* SORT */

        const sortedUpcoming =
          upcoming.sort(

            (a, b) => {

              return new Date(

                `${a.appointment_date} ${a.appointment_slot}`

              ) - new Date(

                `${b.appointment_date} ${b.appointment_slot}`
              );
            }
          );

        /* PREVIOUS PENDING */

        const previous =
          data.appointments.filter(
            (item) => {

              const appointmentDate =
                new Date(

                  `${item.appointment_date} ${item.appointment_slot}`
                );

              return (
                appointmentDate < now &&
                item.status !== "completed"
              );
            }
          );

        setAppointments(
          data.appointments
        );

        setUpcomingAppointments(
          sortedUpcoming
        );

        setPreviousPending(
          previous
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  /* =========================================
     AUTO REFRESH
  ========================================= */

  useEffect(() => {

    if (doctorId) {

      fetchAppointments();
    }

    const interval =
      setInterval(() => {

        fetchAppointments();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [doctorId]);

  /* =========================================
     NEXT PATIENT
  ========================================= */

  const nextPatient =
    upcomingAppointments[0];

  /* =========================================
     COMPLETE APPOINTMENT
  ========================================= */

  const markCompleted =
    async (appointmentId) => {

      try {

        const response =
          await fetch(

            "https://800junkuae.online/tsh-api/API/doctors/complete_appointment.php",

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                appointment_id:
                  appointmentId,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          alert(
            "Appointment Completed"
          );

          fetchAppointments();

        } else {

          alert(
            data.message
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================================
     SAVE PRESCRIPTION
  ========================================= */

  const savePrescription =
    async () => {

      try {

        const response =
          await fetch(

            "https://800junkuae.online/tsh-api/API/doctors/save_prescription.php",

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                appointment_id:
                  selectedAppointment.id,

                diagnosis:
                  prescriptionData.diagnosis,

                medicines:
                  prescriptionData.medicines,

                advice:
                  prescriptionData.advice,
              }),
            }
          );

      const text = await response.text();

console.log("SERVER RESPONSE:");
console.log(text);

let data;

try {
  data = JSON.parse(text);
} catch (e) {
  console.log("Invalid JSON");
  return;
}

console.log(data);

if (data.success) {

  alert(data.message);

  setShowPrescription(false);

  fetchAppointments();

} else {

  alert(data.message);

}

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================================
     VIEW PRESCRIPTION
  ========================================= */

  const viewPrescription = async (appointmentId) => {

    try {

        const response = await fetch(
            `https://800junkuae.online/tsh-api/API/doctors/get_prescriptions.php?appointment_id=${appointmentId}`
        );

        const text = await response.text();

        console.log("VIEW RESPONSE:");
        console.log(text);

        const data = JSON.parse(text);

        console.log(data);

        if (!data.success) {

            alert(data.message || "Unable to load prescription.");

            return;

        }

        if (!data.prescriptions || data.prescriptions.length === 0) {

            alert("No Prescription Found");

            return;

        }

        setViewPrescriptionData(data.prescriptions[0]);

        setShowViewPrescription(true);

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

};

  return (

   <div className="space-y-6 lg:space-y-8">
 

      {/* ADD PRESCRIPTION MODAL */}
     
      {/* NEXT PATIENT */}
      {/* NEXT PATIENT */}

{nextPatient && (

  <div className="bg-gradient-to-r from-[#082C3B] to-[#123F50] rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border-l-4 border-yellow-400">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* Patient Information */}

      <div className="flex-1">

        <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-[3px]">

          Next Patient

        </p>

        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-2 break-words">

          {nextPatient.patient_name}

        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4 text-gray-300">

          <div className="flex items-center gap-2">

            <span className="text-lg">📅</span>

            <span className="text-sm sm:text-base md:text-lg">

              {nextPatient.appointment_date}

            </span>

          </div>

          <div className="hidden sm:block text-yellow-400">

            •

          </div>

          <div className="flex items-center gap-2">

            <span className="text-lg">🕒</span>

            <span className="text-sm sm:text-base md:text-lg">

              {nextPatient.appointment_slot}

            </span>

          </div>

        </div>

      </div>

      {/* Queue Card */}

      <div className="w-full sm:w-auto">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/10 text-center min-w-[180px]">

          <p className="text-gray-300 text-sm md:text-base">

            Queue Position

          </p>

          <h1 className="text-white text-4xl md:text-5xl font-black mt-2">

            1

          </h1>

        </div>

      </div>

    </div>

  </div>

)}

      {/* PREVIOUS PENDING */}
      {/* =========================================
    PREVIOUS PENDING APPOINTMENTS
========================================= */}

{previousPending.length > 0 && (

  <div className="bg-red-50 border border-red-200 rounded-3xl p-4 sm:p-6">

    {/* Header */}

    <div className="flex items-center gap-3 mb-6">

      <Clock3
        className="text-red-500 flex-shrink-0"
        size={28}
      />

      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-red-700">

        Previous Pending Appointments

      </h2>

    </div>

    {/* Cards */}

    <div className="space-y-5">

      {previousPending.map((item) => (

        <div
          key={item.id}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-5"
        >

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

            {/* Patient Information */}

            <div className="flex-1">

              <h2 className="font-black text-xl md:text-2xl text-[#082C3B] break-words">

                {item.patient_name}

              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-gray-500">

                <span className="flex items-center gap-2">

                  📅

                  {item.appointment_date}

                </span>

                <span className="hidden sm:block text-yellow-500">

                  •

                </span>

                <span className="flex items-center gap-2">

                  🕒

                  {item.appointment_slot}

                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">

              {/* STATUS */}

              <button
                className="bg-red-100 text-red-700 rounded-xl py-3 px-4 font-bold text-sm md:text-base"
              >

                {item.status}

              </button>

              {/* COMPLETE */}

              <button
                onClick={() => markCompleted(item.id)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 px-4 font-bold text-sm md:text-base transition"
              >

                Complete

              </button>

              {/* ADD RX */}

              <button
                onClick={() => {

                  setSelectedAppointment(item);

                  setShowPrescription(true);

                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-[#082C3B] rounded-xl py-3 px-4 font-bold text-sm md:text-base transition"
              >

                Add Rx

              </button>

              {/* VIEW RX */}

              <button
                onClick={() => viewPrescription(item.id)}
                className="bg-[#082C3B] hover:bg-[#123F50] text-white rounded-xl py-3 px-4 font-bold text-sm md:text-base transition"
              >

                View Rx

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

)}

      {/* UPCOMING APPOINTMENTS */}
      {/* =========================================
    UPCOMING APPOINTMENTS
========================================= */}

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  {/* Header */}

  <div className="bg-[#082C3B] text-white p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">

        Upcoming Appointments

      </h1>

      <p className="text-gray-300 mt-2 text-sm md:text-base">

        Next 24 Hours Schedule

      </p>

    </div>

    <div className="bg-yellow-400 text-[#082C3B] px-5 py-3 rounded-2xl font-bold text-center text-sm md:text-lg w-full md:w-auto">

      {upcomingAppointments.length} Patients

    </div>

  </div>

  {/* Loading */}

  {loading ? (

    <div className="p-8 text-center text-xl md:text-2xl font-bold">

      Loading...

    </div>

  ) : upcomingAppointments.length === 0 ? (

    <div className="p-8 text-center text-xl md:text-2xl font-bold text-gray-500">

      No Upcoming Appointments

    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="min-w-[1000px] w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4 md:p-5">

              Patient

            </th>

            <th className="text-left p-4 md:p-5">

              Date

            </th>

            <th className="text-left p-4 md:p-5">

              Time

            </th>

            <th className="text-left p-4 md:p-5">

              Status

            </th>

            <th className="text-left p-4 md:p-5">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {upcomingAppointments.map((item, index) => {

            const appointmentTime = new Date(
              `${item.appointment_date} ${item.appointment_slot}`
            );

            const currentTime = new Date();

            const difference =
              appointmentTime - currentTime;

            const minutesRemaining =
              Math.floor(difference / 1000 / 60);

            const consultationStarted =
              minutesRemaining <= 0;

            const consultationEnded =
              minutesRemaining < -30;

            const meetingAllowed =
              consultationStarted &&
              !consultationEnded;

            return (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                {/* Patient */}

                <td className="p-4 md:p-5">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-[#082C3B] text-white flex items-center justify-center shrink-0">

                      <UserRound size={22} />

                    </div>

                    <div>

                      <h2 className="font-black text-base md:text-xl text-[#082C3B]">

                        {item.patient_name}

                      </h2>

                      <p className="text-gray-500 text-sm">

                        Queue #{index + 1}

                      </p>

                    </div>

                  </div>

                </td>

                {/* Date */}

                <td className="p-4 md:p-5 whitespace-nowrap">

                  {item.appointment_date}

                </td>

                {/* Time */}

                <td className="p-4 md:p-5 whitespace-nowrap">

                  {item.appointment_slot}

                </td>

                {/* Status */}

                <td className="p-4 md:p-5">

                  {item.status === "completed" ? (

                    <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">

                      Completed

                    </span>

                  ) : (

                    <button

                      onClick={() => {

                        if (!meetingAllowed) {

                          alert(
                            "Consultation not started yet"
                          );

                          return;

                        }

                        if (

                          window.confirm(
                            "Are you sure you want to mark this appointment as completed?"
                          )

                        ) {

                          markCompleted(item.id);

                        }

                      }}

                      className={`px-4 py-2 rounded-full text-sm font-bold text-white transition

                      ${
                        meetingAllowed

                          ? "bg-yellow-500 hover:bg-yellow-600"

                          : "bg-gray-400 cursor-not-allowed"

                      }

                      `}
                    >

                      Pending

                    </button>

                  )}

                </td>

                {/* Actions */}

                <td className="p-4 md:p-5">

                  <div className="flex flex-wrap gap-2">

                    <button

                      onClick={() => {

                        setSelectedAppointment(item);

                        setShowPrescription(true);

                      }}

                      className="bg-yellow-400 hover:bg-yellow-500 text-[#082C3B] px-4 py-2 rounded-xl text-sm font-bold transition"

                    >

                      Add Rx

                    </button>

                    <button

                      onClick={() =>

                        viewPrescription(item.id)

                      }

                      className="bg-[#082C3B] hover:bg-[#123F50] text-white px-4 py-2 rounded-xl text-sm font-bold transition"

                    >

                      View Rx

                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  )}

</div>

      {/* ADD PRESCRIPTION MODAL */}
      {/* =========================================
    ADD PRESCRIPTION MODAL
========================================= */}

{showPrescription && (

  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-5">

    <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">

      {/* Header */}

      <div className="bg-[#082C3B] text-white px-5 md:px-8 py-5 flex items-center justify-between border-b-4 border-yellow-400 sticky top-0 z-10">

        <h2 className="text-xl md:text-2xl lg:text-3xl font-black">

          E-Prescription Pad

        </h2>

        <button
          onClick={() => setShowPrescription(false)}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
        >

          <X size={22} />

        </button>

      </div>

      {/* Body */}

      <div className="p-5 md:p-8 space-y-6">

        {/* Diagnosis */}

        <div>

          <label className="block font-bold text-lg md:text-xl mb-3 text-[#082C3B]">

            Diagnosis

          </label>

          <input
            type="text"
            value={prescriptionData.diagnosis}
            onChange={(e) =>
              setPrescriptionData({

                ...prescriptionData,

                diagnosis: e.target.value,

              })
            }
            placeholder="Enter patient diagnosis..."
            className="w-full border-2 border-gray-200 rounded-2xl p-4 md:p-5 text-base md:text-lg outline-none focus:border-yellow-400 transition"
          />

        </div>

        {/* Medicines */}

        <div>

          <label className="block font-bold text-lg md:text-xl mb-3 text-[#082C3B]">

            Medicines

          </label>

          <textarea
            rows={6}
            value={prescriptionData.medicines}
            onChange={(e) =>
              setPrescriptionData({

                ...prescriptionData,

                medicines: e.target.value,

              })
            }
            placeholder="Write medicines with dosage..."
            className="w-full border-2 border-gray-200 rounded-2xl p-4 md:p-5 text-base md:text-lg outline-none resize-none focus:border-yellow-400 transition"
          />

        </div>

        {/* Advice */}

        <div>

          <label className="block font-bold text-lg md:text-xl mb-3 text-[#082C3B]">

            Advice

          </label>

          <textarea
            rows={4}
            value={prescriptionData.advice}
            onChange={(e) =>
              setPrescriptionData({

                ...prescriptionData,

                advice: e.target.value,

              })
            }
            placeholder="Enter doctor's advice..."
            className="w-full border-2 border-gray-200 rounded-2xl p-4 md:p-5 text-base md:text-lg outline-none resize-none focus:border-yellow-400 transition"
          />

        </div>

        {/* Footer Buttons */}

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">

          <button

            onClick={() => setShowPrescription(false)}

            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-gray-300 text-base md:text-lg font-bold hover:bg-gray-100 transition"

          >

            Cancel

          </button>

          <button

            onClick={savePrescription}

            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-[#082C3B] px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-black flex items-center justify-center gap-3 transition"

          >

            <Send size={22} />

            Send to Patient

          </button>

        </div>

      </div>

    </div>

  </div>

)}

      {/* VIEW PRESCRIPTION MODAL */}
      {/* =========================================
    VIEW PRESCRIPTION MODAL
========================================= */}

{showViewPrescription &&
viewPrescriptionData && (

  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-5">

    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">

      {/* Header */}

      <div className="sticky top-0 bg-[#082C3B] text-white px-5 md:px-8 py-5 flex items-center justify-between border-b-4 border-yellow-400 z-10">

        <h2 className="text-xl md:text-2xl lg:text-3xl font-black">

          Prescription Details

        </h2>

        <button
          onClick={() => setShowViewPrescription(false)}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition"
        >

          <X size={24} />

        </button>

      </div>

      {/* Body */}

      <div className="p-5 md:p-8 space-y-6">

        {/* Diagnosis */}

        <div>

          <h3 className="text-lg md:text-2xl font-black text-[#082C3B] mb-3">

            Diagnosis

          </h3>

          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 md:p-5 text-sm md:text-lg leading-relaxed break-words">

            {viewPrescriptionData.diagnosis || "No diagnosis available."}

          </div>

        </div>

        {/* Medicines */}

        <div>

          <h3 className="text-lg md:text-2xl font-black text-[#082C3B] mb-3">

            Medicines

          </h3>

          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 md:p-5 text-sm md:text-lg whitespace-pre-line break-words leading-relaxed">

            {viewPrescriptionData.medicines || "No medicines added."}

          </div>

        </div>

        {/* Advice */}

        <div>

          <h3 className="text-lg md:text-2xl font-black text-[#082C3B] mb-3">

            Advice

          </h3>

          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 md:p-5 text-sm md:text-lg whitespace-pre-line break-words leading-relaxed">

            {viewPrescriptionData.advice || "No advice available."}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="sticky bottom-0 bg-white border-t p-4 md:p-6 flex justify-end">

        <button

          onClick={() => setShowViewPrescription(false)}

          className="w-full sm:w-auto bg-[#082C3B] hover:bg-[#123F50] text-white px-8 py-3 rounded-2xl font-bold transition"

        >

          Close

        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
};

export default Appointments;
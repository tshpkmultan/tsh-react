import { useEffect, useState } from "react";

import {
  FileText,
  User,
  Calendar,
  Pill,
  ClipboardList,
  PlusCircle,
} from "lucide-react";

const Prescriptions = () => {

  const [pendingAppointments,
    setPendingAppointments] =
    useState([]);

  const [completedPrescriptions,
    setCompletedPrescriptions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  /*
  =========================================
  PRESCRIPTION MODAL
  =========================================
  */

  const [showForm,
    setShowForm] =
    useState(false);

  const [selectedAppointment,
    setSelectedAppointment] =
    useState(null);

  const [formData,
    setFormData] =
    useState({

      diagnosis: "",
      medicines: "",
      advice: "",

    });

  /*
  =========================================
  DOCTOR DATA
  =========================================
  */

  const doctorData = JSON.parse(
    localStorage.getItem(
      "doctorData"
    )
  );

  const doctorId =
    doctorData?.role_id;

  /*
  =========================================
  FETCH DATA
  =========================================
  */

  const fetchData =
    async () => {

      try {

        /*
        =========================================
        APPOINTMENTS
        =========================================
        */

        const pendingRes =
          await fetch(

            `https://800junkuae.online/tsh-api/API/doctors/get_appointments.php?doctor_id=${doctorId}`

          );

        const pendingData =
          await pendingRes.json();

        /*
        =========================================
        PRESCRIPTIONS
        =========================================
        */

        const prescriptionRes =
          await fetch(

            `https://800junkuae.online/tsh-api/API/doctors/get_prescription.php?doctor_id=${doctorId}`

          );

        const prescriptionData =
          await prescriptionRes.json();

        /*
        =========================================
        FILTER PENDING
        =========================================
        */

        const pending =
          (pendingData.appointments || [])
          .filter(
            (item) =>
              item.status === "pending"
          );

        setPendingAppointments(
          pending
        );

        /*
        =========================================
        SET PRESCRIPTIONS
        =========================================
        */

        setCompletedPrescriptions(
          prescriptionData.prescriptions || []
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  /*
  =========================================
  LOAD
  =========================================
  */

  useEffect(() => {

    if (doctorId) {

      fetchData();
    }

  }, [doctorId]);

  /*
  =========================================
  THIS MONTH
  =========================================
  */

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const thisMonth =
    completedPrescriptions.filter(
      (item) => {

        const date =
          new Date(item.created_at);

        return (

          date.getMonth() ===
          currentMonth &&

          date.getFullYear() ===
          currentYear

        );
      }
    );

  /*
  =========================================
  LAST MONTH
  =========================================
  */

  const lastMonth =
    completedPrescriptions.filter(
      (item) => {

        const date =
          new Date(item.created_at);

        const previousMonth =
          currentMonth === 0
            ? 11
            : currentMonth - 1;

        return (
          date.getMonth() ===
          previousMonth
        );
      }
    );

  /*
  =========================================
  OPEN FORM
  =========================================
  */

  const openPrescriptionForm =
    (item) => {

      setSelectedAppointment(item);

      setShowForm(true);
    };

  /*
  =========================================
  SAVE PRESCRIPTION
  =========================================
  */

  /* =========================================
   SAVE PRESCRIPTION
========================================= */

const handleSavePrescription = async () => {

    if (
        !formData.diagnosis ||
        !formData.medicines ||
        !formData.advice
    ) {
        alert("All fields required");
        return;
    }

    try {

        const response = await fetch(
            "https://800junkuae.online/tsh-api/API/doctors/save_prescription.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    appointment_id: selectedAppointment.id,
                    diagnosis: formData.diagnosis,
                    medicines: formData.medicines,
                    advice: formData.advice,
                }),
            }
        );

        const text = await response.text();

        console.log("SAVE RESPONSE:");
        console.log(text);

        let data;

        try {

            data = JSON.parse(text);

        } catch (e) {

            console.log("Invalid JSON");

            alert(text);

            return;

        }

        alert(data.message);

        if (data.success) {

            setShowForm(false);

            setSelectedAppointment(null);

            setFormData({
                diagnosis: "",
                medicines: "",
                advice: "",
            });

            fetchData();

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

};

  /*
  =========================================
  PRESCRIPTION CARD
  =========================================
  */

  const PrescriptionCard =
    ({ item }) => (

      <div className="bg-[#0A3A42] rounded-3xl p-7 shadow-lg border border-[#14515C]">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">

          <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-[#0F4A54] text-white flex items-center justify-center border-2 border-[#1D6672]">

              <User size={45} />

            </div>

            <div>

              <h2 className="text-4xl font-black text-white capitalize">

                {item.patient_name}

              </h2>

              <div className="flex items-center gap-3 mt-3">

                <Calendar
                  className="text-yellow-400"
                  size={20}
                />

                <p className="text-gray-300 text-lg">

                  {item.created_at}

                </p>

              </div>

            </div>

          </div>

          <div>

            <span className="bg-green-500 text-white px-5 py-3 rounded-full font-black text-lg shadow">

              Completed

            </span>

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* DIAGNOSIS */}
          <div className="bg-[#0F4A54] rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <ClipboardList
                className="text-yellow-400"
                size={24}
              />

              <h3 className="text-2xl font-black text-white">

                Diagnosis

              </h3>

            </div>

            <p className="text-gray-300 whitespace-pre-line">

              {item.diagnosis}

            </p>

          </div>

          {/* MEDICINES */}
          <div className="bg-[#0F4A54] rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <Pill
                className="text-yellow-400"
                size={24}
              />

              <h3 className="text-2xl font-black text-white">

                Medicines

              </h3>

            </div>

            <p className="text-gray-300 whitespace-pre-line">

              {item.medicines}

            </p>

          </div>

          {/* ADVICE */}
          <div className="bg-[#0F4A54] rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <FileText
                className="text-yellow-400"
                size={24}
              />

              <h3 className="text-2xl font-black text-white">

                Advice

              </h3>

            </div>

            <p className="text-gray-300 whitespace-pre-line">

              {item.advice}

            </p>

          </div>

        </div>

      </div>
    );

  return (

    <div className="space-y-10">

      {/* HEADER */}
      <div className="bg-[#082C3B] text-white rounded-3xl p-6 shadow-lg flex items-center gap-4">

        <FileText
          className="text-yellow-400"
          size={40}
        />

        <div>

          <h1 className="text-4xl font-black">

            Prescription Management

          </h1>

          <p className="text-gray-300 mt-2">

            Manage all patient prescriptions

          </p>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white rounded-3xl p-10 text-2xl font-bold">

          Loading...

        </div>

      ) : (

        <>

          {/* PENDING */}
          <div className="space-y-5">

            <h2 className="text-3xl font-black text-[#082C3B]">

              Pending Appointments

            </h2>

            {pendingAppointments.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 font-bold">

                No Pending Appointments

              </div>

            ) : (

              pendingAppointments.map(
                (item) => (

                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 shadow-lg flex flex-col lg:flex-row justify-between gap-5"
                  >

                    <div>

                      <h2 className="text-3xl font-black text-[#082C3B]">

                        {item.patient_name}

                      </h2>

                      <p className="text-gray-500 mt-3">

                        {item.appointment_date}
                        {" | "}
                        {item.appointment_slot}

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        openPrescriptionForm(item)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3"
                    >

                      <PlusCircle size={24} />

                      Add Prescription

                    </button>

                  </div>
                )
              )

            )}

          </div>

          {/* THIS MONTH */}
          <div className="space-y-5">

            <h2 className="text-3xl font-black text-[#082C3B]">

              Latest Prescriptions (This Month)

            </h2>

            {thisMonth.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 font-bold">

                No Prescriptions This Month

              </div>

            ) : (

              thisMonth.map((item) => (

                <PrescriptionCard
                  key={item.id}
                  item={item}
                />

              ))

            )}

          </div>

          {/* LAST MONTH */}
          <div className="space-y-5">

            <h2 className="text-3xl font-black text-[#082C3B]">

              Last Month Prescriptions

            </h2>

            {lastMonth.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 font-bold">

                No Last Month Prescriptions

              </div>

            ) : (

              lastMonth.map((item) => (

                <PrescriptionCard
                  key={item.id}
                  item={item}
                />

              ))

            )}

          </div>

        </>

      )}

      {/* PRESCRIPTION MODAL */}
      {showForm && (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl">

            <h2 className="text-4xl font-black text-[#082C3B] mb-8">

              Add Prescription

            </h2>

            {/* PATIENT */}
            <div className="mb-6">

              <p className="text-xl font-bold text-gray-700">

                Patient:
                {" "}
                {selectedAppointment?.patient_name}

              </p>

            </div>

            {/* DIAGNOSIS */}
            <div className="mb-6">

              <label className="block mb-3 font-black text-[#082C3B]">

                Diagnosis

              </label>

              <textarea
                rows="4"
                value={formData.diagnosis}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    diagnosis:
                      e.target.value,

                  })
                }
                className="w-full border-2 border-gray-200 rounded-2xl p-5 outline-none focus:border-[#082C3B]"
              />

            </div>

            {/* MEDICINES */}
            <div className="mb-6">

              <label className="block mb-3 font-black text-[#082C3B]">

                Medicines

              </label>

              <textarea
                rows="5"
                value={formData.medicines}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    medicines:
                      e.target.value,

                  })
                }
                className="w-full border-2 border-gray-200 rounded-2xl p-5 outline-none focus:border-[#082C3B]"
              />

            </div>

            {/* ADVICE */}
            <div className="mb-6">

              <label className="block mb-3 font-black text-[#082C3B]">

                Advice

              </label>

              <textarea
                rows="4"
                value={formData.advice}
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    advice:
                      e.target.value,

                  })
                }
                className="w-full border-2 border-gray-200 rounded-2xl p-5 outline-none focus:border-[#082C3B]"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                onClick={
                  handleSavePrescription
                }
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl text-xl font-black"
              >

                Save Prescription

              </button>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-5 rounded-2xl text-xl font-black"
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Prescriptions;
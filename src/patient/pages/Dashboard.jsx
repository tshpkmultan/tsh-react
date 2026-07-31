import { useEffect, useState } from "react";

import AppointmentCard from "../components/AppointmentCard";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {

  /*
  =========================================
  STATES
  =========================================
  */

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({

    visits: 0,
    prescriptions: 0,
    reports: 0,

  });

  const [patientName, setPatientName] =
    useState("Patient");

  /*
  =========================================
  GET LOGIN USER
  =========================================
  */
const auth = JSON.parse(
    localStorage.getItem("user")
);

  console.log("AUTH:", auth);

  /*
  =========================================
  USER ID
  =========================================
  */

  const userId = auth?.user_id || auth?.id;

  console.log("USER ID:", userId);

  /*
  =========================================
  FETCH DASHBOARD
  =========================================
  */

  useEffect(() => {

    if (!userId) {

      setLoading(false);
      return;
    }

    fetchDashboard();

  }, [userId]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        /*
        =========================================
        GET APPOINTMENTS
        =========================================
        */

        const appointmentRes =
          await fetch(

            `https://800junkuae.online/tsh-api/API/patient/get_patient_appointments.php?patient_id=${userId}`

          );

        const appointmentData =
          await appointmentRes.json();

        console.log(
          "APPOINTMENTS:",
          appointmentData
        );

        /*
        =========================================
        GET PRESCRIPTIONS
        =========================================
        */

        const prescriptionRes =
          await fetch(

            `https://800junkuae.online/tsh-api/API/patient/get_patient_prescriptions.php?patient_id=${userId}`

          );

        const prescriptionData =
          await prescriptionRes.json();

        console.log(
          "PRESCRIPTIONS:",
          prescriptionData
        );

        /*
        =========================================
        APPOINTMENTS ARRAY
        =========================================
        */

        const appointments =

          appointmentData.appointments || [];

        /*
        =========================================
        PRESCRIPTIONS ARRAY
        =========================================
        */

        const prescriptions =

          prescriptionData.prescriptions || [];

        /*
        =========================================
        PATIENT NAME
        =========================================
        */

        if (appointments.length > 0) {

          setPatientName(

            appointments[0]
              .patient_name ||

            appointments[0]
              .full_name ||

            "Patient"

          );
        }

        /*
        =========================================
        STATS
        =========================================
        */

        setStats({

          visits:
            appointments.length,

          prescriptions:
            prescriptions.length,

          reports:
appointments.filter(
    (item) =>
        Array.isArray(item.reports) &&
        item.reports.length > 0
).length,

        });

      }

      catch (error) {

        console.log(
          "DASHBOARD ERROR:",
          error
        );
      }

      finally {

        setLoading(false);
      }
    };

  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-[#032B38] to-[#05445E] rounded-[35px] p-10 shadow-2xl text-white">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}

          <div>

            <h1 className="text-5xl font-black leading-tight">

              Hello,
              {" "}
              {patientName}
              {" "}
              👋

            </h1>

            <p className="text-slate-200 text-xl mt-4">

              Welcome back to your patient dashboard.
              Here is your latest health overview.

            </p>

          </div>

          {/* RIGHT */}

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 min-w-[260px]">

            <h2 className="text-2xl font-black">

              Patient ID

            </h2>

            <p className="text-5xl font-black mt-3">

              #{userId}

            </p>

          </div>

        </div>

      </div>

      {/* APPOINTMENT CARD */}

      <AppointmentCard />

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* VISITS */}

        <div className="bg-white rounded-[30px] shadow-2xl p-8 border-l-[10px] border-blue-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg font-bold">

                Total Visits

              </p>

              <h2 className="text-5xl font-black text-[#032B38] mt-4">

                {

                  loading
                    ? "..."
                    : stats.visits

                }

              </h2>

            </div>

            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-4xl">

              🏥

            </div>

          </div>

        </div>

        {/* PRESCRIPTIONS */}

        <div className="bg-white rounded-[30px] shadow-2xl p-8 border-l-[10px] border-yellow-400">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg font-bold">

                Prescriptions

              </p>

              <h2 className="text-5xl font-black text-[#032B38] mt-4">

                {

                  loading
                    ? "..."
                    : stats.prescriptions

                }

              </h2>

            </div>

            <div className="w-20 h-20 rounded-3xl bg-yellow-100 flex items-center justify-center text-4xl">

              📄

            </div>

          </div>

        </div>

        {/* REPORTS */}

        <div className="bg-white rounded-[30px] shadow-2xl p-8 border-l-[10px] border-green-500">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg font-bold">

                Lab Reports

              </p>

              <h2 className="text-5xl font-black text-[#032B38] mt-4">

                {

                  loading
                    ? "..."
                    : stats.reports

                }

              </h2>

            </div>

            <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center text-4xl">

              🧪

            </div>

          </div>

        </div>

      </div>

      {/* QUICK SUMMARY */}

      <div className="bg-white rounded-[35px] shadow-2xl p-10">

        <h2 className="text-3xl font-black text-[#032B38] mb-8">

          Quick Summary

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* TOTAL */}

          <div className="bg-[#F8FAFC] rounded-3xl p-8">

            <p className="text-slate-400 font-bold text-lg">

              Total Appointments

            </p>

            <h3 className="text-5xl font-black text-[#032B38] mt-4">

              {

                loading
                  ? "..."
                  : stats.visits

              }

            </h3>

          </div>

          {/* PRESCRIPTIONS */}

          <div className="bg-[#F8FAFC] rounded-3xl p-8">

            <p className="text-slate-400 font-bold text-lg">

              Active Prescriptions

            </p>

            <h3 className="text-5xl font-black text-[#032B38] mt-4">

              {

                loading
                  ? "..."
                  : stats.prescriptions

              }

            </h3>

          </div>

          {/* REPORTS */}

          <div className="bg-[#F8FAFC] rounded-3xl p-8">

            <p className="text-slate-400 font-bold text-lg">

              Uploaded Reports

            </p>

            <h3 className="text-5xl font-black text-[#032B38] mt-4">

              {

                loading
                  ? "..."
                  : stats.reports

              }

            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}
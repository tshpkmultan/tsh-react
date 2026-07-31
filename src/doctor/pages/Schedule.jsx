import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Schedule = () => {

  const [appointments,
    setAppointments] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

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

        if (data.success) {

          setAppointments(
            data.appointments
          );

        }

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  /* =========================================
     LOAD
  ========================================= */

  useEffect(() => {

    if (doctorId) {

      fetchAppointments();
    }

  }, [doctorId]);

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#082C3B] rounded-3xl p-7 shadow-lg text-white flex items-center gap-4">

        <CalendarDays
          size={42}
          className="text-yellow-400"
        />

        <div>

          <h1 className="text-4xl font-black">

            Doctor Schedule

          </h1>

          <p className="text-gray-300 mt-2">

            All appointments and meeting schedule

          </p>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="bg-white rounded-3xl p-10 text-2xl font-bold">

          Loading Schedule...

        </div>

      ) : appointments.length === 0 ? (

        <div className="bg-white rounded-3xl p-10 text-2xl font-bold text-gray-500">

          No Schedule Found

        </div>

      ) : (

        <div className="space-y-6">

          {appointments.map(
            (item, index) => {

              const appointmentTime =
                new Date(

                  item.appointment_date +
                  " " +
                  item.appointment_slot
                );

              const now =
                new Date();

              const isCompleted =
                item.status ===
                "completed";

              const isPast =
                appointmentTime < now;

              return (

                <div
                  key={item.id}
                  className="bg-[#0A3A42] rounded-3xl p-7 border border-[#14515C] shadow-lg"
                >

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                      {/* ICON */}
                      <div className="w-24 h-24 rounded-full bg-[#0F4A54] border-2 border-[#1D6672] text-white flex items-center justify-center">

                        <User size={45} />

                      </div>

                      {/* INFO */}
                      <div>

                        <h2 className="text-4xl font-black text-white capitalize">

                          {item.patient_name}

                        </h2>

                        <p className="text-gray-300 text-lg mt-3">

                          Phone:
                          {" "}
                          {item.patient_phone}

                        </p>

                        <div className="flex items-center gap-3 mt-4">

                          <CalendarDays
                            size={20}
                            className="text-yellow-400"
                          />

                          <p className="text-gray-300 text-lg">

                            {item.appointment_date}

                          </p>

                        </div>

                        <div className="flex items-center gap-3 mt-3">

                          <Clock3
                            size={20}
                            className="text-yellow-400"
                          />

                          <p className="text-gray-300 text-lg">

                            {item.appointment_slot}

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-start lg:items-end justify-between">

                      {/* STATUS */}
                      <div>

                        {isCompleted ? (

                          <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-full font-black text-lg shadow-lg">

                            <CheckCircle2
                              size={22}
                            />

                            Completed

                          </div>

                        ) : (

                          <div className="flex items-center gap-3 bg-red-500 text-white px-5 py-3 rounded-full font-black text-lg shadow-lg">

                            <XCircle
                              size={22}
                            />

                            Pending

                          </div>

                        )}

                      </div>

                      {/* QUEUE */}
                      <div className="mt-6">

                        <span className="bg-yellow-400 text-[#082C3B] px-5 py-3 rounded-full font-black shadow-lg">

                          Queue Position:
                          {" "}
                          {index + 1}

                        </span>

                      </div>

                      {/* MEETING */}
                      <div className="mt-6">

                        {item.meet_link ? (

                          <a
                            href={item.meet_link}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-2xl font-black transition-all shadow-lg"
                          >

                            Join Video Call

                          </a>

                        ) : (

                          <button
                            disabled
                            className="bg-gray-500 text-white px-7 py-3 rounded-2xl font-black cursor-not-allowed"
                          >

                            No Meeting Link

                          </button>

                        )}

                      </div>

                      {/* TIME STATUS */}
                      <div className="mt-5">

                        {isPast ? (

                          <p className="text-red-300 font-bold">

                            Appointment Time Passed

                          </p>

                        ) : (

                          <p className="text-green-300 font-bold">

                            Upcoming Appointment

                          </p>

                        )}

                      </div>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}

    </div>
  );
};

export default Schedule;
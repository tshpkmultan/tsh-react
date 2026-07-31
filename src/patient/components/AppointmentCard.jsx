import { useEffect, useState } from "react";

export default function AppointmentCard() {

  /*
  =========================================
  STATES
  =========================================
  */

  const [appointment,
    setAppointment] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  /*
  =========================================
  USER
  =========================================
  */

  const user = JSON.parse(localStorage.getItem("user"));

const patientId = user?.user_id;

  /*
  =========================================
  FETCH APPOINTMENT
  =========================================
  */

  useEffect(() => {

    if (!patientId) return;

    fetchAppointment();

  }, [patientId]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchAppointment =
    async () => {

      try {

        const res =
          await fetch(

            `https://800junkuae.online/tsh-api/API/patient/get_patient_appointments.php?patient_id=${patientId}`

          );

        const text = await res.text();

console.log(text);

const data = JSON.parse(text);

        /*
        =========================================
        GET LATEST APPOINTMENT
        =========================================
        */

        if (

          data.appointments &&

          data.appointments.length > 0

        ) {

          setAppointment(
            data.appointments[0]
          );
        }

      }

      catch (error) {

        console.log(error);
      }

      finally {

        setLoading(false);
      }
    };

  /*
  =========================================
  JOIN CALL
  =========================================
  */

  const joinMeeting = () => {
  if (appointment?.meet_link) {
    window.open(appointment.meet_link, "_blank");
  } else {
    alert("Meeting link not available yet");
  }
};

  /*
  =========================================
  NO APPOINTMENT
  =========================================
  */

  if (

    !loading &&

    !appointment

  ) {

    return (

      <div className="bg-white rounded-[40px] p-10 shadow-xl text-center">

        <h2 className="text-3xl font-black text-[#032B38]">

          No Upcoming Appointments

        </h2>

        <p className="text-slate-500 mt-3 text-lg">

          You currently have no appointments scheduled.

        </p>

      </div>

    );
  }

  return (

    <div className="bg-gradient-to-r from-[#032B38] to-[#0B4A5A] rounded-[40px] p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between shadow-2xl overflow-hidden relative">

      {/* SIDE LINE */}

      <div className="absolute top-0 left-0 h-full w-2 bg-yellow-400"></div>

      {/* CONTENT */}

      <div className="flex items-center gap-6">

        {/* ICON */}

        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-5xl text-white">

          👨‍⚕️

        </div>

        {/* DETAILS */}

        <div>

          <span className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-black tracking-wide uppercase">

            {

              loading

                ? "Loading..."

                : appointment?.status ||
                  "Upcoming"

            }

          </span>

          <h2 className="text-5xl font-black text-white mt-5">

            {

              loading

                ? "Loading..."

                : appointment?.doctor_name ||
                  "Doctor"

            }

          </h2>

          <p className="text-yellow-300 text-xl mt-2 font-bold">

            {

              loading

                ? "Loading..."

                : appointment?.specialization ||
                  "Specialist"

            }

          </p>

          <p className="text-white mt-5 text-lg font-semibold">

            🕒
            {" "}

            {

              loading

                ? "Loading..."

                : `${appointment?.appointment_date}
                   , ${appointment?.appointment_slot}`

            }

          </p>

        </div>

      </div>

      {/* BUTTON */}

      <button
        onClick={joinMeeting}
        className="mt-10 lg:mt-0 bg-green-500 hover:bg-green-600 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
      >

        🎥 Join Video Call

      </button>

    </div>
  );
}
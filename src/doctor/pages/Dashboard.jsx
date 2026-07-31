import { useEffect, useState } from "react";

import {
  Users,
  FilePenLine,
  CheckCircle2,
  Video,
  User,
  Clock3,
} from "lucide-react";

const Dashboard = () => {

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  /* =========================================
     LOGGED IN DOCTOR
  ========================================= */

  const doctorData = JSON.parse(
    localStorage.getItem("doctorData")
  );

  const doctorId =
    doctorData?.role_id;

  /* =========================================
     CONVERT TIME AM/PM TO 24 HOUR
  ========================================= */

  const convertTo24Hour = (time12h) => {

    if (!time12h) return "00:00:00";

    const [time, modifier] =
      time12h.split(" ");

    let [hours, minutes] =
      time.split(":");

    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    hours =
      hours.toString().padStart(2, "0");

    return `${hours}:${minutes}:00`;
  };

  /* =========================================
     VIDEO CALL
  ========================================= */

  const startVideoCall = async (appointmentId) => {

  try {

    const response = await fetch(

      `https://800junkuae.online/tsh-api/API/doctors/get_meet_link.php?appointment_id=${appointmentId}`

    );

    const text = await response.text();

    console.log("API RESPONSE:", text);

    const data = JSON.parse(text);

    if (data.success) {

      if (data.meet_link && data.meet_link !== "") {

        window.open(data.meet_link, "_blank");

      } else {

        alert("Google Meet link has not been generated yet.");

      }

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log("VIDEO CALL ERROR:", error);

    alert("Unable to open Google Meet.");

  }

};

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

        setAppointments(
          data.appointments || []
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

        setCurrentTime(
          new Date()
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [doctorId]);

  /* =========================================
     FILTER NEXT 24 HOURS
  ========================================= */

  const now = new Date();

  const next24 = new Date();

  next24.setHours(
    now.getHours() + 24
  );

  const upcomingAppointments =
    appointments

      .filter((item) => {

        const appointmentDate =
          new Date(
            item.appointment_date +
            "T" +
            convertTo24Hour(
              item.appointment_slot
            )
          );

        return (
          !isNaN(appointmentDate) &&
          appointmentDate >= now &&
          appointmentDate <= next24
        );
      })

      .sort((a, b) => {

        const dateA =
          new Date(
            a.appointment_date +
            "T" +
            convertTo24Hour(
              a.appointment_slot
            )
          );

        const dateB =
          new Date(
            b.appointment_date +
            "T" +
            convertTo24Hour(
              b.appointment_slot
            )
          );

        return dateA - dateB;
      });

  /* =========================================
     COUNTS
  ========================================= */

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const completedAppointments =
    appointments.filter(
      (item) =>
        item.status === "completed"
    ).length;

  return (

    <div className="space-y-8">

      {/* LOADING */}
      {loading ? (

        <div className="text-2xl font-bold">
          Loading Dashboard...
        </div>

      ) : (

        <>

          {/* TOP CARDS */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="bg-white rounded-3xl p-7 border-l-4 border-blue-500 shadow-sm flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-xl font-semibold">
                  Total Appointments
                </p>

                <h1 className="text-6xl font-black text-[#082C3B] mt-4">
                  {totalAppointments}
                </h1>

              </div>

              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                <Users
                  className="text-blue-500"
                  size={38}
                />

              </div>

            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl p-7 border-l-4 border-yellow-400 shadow-sm flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-xl font-semibold">
                  Pending
                </p>

                <h1 className="text-6xl font-black text-[#082C3B] mt-4">
                  {pendingAppointments}
                </h1>

              </div>

              <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

                <FilePenLine
                  className="text-yellow-500"
                  size={38}
                />

              </div>

            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-3xl p-7 border-l-4 border-green-500 shadow-sm flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-xl font-semibold">
                  Completed
                </p>

                <h1 className="text-6xl font-black text-[#082C3B] mt-4">
                  {completedAppointments}
                </h1>

              </div>

              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                <CheckCircle2
                  className="text-green-500"
                  size={38}
                />

              </div>

            </div>

          </div>

          {/* UPCOMING APPOINTMENTS */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            <div className="bg-[#0A3A42] text-white p-6 flex items-center gap-4">

              <Clock3
                className="text-yellow-400"
                size={35}
              />

              <h1 className="text-4xl font-black">
                Upcoming Patients (24 Hours)
              </h1>

            </div>

            {upcomingAppointments.length === 0 ? (

              <div className="p-10 text-2xl font-bold text-gray-500">
                No Upcoming Appointments
              </div>

            ) : (

              <div className="p-6 space-y-5">

                {upcomingAppointments.map(
                  (item, index) => {

                    const appointmentTime =
                      new Date(
                        item.appointment_date +
                        "T" +
                        convertTo24Hour(
                          item.appointment_slot
                        )
                      );

                    const difference =
                      appointmentTime -
                      currentTime;

                    const minutes =
                      Math.floor(
                        difference / 1000 / 60
                      );

                    let statusText =
                      "";

                    if (minutes > 0) {

                      statusText =
                        `${minutes} Minutes Remaining`;

                    } else if (
                      minutes <= 0 &&
                      minutes > -30
                    ) {

                      statusText =
                        "Consultation Started";

                    } else {

                      statusText =
                        "Appointment Passed";
                    }

                    return (

                      <div
                        key={item.id}
                        className="bg-[#0A3A42] border border-[#14515C] rounded-3xl p-6 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-2xl transition-all"
                      >

                        {/* LEFT */}
                        <div className="flex items-center gap-5">

                          {/* USER ICON */}
                          <div className="w-24 h-24 rounded-full bg-[#0F4A54] text-white flex items-center justify-center shadow-lg border-2 border-[#1D6672]">

                            <User size={45} />

                          </div>

                          {/* PATIENT INFO */}
                          <div>

                            {/* NAME */}
                            <h2 className="text-4xl font-black text-white capitalize">
                              {item.patient_name}
                            </h2>

                            {/* DATE + TIME */}
                            <p className="text-gray-300 text-xl mt-2 font-medium">

                              {item.appointment_date}
                              {" | "}
                              {item.appointment_slot}

                            </p>

                            {/* PHONE */}
                            <p className="text-gray-300 mt-2 text-lg">
                              {item.patient_phone}
                            </p>

                            {/* QUEUE */}
                            <div className="mt-4">

                              <span className="bg-yellow-400 text-[#082C3B] px-4 py-2 rounded-full font-black text-sm shadow">

                                Queue Position:
                                {" "}
                                {index + 1}

                              </span>

                            </div>

                            {/* LIVE STATUS */}
                            <div className="flex items-center gap-3 mt-5">

                              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse shadow-lg"></div>

                              <p className="text-green-300 font-bold text-lg">

                                {statusText}

                              </p>

                            </div>

                          </div>

                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col justify-center">

                          <button
                            onClick={() =>
                              startVideoCall(
                                item.id
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-3"
                          >

                            <Video size={26} />

                            Start Video Call

                          </button>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </>

      )}

    </div>
  );
};

export default Dashboard;
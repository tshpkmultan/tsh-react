import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Building2,
  BadgeCheck,
  UserRound,
  Stethoscope,
} from "lucide-react";

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

const user = JSON.parse(localStorage.getItem("user"));

const patientId = user?.user_id;

  /*
  =========================================
  FETCH APPOINTMENTS
  =========================================
  */

  useEffect(() => {

    if (patientId) {

      fetchAppointments();
    }

  }, [patientId]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchAppointments = async () => {

    try {

      const response = await fetch(

        `https://800junkuae.online/tsh-api/API/patient/get_patient_appointments.php?patient_id=${patientId}`

      );

      const data = await response.json();

      if (data.status === "success") {

        setAppointments(data.appointments);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-[#032B38] to-[#05445E] rounded-[30px] p-8 shadow-2xl text-white">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-2xl">

            <CalendarDays size={38} />

          </div>

          <div>

            <h1 className="text-4xl font-black">

              My Appointments

            </h1>

            <p className="text-slate-200 mt-2 text-lg">

              View all your booked doctor appointments

            </p>

          </div>

        </div>

      </div>

      {/* LOADING */}

      {

        loading ? (

          <div className="bg-white rounded-[30px] p-12 shadow-xl text-center">

            <div className="w-14 h-14 border-4 border-[#032B38] border-t-transparent rounded-full animate-spin mx-auto"></div>

            <h2 className="text-2xl font-black text-[#032B38] mt-6">

              Loading Appointments...

            </h2>

          </div>

        ) :

        appointments.length === 0 ? (

          <div className="bg-white rounded-[30px] p-12 shadow-xl text-center">

            <div className="bg-[#F4F7FB] w-24 h-24 rounded-full flex items-center justify-center mx-auto">

              <CalendarDays
                size={40}
                className="text-[#032B38]"
              />

            </div>

            <h2 className="text-3xl font-black text-[#032B38] mt-6">

              No Appointments Found

            </h2>

            <p className="text-slate-500 mt-3 text-lg">

              You haven’t booked any appointments yet.

            </p>

          </div>

        ) : (

          <div className="grid gap-8">

            {

              appointments.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-[35px] overflow-hidden shadow-2xl border border-slate-100"
                >

                  {/* TOP BAR */}

                  <div className="bg-gradient-to-r from-[#032B38] to-[#05445E] p-7 text-white">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                      {/* LEFT */}

                      <div className="flex items-center gap-5">

                        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">

                          <UserRound size={38} />

                        </div>

                        <div>

                          <h2 className="text-3xl font-black">

                            {item.doctor_name}

                          </h2>

                          <div className="flex items-center gap-2 mt-2 text-slate-200">

                            <Stethoscope size={18} />

                            <span className="text-lg">

                              {item.specialization}

                            </span>

                          </div>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div>

                        <span
                          className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wide ${
                            item.status === "completed"
                              ? "bg-green-500"
                              : item.status === "pending"
                              ? "bg-yellow-400 text-black"
                              : "bg-red-500"
                          }`}
                        >

                          {item.status}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-8">

                    {/* INFO GRID */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                      {/* DATE */}

                      <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-100">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="bg-[#032B38] text-white p-3 rounded-2xl">

                            <CalendarDays size={20} />

                          </div>

                          <h3 className="font-black text-slate-500">

                            Appointment Date

                          </h3>

                        </div>

                        <p className="text-2xl font-black text-[#032B38]">

                          {item.appointment_date}

                        </p>

                      </div>

                      {/* TIME */}

                      <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-100">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="bg-[#032B38] text-white p-3 rounded-2xl">

                            <Clock3 size={20} />

                          </div>

                          <h3 className="font-black text-slate-500">

                            Appointment Time

                          </h3>

                        </div>

                        <p className="text-2xl font-black text-[#032B38]">

                          {item.appointment_slot}

                        </p>

                      </div>

                      {/* HOSPITAL */}

                      <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-100">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="bg-[#032B38] text-white p-3 rounded-2xl">

                            <Building2 size={20} />

                          </div>

                          <h3 className="font-black text-slate-500">

                            Hospital

                          </h3>

                        </div>

                        <p className="text-2xl font-black text-[#032B38]">

                          {item.hospital}

                        </p>

                      </div>

                      {/* STATUS */}

                      <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-100">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="bg-[#032B38] text-white p-3 rounded-2xl">

                            <BadgeCheck size={20} />

                          </div>

                          <h3 className="font-black text-slate-500">

                            Status

                          </h3>

                        </div>

                        <p className="text-2xl font-black text-[#032B38] capitalize">

                          {item.status}

                        </p>

                      </div>

                    </div>

                    {/* EXTRA INFO */}

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                      <div className="bg-[#F8FAFC] rounded-3xl p-6">

                        <p className="text-slate-400 font-bold">

                          Consultation Fee

                        </p>

                        <h3 className="text-3xl font-black text-[#032B38] mt-2">

                          Rs. {item.consultation_fee}
                        </h3>

                      </div>

                      <div className="bg-[#F8FAFC] rounded-3xl p-6">

                        <p className="text-slate-400 font-bold">

                          Doctor Location

                        </p>

                        <h3 className="text-3xl font-black text-[#032B38] mt-2">

                          {item.city}, {item.country}
                        </h3>

                      </div>

                    </div>

                    {/* MEET BUTTON */}

                    {

                      item.meet_link && (

                        <div className="mt-8">

                          <a
                            href={item.meet_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#032B38] hover:bg-[#05445E] text-white px-8 py-4 rounded-2xl font-black transition-all duration-300"
                          >

                            Join Meeting

                          </a>

                        </div>

                      )

                    }

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>
  );
};

export default MyAppointments;
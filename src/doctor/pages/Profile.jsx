import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  BriefcaseMedical,
  GraduationCap,
  Hospital,
  MapPin,
  Globe,
  Wallet,
  CalendarDays,
  Pencil,
} from "lucide-react";

const Profile = () => {

  const [doctor,
    setDoctor] =
    useState(null);

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
     FETCH DOCTOR PROFILE
  ========================================= */

  const fetchDoctorProfile =
    async () => {

      try {

        const response =
          await fetch(

            "https://800junkuae.online/tsh-api/API/doctors/get_doctors.php"
          );

        const data =
          await response.json();

        if (
          data.status === "success"
        ) {

          const foundDoctor =
            data.data.find(

              (item) =>
                item.id ==
                doctorId
            );

          if (foundDoctor) {

            setDoctor(
              foundDoctor
            );
          }
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

    fetchDoctorProfile();

  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="bg-white rounded-3xl p-10 text-2xl font-bold">

        Loading Profile...

      </div>
    );
  }

  /* =========================================
     NO DATA
  ========================================= */

  if (!doctor) {

    return (

      <div className="bg-white rounded-3xl p-10 text-2xl font-bold text-red-500">

        Doctor Profile Not Found

      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-[#082C3B] rounded-3xl p-8 text-white shadow-xl flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-[#0F4A54] border-4 border-[#1D6672] flex items-center justify-center shadow-lg">

            <User
              size={60}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-5xl font-black capitalize">

              {doctor.name}

            </h1>

            <p className="text-yellow-400 text-2xl font-bold mt-3">

              {doctor.specialization}

            </p>

            <p className="text-gray-300 mt-3 text-lg">

              Doctor Portal Profile

            </p>

          </div>

        </div>

       

      </div>

      {/* DETAILS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* EMAIL */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <Mail
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Email Address

              </p>

              <h2 className="text-white text-2xl font-black break-all">

                {doctor.email}

              </h2>

            </div>

          </div>

        </div>

        {/* PHONE */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <Phone
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Phone Number

              </p>

              <h2 className="text-white text-2xl font-black">

                {doctor.phone}

              </h2>

            </div>

          </div>

        </div>

        {/* SPECIALIZATION */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <BriefcaseMedical
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Specialization

              </p>

              <h2 className="text-white text-2xl font-black capitalize">

                {doctor.specialization}

              </h2>

            </div>

          </div>

        </div>

        {/* EDUCATION */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <GraduationCap
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Education

              </p>

              <h2 className="text-white text-2xl font-black uppercase">

                {doctor.education}

              </h2>

            </div>

          </div>

        </div>

        {/* EXPERIENCE */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <CalendarDays
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Experience

              </p>

              <h2 className="text-white text-2xl font-black">

                {doctor.experience}

              </h2>

            </div>

          </div>

        </div>

        {/* HOSPITAL */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <Hospital
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Hospital

              </p>

              <h2 className="text-white text-2xl font-black capitalize">

                {doctor.hospital}

              </h2>

            </div>

          </div>

        </div>

        {/* CITY */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <MapPin
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                City

              </p>

              <h2 className="text-white text-2xl font-black capitalize">

                {doctor.city}

              </h2>

            </div>

          </div>

        </div>

        {/* COUNTRY */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg">

          <div className="flex items-center gap-4">

            <Globe
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Country

              </p>

              <h2 className="text-white text-2xl font-black capitalize">

                {doctor.country}

              </h2>

            </div>

          </div>

        </div>

        {/* CONSULTATION FEE */}
        <div className="bg-[#0A3A42] rounded-3xl p-6 border border-[#14515C] shadow-lg lg:col-span-2">

          <div className="flex items-center gap-4">

            <Wallet
              size={30}
              className="text-yellow-400"
            />

            <div>

              <p className="text-gray-300 text-lg">

                Consultation Fee

              </p>

              <h2 className="text-white text-3xl font-black">

                Rs.
                {" "}
                {doctor.consultation_fee}

              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
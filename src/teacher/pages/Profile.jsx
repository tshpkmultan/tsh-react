import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBookOpen,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Profile = () => {

  const API = "https://800junkuae.online/tsh-api/API";

  const loginTeacher = JSON.parse(localStorage.getItem("teacher"));

  const [loading, setLoading] = useState(true);

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        `${API}/teacher/profile.php`,
        {
          params: {
            teacher_id: loginTeacher.teacher_id,
          },
        }
      );

      if (res.data.success) {

        setTeacher(res.data.teacher);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h2 className="text-2xl font-bold text-gray-500">

          Loading Profile...

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-8">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      {/* Header */}

      <div className="bg-gradient-to-r from-[#082B3A] via-[#0F4C63] to-[#0B6B88] rounded-3xl p-10 shadow-xl text-white">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div className="flex items-center gap-8">

            {

              teacher.profile_image ?

                (

                 <img
  src={`https://800junkuae.online/tsh-api/uploads/${teacher.profile_image}`}
  alt={teacher.name}
  className="w-36 h-36 rounded-full object-cover border-4 border-yellow-400"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  }}
/>

                )

                :

                (

                  <div className="w-36 h-36 rounded-full bg-yellow-400 text-[#082B3A] flex items-center justify-center text-6xl font-bold">

                    {teacher.name?.charAt(0).toUpperCase()}

                  </div>

                )

            }

            <div>

              <h1 className="text-5xl font-bold">

                {teacher.name}

              </h1>

              <p className="text-yellow-300 text-xl mt-3">

                {teacher.specialization}

              </p>

              <span className="inline-block mt-5 bg-yellow-400 text-[#082B3A] px-5 py-2 rounded-full font-bold capitalize">

                {teacher.status}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#082B3A] mb-8">

            Personal Information

          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <FaUser className="text-blue-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Full Name

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.name}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaEnvelope className="text-red-500 text-xl" />

              <div>

                <p className="text-gray-500">

                  Email

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.email}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaPhone className="text-green-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Phone

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.phone}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaUser className="text-purple-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Gender

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.gender}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaMapMarkerAlt className="text-orange-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Address

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.address}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Professional */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#082B3A] mb-8">

            Professional Information

          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <FaGraduationCap className="text-indigo-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Qualification

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.qualification}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaBookOpen className="text-cyan-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Specialization

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.specialization}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaBriefcase className="text-green-700 text-xl" />

              <div>

                <p className="text-gray-500">

                  Experience

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.experience_years} Years

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaCalendarAlt className="text-pink-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Joining Date

                </p>

                <h3 className="font-bold text-lg">

                  {teacher.joining_date}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaInfoCircle className="text-yellow-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Bio

                </p>

                <h3 className="font-bold">

                  {teacher.bio}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-green-600 text-xl" />

              <div>

                <p className="text-gray-500">

                  Status

                </p>

                <h3 className="font-bold capitalize text-green-600">

                  {teacher.status}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;
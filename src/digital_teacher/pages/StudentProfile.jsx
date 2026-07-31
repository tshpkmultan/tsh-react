import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaIdCard,
  FaWhatsapp,
} from "react-icons/fa";

import GoogleTranslate from "../../components/GoogleTranslate";

const API = "https://800junkuae.online/tsh-api/API";

const StudentProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API}/digital_student/profile.php`,
        {
          params: {
            student_id: id,
          },
        }
      );

      console.log(res.data);

      if (res.data.success) {
        setProfile(res.data.profile);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-red-500">
        Student Profile Not Found
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-5">

        <div>

          <h1 className="text-5xl font-bold text-[#082B3A]">
            Student Profile
          </h1>

          <p className="text-gray-500 mt-2">
            View complete student information.
          </p>

        </div>

        <GoogleTranslate />

      </div>

      {/* Profile Card */}

      <div className="bg-gradient-to-r from-[#082B3A] to-[#11465D] rounded-3xl shadow-xl p-10 text-white">

        <div className="flex flex-col lg:flex-row items-center gap-8">

          <div className="w-36 h-36 rounded-full bg-yellow-400 flex items-center justify-center text-[#082B3A] text-5xl font-bold">

            {profile.full_name.charAt(0)}

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              {profile.full_name}
            </h2>

            <p className="mt-2 text-xl">
              {profile.course_name}
            </p>

            <span className="inline-block mt-4 px-5 py-2 rounded-full bg-yellow-400 text-[#082B3A] font-bold">
              Active Student
            </span>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        {/* Personal */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#082B3A] mb-6">
            Personal Information
          </h2>

          <div className="space-y-5">

            <Info icon={<FaUserGraduate />} label="Full Name" value={profile.full_name} />
            <Info icon={<FaEnvelope />} label="Email" value={profile.email} />
            <Info icon={<FaPhone />} label="Phone" value={profile.phone} />
            <Info icon={<FaWhatsapp />} label="WhatsApp" value={profile.whatsapp} />
            <Info icon={<FaIdCard />} label="CNIC" value={profile.cnic} />
            <Info icon={<FaCalendarAlt />} label="Date of Birth" value={profile.dob} />
            <Info icon={<FaMapMarkerAlt />} label="Address" value={profile.address} />
            <Info icon={<FaGlobe />} label="Country" value={profile.country} />

          </div>

        </div>

        {/* Academic */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-[#082B3A] mb-6">
            Academic Information
          </h2>

          <div className="space-y-5">

            <Info icon={<FaBookOpen />} label="Course" value={profile.course_name} />
            <Info icon={<FaGraduationCap />} label="Education" value={profile.education} />
            <Info icon={<FaChalkboardTeacher />} label="Trainer" value={profile.trainer_name} />
            <Info icon={<FaClock />} label="Timing" value={profile.timing} />
            <Info icon={<FaCalendarAlt />} label="Admission Date" value={profile.created_at} />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

        <StatCard
          title="Attendance"
          value={`${profile.attendance}%`}
          bg="bg-green-50"
          text="text-green-600"
        />

        <StatCard
          title="Assignments"
          value={profile.assignments}
          bg="bg-yellow-50"
          text="text-yellow-600"
        />

        <StatCard
          title="Submitted"
          value={profile.submitted}
          bg="bg-blue-50"
          text="text-blue-600"
        />

        <StatCard
          title="Results"
          value={profile.results}
          bg="bg-purple-50"
          text="text-purple-600"
        />

      </div>

    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">

    <div className="text-yellow-500 text-xl mt-1">
      {icon}
    </div>

    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h3 className="font-semibold text-lg break-words">
        {value || "-"}
      </h3>

    </div>

  </div>
);

const StatCard = ({ title, value, bg, text }) => (
  <div className={`${bg} rounded-3xl shadow-lg p-6`}>

    <p className="text-gray-500">
      {title}
    </p>

    <h2 className={`${text} text-4xl font-bold mt-3`}>
      {value}
    </h2>

  </div>
);

export default StudentProfile;
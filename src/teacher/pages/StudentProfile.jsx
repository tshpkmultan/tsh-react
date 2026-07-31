import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaMosque,
} from "react-icons/fa";

const StudentProfile = () => {

  const { id } = useParams();

  const [student, setStudent] = useState(null);

  useEffect(() => {

    axios
      .get(`https://800junkuae.online/tsh-api/API/teacher/student/profile.php?id=${id}`)
      .then((res) => {

        if (res.data.success) {
          setStudent(res.data.student);
        }

      });

  }, [id]);

  if (!student) {

    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-600">
          Loading...
        </h2>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#082B3A] to-[#0F4C63] rounded-3xl p-10 shadow-xl text-white">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-36 h-36 rounded-full bg-yellow-400 text-[#082B3A] flex items-center justify-center text-6xl font-bold">

              {student.full_name?.charAt(0).toUpperCase()}

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                {student.full_name}

              </h1>

              <p className="text-yellow-300 mt-3 text-lg">

                Student ID : {student.id}

              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="bg-white rounded-3xl shadow-xl mt-8 p-8">

          <h2 className="text-3xl font-bold text-[#082B3A] mb-8">

            Student Details

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-5">

              <p><FaUser className="inline mr-3 text-blue-600"/> <strong>Full Name:</strong> {student.full_name}</p>

              <p><FaUser className="inline mr-3 text-blue-600"/> <strong>Father Name:</strong> {student.father_name}</p>

              <p><FaEnvelope className="inline mr-3 text-red-500"/> <strong>Email:</strong> {student.email}</p>

              <p><FaPhone className="inline mr-3 text-green-600"/> <strong>Phone:</strong> {student.phone}</p>

              <p><FaPhone className="inline mr-3 text-green-600"/> <strong>WhatsApp:</strong> {student.whatsapp}</p>

              <p><strong>Gender:</strong> {student.gender}</p>

              <p><strong>Date of Birth:</strong> {student.dob}</p>

            </div>

            <div className="space-y-5">

              <p><FaMapMarkerAlt className="inline mr-3 text-orange-600"/> <strong>Address:</strong> {student.address}</p>

              <p><strong>City:</strong> {student.city}</p>

              <p><strong>Country:</strong> {student.country}</p>

              <p><FaGraduationCap className="inline mr-3 text-purple-600"/> <strong>Education:</strong> {student.education}</p>

              <p><FaBook className="inline mr-3 text-blue-500"/> <strong>Course:</strong> {student.course_name}</p>

              <p><strong>Batch:</strong> {student.batch_name}</p>

              <p><FaMosque className="inline mr-3 text-green-600"/> <strong>Hafiz:</strong> {student.hafiz}</p>

              <p><FaMosque className="inline mr-3 text-green-600"/> <strong>Prayer:</strong> {student.prayer}</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default StudentProfile;
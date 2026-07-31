import {
  FaTimes,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBook,
  FaUsers,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaChartLine,
  FaMoneyBillWave,
  FaClipboardCheck
} from "react-icons/fa";

import { useState } from "react";
const StudentProfileModal = ({ open, student, onClose }) => {
    const [activeTab, setActiveTab] = useState("overview");
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden">

        {/* Header */}

        <div className="bg-blue-600 text-white px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Student Profile
          </h2>

          <button onClick={onClose}>
            <FaTimes size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="grid lg:grid-cols-3">

          {/* Left */}

          <div className="bg-gray-50 p-8 border-r">

            <div className="flex flex-col items-center">

              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-bold">

                {student.full_name?.charAt(0)}

              </div>

              <h2 className="text-2xl font-bold mt-5">

                {student.full_name}

              </h2>

              <p className="text-gray-500">

                {student.course}

              </p>

              <span
                className={`mt-4 px-4 py-2 rounded-full font-semibold ${
                  student.type === "Batch"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {student.type}
              </span>

            </div>

            {/* Attendance */}

            <div className="mt-10">

              <div className="flex justify-between">

                <span className="font-semibold">

                  Attendance

                </span>

                <span>

                  {student.attendance || 95}%

                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${student.attendance || 95}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* Right */}

         <div className="lg:col-span-2">

    {/* Header */}

    <div className="border-b px-8 py-5">

        <h2 className="text-2xl font-bold">

            {student.full_name}

        </h2>

        <p className="text-gray-500">

            Complete Student Information

        </p>

    </div>

    {/* Tabs */}

    <div className="border-b">

        <div className="flex overflow-x-auto">

            <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                    activeTab === "overview"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-500"
                }`}
            >
                Overview
            </button>

            <button
                onClick={() => setActiveTab("attendance")}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                    activeTab === "attendance"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-500"
                }`}
            >
                Attendance
            </button>

            <button
                onClick={() => setActiveTab("assignments")}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                    activeTab === "assignments"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-500"
                }`}
            >
                Assignments
            </button>

            <button
                onClick={() => setActiveTab("results")}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                    activeTab === "results"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-500"
                }`}
            >
                Results
            </button>

            <button
                onClick={() => setActiveTab("fees")}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                    activeTab === "fees"
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-500"
                }`}
            >
                Fees
            </button>

        </div>

    </div>

    <div className="p-8">

        {activeTab === "overview" && (
            <OverviewTab student={student} />
        )}

        {activeTab === "attendance" && (
            <AttendanceTab student={student} />
        )}

        {activeTab === "assignments" && (
            <AssignmentTab student={student} />
        )}

        {activeTab === "results" && (
            <ResultTab student={student} />
        )}

        {activeTab === "fees" && (
            <FeeTab student={student} />
        )}

    </div>

</div>

        </div>

      </div>

    </div>
  );
};

const Info = ({ icon, title, value }) => {
    const OverviewTab = ({ student }) => {

    return (

        <div className="space-y-8">

            <div className="grid md:grid-cols-2 gap-6">

                <Info
                    icon={<FaUserGraduate />}
                    title="Student Name"
                    value={student.full_name}
                />

                <Info
                    icon={<FaUserGraduate />}
                    title="Father Name"
                    value={student.father_name}
                />

                <Info
                    icon={<FaEnvelope />}
                    title="Email"
                    value={student.email}
                />

                <Info
                    icon={<FaPhone />}
                    title="Phone"
                    value={student.phone}
                />

                <Info
                    icon={<FaBook />}
                    title="Course"
                    value={student.course}
                />

                <Info
                    icon={<FaUsers />}
                    title="Batch"
                    value={student.batch_name}
                />

                <Info
                    icon={<FaChalkboardTeacher />}
                    title="Teacher"
                    value={student.teacher_name}
                />

                <Info
                    icon={<FaCalendarAlt />}
                    title="Admission Date"
                    value={student.admission_date}
                />

            </div>

            <Info
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={student.address}
            />

        </div>

    );

};
const AttendanceTab = ({ student }) => {

    const API = "https://800junkuae.online/tsh-api/API";

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAttendance();

    }, [student]);

    const fetchAttendance = async () => {

        try {

            const res = await axios.get(

                `${API}/teacher/attendance/student_attendance.php?student_id=${student.id}`

            );

            if (res.data.success) {

                setAttendance(res.data.attendance);

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const present = attendance.filter(
        x => x.status === "present"
    ).length;

    const absent = attendance.filter(
        x => x.status === "absent"
    ).length;

    const percentage =
        attendance.length > 0
            ? Math.round((present / attendance.length) * 100)
            : 0;

    if (loading)
        return (
            <h2 className="text-center py-20">
                Loading Attendance...
            </h2>
        );
const Card = ({ title, value, color = "blue" }) => {

    const colors = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        red: "text-red-600 bg-red-50",
        purple: "text-purple-600 bg-purple-50",
    };

    return (

        <div className={`rounded-xl p-5 ${colors[color]}`}>

            <p>{title}</p>

            <h2 className="text-3xl font-bold">

                {value}

            </h2>

        </div>

    );

};
    return (

        <div>

            <div className="grid md:grid-cols-4 gap-5 mb-8">

                <Card title="Total Days" value={attendance.length} />

                <Card
                    title="Present"
                    value={present}
                    color="green"
                />

                <Card
                    title="Absent"
                    value={absent}
                    color="red"
                />

                <Card
                    title="Attendance"
                    value={`${percentage}%`}
                    color="purple"
                />

            </div>

            <div className="bg-gray-200 rounded-full h-4 mb-8">

                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">Date</th>

                            <th>Status</th>

                            <th>Remarks</th>

                        </tr>

                    </thead>

                    <tbody>

                        {attendance.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {item.attendance_date}
                                </td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full ${
                                            item.status === "present"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>
                                    {item.remarks || "-"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};
const AssignmentTab = () => {

    return (

        <div className="text-center py-20">

            <FaClipboardList className="mx-auto text-5xl text-green-600 mb-5"/>

            <h2 className="text-2xl font-bold">

                Assignments

            </h2>

        </div>

    );

};
const ResultTab = () => {

    return (

        <div className="text-center py-20">

            <FaChartLine className="mx-auto text-5xl text-purple-600 mb-5"/>

            <h2 className="text-2xl font-bold">

                Results

            </h2>

        </div>

    );

};
const FeeTab = () => {

    return (

        <div className="text-center py-20">

            <FaMoneyBillWave className="mx-auto text-5xl text-yellow-500 mb-5"/>

            <h2 className="text-2xl font-bold">

                Fee Details

            </h2>

        </div>

    );

};
  return (
    <div className="bg-gray-50 rounded-xl p-5">

      <div className="flex items-center gap-3 mb-2">

        <div className="text-blue-600">

          {icon}

        </div>

        <h4 className="font-semibold">

          {title}

        </h4>

      </div>

      <p className="text-gray-700">

        {value || "-"}

      </p>

    </div>
  );
};

export default StudentProfileModal;
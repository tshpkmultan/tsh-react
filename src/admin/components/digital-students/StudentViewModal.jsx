import { X } from "lucide-react";

const BASE_URL = "https://800junkuae.online/tsh-api/API";

const StudentViewModal = ({ open, student, onClose }) => {
  if (!open || !student) return null;

  const FileCard = ({ title, file }) => (
    <div className="border rounded-xl p-4 text-center">
      <h3 className="font-semibold mb-3">{title}</h3>

      {file ? (
        <>
          <img
            src={`${BASE_URL}/${file}`}
            alt={title}
            className="w-full h-48 object-cover rounded-lg border"
          />

          <a
            href={`${BASE_URL}/${file}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            View Full Image
          </a>
        </>
      ) : (
        <p className="text-gray-500">No File Uploaded</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Student Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        <div className="p-6">

          {/* Profile */}

          <div className="flex flex-col items-center mb-8">

            <img
              src={
                student.profile_image
                  ? `${BASE_URL}/${student.profile_image}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      student.full_name
                    )}`
              }
              alt=""
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {student.full_name}
            </h2>

            <span
              className={`mt-2 px-4 py-1 rounded-full text-white ${
                student.status === "Approved"
                  ? "bg-green-600"
                  : student.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {student.status}
            </span>

          </div>

          {/* Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-3">

              <h3 className="font-bold text-lg border-b pb-2">
                Personal Information
              </h3>

              <p><strong>Full Name:</strong> {student.full_name}</p>
              <p><strong>Father Name:</strong> {student.father_name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
              <p><strong>WhatsApp:</strong> {student.whatsapp}</p>
              <p><strong>Date of Birth:</strong> {student.dob}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
              <p><strong>Address:</strong> {student.address}</p>
              <p><strong>City:</strong> {student.city}</p>
              <p><strong>Country:</strong> {student.country}</p>

            </div>

            <div className="space-y-3">

              <h3 className="font-bold text-lg border-b pb-2">
                Academic Information
              </h3>

              <p><strong>Course:</strong> {student.course_name}</p>
              <p><strong>Trainer:</strong> {student.trainer_name}</p>
              <p><strong>Batch:</strong> {student.batch_name || "-"}</p>
              <p><strong>Education:</strong> {student.education}</p>
              <p><strong>Previous Education:</strong> {student.previous_education}</p>
              <p><strong>Experience:</strong> {student.experience}</p>
              <p><strong>Computer Knowledge:</strong> {student.computer_knowledge}</p>
              <p><strong>Timing:</strong> {student.timing}</p>
              <p><strong>Notes:</strong> {student.notes}</p>
              <p><strong>Created At:</strong> {student.created_at}</p>

            </div>

          </div>

          {/* Documents */}

          <div className="mt-10">

            <h3 className="font-bold text-xl mb-5">
              Uploaded Documents
            </h3>

            <div className="grid md:grid-cols-3 gap-6">

              <FileCard
                title="CNIC Front"
                file={student.cnic_front}
              />

              <FileCard
                title="CNIC Back"
                file={student.cnic_back}
              />

              <FileCard
                title="Education Document"
                file={student.education_doc}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentViewModal;
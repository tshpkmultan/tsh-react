import { useState } from "react";
import axios from "axios";
import { Trash2, X } from "lucide-react";

const API = "https://800junkuae.online/tsh-api/";

const DeleteStudentModal = ({
  open,
  student,
  onClose,
  onDeleted,
}) => {

  const [loading, setLoading] = useState(false);

  if (!open || !student) return null;

  const handleDelete = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/admin/digital_students/delete.php`,
        {
          id: student.id,
        }
      );

      alert(res.data.message);

      if (res.data.success) {

        onDeleted();

        onClose();

      }

    } catch (err) {

      console.log(err);

      alert("Unable to delete student.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

        {/* Header */}

        <div className="bg-red-600 text-white p-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Trash2 size={24} />

            <h2 className="text-xl font-bold">
              Delete Student
            </h2>

          </div>

          <button
            onClick={onClose}
            className="hover:bg-red-700 rounded p-1"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <div className="flex items-center gap-4 mb-6">

            <img
              src={
                student.profile_image
                  ? `https://800junkuae.online/tsh-api/${student.profile_image}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      student.full_name
                    )}`
              }
              alt=""
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div>

              <h3 className="text-xl font-bold">
                {student.full_name}
              </h3>

              <p className="text-gray-500">
                {student.email}
              </p>

              <p className="text-sm text-gray-500">
                {student.phone}
              </p>

            </div>

          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="text-red-700 font-semibold">

              Are you sure you want to delete this student?

            </p>

            <ul className="mt-3 text-sm text-gray-700 list-disc ml-5 space-y-1">

              <li>Student Enrollment</li>

              <li>Batch Records</li>

              <li>Attendance Records</li>

              <li>Assignments</li>

              <li>Assignment Submissions</li>

              <li>Uploaded Documents</li>

              <li>Profile Picture</li>

            </ul>

          </div>

          {/* Student Information */}

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div>

              <label className="font-semibold">
                Trainer
              </label>

              <p>
                {student.trainer_name || "-"}
              </p>

            </div>

            <div>

              <label className="font-semibold">
                Course
              </label>

              <p>
                {student.course_name || "-"}
              </p>

            </div>

            <div>

              <label className="font-semibold">
                Batch
              </label>

              <p>
                {student.batch_name || "-"}
              </p>

            </div>

            <div>

              <label className="font-semibold">
                Status
              </label>

              <p>
                {student.status}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {loading
              ? "Deleting..."
              : "Delete Student"}
          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteStudentModal;
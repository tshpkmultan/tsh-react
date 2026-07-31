import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const API = "https://800junkuae.online/tsh-api/API";

const StudentStatusModal = ({
  open,
  student,
  onClose,
  onUpdated,
}) => {
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setStatus(student.status || "Pending");
      setReason(student.rejection_reason || "");
    }
  }, [student]);

  if (!open || !student) return null;

  const handleSubmit = async () => {
    if (status === "Rejected" && reason.trim() === "") {
      alert("Please enter the rejection reason.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/admin/digital_students/change-status.php`,
        {
          id: student.id,
          status,
          rejection_reason: reason,
        }
      );

      alert(res.data.message);

      if (res.data.success) {
        onUpdated();
        onClose();
      }
    } catch (error) {
      console.log(error);
      alert("Unable to change status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Change Student Status
            </h2>

            <p className="text-blue-100 text-sm">
              Update admission status
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-lg p-2"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6">

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Student Name
            </label>

            <input
              type="text"
              value={student.full_name}
              disabled
              className="w-full rounded-xl border bg-gray-100 px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Admission Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="Pending">
                🟡 Pending
              </option>

              <option value="Approved">
                🟢 Approved
              </option>

              <option value="Rejected">
                🔴 Rejected
              </option>
            </select>
          </div>

          {status === "Rejected" && (
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-red-600">
                Rejection Reason
              </label>

              <textarea
                rows={5}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for rejecting this admission..."
                className="w-full rounded-xl border border-red-300 px-4 py-3 focus:border-red-500 focus:outline-none"
              />
            </div>
          )}

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentStatusModal;
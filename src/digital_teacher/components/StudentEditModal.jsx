import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaSave } from "react-icons/fa";

const StudentEditModal = ({
  open,
  student,
  onClose,
  refresh,
}) => {

  const API = "https://800junkuae.online/tsh-api/API";

  const [form, setForm] = useState({
    id: "",
    full_name: "",
    father_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (student) {

      setForm({
        id: student.id || "",
        full_name: student.full_name || "",
        father_name: student.father_name || "",
        email: student.email || "",
        phone: student.phone || "",
        whatsapp: student.whatsapp || "",
        address: student.address || "",
        notes: student.notes || "",
      });

    }

  }, [student]);

  if (!open) return null;

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/teacher/students/update.php`,
        form
      );

      if (res.data.success) {

        alert("Student updated successfully.");

        refresh();

        onClose();

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Something went wrong.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            Edit Student
          </h2>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Father Name
              </label>

              <input
                type="text"
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                WhatsApp
              </label>

              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Notes
              </label>

              <textarea
                rows="3"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white flex items-center gap-2"
            >
              <FaSave />

              {loading ? "Updating..." : "Update Student"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default StudentEditModal;
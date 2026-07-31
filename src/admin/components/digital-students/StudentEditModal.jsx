import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const API = "https://800junkuae.online/tsh-api";
const BASE_URL = "https://800junkuae.online/tsh-api";

const StudentEditModal = ({
  open,
  student,
  trainers,
  courses,
  batches,
  onClose,
  onUpdated,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    father_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    gender: "Male",
    address: "",
    city: "",
    country: "",
    education: "",
    previous_education: "",
    cnic: "",
    experience: "",
    computer_knowledge: "",
    trainer_id: "",
    course_id: "",
    batch_id: "",
    timing: "",
    notes: "",
    status: "Pending",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [educationDoc, setEducationDoc] = useState(null);

  useEffect(() => {
    if (student) {
      setForm({
        full_name: student.full_name || "",
        father_name: student.father_name || "",
        email: student.email || "",
        phone: student.phone || "",
        whatsapp: student.whatsapp || "",
        dob: student.dob || "",
        gender: student.gender || "Male",
        address: student.address || "",
        city: student.city || "",
        country: student.country || "",
        education: student.education || "",
        previous_education:
          student.previous_education || "",
        cnic: student.cnic || "",
        experience: student.experience || "",
        computer_knowledge:
          student.computer_knowledge || "",
        trainer_id: student.trainer_id || "",
        course_id: student.course_id || "",
        batch_id: student.batch_id || "",
        timing: student.timing || "",
        notes: student.notes || "",
        status: student.status || "Pending",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;

    if (!files.length) return;

    if (name === "profile_image")
      setProfileImage(files[0]);

    if (name === "cnic_front")
      setCnicFront(files[0]);

    if (name === "cnic_back")
      setCnicBack(files[0]);

    if (name === "education_doc")
      setEducationDoc(files[0]);
  };

  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl mt-10 mb-10">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Edit Digital Student
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X />
          </button>

        </div>

        <div className="p-6">

          {/* Profile */}

          <div className="flex justify-center mb-8">

            <img
              src={
                student.profile_image
                  ? `${BASE_URL}/${student.profile_image}`
                  : `https://ui-avatars.com/api/?name=${student.full_name}`
              }
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />

          </div>

          {/* Personal */}

          <h3 className="font-bold text-xl mb-4">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg p-3"
            />

            <input
              name="father_name"
              value={form.father_name}
              onChange={handleChange}
              placeholder="Father Name"
              className="border rounded-lg p-3"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg p-3"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded-lg p-3"
            />

            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded-lg p-3"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded-lg p-3"
            />

            <input
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              placeholder="CNIC"
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded-lg p-3 w-full mt-5"
            rows={3}
          />

          {/* Academic */}

          <h3 className="font-bold text-xl mt-8 mb-4">
            Academic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="Education"
              className="border rounded-lg p-3"
            />

            <input
              name="previous_education"
              value={form.previous_education}
              onChange={handleChange}
              placeholder="Previous Education"
              className="border rounded-lg p-3"
            />

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="border rounded-lg p-3"
            />

            <select
              name="computer_knowledge"
              value={form.computer_knowledge}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Computer Knowledge</option>
              <option>Yes</option>
              <option>No</option>
            </select>
                        {/* Trainer */}

            <select
              name="trainer_id"
              value={form.trainer_id}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Trainer</option>

              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>

            {/* Course */}

            <select
              name="course_id"
              value={form.course_id}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            {/* Batch */}

            <select
              name="batch_id"
              value={form.batch_id}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Select Batch</option>

              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batch_name}
                </option>
              ))}
            </select>

            <input
              name="timing"
              value={form.timing}
              onChange={handleChange}
              placeholder="Timing"
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Notes"
            className="border rounded-lg p-3 w-full mt-5"
          />

          {/* Status */}

          <div className="mt-5">

            <label className="font-semibold block mb-2">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

          {/* Upload Files */}

          <h3 className="font-bold text-xl mt-10 mb-4">
            Upload Documents
          </h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-medium block mb-2">
                Profile Image
              </label>

              <input
                type="file"
                name="profile_image"
                onChange={handleFile}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                CNIC Front
              </label>

              <input
                type="file"
                name="cnic_front"
                onChange={handleFile}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                CNIC Back
              </label>

              <input
                type="file"
                name="cnic_back"
                onChange={handleFile}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium block mb-2">
                Education Document
              </label>

              <input
                type="file"
                name="education_doc"
                onChange={handleFile}
                className="w-full"
              />
            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={async () => {

                try {

                  setLoading(true);

                  const formData = new FormData();

                  formData.append("id", student.id);

                  Object.keys(form).forEach((key) => {
                    formData.append(key, form[key]);
                  });

                  if (profileImage)
                    formData.append("profile_image", profileImage);

                  if (cnicFront)
                    formData.append("cnic_front", cnicFront);

                  if (cnicBack)
                    formData.append("cnic_back", cnicBack);

                  if (educationDoc)
                    formData.append("education_doc", educationDoc);

                  const res = await axios.post(
                    `${API}/admin/digital_students/update.php`,
                    formData,
                    {
                      headers: {
                        "Content-Type":
                          "multipart/form-data",
                      },
                    }
                  );

                  alert(res.data.message);

                  if (res.data.success) {
                    onUpdated();
                    onClose();
                  }

                } catch (err) {

                  console.log(err);

                  alert("Update failed.");

                } finally {

                  setLoading(false);

                }

              }}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Student"}
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default StudentEditModal;
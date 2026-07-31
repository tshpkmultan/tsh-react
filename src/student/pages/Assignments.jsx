import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaExclamationCircle,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaCalendarAlt,
  FaUserTie,
  FaSpinner,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Assignments = () => {

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [submissionText, setSubmissionText] = useState("");

  const [submissionFile, setSubmissionFile] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    fetchAssignments();

  }, []);

  const fetchAssignments = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?.user_id) {

        setLoading(false);

        return;

      }

      const res = await axios.get(

        `https://800junkuae.online/tsh-api/API/admin/assignments/index.php?user_id=${user.user_id}`

      );

      if (res.data.success) {

        setPending(res.data.pending || []);

        setCompleted(res.data.completed || []);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const openSubmission = (assignment) => {

    setSelectedAssignment(assignment);

    setSubmissionText("");

    setSubmissionFile(null);

    setShowModal(true);

  };

  const closeSubmission = () => {

    setShowModal(false);

    setSelectedAssignment(null);

    setSubmissionText("");

    setSubmissionFile(null);

  };

  const submitAssignment = async () => {

    if (!selectedAssignment) return;

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const formData = new FormData();

      formData.append(
        "assignment_id",
        selectedAssignment.id
      );

      formData.append(
        "user_id",
        user.user_id
      );

      formData.append(
        "submission_text",
        submissionText
      );

      if (submissionFile) {

        formData.append(
          "submission_file",
          submissionFile
        );

      }

      const res = await axios.post(

        "https://800junkuae.online/tsh-api/API/admin/assignments/submit.php",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

      if (res.data.success) {

        alert("Assignment Submitted Successfully.");

        closeSubmission();

        fetchAssignments();

      } else {

        alert(res.data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Submission Failed");

    }

  };
    return (

    <div className="bg-[#F3F4F6] min-h-screen">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#062B3A] via-[#0C4153] to-[#18495B] rounded-3xl shadow-xl overflow-hidden mb-8">

          <div className="flex flex-col lg:flex-row justify-between items-center p-10 gap-8">

            <div>

              <span className="bg-yellow-400 text-[#062B3A] px-4 py-2 rounded-full font-bold">

                Student Portal

              </span>

              <h1 className="text-5xl font-bold text-white mt-6">

                My Assignments

              </h1>

              <p className="text-gray-300 text-lg mt-4 max-w-2xl">

                Complete your assignments, upload your work and
                receive marks and feedback from your teacher.

              </p>

            </div>

            <div className="hidden lg:flex">

              <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center">

                <FaFileAlt className="text-7xl text-yellow-400" />

              </div>

            </div>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-3xl shadow-lg py-24 flex flex-col items-center">

            <FaSpinner className="text-6xl animate-spin text-[#062B3A]" />

            <h2 className="text-2xl font-bold text-[#062B3A] mt-6">

              Loading Assignments...

            </h2>

          </div>

        ) : (

          <>

            {/* Pending Assignments */}

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">

              <div className="bg-red-50 border-b border-red-100 p-6">

                <div className="flex items-center gap-4">

                  <FaExclamationCircle className="text-red-500 text-3xl" />

                  <div>

                    <h2 className="text-3xl font-bold text-[#062B3A]">

                      Pending Assignments

                    </h2>

                    <p className="text-gray-500">

                      Complete these assignments before the due date.

                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 space-y-6">

                {pending.length === 0 ? (

                  <div className="text-center py-16">

                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />

                    <h3 className="text-3xl font-bold text-[#062B3A]">

                      No Pending Assignments

                    </h3>

                    <p className="text-gray-500 mt-3">

                      Great! You're all caught up.

                    </p>

                  </div>

                ) : (

                  pending.map((item) => (

                    <div
                      key={item.id}
                      className="border rounded-3xl p-8 hover:shadow-xl transition"
                    >

                      <div className="flex flex-col lg:flex-row justify-between gap-8">

                        <div className="flex-1">

                          <div className="flex items-center gap-3 mb-5">

                            <h2 className="text-3xl font-bold text-[#062B3A]">

                              {item.title}

                            </h2>

                          </div>

                          <p className="text-gray-600 leading-8">

                            {item.description}

                          </p>

                          <div className="grid md:grid-cols-2 gap-5 mt-8">

                            <div className="flex items-center gap-3">

                              <FaCalendarAlt className="text-red-500" />

                              <span>

                                Due:
                                {" "}
                                {item.due_date}

                              </span>

                            </div>

                            <div className="flex items-center gap-3">

                              <FaUserTie className="text-blue-600" />

                              <span>

                                {item.teacher_name}

                              </span>

                            </div>

                          </div>

                        </div>

                        <div className="flex items-center">

                          <button
                            onClick={() => openSubmission(item)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-[#062B3A] font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition"
                          >

                            <FaCloudUploadAlt />

                            Submit Work

                          </button>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>
                        {/* Completed Assignments */}

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <div className="bg-green-50 border-b border-green-100 p-6">

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-green-500 text-3xl" />

                  <div>

                    <h2 className="text-3xl font-bold text-[#062B3A]">

                      Completed & Graded

                    </h2>

                    <p className="text-gray-500">

                      View your submitted assignments, marks and teacher feedback.

                    </p>

                  </div>

                </div>

              </div>

              <div className="p-6 space-y-6">

                {completed.length === 0 ? (

                  <div className="text-center py-16">

                    <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-6" />

                    <h3 className="text-3xl font-bold text-[#062B3A]">

                      No Completed Assignments

                    </h3>

                    <p className="text-gray-500 mt-3">

                      Your completed assignments will appear here.

                    </p>

                  </div>

                ) : (

                  completed.map((item) => (

                    <div
                      key={item.id}
                      className="border rounded-3xl p-8 hover:shadow-xl transition"
                    >

                      <div className="flex flex-col xl:flex-row justify-between gap-8">

                        <div className="flex-1">

                          <div className="flex items-center gap-3 mb-5">

                            <h2 className="text-3xl font-bold text-[#062B3A]">

                              {item.title}

                            </h2>

                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                              {item.status || "Graded"}

                            </span>

                          </div>

                          <p className="text-gray-600 leading-8">

                            {item.description}

                          </p>

                          <div className="grid md:grid-cols-2 gap-5 mt-8">

                            <div className="flex items-center gap-3">

                              <FaCalendarAlt className="text-green-600" />

                              <span>

                                Submitted:
                                {" "}
                                {item.submitted_at || "-"}

                              </span>

                            </div>

                            <div className="flex items-center gap-3">

                              <FaUserTie className="text-blue-600" />

                              <span>

                                {item.teacher_name}

                              </span>

                            </div>

                          </div>

                        </div>

                        <div className="w-full xl:w-72">

                          <div className="bg-green-50 rounded-2xl border border-green-200 p-6">

                            <h3 className="text-lg font-semibold text-gray-600">

                              Marks

                            </h3>

                            <h1 className="text-5xl font-bold text-green-600 mt-3">

                              {item.marks ?? "--"}

                            </h1>

                            <div className="mt-6">

                              <h4 className="font-semibold text-[#062B3A]">

                                Teacher Feedback

                              </h4>

                              <p className="text-gray-600 mt-2 leading-7">

                                {item.feedback || "No feedback available."}

                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>
                        {/* Submit Assignment Modal */}

            {showModal && (

              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

                  {/* Header */}

                  <div className="bg-[#062B3A] px-8 py-5 flex justify-between items-center">

                    <h2 className="text-3xl font-bold text-yellow-400">

                      Submit Assignment

                    </h2>

                    <button
                      onClick={closeSubmission}
                      className="text-white text-3xl"
                    >

                      <FaTimes />

                    </button>

                  </div>

                  {/* Body */}

                  <div className="p-8">

                    <div className="mb-6">

                      <h3 className="text-2xl font-bold text-[#062B3A]">

                        {selectedAssignment?.title}

                      </h3>

                      <p className="text-gray-500 mt-2">

                        {selectedAssignment?.description}

                      </p>

                    </div>

                    <div className="mb-6">

                      <label className="block font-semibold mb-3">

                        Submission Notes

                      </label>

                      <textarea
                        rows="6"
                        value={submissionText}
                        onChange={(e) =>
                          setSubmissionText(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#062B3A]"
                        placeholder="Write your submission details..."
                      />

                    </div>

                    <div className="mb-8">

                      <label className="block font-semibold mb-3">

                        Upload File

                      </label>

                      <input
                        type="file"
                        onChange={(e) =>
                          setSubmissionFile(e.target.files[0])
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3"
                      />

                      <p className="text-sm text-gray-500 mt-2">

                        Supported files:
                        PDF, DOCX, ZIP, JPG, PNG

                      </p>

                    </div>

                    <div className="flex justify-end gap-4">

                      <button
                        onClick={closeSubmission}
                        className="px-6 py-3 border rounded-xl font-semibold"
                      >

                        Cancel

                      </button>

                      <button
                        onClick={submitAssignment}
                        className="bg-[#062B3A] hover:bg-[#0B4255] text-yellow-400 px-8 py-3 rounded-xl font-bold flex items-center gap-3"
                      >

                        <FaCloudUploadAlt />

                        Submit Assignment

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )}
                      </>

        )}

      </div>

    </div>

  );

};

export default Assignments;
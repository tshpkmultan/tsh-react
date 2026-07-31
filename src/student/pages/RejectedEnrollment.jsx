import { XCircle, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RejectedEnrollment() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const category = localStorage.getItem("category");
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("patientAuth");
    localStorage.removeItem("teacherAuth");
    localStorage.removeItem("category");

    navigate("/login");
  };

  useEffect(() => {
    if (!userId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          "https://800junkuae.online/tsh-api/api/check-status.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              category,
            }),
          }
        );

        const result = await res.json();

        if (result.status !== "success") return;

        const updatedUser = {
          ...user,
          admission_status: result.admission_status,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        switch (result.admission_status) {
          case "Approved":
            if (category === "islamic") {
              navigate("/student", { replace: true });
            } else if (category === "digital") {
              navigate("/digital-student", { replace: true });
            } else if (
              category === "health" ||
              category === "patient"
            ) {
              navigate("/patient/dashboard", { replace: true });
            }
            break;

          case "Pending":
            if (category === "islamic") {
              navigate("/student/pending-approval", {
                replace: true,
              });
            } else if (category === "digital") {
              navigate("/digital-student/pending-approval", {
                replace: true,
              });
            } else if (
              category === "health" ||
              category === "patient"
            ) {
              navigate("/patient/pending-approval", {
                replace: true,
              });
            }
            break;

          default:
            // Stay on rejected page
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check immediately
    checkStatus();

    // Check every 10 seconds
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, [userId, category, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-red-100">

        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-red-600">
          Enrollment Rejected
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          Unfortunately, your Islamic course enrollment request has been
          rejected by the administration.
        </p>

        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-left">
          <h3 className="font-semibold text-red-700 mb-2">
            Possible Reasons
          </h3>

          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
            <li>Incomplete enrollment information.</li>
            <li>Required documents were missing.</li>
            <li>Course or batch is currently full.</li>
            <li>Enrollment did not meet academy requirements.</li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
}
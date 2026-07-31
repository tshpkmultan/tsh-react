import { Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PendingApproval() {
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
    if (!userId || !category) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          "https://800junkuae.online/tsh-api/API/check-status.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              category: category,
            }),
          }
        );

        const result = await res.json();

        console.log(result);

        if (result.status !== "success") return;

        // Update localStorage
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
            } else {
              navigate("/dashboard", { replace: true });
            }
            break;

          case "Rejected":
            if (category === "islamic") {
              navigate("/student/rejected", { replace: true });
            } else if (category === "digital") {
              navigate("/digital-student/rejected", {
                replace: true,
              });
            } else if (
              category === "health" ||
              category === "patient"
            ) {
              navigate("/patient/rejected", {
                replace: true,
              });
            }
            break;

          default:
            // Pending -> stay on this page
            break;
        }
      } catch (error) {
        console.error("Status Check Error:", error);
      }
    };

    // Initial check
    checkStatus();

    // Check every 10 seconds
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, [userId, category, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="w-14 h-14 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
          Enrollment Pending
        </h1>

        <p className="text-gray-600 text-lg leading-8">
          Your admission request has been submitted successfully.
          <br />
          Please wait until the administrator reviews your application.
        </p>

        <div className="mt-8 rounded-xl bg-yellow-50 border border-yellow-200 p-5">
          <p className="text-yellow-800 font-semibold">
            Status: Pending Approval
          </p>

          <p className="text-gray-600 mt-2">
            We automatically check your enrollment status every 10
            seconds. Once approved, you'll be redirected to your
            dashboard automatically.
          </p>
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
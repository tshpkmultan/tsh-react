import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://800junkuae.online/tsh-api/API";

const DigitalStudentProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const checkAdmission = async () => {
      // Not logged in
      if (!user) {
        setRedirect("/category");
        setLoading(false);
        return;
      }

      // Not a digital student
      if (user.category !== "digital") {
        localStorage.removeItem("user");
        setRedirect("/category");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API}/digital/check-status.php`,
          {
            params: {
    user_id: localStorage.getItem("user_id"),
}
          }
        );

        if (!res.data.success) {
          setRedirect("/digital-student/pending-approval");
        } else {
          switch (res.data.status) {
            case "Approved":
              setAllowed(true);
              break;

            case "Pending":
              setRedirect("/digital-student/pending-approval");
              break;

            case "Rejected":
              setRedirect("/digital-student/rejected");
              break;

            default:
              setRedirect("/digital-student/pending-approval");
          }
        }
      } catch (err) {
        console.log(err);
        setRedirect("/digital-student/pending-approval");
      } finally {
        setLoading(false);
      }
    };

    checkAdmission();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">
            Checking admission status...
          </p>
        </div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return allowed ? <Outlet /> : null;
};

export default DigitalStudentProtectedRoute;
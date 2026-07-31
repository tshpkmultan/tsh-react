import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentProtectedRoute = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const checkStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://800junkuae.online/tsh-api/API/check-status.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: localStorage.getItem("user_id"),
              category: "islamic",
            }),
          }
        );

        const result = await res.json();

        if (result.status === "success") {
          const updatedUser = {
            ...user,
            admission_status: result.admission_status,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    checkStatus();
  }, []);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/category" replace />;
  }

  if (user.category !== "islamic") {
    localStorage.removeItem("user");
    return <Navigate to="/category" replace />;
  }

  const status = user.admission_status;

  if (
    status === "Pending" &&
    location.pathname !== "/student/pending-approval"
  ) {
    return <Navigate to="/student/pending-approval" replace />;
  }

  if (
    status === "Rejected" &&
    location.pathname !== "/student/rejected"
  ) {
    return <Navigate to="/student/rejected" replace />;
  }

  if (
    status === "Approved" &&
    (location.pathname === "/student/pending-approval" ||
      location.pathname === "/student/rejected")
  ) {
    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default StudentProtectedRoute;
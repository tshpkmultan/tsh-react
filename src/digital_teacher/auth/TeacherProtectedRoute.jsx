import { Navigate, Outlet, useLocation } from "react-router-dom";

const TeacherProtectedRoute = () => {
  const location = useLocation();

  const trainer = JSON.parse(localStorage.getItem("trainer"));

  // If not logged in, redirect to Digital Trainer login
  if (!trainer) {
    return (
      <Navigate
        to="/digital-teacher/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Logged in
  return <Outlet />;
};

export default TeacherProtectedRoute;
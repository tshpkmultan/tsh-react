import { Navigate, Outlet } from "react-router-dom";

const TeacherProtectedRoute = () => {
  const teacher = localStorage.getItem("teacher");

  return teacher ? (
    <Outlet />
  ) : (
    <Navigate to="/teacher/login" replace />
  );
};

export default TeacherProtectedRoute;
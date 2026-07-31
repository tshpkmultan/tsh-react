import { Navigate } from "react-router-dom";

const DoctorProtectedRoute = ({ children }) => {

  const isDoctorLoggedIn =
    localStorage.getItem("doctorAuth");

  if (!isDoctorLoggedIn) {

    return <Navigate to="/doctor-login" />;
  }

  return children;
};

export default DoctorProtectedRoute;
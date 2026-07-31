import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedPatientRoute() {

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("Protected Route:", user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.category !== "health") {
        return <Navigate to="/category" replace />;
    }

    if (user.admission_status === "Pending") {
        return <Navigate to="/patient/pending-approval" replace />;
    }

    if (user.admission_status === "Rejected") {
        return <Navigate to="/patient/rejected" replace />;
    }

    if (user.admission_status !== "Approved") {
        return <Navigate to="/enrollment-health" replace />;
    }

    return <Outlet />;
}
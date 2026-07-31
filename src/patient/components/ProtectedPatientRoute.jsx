import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedPatientRoute() {

    const auth = localStorage.getItem("user");

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(auth);

    if (user.category !== "health") {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
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
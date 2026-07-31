import { Routes, Route } from "react-router-dom";

import DigitalStudentProtectedRoute from "../auth/DigitalStudentProtectedRoute";

import DigitalStudentLayout from "../layouts/DigitalStudentLayout";

import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Schedule from "../pages/Schedule";
import Assignments from "../pages/Assignments";
import Notices from "../pages/Notices";
import FeeStatus from "../pages/FeeStatus";
import PendingApproval from "../../pages/digital-student/PendingApproval";
import Rejected from "../../pages/digital-student/Rejected";

const DigitalStudentRoutes = () => {
  return (
    <Routes>
<Route
        path="/pending-approval"
        element={<PendingApproval />}
      />
      <Route
    path="/rejected"
    element={<Rejected />}
/>
      {/* Protected Digital Student Routes */}
      <Route element={<DigitalStudentProtectedRoute />}>
        <Route path="/" element={<DigitalStudentLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Academics */}
          <Route path="courses" element={<Courses />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="assignments" element={<Assignments />} />

          {/* Communication */}
          <Route path="notices" element={<Notices />} />
          <Route path="fee-status" element={<FeeStatus />} />

        </Route>
      </Route>

    </Routes>
  );
};

export default DigitalStudentRoutes;
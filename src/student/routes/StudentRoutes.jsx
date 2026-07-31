import { Routes, Route } from "react-router-dom";

import StudentProtectedRoute from "../auth/StudentProtectedRoute";
import StudentLayout from "../layouts/StudentLayout";

import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Schedule from "../pages/Schedule";
import Assignments from "../pages/Assignments";
import Notices from "../pages/Notices";
import FeeStatus from "../pages/FeeStatus";
import PendingApproval from "../pages/PendingApproval";
import RejectedEnrollment from "../pages/RejectedEnrollment";
import Certificates from "../pages/Certificates";
const StudentRoutes = () => {
  return (
    <Routes>
      
          {/* Pending / Rejected */}
          <Route
            path="pending-approval"
            element={<PendingApproval />}
          />

          <Route
            path="rejected"
            element={<RejectedEnrollment />}
          />
      <Route element={<StudentProtectedRoute />}>
        <Route path="/" element={<StudentLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />


          {/* Academics */}
          <Route
            path="courses"
            element={<Courses />}
          />

          <Route
            path="schedule"
            element={<Schedule />}
          />

          <Route
            path="assignments"
            element={<Assignments />}
          />

          {/* Communication */}
          <Route
            path="notices"
            element={<Notices />}
          />
<Route
  path="certificates"
  element={<Certificates />}
/>
          <Route
            path="fee-status"
            element={<FeeStatus />}
          />

        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
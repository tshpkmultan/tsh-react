import { Routes, Route, Navigate } from "react-router-dom";

import TeacherProtectedRoute from "../auth/TeacherProtectedRoute";
import TeacherLayout from "../layouts/TeacherLayout";

import TeacherLogin from "../pages/TeacherLogin";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Attendance from "../pages/Attendance";
import Assignments from "../pages/Assignments";
import Results from "../pages/Results";
import Notices from "../pages/Notices";
import Schedule from "../pages/Schedule";
import Courses from "../pages/Courses";
import FeeStatus from "../pages/FeeStatus";
import Profile from "../pages/Profile";
import StudentProfile from "../pages/StudentProfile";

export default function TeacherRoutes() {
  return (
    <Routes>

      <Route path="login" element={<TeacherLogin />} />

      <Route element={<TeacherProtectedRoute />}>
        <Route element={<TeacherLayout />}>

          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="student-profile/:id" element={<StudentProfile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="results" element={<Results />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="courses" element={<Courses />} />
          <Route path="fee-status" element={<FeeStatus />} />
          <Route path="notices" element={<Notices />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Route>

    </Routes>
  );
}
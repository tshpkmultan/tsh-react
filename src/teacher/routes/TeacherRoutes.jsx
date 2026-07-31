import { Routes, Route } from "react-router-dom";

import TeacherLayout from "../layouts/TeacherLayout";

import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
import Students from "../pages/Students";
import Assignments from "../pages/Assignments";
import Results from "../pages/Results";
import Notices from "../pages/Notices";
import Schedule from "../pages/Schedule";
import Profile from "../pages/Profile";
import TeacherLogin from "../pages/TeacherLogin";
import TeacherProtectedRoute from "../auth/TeacherProtectedRoute";
import StudentProfile from "../pages/StudentProfile";

const TeacherRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<TeacherLogin />} />

      {/* Protected Routes */}
      <Route element={<TeacherProtectedRoute />}>
        <Route element={<TeacherLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<Students />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/results" element={<Results />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route
    path="/student-profile/:id"
    element={<StudentProfile />}
/>
        </Route>
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
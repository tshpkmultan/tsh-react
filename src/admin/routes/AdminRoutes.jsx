
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Doctors from "../pages/Doctors";
import Appointments from "../pages/Appointments";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Admins from "../pages/Admins";
import DoctorManagement from "../pages/DoctorManagement";
import IslamicTeachers from "../pages/IslamicTeachers";
import IslamicCourses from "../pages/IslamicCourses";
import IslamicEnrollments from "../pages/IslamicEnrollments";
import IslamicBatches from "../pages/IslamicBatches";
import DigitalCourses from "../pages/DigitalCourses";
import DigitalTrainers from "../pages/DigitalTrainers";
import IslamicStudents from "../pages/IslamicStudents";
import DigitalBatches from "../pages/DigitalBatches";
import Users from "../pages/Users";
import DigitalStudents from "../pages/DigitalStudents";
export default function AdminRoutes() {
  return (
    <Routes>

      {/* Login */}
      <Route
        index
        element={<Login />}
      />

      {/* Admin Layout */}
      <Route element={<AdminLayout />}>
<Route
  path="users"
  element={<Users />}
/>
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="islamic-teachers"
          element={<IslamicTeachers />}
        />
<Route
  path="islamic-batches"
  element={<IslamicBatches />}
/>
        <Route
          path="islamic-courses"
          element={<IslamicCourses />}
        />
        <Route
          path="islamic-students"
          element={<IslamicStudents />}
        />
 <Route
          path="digital-courses"
          element={<DigitalCourses />}
        />
        <Route
          path="digital-trainers"
          element={<DigitalTrainers />}
        />
       <Route
    path="digital-students"
    element={<DigitalStudents />}
/>
        <Route
          path="enrollments"
          element={<IslamicEnrollments />}
        />
<Route
          path="digital-batches"
          element={<DigitalBatches />}
        />
        <Route
          path="patients"
          element={<Patients />}
        />

        <Route
          path="doctors"
          element={<Doctors />}
        />

        <Route
          path="appointments"
          element={<Appointments />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

        <Route
          path="admins"
          element={<Admins />}
        />

        <Route
          path="doctor-management"
          element={<DoctorManagement />}
        />

      </Route>

    </Routes>
  );
}

import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* =========================================
   MAIN COMPONENTS
========================================= */
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Stats from "./components/Stats";
import PortfolioSection from "./components/PortfolioSection";
import SkillSection from "./components/SkillSection";
import IslamicSection from "./components/IslamicSection";
import HealthSection from "./components/HealthSection";
import TeamSection from "./components/TeamSection";
import ProcessSection from "./components/ProcessSection";
import DashboardSection from "./components/DashboardSection";
import DonationSection from "./components/DonationSection";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsSection from "./components/StatsSection";
import Footer from "./components/Footer";

/* =========================================
   ENROLLMENT PAGES
========================================= */

import IslamicEnrollment from "./pages/enrollment/IslamicEnrollment";
import HealthEnrollment from "./pages/enrollment/HealthEnrollment";
import EducationEnrollment from "./pages/enrollment/EducationEnrollment";

/* =========================================
   AUTH
========================================= */

import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";

/* =========================================
   ADMIN
========================================= */

import AdminRoutes from "./admin/routes/AdminRoutes";

/* =========================================
   PATIENT DASHBOARD
========================================= */

import PatientLayout from "./patient/layouts/PatientLayout";

import PatientDashboard from "./patient/pages/Dashboard";
import MyAppointments from "./patient/pages/MyAppointments";
import BookDoctor from "./patient/pages/BookDoctor";
import Prescriptions from "./patient/pages/Prescriptions";
import MedicalRecords from "./patient/pages/MedicalRecords";
import PatientProfile from "./patient/pages/Profile";
import PatientSettings from "./patient/pages/Settings";
import ProtectedPatientRoute from "./patient/components/ProtectedPatientRoute";
import PatientPendingApproval from "./patient/pages/PendingApproval";
import PatientRejected from "./patient/pages/Rejected";
/* =========================================
   DOCTOR DASHBOARD
========================================= */
import DoctorLogin from "./doctor/pages/DoctorLogin";

import DoctorProtectedRoute from "./doctor/auth/DoctorProtectedRoute";
import DoctorLayout from "./doctor/layouts/DoctorLayout";

import DoctorDashboard from "./doctor/pages/Dashboard";
import DoctorAppointments from "./doctor/pages/Appointments";
import DoctorPatients from "./doctor/pages/Patients";
import DoctorSchedule from "./doctor/pages/Schedule";
import DoctorPrescriptions from "./doctor/pages/Prescriptions";
import DoctorReports from "./doctor/pages/Reports";
import DoctorProfile from "./doctor/pages/Profile";
import DoctorSettings from "./doctor/pages/Settings";
import TeacherRoutes from "./teacher/routes/TeacherRoutes";
import StudentRoutes from "./student/routes/StudentRoutes";
import DigitalTeacherRoutes from "./digital_teacher/routes/TeacherRoutes";
import DigitalStudentRoutes from "./digital_student/routes/DigitalStudentRoutes";
import BookFollowUp from "./patient/pages/BookFollowUp";
function App() {

  /* =========================================
     LANGUAGE
  ========================================= */

  const [lang, setLang] = useState("ur");

  useEffect(() => {

    const savedLang =
      localStorage.getItem("lang");

    if (savedLang) {

      setLang(savedLang);
    }

  }, []);

  /* =========================================
     LOCATION
  ========================================= */

  const location = useLocation();

  const path =
    location.pathname.toLowerCase();

  /* =========================================
     HIDE MAIN LAYOUT
  ========================================= */
const publicRoutes = [
  "/",
  "/about",
  "/contact",
];

const hideLayout =
  !publicRoutes.includes(path) ||
  path === "/login" ||
  path === "/register" ||
  path === "/category" ||
  path.includes("enrollment") ||
  path.includes("/admin") ||
  path.includes("/patient") ||
  path.includes("/doctor") ||
  path.includes("/teacher") ||
  path.includes("/student") ||
  path.includes("/digital-teacher") ||
  path.includes("/digital-student");
  /* =========================================
     RETURN
  ========================================= */

  return (

    <>

      {/* =========================================
         HEADER
      ========================================= */}

      {!hideLayout && (

        <Header
          lang={lang}
          setLang={setLang}
        />

      )}

      {/* =========================================
         ROUTES
      ========================================= */}

      <Routes>

        {/* =========================================
           HOME
        ========================================= */}

        <Route
          path="/"
          element={

            <>

              <HeroSlider lang={lang} />

              <Stats lang={lang} />

              <PortfolioSection lang={lang} />
<DonationSection />
              <SkillSection lang={lang} />

              <IslamicSection lang={lang} />

              <HealthSection lang={lang} />

              <TeamSection lang={lang} />

              <ProcessSection lang={lang} />

              <DashboardSection lang={lang} />

              <TestimonialsSection lang={lang} />

              <StatsSection lang={lang} />

            </>

          }
        />
         <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
 <Route
          path="*"
          element={<NotFound />}
        />

        {/* =========================================
           AUTH PAGES
        ========================================= */}

        <Route
          path="/category"
          element={<Category />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================================
           ENROLLMENTS
        ========================================= */}

        <Route
          path="/enrollment-islamic"
          element={<IslamicEnrollment />}
        />

        <Route
          path="/enrollment-health"
          element={<HealthEnrollment />}
        />
<Route
    path="/patient/pending-approval"
    element={<PatientPendingApproval />}
/>

<Route
    path="/patient/rejected"
    element={<PatientRejected />}
/>
        <Route
          path="/enrollment-education"
          element={<EducationEnrollment />}
        />

        {/* =========================================
           ADMIN PANEL
        ========================================= */}

        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

        {/* =========================================
           PATIENT DASHBOARD
        ========================================= */}

     <Route element={<ProtectedPatientRoute />}>

    <Route
        path="/patient"
        element={<PatientLayout />}
    >

        <Route
            path="dashboard"
            element={<PatientDashboard />}
        />

        <Route
            path="appointments"
            element={<MyAppointments />}
        />

        <Route
            path="book-doctor"
            element={<BookDoctor />}
        />


<Route
    path="book-followup"
    element={<BookFollowUp />}
/>

<Route
    path="prescriptions"
    element={<Prescriptions />}
/>
      

        <Route
            path="medical-records"
            element={<MedicalRecords />}
        />

        <Route
            path="profile"
            element={<PatientProfile />}
        />

        <Route
            path="settings"
            element={<PatientSettings />}
        />

    </Route>

</Route>

        {/* =========================================
           DOCTOR DASHBOARD
        ========================================= */}
<Route
  path="/doctor"
  element={
    <DoctorProtectedRoute>
      <DoctorLayout />
    </DoctorProtectedRoute>
  }
>

          <Route
            path="dashboard"
            element={<DoctorDashboard />}
          />

          <Route
            path="appointments"
            element={<DoctorAppointments />}
          />

          <Route
            path="patients"
            element={<DoctorPatients />}
          />

          <Route
            path="schedule"
            element={<DoctorSchedule />}
          />

          <Route
            path="prescriptions"
            element={<DoctorPrescriptions />}
          />

          <Route
            path="reports"
            element={<DoctorReports />}
          />

          <Route
            path="profile"
            element={<DoctorProfile />}
          />

          <Route
            path="settings"
            element={<DoctorSettings />}
          />

        </Route>

      
<Route
  path="/doctor-login"
  element={<DoctorLogin />}
/>

        <Route path="/teacher/*" element={<TeacherRoutes />} />
        <Route path="/student/*" element={<StudentRoutes />} />
{/* =========================================
   DIGITAL SKILLS TRAINER
========================================= */}

<Route
    path="/digital-teacher/*"
    element={<DigitalTeacherRoutes />}
/>

{/* =========================================
   DIGITAL SKILLS STUDENT
========================================= */}

<Route
  path="/digital-student/*"
  element={<DigitalStudentRoutes />}
/>
      </Routes>
      {/* =========================================
         FOOTER
      ========================================= */}

      {!hideLayout && (

        <Footer lang={lang} />

      )}

    </>

  );
}

export default App;
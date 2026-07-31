import { useState } from "react";
import { Outlet } from "react-router-dom";

import PatientSidebar from "../components/PatientSidebar";
import PatientHeader from "../components/PatientHeader";

export default function PatientLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="min-h-screen bg-[#F5F7FB]">

      <PatientSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-[300px] flex flex-col min-h-screen">

        <PatientHeader
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

}
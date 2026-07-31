import { Clock, LogOut, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PendingApproval() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("patientAuth");
    localStorage.removeItem("category");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#EAF7FB] via-white to-[#D7EEF7] flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-[35px] shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#082C3B] to-[#0B4D67] p-10 text-center">

          <div className="w-28 h-28 rounded-full bg-white mx-auto flex items-center justify-center shadow-xl">

            <HeartPulse
              className="text-[#082C3B]"
              size={60}
            />

          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mt-6">

            TSH Hospital

          </h1>

          <p className="text-cyan-100 text-lg mt-2">

            Patient Registration Portal

          </p>

        </div>

        {/* Body */}

        <div className="p-10">

          <div className="flex justify-center mb-6">

            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">

              <Clock
                className="text-yellow-600"
                size={55}
              />

            </div>

          </div>

          <h2 className="text-4xl font-black text-[#082C3B] text-center">

            Registration Pending

          </h2>

          <p className="text-center text-gray-600 text-lg leading-8 mt-6">

            Your patient registration has been submitted successfully.

            <br />

            Our administration team is currently reviewing your application.

            <br />

            Once your registration is approved, you will automatically gain access to your Patient Dashboard.

          </p>

          {/* Status */}

          <div className="mt-10 rounded-3xl border border-yellow-300 bg-yellow-50 p-6">

            <div className="flex items-center justify-center gap-3">

              <Clock
                className="text-yellow-600"
                size={28}
              />

              <h3 className="text-2xl font-black text-yellow-700">

                Status: Pending Approval

              </h3>

            </div>

            <p className="text-center text-gray-600 mt-4">

              Please wait while our hospital administration verifies your information.

              You will be able to book appointments, view prescriptions, and access all patient services after approval.

            </p>

          </div>

          {/* Logout */}

          <div className="flex justify-center mt-10">

            <button

              onClick={handleLogout}

              className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3"

            >

              <LogOut size={22} />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
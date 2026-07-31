import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock3,
  Phone,
  RefreshCw,
  ShieldCheck,
  MessageCircle,
  User,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://800junkuae.online/tsh-api/API";

const PendingApproval = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("Pending");

  const [student, setStudent] = useState({
    full_name: "",
    course: "",
    date: "",
    application_id: "",
  });

  const checkStatus = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/digital/check-status.php`,
        {
          params: {
            user_id: localStorage.getItem("user_id"),
          },
        }
      );

      if (res.data.success) {
        setStatus(res.data.status);

        setStudent({
          full_name: res.data.student.full_name,
          course: res.data.student.course,
          date: res.data.student.date,
          application_id: res.data.student.application_id,
        });

        if (res.data.status === "Approved") {

    localStorage.setItem("student_status", "Approved");

    navigate("/digital-student");

}
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();

    const interval = setInterval(() => {
      checkStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background Blur */}

      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-30 top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-30 bottom-0 right-0"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl text-white">

          <div className="flex justify-center">

            <div className="w-32 h-32 rounded-full bg-yellow-400/20 flex items-center justify-center animate-pulse">

              <Clock3 size={70} className="text-yellow-300" />

            </div>

          </div>

          <h1 className="text-5xl font-bold text-center mt-8">

            Admission Under Review

          </h1>

          <p className="text-center text-white/80 mt-5 text-lg leading-8">

            Thank you for submitting your admission application.

            <br />

            Our admission department is currently verifying your documents and payment.

            <br />

            Approval usually takes between 15 minutes and 24 hours.

          </p>

          <div className="flex justify-center mt-8">

            <span className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">

              🟡 Pending Approval

            </span>

          </div>

          {/* Timeline */}

          <div className="mt-16 space-y-8">

            <div className="flex items-center gap-5">

              <CheckCircle className="text-green-400" size={32} />

              <div>

                <h3 className="font-bold">

                  Admission Submitted

                </h3>

                <p className="text-white/70">

                  Your application has been received successfully.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <Clock3 className="text-yellow-400 animate-spin" size={32} />

              <div>

                <h3 className="font-bold">

                  Documents Verification

                </h3>

                <p className="text-white/70">

                  Our team is reviewing your documents.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-5 opacity-50">

              <ShieldCheck size={32} />

              <div>

                <h3 className="font-bold">

                  Admin Approval

                </h3>

                <p>

                  Waiting...

                </p>

              </div>

            </div>

            <div className="flex items-center gap-5 opacity-50">

              <User size={32} />

              <div>

                <h3 className="font-bold">

                  Dashboard Access

                </h3>

                <p>

                  Automatically after approval.

                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid md:grid-cols-3 gap-5 mt-12">

            <button
              onClick={checkStatus}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold flex items-center justify-center gap-3"
            >
              <RefreshCw size={20} />

              {loading ? "Checking..." : "Refresh Status"}
            </button>

            <a
              href="tel:+923097667058"
              className="bg-green-600 hover:bg-green-700 rounded-xl py-4 font-semibold flex items-center justify-center gap-3"
            >
              <Phone size={20} />

              Call Support
            </a>

            <a
              href="https://wa.me/923097667058"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 rounded-xl py-4 font-semibold flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} />

              WhatsApp
            </a>

          </div>

        </div>

        {/* Right Card */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-8">

            Application Details

          </h2>

          <div className="space-y-7">

            <div className="flex items-center gap-4">

              <User className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">

                  Student

                </p>

                <h3 className="font-bold">

                  {student.full_name || "Loading..."}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <GraduationCap className="text-purple-600" />

              <div>

                <p className="text-gray-500 text-sm">

                  Course

                </p>

                <h3 className="font-bold">

                  {student.course || "-"}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <CalendarDays className="text-green-600" />

              <div>

                <p className="text-gray-500 text-sm">

                  Applied Date

                </p>

                <h3 className="font-bold">

                  {student.date || "-"}

                </h3>

              </div>

            </div>

            <div>

              <p className="text-gray-500 text-sm">

                Application ID

              </p>

              <h2 className="text-2xl font-bold text-indigo-700">

                #{student.application_id || "0000"}

              </h2>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-300 mt-10">

              <h3 className="font-bold text-yellow-700">

                Need Help?

              </h3>

              <p className="text-gray-600 mt-3">

                📞 +92 309 7667058

              </p>

              <p className="text-gray-600">

                ✉ tshpk.com@gmail.com
              </p>

              <p className="text-sm text-gray-500 mt-4">

                Our support team is available to assist you during office hours.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PendingApproval;
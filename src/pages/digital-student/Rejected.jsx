import { useEffect, useState } from "react";
import axios from "axios";
import {
  XCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  GraduationCap,
  User,
  Calendar,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "https://800junkuae.online/tsh-api/API";

const Rejected = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({
    application_id: "",
    full_name: "",
    course: "",
    date: "",
  });

  const [reason, setReason] = useState("");

  const loadData = async () => {
    try {
     const userId = localStorage.getItem("user_id");

const res = await axios.get(
  `${API}/digital/check-status.php`,
  {
    params: {
      user_id: userId,
    },
  }
);
      if (res.data.success) {
        setStudent(res.data.student);

        setReason(
          res.data.reason ||
            "Your admission could not be approved. Please contact our admission office."
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <RefreshCw
            size={55}
            className="animate-spin text-red-600 mx-auto"
          />
          <h2 className="mt-5 text-xl font-semibold">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-gray-900 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-[180px] opacity-30 -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-[180px] opacity-20 bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto py-16 px-5">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

              <div className="flex justify-center">

                <div className="w-36 h-36 rounded-full bg-red-500/20 flex items-center justify-center">

                  <XCircle
                    size={90}
                    className="text-red-300"
                  />

                </div>
              </div>

              <h1 className="text-center text-white text-5xl font-bold mt-8">

                Admission Rejected

              </h1>

              <p className="text-center text-white/80 mt-6 leading-8 text-lg">

                Unfortunately your admission request
                could not be approved after reviewing
                your submitted documents.

                <br />

                Please review the rejection reason
                below and contact our admission office.

              </p>

              <div className="flex justify-center mt-8">

                <span className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold">

                  Rejected

                </span>

              </div>

              {/* Reason */}

              <div className="bg-red-100 rounded-2xl mt-12 p-8">

                <h2 className="text-2xl font-bold text-red-700">

                  Rejection Reason

                </h2>

                <p className="text-gray-700 mt-5 leading-8">

                  {reason}

                </p>

              </div>

              {/* Timeline */}

              <div className="mt-12 space-y-8">

                <div className="flex gap-5">

                  <BadgeCheck className="text-green-500" />

                  <div>

                    <h3 className="font-bold text-white">

                      Admission Submitted

                    </h3>

                    <p className="text-white/70">

                      Application received successfully.

                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <BadgeCheck className="text-green-500" />

                  <div>

                    <h3 className="font-bold text-white">

                      Documents Reviewed

                    </h3>

                    <p className="text-white/70">

                      Admission office reviewed your application.

                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <XCircle className="text-red-500" />

                  <div>

                    <h3 className="font-bold text-white">

                      Admission Declined

                    </h3>

                    <p className="text-white/70">

                      Your admission request has been rejected.

                    </p>

                  </div>

                </div>

              </div>
                            {/* Buttons */}

              <div className="grid md:grid-cols-2 gap-5 mt-12">

                <a
                  href="tel:+923097667058"
                  className="bg-green-600 hover:bg-green-700 transition rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-3"
                >
                  <Phone size={22} />

                  Call Support

                </a>

                <a
                  href="https://wa.me/923097667058"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 transition rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-3"
                >
                  <MessageCircle size={22} />

                  WhatsApp Support

                </a>

              </div>

              <button
                onClick={() => navigate("/enrollment-education")}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 text-white font-semibold"
              >
                Apply Again
              </button>

              <button
                onClick={() => navigate("/category")}
                className="mt-4 w-full bg-white/20 hover:bg-white/30 transition rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-3"
              >
                <ArrowLeft size={20} />

                Back to Login

              </button>

            </div>

          </div>

          {/* RIGHT CARD */}

          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-10">

              <h2 className="text-2xl font-bold text-gray-800 mb-8">

                Application Details

              </h2>

              <div className="space-y-8">

                <div className="flex items-center gap-4">

                  <User className="text-blue-600" />

                  <div>

                    <p className="text-sm text-gray-500">

                      Student Name

                    </p>

                    <h3 className="font-bold text-lg">

                      {student.full_name}

                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <GraduationCap className="text-purple-600" />

                  <div>

                    <p className="text-sm text-gray-500">

                      Selected Course

                    </p>

                    <h3 className="font-bold">

                      {student.course}

                    </h3>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Calendar className="text-green-600" />

                  <div>

                    <p className="text-sm text-gray-500">

                      Applied Date

                    </p>

                    <h3 className="font-bold">

                      {student.date}

                    </h3>

                  </div>

                </div>

                <div>

                  <p className="text-sm text-gray-500">

                    Application ID

                  </p>

                  <h1 className="text-3xl font-bold text-indigo-700 mt-2">

                    #{student.application_id}

                  </h1>

                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

                  <h3 className="text-red-700 font-bold text-lg">

                    Admission Status

                  </h3>

                  <div className="mt-4">

                    <span className="bg-red-600 text-white px-5 py-2 rounded-full">

                      Rejected

                    </span>

                  </div>

                </div>

                <div className="bg-blue-50 rounded-2xl p-6">

                  <h3 className="font-bold text-blue-700">

                    Need Help?

                  </h3>

                  <p className="mt-4 text-gray-700">

                    If you think this decision is incorrect,
                    please contact the admission office.

                  </p>

                  <div className="mt-5 space-y-2">

                    <p>

                      📞 +92 309 7667058

                    </p>
<a
  href="mailto:tshpk.com@gmail.com"
>
  ✉ tshpk.com@gmail.com
</a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Rejected;

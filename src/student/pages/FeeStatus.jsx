import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFileInvoiceDollar,
  FaCheck,
  FaClock,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";

import GoogleTranslate from "../../components/GoogleTranslate";

const API = "https://800junkuae.online/tsh-api/API";

export default function FeeStatus() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://800junkuae.online/tsh-api/";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `${API}/student/payments/index.php`,
        {
          params: {
            user_id: user.user_id,
          },
        }
      );

      if (res.data.success) {
        setPayments(res.data.payments || []);
        setSummary(res.data.summary || {});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
            <FaCheck />
            Paid
          </span>
        );

      case "Pending":
        return (
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-bold">
            <FaClock />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full font-bold">
            <FaTimesCircle />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen">

      <div className="flex justify-center md:justify-end p-4">
        <GoogleTranslate />
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}

        <div className="bg-[#082B3A] rounded-3xl shadow-xl p-8 flex items-center gap-5">

          <FaFileInvoiceDollar className="text-yellow-400 text-5xl" />

          <div>

            <h1 className="text-4xl font-bold text-white">
              Fee & Payment Status
            </h1>

            <p className="text-slate-300 mt-2">
              View all your payment details.
            </p>

          </div>

        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <p className="text-gray-500">
              Total Fee
            </p>

            <h2 className="text-4xl font-bold text-[#082B3A] mt-3">
              Rs. {summary.total_fee || 0}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <p className="text-gray-500">
              Paid
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              Rs. {summary.paid || 0}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <p className="text-gray-500">
              Remaining
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">
              Rs. {summary.remaining || 0}
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">

          <div className="grid grid-cols-7 bg-[#082B3A] text-white font-bold p-6">

            <div>Course</div>

            <div>Fee</div>

            <div>Paid</div>

            <div>Status</div>

            <div>Method</div>

            <div>Date</div>

            <div>Receipt</div>

          </div>

          {loading ? (

            <div className="p-12 text-center text-2xl font-bold">
              Loading...
            </div>

          ) : payments.length === 0 ? (

            <div className="p-12 text-center">

              <FaMoneyBillWave className="text-7xl text-gray-300 mx-auto mb-5" />

              <h2 className="text-3xl font-bold text-gray-500">
                No Payment Found
              </h2>

            </div>

          ) : (

            payments.map((item) => (

              <div
                key={item.id}
                className="grid grid-cols-7 items-center p-6 border-b"
              >

                <div className="font-bold text-[#082B3A]">
                  {item.course_name}
                </div>

                <div>
                  Rs. {item.course_fee}
                </div>

                <div>
                  Rs. {item.paid_amount}
                </div>

                <div>
                  {statusBadge(item.payment_status)}
                </div>

                <div>
                  {item.payment_method}
                </div>

                <div className="flex items-center gap-2">

                  <FaCalendarAlt />

                  {item.payment_date || "-"}

                </div>

                <div>

                  {item.payment_screenshot ? (

                    <a
                      href={`${BASE_URL}${item.payment_screenshot}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl inline-flex items-center gap-2"
                    >

                      <FaEye />

                      View

                    </a>

                  ) : (

                    <span className="text-gray-400">
                      No File
                    </span>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

        {/* Help */}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold text-[#082B3A]">
            Need Help?
          </h2>

          <p className="text-gray-700 mt-3">
            If you have any issue regarding your payment, contact the administration.
          </p>

        </div>

      </div>

    </div>
  );
}
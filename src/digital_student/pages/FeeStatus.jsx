import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFileInvoiceDollar,
  FaCheck,
  FaClock,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const API = "https://800junkuae.online/tsh-api/API";

const FeeStatus = () => {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments = async () => {

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user?.user_id) {

        setError("Student not logged in.");

        setLoading(false);

        return;

      }

      const res = await axios.get(

        `${API}/digital_student/payments/index.php`,

        {

          params: {

            user_id: user.user_id,

          },

        }

      );

      console.log(res.data);

      if (res.data.success) {

        setPayments(res.data.payments || []);

      } else {

        setError(res.data.message);

      }

    } catch (err) {

      console.log(err);

      setError("Unable to load fee details.");

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="bg-[#F3F4F6] min-h-screen">

      <div className="flex justify-center md:justify-end mb-8">
        <GoogleTranslate />
      </div>

      <div className="p-4 md:p-6 lg:p-8">

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          {/* Header */}

          <div className="bg-[#082B3A] px-6 md:px-8 py-8 flex items-center gap-4">

            <FaFileInvoiceDollar className="text-yellow-400 text-3xl" />

            <h1 className="text-2xl md:text-4xl font-bold text-white">

              Fee & Payment Status

            </h1>

          </div>
                    {/* Loading */}

          {loading && (

            <div className="text-center py-20">

              <FaSpinner className="animate-spin text-5xl text-yellow-500 mx-auto" />

              <p className="mt-5 text-xl font-semibold">

                Loading Fee Details...

              </p>

            </div>

          )}

          {/* Error */}

          {!loading && error && (

            <div className="text-center py-20">

              <FaTimesCircle className="text-red-500 text-6xl mx-auto" />

              <h2 className="mt-4 text-2xl font-bold text-red-600">

                {error}

              </h2>

            </div>

          )}

          {/* Empty */}

          {!loading && !error && payments.length === 0 && (

            <div className="text-center py-20">

              <FaFileInvoiceDollar className="text-7xl text-gray-300 mx-auto" />

              <h2 className="mt-5 text-3xl font-bold text-gray-500">

                No Payment Record Found

              </h2>

            </div>

          )}

          {/* Payment Table */}

          {!loading && !error && payments.length > 0 && (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-4 text-left">Course</th>

                    <th className="p-4 text-left">Trainer</th>

                    <th className="p-4 text-center">Fee</th>

                    <th className="p-4 text-center">Paid</th>

                    <th className="p-4 text-center">Remaining</th>

                    <th className="p-4 text-center">Method</th>

                    <th className="p-4 text-center">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {payments.map((payment) => (

                    <tr
                      key={payment.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <div className="font-bold text-[#082B3A]">

                          {payment.course_name}

                        </div>

                        <div className="text-sm text-gray-500">

                          {payment.created_at}

                        </div>

                      </td>

                      <td className="p-4">

                        {payment.trainer_name}

                      </td>

                      <td className="p-4 text-center font-bold">

                        Rs. {Number(payment.course_fee).toLocaleString()}

                      </td>

                      <td className="p-4 text-center text-green-600 font-bold">

                        Rs. {Number(payment.paid_amount).toLocaleString()}

                      </td>

                      <td className="p-4 text-center text-red-600 font-bold">

                        Rs. {Number(payment.remaining_amount).toLocaleString()}

                      </td>

                      <td className="p-4 text-center">

                        {payment.payment_method}

                      </td>

                      <td className="p-4 text-center">

                        {payment.payment_status === "Verified" && (

                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                            <FaCheck />

                            Verified

                          </span>

                        )}

                        {payment.payment_status === "Pending" && (

                          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">

                            <FaClock />

                            Pending

                          </span>

                        )}

                        {payment.payment_status === "Rejected" && (

                          <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">

                            <FaTimesCircle />

                            Rejected

                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {/* Help Box */}

          <div className="m-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-[#082B3A] mb-3">

              Need Help?

            </h3>

            <p className="text-gray-700 leading-relaxed">

              If you have any issue regarding your payment or verification,
              please contact your trainer or administrator.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default FeeStatus;
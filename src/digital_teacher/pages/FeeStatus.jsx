import { FaFileInvoiceDollar, FaCheck } from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const FeeStatus = () => {
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

          {/* Content */}
          <div className="p-4 md:p-8">

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-3 bg-gray-100 rounded-xl p-6 font-bold text-xl text-gray-600">
              <div>Course Name</div>
              <div>Amount</div>
              <div>Status</div>
            </div>

            {/* Row 1 */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-0 items-center py-8 border-b border-gray-200">

              <div className="font-bold text-2xl text-[#082B3A]">
                Freelancing Masterclass
              </div>

              <div className="text-2xl font-semibold">
                Rs. 5,000
              </div>

              <div>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-full font-bold text-lg">
                  <FaCheck />
                  Paid
                </span>
              </div>

            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-0 items-center py-8">

              <div className="font-bold text-2xl text-[#082B3A]">
                Tajweed ul Quran
              </div>

              <div className="text-2xl font-semibold">
                Rs. 3,000
              </div>

              <div>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-3 rounded-full font-bold text-lg">
                  <FaCheck />
                  Paid
                </span>
              </div>

            </div>

            {/* Help Box */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6">

              <h3 className="text-2xl font-bold text-[#082B3A] mb-3">
                Need Help?
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed">
                If you have any issues regarding your fee status,
                please contact the admin at{" "}
                <strong>0300-XXXXXXX</strong>
                {" "}via WhatsApp.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FeeStatus;
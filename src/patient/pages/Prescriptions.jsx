import { useEffect, useState } from "react";

import {
  FileText,
  Eye,
  X,
  CalendarDays,
  UserRound,
  ClipboardPlus,
  Pill,
  Stethoscope,
} from "lucide-react";

const Prescriptions = () => {

  /*
  =========================================
  STATES
  =========================================
  */

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedPrescription,
    setSelectedPrescription] =
    useState(null);

  /*
  =========================================
  USER
  =========================================
  */

const user = JSON.parse(localStorage.getItem("user"));

const patientId = user?.user_id;
  /*
  =========================================
  FETCH PRESCRIPTIONS
  =========================================
  */

  useEffect(() => {

    if (patientId) {

      fetchPrescriptions();
    }

  }, [patientId]);

  /*
  =========================================
  FETCH FUNCTION
  =========================================
  */

  const fetchPrescriptions =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(

            `https://800junkuae.online/tsh-api/API/patient/get_patient_prescriptions.php?patient_id=${patientId}`

          );

        const data =
          await response.json();

        console.log(
          "PRESCRIPTIONS:",
          data
        );

        if (data.success) {

          setPrescriptions(
            data.prescriptions || []
          );
        }

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);
      }
    };

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-[#032B38] to-[#05445E] rounded-[35px] p-8 shadow-2xl text-white">

        <div className="flex items-center gap-5">

          <div className="bg-white/20 p-5 rounded-3xl">

            <FileText size={40} />

          </div>

          <div>

            <h1 className="text-5xl font-black">

              Prescriptions

            </h1>

            <p className="text-slate-200 text-xl mt-2">

              View all your doctor prescriptions

            </p>

          </div>

        </div>

      </div>

      {/* LOADING */}

      {

        loading ? (

          <div className="bg-white rounded-[35px] p-12 shadow-2xl text-center">

            <div className="w-14 h-14 border-4 border-[#032B38] border-t-transparent rounded-full animate-spin mx-auto"></div>

            <h2 className="text-2xl font-black text-[#032B38] mt-6">

              Loading Prescriptions...

            </h2>

          </div>

        ) :

        prescriptions.length === 0 ? (

          <div className="bg-white rounded-[35px] p-12 shadow-2xl text-center">

            <div className="bg-[#F4F7FB] w-24 h-24 rounded-full flex items-center justify-center mx-auto">

              <FileText
                size={42}
                className="text-[#032B38]"
              />

            </div>

            <h2 className="text-3xl font-black text-[#032B38] mt-6">

              No Prescriptions Found

            </h2>

            <p className="text-slate-500 text-lg mt-3">

              Your prescriptions will appear here.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {

              prescriptions.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-[30px] shadow-xl border border-slate-100 overflow-hidden"
                >

                  {/* TOP */}

                  <div className="bg-gradient-to-r from-[#032B38] to-[#05445E] p-5 text-white">

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-2xl font-black">

                          Dr.
                          {" "}
                          {item.doctor_name || "Doctor"}

                        </h2>

                        <p className="text-slate-200 mt-1">

                          Prescription ID:
                          {" "}
                          #{item.id}

                        </p>

                      </div>

                      <div className="bg-white/20 px-4 py-2 rounded-2xl">

                        <p className="font-bold text-sm">

                          {item.created_at || "N/A"}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-6">

                    {/* DIAGNOSIS */}

                    <div className="mb-5">

                      <div className="flex items-center gap-2 mb-2">

                        <Stethoscope
                          size={18}
                          className="text-[#032B38]"
                        />

                        <h3 className="text-slate-400 font-bold">

                          Diagnosis

                        </h3>

                      </div>

                      <p className="text-[#032B38] font-bold text-lg line-clamp-2">

                        {

                          item.diagnosis ||

                          "No diagnosis available"

                        }

                      </p>

                    </div>

                    {/* MEDICINES */}

                    <div className="mb-5">

                      <div className="flex items-center gap-2 mb-2">

                        <Pill
                          size={18}
                          className="text-[#032B38]"
                        />

                        <h3 className="text-slate-400 font-bold">

                          Medicines

                        </h3>

                      </div>

                      <p className="text-slate-600 line-clamp-2">

                        {

                          item.medicines ||

                          "No medicines available"

                        }

                      </p>

                    </div>

                    {/* ADVICE */}

                    <div className="mb-6">

                      <div className="flex items-center gap-2 mb-2">

                        <ClipboardPlus
                          size={18}
                          className="text-[#032B38]"
                        />

                        <h3 className="text-slate-400 font-bold">

                          Advice

                        </h3>

                      </div>

                      <p className="text-slate-600 line-clamp-2">

                        {

                          item.advice ||

                          "No advice available"

                        }

                      </p>

                    </div>

                    {/* VIEW BUTTON */}

                    <button
                      onClick={() =>
                        setSelectedPrescription(item)
                      }
                      className="w-full bg-[#032B38] hover:bg-[#05445E] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300"
                    >

                      <Eye size={22} />

                      View Prescription

                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

      {/* MODAL */}

      {

        selectedPrescription && (

          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

            <div className="bg-white rounded-[35px] w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">

              {/* CLOSE */}

              <button
                onClick={() =>
                  setSelectedPrescription(null)
                }
                className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 text-white p-3 rounded-2xl"
              >

                <X size={22} />

              </button>

              {/* TITLE */}

              <div className="mb-10">

                <h2 className="text-4xl font-black text-[#032B38]">

                  Prescription Details

                </h2>

                <p className="text-slate-500 mt-2 text-lg">

                  Complete prescription information

                </p>

              </div>

              {/* DETAILS */}

              <div className="space-y-8">

                {/* DIAGNOSIS */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-4">

                    <Stethoscope
                      size={22}
                      className="text-[#032B38]"
                    />

                    <h3 className="font-black text-[#032B38] text-2xl">

                      Diagnosis

                    </h3>

                  </div>

                  <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">

                    {

                      selectedPrescription.diagnosis ||

                      "No diagnosis"

                    }

                  </p>

                </div>

                {/* MEDICINES */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-4">

                    <Pill
                      size={22}
                      className="text-[#032B38]"
                    />

                    <h3 className="font-black text-[#032B38] text-2xl">

                      Medicines

                    </h3>

                  </div>

                  <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">

                    {

                      selectedPrescription.medicines ||

                      "No medicines"

                    }

                  </p>

                </div>

                {/* ADVICE */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-4">

                    <ClipboardPlus
                      size={22}
                      className="text-[#032B38]"
                    />

                    <h3 className="font-black text-[#032B38] text-2xl">

                      Doctor Advice

                    </h3>

                  </div>

                  <p className="text-xl text-slate-700 leading-relaxed whitespace-pre-line">

                    {

                      selectedPrescription.advice ||

                      "No advice"

                    }

                  </p>

                </div>

              </div>

            </div>

          </div>

        )

      }

    </div>
  );
};

export default Prescriptions;
import { useEffect, useState } from "react";

const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function MedicalRecords() {

    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    useEffect(() => {

        if (userId) {
            fetchRecords();
        }

    }, [userId]);

    const fetchRecords = async () => {

        try {

            const res = await fetch(
                `${BASE_URL}/patient/get_patient_medical_records.php?patient_id=${userId}`
            );

            const data = await res.json();

            console.log("Medical Records:", data);

            if (data.status === "success") {

                setRecords(data.records || []);

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            {/* PAGE HEADER */}

            <div>

                <h1 className="text-4xl font-black text-[#032B38]">

                    Medical Records

                </h1>

                <p className="text-slate-500 mt-2">

                    View all uploaded medical reports.

                </p>

            </div>

            {/* LOADING */}

            {loading ? (

                <div className="bg-white rounded-3xl shadow-lg p-12 text-center text-xl font-bold">

                    Loading...

                </div>

            ) : records.length === 0 ? (

                <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                    <h2 className="text-3xl font-bold text-slate-700">

                        No Medical Records Found

                    </h2>

                </div>

            ) : (

                <div className="grid gap-8">

                    {records.map((record) => (

                        <div
                            key={record.id}
                            className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-green-500"
                        >

                            {/* TOP */}

                            <div className="flex flex-col md:flex-row md:justify-between gap-6">

                                <div className="flex items-center gap-5">

                                    <img
                                        src={
                                            record.doctor_image ||
                                            "https://via.placeholder.com/100"
                                        }
                                        alt={record.doctor_name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-green-200"
                                    />

                                    <div>

                                        <h2 className="text-3xl font-black text-[#032B38]">

                                            {record.doctor_name}

                                        </h2>

                                        <p className="text-lg text-slate-600">

                                            {record.specialization}

                                        </p>

                                        <p className="text-slate-400">

                                            {record.hospital}

                                        </p>

                                        <p className="text-slate-400">

                                            {record.city}, {record.country}

                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                                        Uploaded

                                    </span>

                                    <p className="mt-3 font-semibold">

                                        {record.uploaded_at}

                                    </p>

                                </div>

                            </div>

                            {/* APPOINTMENT */}

                            <div className="grid md:grid-cols-3 gap-6 mt-8">

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    <h3 className="font-bold text-slate-700">

                                        Appointment Date

                                    </h3>

                                    <p className="mt-2">

                                        {record.appointment_date}

                                    </p>

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    <h3 className="font-bold text-slate-700">

                                        Appointment Slot

                                    </h3>

                                    <p className="mt-2">

                                        {record.appointment_slot}

                                    </p>

                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5">

                                    <h3 className="font-bold text-slate-700">

                                        Status

                                    </h3>

                                    <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                                        {record.appointment_status}

                                    </span>

                                </div>

                            </div>

                            {/* REPORT */}

                            <div className="mt-8">

                                <h3 className="text-xl font-bold mb-4">

                                    Medical Report

                                </h3>

                                {record.report_url ? (

                                    <div className="flex flex-wrap gap-4">

                                        <a
                                            href={record.report_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
                                        >
                                            View Report
                                        </a>

                                        <a
                                            href={record.report_url}
                                            download
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
                                        >
                                            Download
                                        </a>

                                    </div>

                                ) : (

                                    <p className="text-slate-400">

                                        No report uploaded.

                                    </p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}
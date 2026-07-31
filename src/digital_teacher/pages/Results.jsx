import { useEffect, useState } from "react";
import axios from "axios";
import { FaAward, FaStar } from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const API = "https://800junkuae.online/tsh-api/API";

const Results = () => {

    const trainer =
        JSON.parse(localStorage.getItem("trainer")) || {};

    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {

        try {

            const res = await axios.get(
                `${API}/admin/digital_results/list.php`,
                {
                    params: {
                        trainer_id: trainer.id,
                    },
                }
            );

            if (res.data.success) {

                setResults(res.data.results || []);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="p-8 bg-gray-100 min-h-screen">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-[#082B3A]">

                        Assignment Results

                    </h1>

                    <p className="text-gray-500 mt-2">

                        View all graded assignments.

                    </p>

                </div>

                <GoogleTranslate />

            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-[#082B3A] text-white">

                        <tr>

                            <th className="p-4 text-left">Assignment</th>

                            <th className="p-4 text-left">Student</th>

                            <th className="p-4 text-left">Course</th>

                            <th className="p-4 text-center">Marks</th>

                            <th className="p-4 text-left">Feedback</th>

                            <th className="p-4 text-center">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {results.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-12 text-gray-500"
                                >

                                    No Results Found

                                </td>

                            </tr>

                        ) : (

                            results.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4 font-semibold">

                                        {item.assignment_title}

                                    </td>

                                    <td className="p-4">

                                        {item.student_name}

                                    </td>

                                    <td className="p-4">

                                        {item.course_name}

                                    </td>

                                    <td className="p-4 text-center">

                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold">

                                            <FaStar className="inline mr-2" />

                                            {item.marks}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {item.feedback}

                                    </td>

                                    <td className="p-4 text-center">

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">

                                            <FaAward className="inline mr-2" />

                                            {item.status}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Results;
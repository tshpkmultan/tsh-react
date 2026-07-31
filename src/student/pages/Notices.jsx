import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBullhorn,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import GoogleTranslate from "../../components/GoogleTranslate";

const Notices = () => {

  const API = "https://800junkuae.online/tsh-api/API";

  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {

    loadNotices();

  }, []);

 const loadNotices = async () => {

    try {

        setLoading(true);

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        console.log("Logged User:", user);

        if (!user) {

            setError("Student not logged in.");

            setLoading(false);

            return;

        }

        const userId = user.user_id;

        console.log("User ID:", userId);

        const res = await axios.get(

            `${API}/student/notices/index.php?user_id=${userId}`

        );

        console.log(res.data);

        if (res.data.success) {

            setNotices(res.data.notices || []);

        } else {

            setError(res.data.message);

        }

    } catch (err) {

        console.log(err);

        setError("Unable to load notices.");

    } finally {

        setLoading(false);

    }

};

  return (

    <div className="bg-[#F3F4F6] min-h-screen">
<div className="flex justify-center md:justify-end mb-8">
    <GoogleTranslate />
</div>
      <div className="p-6">

        <div className="bg-white rounded-3xl shadow overflow-hidden">

          {/* Header */}

          <div className="border-b p-8 flex items-center gap-4">

            <FaBullhorn className="text-yellow-500 text-4xl"/>

            <div>

              <h1 className="text-4xl font-bold text-[#082B3A]">
                Official Notices & Announcements
              </h1>

              <p className="text-gray-500 mt-2">
                Latest announcements from your teacher.
              </p>

            </div>

          </div>

          {/* Loading */}

          {loading && (

            <div className="text-center py-24">

              <FaSpinner className="animate-spin text-yellow-500 text-5xl mx-auto"/>

              <p className="mt-5 text-xl">
                Loading Notices...
              </p>

            </div>

          )}

          {/* Error */}

          {!loading && error && (

            <div className="text-center py-20">

              <h2 className="text-red-600 text-2xl font-bold">

                {error}

              </h2>

            </div>

          )}

          {/* Empty */}

          {!loading &&
            !error &&
            notices.length === 0 && (

            <div className="text-center py-20">

              <FaBullhorn className="text-7xl text-gray-300 mx-auto"/>

              <h2 className="text-3xl font-bold text-gray-500 mt-5">
                No Notices Available
              </h2>

            </div>

          )}

          {/* Notices */}

          {!loading &&
            !error &&
            notices.length > 0 && (

            <div className="p-8 space-y-6">

              {notices.map((notice) => (

                <div
                  key={notice.id}
                  className={`border rounded-2xl shadow-sm p-6 border-l-[6px]
                  ${
                    notice.notice_type === "all"
                      ? "border-l-blue-600"
                      : notice.notice_type === "batch"
                      ? "border-l-green-600"
                      : "border-l-purple-600"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-3xl font-bold text-[#082B3A]">
                        {notice.title}
                      </h2>

                      <span
                        className={`inline-block mt-3 px-4 py-1 rounded-full font-bold
                        ${
                          notice.notice_type === "all"
                            ? "bg-blue-100 text-blue-700"
                            : notice.notice_type === "batch"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >

                        {notice.notice_type === "all"
                          ? "All Students"
                          : notice.notice_type === "batch"
                          ? "Batch Notice"
                          : "Individual Notice"}

                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-gray-500">

                      <FaClock/>

                      {notice.created_at}

                    </div>

                  </div>

                  <p className="mt-6 text-lg text-gray-700">

                    {notice.description}

                  </p>

                  <div className="flex flex-wrap gap-10 mt-8">

                    <div>

                      <p className="text-gray-500 text-sm">
                        Teacher
                      </p>

                      <p className="font-bold">
                        {notice.teacher_name}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Audience
                      </p>

                      <p className="font-bold">
                        {notice.audience}
                      </p>

                    </div>

                    {notice.batch_name && (

                      <div>

                        <p className="text-gray-500 text-sm">
                          Batch
                        </p>

                        <p className="font-bold">
                          {notice.batch_name}
                        </p>

                      </div>

                    )}

                    {notice.student_name && (

                      <div>

                        <p className="text-gray-500 text-sm">
                          Student
                        </p>

                        <p className="font-bold">
                          {notice.student_name}
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Notices;
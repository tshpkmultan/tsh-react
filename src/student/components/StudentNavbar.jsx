import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const StudentNavbar = ({ title }) => {

  const API = "https://800junkuae.online/tsh-api/API";

  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student")) || {};

  const [notifications, setNotifications] = useState(0);

  useEffect(() => {

    if (!student?.user_id) return;

    fetchNotifications();

    const interval = setInterval(() => {

        fetchNotifications();

    }, 30000);

    return () => clearInterval(interval);

}, []);

  const fetchNotifications = async () => {

    if (!student?.user_id) return;

    try {

        const res = await axios.get(

            `${API}/student/notifications/count.php`,

            {
                params: {
                    student_id: student.user_id,
                },
            }

        );

        if (res.data.success) {

            setNotifications(res.data.total);

        }

    } catch (err) {

        console.log(err);

    }

};
  const logout = () => {

    localStorage.removeItem("student");

    navigate("/login");

  };

  return (

    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">

      <div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#082B3A]">

          {title}

        </h1>

        <p className="text-gray-500 mt-1">

          Welcome, {student?.full_name}

        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell className="text-3xl text-gray-600 hover:text-[#082B3A] transition" />

          {notifications > 0 && (

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

              {notifications}

            </span>

          )}

        </button>

        <button
          onClick={logout}
          className="bg-[#082B3A] hover:bg-[#0F4C63] text-yellow-400 px-6 py-3 rounded-xl font-semibold transition"
        >

          Logout

        </button>

      </div>

    </div>

  );

};

export default StudentNavbar;
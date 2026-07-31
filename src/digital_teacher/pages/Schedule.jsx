import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

import ScheduleStats from "../components/schedule/ScheduleStats";
import ScheduleFilter from "../components/schedule/ScheduleFilter";
import ScheduleCard from "../components/schedule/ScheduleCard";
import ScheduleModal from "../components/schedule/ScheduleModal";
import CalendarView from "../components/schedule/CalendarView";

const Schedule = () => {

    const API = "https://800junkuae.online/tsh-api/API";

    // Digital Trainer
    const trainer = JSON.parse(localStorage.getItem("trainer"));

    const trainerId = trainer?.id;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [view, setView] = useState("list");
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const [schedules, setSchedules] = useState([]);

    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        online: 0,
        offline: 0,
        live: 0,
        completed: 0,
    });

    useEffect(() => {
        loadSchedules();
    }, [month, year]);

    const loadSchedules = async () => {

        setLoading(true);

        try {

            const res = await axios.get(
                `${API}/digital_trainer/schedule/list.php?trainer_id=${trainerId}`
            );

            if (res.data.success) {

                setSchedules(res.data.schedules || []);

                calculateStats(res.data.schedules || []);

            }

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const calculateStats = (list) => {

        const today = new Date().toISOString().split("T")[0];

        setStats({

            total: list.length,

            today: list.filter(
                (i) => i.class_date === today
            ).length,

            online: list.filter(
                (i) => i.class_type === "Online"
            ).length,

            offline: list.filter(
                (i) => i.class_type === "Physical"
            ).length,

            live: list.filter(
                (i) => i.status === "Live"
            ).length,

            completed: list.filter(
                (i) => i.status === "Completed"
            ).length,

        });

    };

    const filtered = schedules.filter((item) => {

        const keyword = search.toLowerCase();

        return (

            item.title.toLowerCase().includes(keyword) ||

            (item.course_name || "")
                .toLowerCase()
                .includes(keyword) ||

            (item.batch_name || "")
                .toLowerCase()
                .includes(keyword)

        );

    });

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="bg-gradient-to-r from-[#082B3A] to-[#0B516C] rounded-3xl p-10 text-white flex justify-between items-center">

                <div>

                    <h1 className="text-5xl font-bold">
                        Digital Trainer Schedule
                    </h1>

                    <p className="mt-3">
                        Manage all digital classes and student schedules from one place.
                    </p>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-yellow-400 text-[#082B3A] px-6 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-yellow-300 duration-300"
                >

                    <FaPlus />

                    Create Schedule

                </button>

            </div>

            {/* Stats */}

            <ScheduleStats stats={stats} />

            {/* Filters */}

            <ScheduleFilter
                search={search}
                setSearch={setSearch}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                view={view}
                setView={setView}
                reload={loadSchedules}
            />

            {/* List / Calendar */}

            {view === "list" ? (

                <div className="space-y-6">

                    {filtered.map((item) => (

                        <ScheduleCard
                            key={item.id}
                            item={item}
                            refresh={loadSchedules}
                        />

                    ))}

                </div>

            ) : (

                <CalendarView trainerId={trainerId} />

            )}

            {/* Modal */}

           <ScheduleModal
    open={showModal}
    close={() => setShowModal(false)}
    trainerId={trainerId}
    refresh={loadSchedules}
/>

        </div>

    );

};

export default Schedule;
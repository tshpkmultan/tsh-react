import { useEffect, useState } from "react";
import axios from "axios";
import GoogleTranslate from "../../components/GoogleTranslate";

import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBookOpen,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaLayerGroup,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

const API = "https://800junkuae.online/tsh-api/API";

const Profile = () => {

  const [trainer, setTrainer] = useState(null);

  useEffect(() => {

    const login = JSON.parse(localStorage.getItem("trainer"));

    if (login) {
      fetchProfile(login.id);
    }

  }, []);

  const fetchProfile = async (id) => {

    try {

      const res = await axios.get(
        `${API}/digital_trainer/profile.php`,
        {
          params: {
            trainer_id: id,
          },
        }
      );

      if (res.data.success) {
        setTrainer(res.data.profile);
      }

    } catch (err) {

      console.log(err);

    }

  };

  if (!trainer) {

    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  }

  return (

<div className="bg-gray-100 min-h-screen p-8">

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-5xl font-bold text-[#082B3A]">
Trainer Profile
</h1>

<p className="text-gray-500 mt-2">
Manage your trainer information
</p>

</div>

<GoogleTranslate />

</div>

{/* Header */}

<div className="bg-gradient-to-r from-[#082B3A] to-[#124760] rounded-3xl p-8 text-white shadow-xl">

<div className="flex flex-col lg:flex-row gap-8 items-center">

<div className="w-40 h-40 rounded-full bg-yellow-400 flex justify-center items-center text-6xl font-bold text-[#082B3A]">

{trainer.name.charAt(0)}

</div>

<div>

<h2 className="text-4xl font-bold">

{trainer.name}

</h2>

<p className="text-xl mt-2">

{trainer.specialization}

</p>

<p className="mt-2">

{trainer.email}

</p>

<span className="inline-block mt-4 bg-yellow-400 text-[#082B3A] px-6 py-2 rounded-full font-bold">

Digital Trainer

</span>

</div>

</div>

</div>

{/* Statistics */}

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

<Card
icon={<FaUsers />}
title="Students"
value={trainer.students}
/>

<Card
icon={<FaLayerGroup />}
title="Batches"
value={trainer.batches}
/>

<Card
icon={<FaClipboardList />}
title="Assignments"
value={trainer.assignments}
/>

<Card
icon={<FaCheckCircle />}
title="Attendance"
value={`${trainer.attendance}%`}
/>

</div>

{/* Information */}

<div className="grid lg:grid-cols-2 gap-8 mt-8">

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold text-[#082B3A] mb-6">

Personal Information

</h2>

<Info icon={<FaEnvelope />} label="Email" value={trainer.email} />
<Info icon={<FaPhone />} label="Phone" value={trainer.phone} />
<Info icon={<FaGraduationCap />} label="Qualification" value={trainer.qualification} />
<Info icon={<FaBookOpen />} label="Specialization" value={trainer.specialization} />
<Info icon={<FaClock />} label="Experience" value={`${trainer.experience_years} Years`} />

</div>

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold text-[#082B3A] mb-6">

Additional Information

</h2>

<Info label="Gender" value={trainer.gender} />
<Info icon={<FaMapMarkerAlt />} label="Address" value={trainer.address} />
<Info label="Joining Date" value={trainer.joining_date} />
<Info label="Bio" value={trainer.bio} />

</div>

</div>

</div>

  );

};

const Card = ({ icon, title, value }) => (

<div className="bg-white rounded-3xl shadow-lg p-6">

<div className="flex justify-between">

<div>

<p className="text-gray-500">

{title}

</p>

<h2 className="text-4xl font-bold text-[#082B3A] mt-3">

{value}

</h2>

</div>

<div className="bg-yellow-100 text-[#082B3A] w-16 h-16 rounded-2xl flex items-center justify-center text-2xl">

{icon}

</div>

</div>

</div>

);

const Info = ({ icon, label, value }) => (

<div className="flex gap-4 mb-5">

<div className="text-yellow-500 text-xl">

{icon}

</div>

<div>

<p className="text-gray-500">

{label}

</p>

<h3 className="font-semibold">

{value || "-"}

</h3>

</div>

</div>

);

export default Profile;
import React, { useEffect, useState } from "react";
import {
  User,
  GraduationCap,
  Stethoscope,
  BookOpen,
  Briefcase,
} from "lucide-react";
const BASE_URL = "https://800junkuae.online/tsh-api/API";

export default function TeamSection({ lang }) {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedMember, setSelectedMember] = useState(null);

  const content = {

    en: {
      title: "Meet Our Experts",
      desc: "Learn from qualified Islamic scholars, digital trainers and experienced doctors.",
      view: "View Profile",
      qualification: "Qualification",
      specialization: "Specialization",
      experience: "Experience",
      fee: "Fee",
      noData: "No Team Members Available"
    },

    ur: {
      title: "ہمارے ماہرین",
      desc: "مستند علماء، ڈیجیٹل ٹرینرز اور تجربہ کار ڈاکٹروں سے سیکھیں۔",
      view: "پروفائل دیکھیں",
      qualification: "تعلیم",
      specialization: "اسپیشلائزیشن",
      experience: "تجربہ",
      fee: "فیس",
      noData: "کوئی ریکارڈ موجود نہیں"
    },

    ar: {
      title: "خبراؤنا",
      desc: "تعلم من العلماء والمدربين والأطباء المعتمدين.",
      view: "عرض الملف",
      qualification: "المؤهل",
      specialization: "التخصص",
      experience: "الخبرة",
      fee: "الرسوم",
      noData: "لا توجد بيانات"
    }

  };

  const t = content[lang];

  useEffect(() => {

    fetch(`${BASE_URL}/home/team.php`)
      .then(res => res.json())
      .then(data => {

        if (data.status === "success") {
          setMembers(data.members);
        }

        setLoading(false);

      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  const getIcon = (role) => {

    switch (role) {

      case "Islamic Teacher":
        return <BookOpen size={22} />;

      case "Digital Trainer":
        return <GraduationCap size={22} />;

      case "Doctor":
        return <Stethoscope size={22} />;

      default:
        return <User size={22} />;
    }

  };

  const getColor = (role) => {

    switch (role) {

      case "Islamic Teacher":
        return "bg-yellow-400 text-black";

      case "Digital Trainer":
        return "bg-blue-600";

      case "Doctor":
        return "bg-green-600";

      default:
        return "bg-gray-700";

    }

  };

  return (

<section className="bg-gray-100 py-20">

<div className="max-w-7xl mx-auto px-5">

<div className="text-center mb-16">

<h2 className="text-4xl md:text-5xl font-bold text-[#0b2d36]">
{t.title}
</h2>

<p className="mt-5 text-gray-600 max-w-3xl mx-auto">
{t.desc}
</p>

</div>

{
loading ?

<div className="text-center py-20">
Loading...
</div>

:

members.length===0 ?

<div className="text-center py-20">
{t.noData}
</div>

:

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {members.map((member) => (

<div
key={`${member.role}-${member.id}`}
className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group"
>

{/* Image */}

<div className="relative">

<img
src={
member.image && member.image !== ""
? member.image
: "https://placehold.co/600x500?text=Profile"
}
alt={member.name}
className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
/>

<div
className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold text-white ${getColor(member.role)}`}
>
<div className="flex items-center gap-2">
{getIcon(member.role)}
<span>{member.role}</span>
</div>
</div>

</div>

{/* Body */}

<div className="p-6">

<h3 className="text-xl font-bold text-[#0b2d36]">
{member.name}
</h3>

{member.qualification && (
<div className="flex items-center gap-2 mt-4 text-gray-700">

<GraduationCap
size={18}
className="text-yellow-500"
/>

<div>

<p className="font-semibold">
{t.qualification}
</p>

<p className="text-sm">
{member.qualification}
</p>

</div>

</div>
)}

{member.specialization && (
<div className="flex items-center gap-2 mt-4 text-gray-700">

<Briefcase
size={18}
className="text-blue-500"
/>

<div>

<p className="font-semibold">
{t.specialization}
</p>

<p className="text-sm">
{member.specialization}
</p>

</div>

</div>
)}

{member.experience_years && (
<div className="flex items-center gap-2 mt-4 text-gray-700">

<User
size={18}
className="text-green-600"
/>

<div>

<p className="font-semibold">
{t.experience}
</p>

<p className="text-sm">
{member.experience_years} Years
</p>

</div>

</div>
)}

{member.experience && (
<div className="flex items-center gap-2 mt-4 text-gray-700">

<User
size={18}
className="text-green-600"
/>

<div>

<p className="font-semibold">
{t.experience}
</p>

<p className="text-sm">
{member.experience}
</p>

</div>

</div>
)}

{member.consultation_fee && (
<div className="mt-4">

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

{t.fee}: Rs. {member.consultation_fee}

</span>

</div>
)}

<button
  onClick={() => setSelectedMember(member)}
  className="mt-6 w-full bg-[#0b2d36] hover:bg-[#15424d] text-white py-3 rounded-xl font-semibold transition"
>
  {t.view}
</button>

</div>

</div>

))}

</div>

}
{selectedMember && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">

    <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative">

      {/* Close Button */}

      <button
        onClick={() => setSelectedMember(null)}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-red-500 text-white font-bold hover:bg-red-600"
      >
        ✕
      </button>

      <div className="grid md:grid-cols-2">

        {/* Image */}

        <div>

          <img
            src={
              selectedMember.image
                ? selectedMember.image
                : "https://placehold.co/600x700"
            }
            alt={selectedMember.name}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Details */}

        <div className="p-8 overflow-y-auto max-h-[80vh]">

          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white ${getColor(
              selectedMember.role
            )}`}
          >
            {selectedMember.role}
          </span>

          <h2 className="text-3xl font-bold text-[#0b2d36] mt-5">
            {selectedMember.name}
          </h2>

          {selectedMember.qualification && (
            <div className="mt-6">
              <h4 className="font-bold text-[#0b2d36]">
                {t.qualification}
              </h4>
              <p className="text-gray-600">
                {selectedMember.qualification}
              </p>
            </div>
          )}

          {selectedMember.specialization && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                {t.specialization}
              </h4>
              <p className="text-gray-600">
                {selectedMember.specialization}
              </p>
            </div>
          )}

          {selectedMember.experience && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                {t.experience}
              </h4>
              <p className="text-gray-600">
                {selectedMember.experience}
              </p>
            </div>
          )}

          {selectedMember.experience_years && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                Experience
              </h4>
              <p className="text-gray-600">
                {selectedMember.experience_years} Years
              </p>
            </div>
          )}

          {selectedMember.consultation_fee && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                {t.fee}
              </h4>
              <p className="text-green-600 font-bold text-lg">
                Rs. {selectedMember.consultation_fee}
              </p>
            </div>
          )}

          {selectedMember.email && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                Email
              </h4>
              <p>{selectedMember.email}</p>
            </div>
          )}

          {selectedMember.phone && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                Phone
              </h4>
              <p>{selectedMember.phone}</p>
            </div>
          )}

          {selectedMember.bio && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                Biography
              </h4>
              <p className="text-gray-600 leading-7">
                {selectedMember.bio}
              </p>
            </div>
          )}

          {selectedMember.description && (
            <div className="mt-5">
              <h4 className="font-bold text-[#0b2d36]">
                Description
              </h4>
              <p className="text-gray-600 leading-7">
                {selectedMember.description}
              </p>
            </div>
          )}
{selectedMember.gender && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Gender</h4>
    <p>{selectedMember.gender}</p>
  </div>
)}

{selectedMember.address && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Address</h4>
    <p>{selectedMember.address}</p>
  </div>
)}

{selectedMember.city && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">City</h4>
    <p>{selectedMember.city}</p>
  </div>
)}

{selectedMember.country && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Country</h4>
    <p>{selectedMember.country}</p>
  </div>
)}

{selectedMember.expertise && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Expertise</h4>
    <p>{selectedMember.expertise}</p>
  </div>
)}

{selectedMember.joining_date && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Joining Date</h4>
    <p>{selectedMember.joining_date}</p>
  </div>
)}

{selectedMember.available_days && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Available Days</h4>
    <p>{selectedMember.available_days}</p>
  </div>
)}

{selectedMember.available_time && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Available Time</h4>
    <p>{selectedMember.available_time}</p>
  </div>
)}

{selectedMember.available_slots && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Available Slots</h4>
    <div className="bg-gray-100 rounded-xl p-3 whitespace-pre-wrap">
      {selectedMember.available_slots}
    </div>
  </div>
)}

{selectedMember.about && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">About</h4>
    <p className="leading-7">{selectedMember.about}</p>
  </div>
)}

{selectedMember.status && (
  <div className="mt-4">
    <h4 className="font-bold text-[#0b2d36]">Status</h4>
    <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
      {selectedMember.status}
    </span>
  </div>
)}
        </div>

      </div>

    </div>

  </div>
)}
</div>

</section>

);

}
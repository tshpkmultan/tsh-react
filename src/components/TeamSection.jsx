
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

  /* =====================================
     TRANSLATIONS
  ===================================== */

  const content = {

    en: {
      title: "Meet Our Experts",
      desc: "Learn from qualified Islamic scholars, digital trainers and experienced doctors.",

      islamicTitle: "Islamic Teachers",
      islamicDesc: "Learn from qualified Islamic teachers and scholars.",

      digitalTitle: "Digital Trainers",
      digitalDesc: "Learn practical digital and professional skills.",

      otherTitle: "Doctors & Other Experts",
      otherDesc: "Experienced professionals and specialists.",

      view: "View Profile",
      qualification: "Qualification",
      specialization: "Specialization",
      experience: "Experience",
      fee: "Fee",

      email: "Email",
      phone: "Phone",
      biography: "Biography",
      description: "Description",
      gender: "Gender",
      address: "Address",
      city: "City",
      country: "Country",
      expertise: "Expertise",
      joiningDate: "Joining Date",
      availableDays: "Available Days",
      availableTime: "Available Time",
      availableSlots: "Available Slots",
      about: "About",
      status: "Status",

      noData: "No Team Members Available",
      close: "Close"
    },

    ur: {
      title: "ہمارے ماہرین",
      desc: "مستند علماء، ڈیجیٹل ٹرینرز اور تجربہ کار ڈاکٹروں سے سیکھیں۔",

      islamicTitle: "اسلامی اساتذہ",
      islamicDesc: "مستند اسلامی اساتذہ اور علماء سے سیکھیں۔",

      digitalTitle: "ڈیجیٹل ٹرینرز",
      digitalDesc: "ڈیجیٹل اور پیشہ ورانہ مہارتیں سیکھیں۔",

      otherTitle: "ڈاکٹرز اور دیگر ماہرین",
      otherDesc: "تجربہ کار پیشہ ور افراد اور ماہرین۔",

      view: "پروفائل دیکھیں",
      qualification: "تعلیم",
      specialization: "اسپیشلائزیشن",
      experience: "تجربہ",
      fee: "فیس",

      email: "ای میل",
      phone: "فون",
      biography: "سوانح حیات",
      description: "تفصیل",
      gender: "جنس",
      address: "پتہ",
      city: "شہر",
      country: "ملک",
      expertise: "مہارت",
      joiningDate: "شمولیت کی تاریخ",
      availableDays: "دستیاب دن",
      availableTime: "دستیاب وقت",
      availableSlots: "دستیاب اوقات",
      about: "تعارف",
      status: "حیثیت",

      noData: "کوئی ریکارڈ موجود نہیں",
      close: "بند کریں"
    },

    ar: {
      title: "خبراؤنا",
      desc: "تعلم من العلماء والمدربين والأطباء المعتمدين.",

      islamicTitle: "المعلمون الإسلاميون",
      islamicDesc: "تعلم من المعلمين والعلماء الإسلاميين المؤهلين.",

      digitalTitle: "المدربون الرقميون",
      digitalDesc: "تعلم المهارات الرقمية والمهنية العملية.",

      otherTitle: "الأطباء والخبراء الآخرون",
      otherDesc: "محترفون ومتخصصون ذوو خبرة.",

      view: "عرض الملف",
      qualification: "المؤهل",
      specialization: "التخصص",
      experience: "الخبرة",
      fee: "الرسوم",

      email: "البريد الإلكتروني",
      phone: "الهاتف",
      biography: "السيرة الذاتية",
      description: "الوصف",
      gender: "الجنس",
      address: "العنوان",
      city: "المدينة",
      country: "الدولة",
      expertise: "الخبرة",
      joiningDate: "تاريخ الانضمام",
      availableDays: "الأيام المتاحة",
      availableTime: "الوقت المتاح",
      availableSlots: "الأوقات المتاحة",
      about: "نبذة",
      status: "الحالة",

      noData: "لا توجد بيانات",
      close: "إغلاق"
    }

  };

  const t = content[lang] || content.en;


  /* =====================================
     FETCH TEAM
  ===================================== */

  useEffect(() => {

    fetch(`${BASE_URL}/home/team.php`)
      .then(res => res.json())
      .then(data => {

        if (data.status === "success") {
          setMembers(data.members || []);
        }

        setLoading(false);

      })
      .catch(err => {

        console.log(err);
        setLoading(false);

      });

  }, []);


  /* =====================================
     GET ICON
  ===================================== */

  const getIcon = (role) => {

    switch (role) {

      case "Islamic Teacher":
        return <BookOpen size={20} />;

      case "Digital Trainer":
        return <GraduationCap size={20} />;

      case "Doctor":
        return <Stethoscope size={20} />;

      default:
        return <User size={20} />;

    }

  };


  /* =====================================
     GET ROLE COLOR
  ===================================== */

  const getColor = (role) => {

    switch (role) {

      case "Islamic Teacher":
        return "bg-yellow-400 text-black";

      case "Digital Trainer":
        return "bg-blue-600 text-white";

      case "Doctor":
        return "bg-green-600 text-white";

      default:
        return "bg-gray-700 text-white";

    }

  };


  /* =====================================
     FIXED ROLE SEQUENCE
     
     1. Islamic Teacher
     2. Digital Trainer
     3. Doctor / Other
  ===================================== */

  const islamicTeachers = members.filter(
    member => member.role === "Islamic Teacher"
  );

  const digitalTrainers = members.filter(
    member => member.role === "Digital Trainer"
  );

  const otherMembers = members.filter(
    member =>
      member.role !== "Islamic Teacher" &&
      member.role !== "Digital Trainer"
  );


  /* =====================================
     TEAM CARD
  ===================================== */

  const TeamCard = ({ member }) => {

    return (

      <div
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition
          duration-300
          group
          h-full
          flex
          flex-col
        "
      >

        {/* =================================
            IMAGE
        ================================= */}

        <div
          className="
            relative
            h-64
            sm:h-72
            md:h-80
            bg-gray-100
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          <img
            src={
              member.image && member.image !== ""
                ? member.image
                : "https://placehold.co/600x500?text=Profile"
            }
            alt={member.name}
            className="
              w-full
              h-full
              object-contain
              p-3
              group-hover:scale-105
              transition
              duration-500
            "
          />


          {/* ROLE BADGE */}

          <div
            className={`
              absolute
              top-4
              left-4
              px-3
              md:px-4
              py-2
              rounded-full
              text-xs
              font-semibold
              ${getColor(member.role)}
            `}
          >

            <div className="flex items-center gap-2">

              {getIcon(member.role)}

              <span>
                {member.role}
              </span>

            </div>

          </div>

        </div>


        {/* =================================
            BODY
        ================================= */}

        <div className="p-5 md:p-6 flex flex-col flex-1">

          <h3
            className="
              text-lg
              md:text-xl
              font-bold
              text-[#0b2d36]
              line-clamp-2
            "
          >
            {member.name}
          </h3>


          {/* QUALIFICATION */}

          {member.qualification && (

            <div className="mt-4 flex items-start gap-2 text-gray-700">

              <GraduationCap
                size={18}
                className="text-yellow-500 mt-1 flex-shrink-0"
              />

              <div>

                <p className="font-semibold text-sm">
                  {t.qualification}
                </p>

                <p className="text-sm mt-1">
                  {member.qualification}
                </p>

              </div>

            </div>

          )}


          {/* SPECIALIZATION */}

          {member.specialization && (

            <div className="mt-4 flex items-start gap-2 text-gray-700">

              <Briefcase
                size={18}
                className="text-blue-500 mt-1 flex-shrink-0"
              />

              <div>

                <p className="font-semibold text-sm">
                  {t.specialization}
                </p>

                <p className="text-sm mt-1">
                  {member.specialization}
                </p>

              </div>

            </div>

          )}


          {/* EXPERIENCE YEARS */}

          {member.experience_years && (

            <div className="mt-4 flex items-start gap-2 text-gray-700">

              <User
                size={18}
                className="text-green-600 mt-1 flex-shrink-0"
              />

              <div>

                <p className="font-semibold text-sm">
                  {t.experience}
                </p>

                <p className="text-sm mt-1">
                  {member.experience_years} Years
                </p>

              </div>

            </div>

          )}


          {/* EXPERIENCE */}

          {member.experience && (

            <div className="mt-4 flex items-start gap-2 text-gray-700">

              <User
                size={18}
                className="text-green-600 mt-1 flex-shrink-0"
              />

              <div>

                <p className="font-semibold text-sm">
                  {t.experience}
                </p>

                <p className="text-sm mt-1">
                  {member.experience}
                </p>

              </div>

            </div>

          )}


          {/* FEE */}

          {member.consultation_fee && (

            <div className="mt-4">

              <span
                className="
                  inline-block
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                "
              >
                {t.fee}: Rs. {member.consultation_fee}
              </span>

            </div>

          )}


          {/* VIEW PROFILE */}

          <button
            onClick={() => setSelectedMember(member)}
            className="
              mt-6
              w-full
              bg-[#0b2d36]
              hover:bg-[#15424d]
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
              mt-auto
            "
          >
            {t.view}
          </button>

        </div>

      </div>

    );

  };


  /* =====================================
     SECTION RENDERER
  ===================================== */

  const renderSection = (
    title,
    description,
    sectionMembers
  ) => {

    if (!sectionMembers.length) {
      return null;
    }

    return (

      <div className="mb-20 last:mb-0">

        {/* SECTION HEADING */}

        <div className="text-center mb-10">

          <h3
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-[#0b2d36]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-3
              text-gray-500
              max-w-2xl
              mx-auto
              px-4
            "
          >
            {description}
          </p>

        </div>


        {/* CARDS */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            md:gap-8
          "
        >

          {sectionMembers.map(member => (

            <TeamCard
              key={`${member.role}-${member.id}`}
              member={member}
            />

          ))}

        </div>

      </div>

    );

  };


  /* =====================================
     MAIN
  ===================================== */

  return (

    <section
      className="
        bg-gray-100
        py-14
        md:py-20
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-5
          md:px-6
        "
      >

        {/* =================================
            MAIN HEADER
        ================================= */}

        <div
          className="
            text-center
            mb-12
            md:mb-16
          "
        >

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              text-[#0b2d36]
            "
          >
            {t.title}
          </h2>

          <p
            className="
              mt-4
              md:mt-5
              text-gray-600
              max-w-3xl
              mx-auto
              text-sm
              md:text-base
            "
          >
            {t.desc}
          </p>

        </div>


        {/* =================================
            LOADING
        ================================= */}

        {loading ? (

          <div className="text-center py-20">

            <div
              className="
                inline-block
                w-10
                h-10
                border-4
                border-gray-300
                border-t-[#0b2d36]
                rounded-full
                animate-spin
              "
            />

            <p className="mt-4 text-gray-500">
              Loading...
            </p>

          </div>

        ) : members.length === 0 ? (

          /* =================================
             NO DATA
          ================================= */

          <div className="text-center py-20">

            <p className="text-gray-500">
              {t.noData}
            </p>

          </div>

        ) : (

          /* =================================
             FIXED SEQUENCE
             
             1. ISLAMIC TEACHERS
             2. DIGITAL TRAINERS
             3. DOCTORS / OTHER
          ================================= */

          <>

            {renderSection(
              t.islamicTitle,
              t.islamicDesc,
              islamicTeachers
            )}


            {renderSection(
              t.digitalTitle,
              t.digitalDesc,
              digitalTrainers
            )}


            {renderSection(
              t.otherTitle,
              t.otherDesc,
              otherMembers
            )}

          </>

        )}

      </div>


      {/* =====================================
          PROFILE MODAL
      ===================================== */}

      {selectedMember && (

        <div
          className="
            fixed
            inset-0
            bg-black/70
            z-50
            flex
            items-center
            justify-center
            p-3
            sm:p-5
          "
          onClick={() => setSelectedMember(null)}
        >

          <div
            className="
              bg-white
              rounded-2xl
              md:rounded-3xl
              w-full
              max-w-4xl
              max-h-[94vh]
              overflow-hidden
              shadow-2xl
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedMember(null)}
              className="
                absolute
                top-3
                right-3
                md:top-5
                md:right-5
                z-20
                w-9
                h-9
                md:w-10
                md:h-10
                rounded-full
                bg-red-500
                text-white
                font-bold
                hover:bg-red-600
                transition
              "
              aria-label={t.close}
            >
              ✕
            </button>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                max-h-[94vh]
              "
            >

              {/* =================================
                  MODAL IMAGE
              ================================= */}

              <div
                className="
                  bg-gray-100
                  h-64
                  sm:h-80
                  md:h-auto
                  min-h-[300px]
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >

                <img
                  src={
                    selectedMember.image
                      ? selectedMember.image
                      : "https://placehold.co/600x700?text=Profile"
                  }
                  alt={selectedMember.name}
                  className="
                    w-full
                    h-full
                    object-contain
                    p-4
                    md:p-6
                  "
                />

              </div>


              {/* =================================
                  MODAL DETAILS
              ================================= */}

              <div
                className="
                  p-5
                  sm:p-7
                  md:p-8
                  overflow-y-auto
                  max-h-[60vh]
                  md:max-h-[80vh]
                "
              >

                {/* ROLE */}

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${getColor(selectedMember.role)}
                  `}
                >

                  {getIcon(selectedMember.role)}

                  {selectedMember.role}

                </span>


                {/* NAME */}

                <h2
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-[#0b2d36]
                    mt-5
                  "
                >
                  {selectedMember.name}
                </h2>


                {/* QUALIFICATION */}

                {selectedMember.qualification && (

                  <div className="mt-6">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.qualification}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.qualification}
                    </p>

                  </div>

                )}


                {/* SPECIALIZATION */}

                {selectedMember.specialization && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.specialization}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.specialization}
                    </p>

                  </div>

                )}


                {/* EXPERIENCE */}

                {selectedMember.experience && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.experience}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.experience}
                    </p>

                  </div>

                )}


                {/* EXPERIENCE YEARS */}

                {selectedMember.experience_years && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.experience}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.experience_years} Years
                    </p>

                  </div>

                )}


                {/* CONSULTATION FEE */}

                {selectedMember.consultation_fee && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.fee}
                    </h4>

                    <p className="text-green-600 font-bold text-lg mt-1">
                      Rs. {selectedMember.consultation_fee}
                    </p>

                  </div>

                )}


                {/* EMAIL */}

                {selectedMember.email && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.email}
                    </h4>

                    <p className="text-gray-600 break-all mt-1">
                      {selectedMember.email}
                    </p>

                  </div>

                )}


                {/* PHONE */}

                {selectedMember.phone && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.phone}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.phone}
                    </p>

                  </div>

                )}


                {/* BIO */}

                {selectedMember.bio && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.biography}
                    </h4>

                    <p className="text-gray-600 leading-7 mt-1">
                      {selectedMember.bio}
                    </p>

                  </div>

                )}


                {/* DESCRIPTION */}

                {selectedMember.description && (

                  <div className="mt-5">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.description}
                    </h4>

                    <p className="text-gray-600 leading-7 mt-1">
                      {selectedMember.description}
                    </p>

                  </div>

                )}


                {/* GENDER */}

                {selectedMember.gender && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.gender}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.gender}
                    </p>

                  </div>

                )}


                {/* ADDRESS */}

                {selectedMember.address && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.address}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.address}
                    </p>

                  </div>

                )}


                {/* CITY */}

                {selectedMember.city && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.city}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.city}
                    </p>

                  </div>

                )}


                {/* COUNTRY */}

                {selectedMember.country && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.country}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.country}
                    </p>

                  </div>

                )}


                {/* EXPERTISE */}

                {selectedMember.expertise && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.expertise}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.expertise}
                    </p>

                  </div>

                )}


                {/* JOINING DATE */}

                {selectedMember.joining_date && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.joiningDate}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.joining_date}
                    </p>

                  </div>

                )}


                {/* AVAILABLE DAYS */}

                {selectedMember.available_days && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.availableDays}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.available_days}
                    </p>

                  </div>

                )}


                {/* AVAILABLE TIME */}

                {selectedMember.available_time && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.availableTime}
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {selectedMember.available_time}
                    </p>

                  </div>

                )}


                {/* AVAILABLE SLOTS */}

                {selectedMember.available_slots && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.availableSlots}
                    </h4>

                    <div
                      className="
                        bg-gray-100
                        rounded-xl
                        p-3
                        mt-2
                        whitespace-pre-wrap
                      "
                    >
                      {selectedMember.available_slots}
                    </div>

                  </div>

                )}


                {/* ABOUT */}

                {selectedMember.about && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.about}
                    </h4>

                    <p className="text-gray-600 leading-7 mt-1">
                      {selectedMember.about}
                    </p>

                  </div>

                )}


                {/* STATUS */}

                {selectedMember.status && (

                  <div className="mt-4">

                    <h4 className="font-bold text-[#0b2d36]">
                      {t.status}
                    </h4>

                    <span
                      className="
                        inline-block
                        mt-2
                        bg-green-100
                        text-green-700
                        px-4
                        py-1
                        rounded-full
                        font-semibold
                      "
                    >
                      {selectedMember.status}
                    </span>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}

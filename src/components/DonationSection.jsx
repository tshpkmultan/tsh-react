import {
  Copy,
  Wallet,
  Building2,
  Smartphone,
  Heart,
  ArrowDown,
} from "lucide-react";

const donationMethods = [
  {
    title: "JazzCash",
    icon: Smartphone,
    color: "bg-red-500",
    accountTitle: "Shahbaz Ahmad",
    number: "03097667058",
    label: "Mobile Number",
  },

  {
    title: "EasyPaisa",
    icon: Wallet,
    color: "bg-green-500",
    accountTitle: "Shahbaz Ahmad",
    number: "03331627058",
    label: "Mobile Number",
  },

  {
    title: "Bank of Punjab",
    icon: Building2,
    color: "bg-blue-600",
    accountTitle: "Shahbaz Ahmad",
    number: "6020224441600010",
    label: "Account Number",
  },
];

export default function DonationSection() {

  // =========================================
  // COPY FUNCTION
  // =========================================

  const copyText = (text) => {

    navigator.clipboard.writeText(text);

    alert("Copied Successfully!");

  };


  // =========================================
  // SCROLL TO DONATION ACCOUNTS
  // =========================================

  const scrollToAccounts = () => {

    const section =
      document.getElementById(
        "donation-accounts"
      );

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };


  return (

    <section
      className="
        py-20
        bg-gradient-to-b
        from-white
        to-slate-50
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >

        {/* =====================================
            HEADING
        ====================================== */}

        <div
          className="
            text-center
            max-w-4xl
            mx-auto
            mb-12
          "
        >

          <span
            className="
              inline-block
              px-5
              py-2
              rounded-full
              bg-yellow-100
              text-yellow-700
              font-semibold
              uppercase
              tracking-wider
              text-sm
            "
          >
            Support Our Mission
          </span>


          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-[#0B3948]
              mt-5
              leading-tight
            "
          >
            Help Us Build a Better Future Together
          </h2>


          <p
            className="
              text-gray-600
              text-lg
              mt-6
              leading-8
            "
          >
            Every contribution helps us provide quality Islamic education,
            healthcare support, digital skills training, and career
            opportunities to students and communities. Your generosity enables
            us to continue empowering lives and making education accessible
            to everyone.
          </p>

        </div>


        {/* =====================================
            ANIMATED DONATE BUTTON
        ====================================== */}

        <div
          className="
            flex
            justify-center
            mb-16
          "
        >

          <button
            type="button"
            onClick={scrollToAccounts}
            className="
              group
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              rounded-full
              bg-[#0B3948]
              px-8
              py-4
              text-white
              font-bold
              text-lg
              shadow-xl
              transition-all
              duration-300
              hover:bg-yellow-400
              hover:text-[#0B3948]
              hover:scale-105
              hover:shadow-2xl
            "
          >

            {/* Animated background */}

            <span
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                group-hover:translate-x-full
                transition-transform
                duration-1000
              "
            />

            {/* Heart */}

            <Heart
              size={23}
              className="
                relative
                z-10
                fill-current
                animate-pulse
              "
            />

            {/* Text */}

            <span className="relative z-10">
              Support & Donate
            </span>

            {/* Arrow */}

            <ArrowDown
              size={21}
              className="
                relative
                z-10
                animate-bounce
              "
            />

          </button>

        </div>


        {/* =====================================
            WHY DONATE
        ====================================== */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
            mb-20
          "
        >

          {/* LEFT */}

          <div
            className="
              bg-[#0B3948]
              rounded-3xl
              p-8
              text-white
              shadow-2xl
            "
          >

            <h3
              className="
                text-3xl
                font-bold
                mb-6
              "
            >
              Why Donate?
            </h3>


            <p
              className="
                text-slate-300
                leading-8
              "
            >
              Your donation directly supports our mission of transforming
              lives through education, healthcare, and digital empowerment.
              Every contribution helps us reach more students, patients, and
              families who need quality services regardless of their
              financial situation.
            </p>


            <div
              className="
                grid
                sm:grid-cols-2
                gap-5
                mt-8
              "
            >

              {/* Islamic */}

              <div
                className="
                  bg-white/10
                  rounded-2xl
                  p-5
                "
              >

                <h4
                  className="
                    font-bold
                    text-yellow-400
                  "
                >
                  📖 Islamic Education
                </h4>

                <p
                  className="
                    text-sm
                    mt-2
                    text-slate-300
                  "
                >
                  Sponsor Quran learning, Islamic courses, qualified teachers,
                  and educational resources.
                </p>

              </div>


              {/* Digital */}

              <div
                className="
                  bg-white/10
                  rounded-2xl
                  p-5
                "
              >

                <h4
                  className="
                    font-bold
                    text-yellow-400
                  "
                >
                  💻 Digital Skills
                </h4>

                <p
                  className="
                    text-sm
                    mt-2
                    text-slate-300
                  "
                >
                  Help students learn programming, freelancing, web
                  development, and modern technology.
                </p>

              </div>


              {/* Healthcare */}

              <div
                className="
                  bg-white/10
                  rounded-2xl
                  p-5
                "
              >

                <h4
                  className="
                    font-bold
                    text-yellow-400
                  "
                >
                  🩺 Healthcare
                </h4>

                <p
                  className="
                    text-sm
                    mt-2
                    text-slate-300
                  "
                >
                  Support healthcare awareness, consultations, and connect
                  patients with qualified professionals.
                </p>

              </div>


              {/* Student */}

              <div
                className="
                  bg-white/10
                  rounded-2xl
                  p-5
                "
              >

                <h4
                  className="
                    font-bold
                    text-yellow-400
                  "
                >
                  🎓 Student Support
                </h4>

                <p
                  className="
                    text-sm
                    mt-2
                    text-slate-300
                  "
                >
                  Scholarships, learning materials, mentoring, and educational
                  opportunities for deserving students.
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div
            className="
              bg-yellow-50
              rounded-3xl
              border
              border-yellow-200
              p-8
            "
          >

            <h3
              className="
                text-3xl
                font-bold
                text-[#0B3948]
                mb-6
              "
            >
              Where Your Donation Goes
            </h3>


            <div
              className="
                space-y-4
              "
            >

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Providing free Islamic education to deserving students.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Offering digital skills and freelancing training.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Supporting healthcare awareness and patient consultations.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Providing scholarships and educational resources.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Website hosting, maintenance, security, and development.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Developing new educational tools and learning resources.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Supporting community welfare and outreach programs.
                </p>
              </div>

              <div className="flex gap-3">
                <span>✅</span>
                <p>
                  Expanding our platform to benefit more students worldwide.
                </p>
              </div>

            </div>


            {/* TRANSPARENCY */}

            <div
              className="
                mt-8
                bg-white
                rounded-2xl
                border-l-4
                border-yellow-500
                p-6
                shadow
              "
            >

              <h4
                className="
                  font-bold
                  text-[#0B3948]
                  mb-2
                "
              >
                Transparency Promise
              </h4>

              <p
                className="
                  text-gray-600
                  leading-7
                "
              >
                We are committed to using every donation responsibly. Your
                support directly contributes to educational programs,
                healthcare initiatives, scholarships, and the continuous
                improvement of our platform.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            DONATION ACCOUNTS
        ====================================== */}

        <div
          id="donation-accounts"
          className="
            scroll-mt-10
            grid
            md:grid-cols-3
            gap-8
          "
        >

          {donationMethods.map(
            (item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-200
                    shadow-lg
                    hover:shadow-2xl
                    transition
                    duration-300
                    overflow-hidden
                    hover:-translate-y-2
                  "
                >

                  {/* HEADER */}

                  <div
                    className={`
                      ${item.color}
                      p-6
                      text-white
                      flex
                      items-center
                      gap-3
                    `}
                  >

                    <Icon size={32} />

                    <h3
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      {item.title}
                    </h3>

                  </div>


                  {/* BODY */}

                  <div className="p-6">

                    {/* ACCOUNT TITLE */}

                    <div className="mb-5">

                      <p
                        className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                      >
                        Account Title
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          bg-gray-100
                          rounded-xl
                          p-3
                        "
                      >

                        <span
                          className="
                            font-semibold
                          "
                        >
                          {item.accountTitle}
                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            copyText(
                              item.accountTitle
                            )
                          }
                          className="
                            text-[#0B3948]
                            hover:text-yellow-500
                            transition
                          "
                          title="Copy account title"
                        >
                          <Copy size={18} />
                        </button>

                      </div>

                    </div>


                    {/* NUMBER */}

                    <div>

                      <p
                        className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                      >
                        {item.label}
                      </p>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          bg-gray-100
                          rounded-xl
                          p-3
                        "
                      >

                        <span
                          className="
                            font-semibold
                            break-all
                          "
                        >
                          {item.number}
                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            copyText(
                              item.number
                            )
                          }
                          className="
                            text-[#0B3948]
                            hover:text-yellow-500
                            transition
                          "
                          title="Copy number"
                        >
                          <Copy size={18} />
                        </button>

                      </div>

                    </div>


                    {/* COPY BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        copyText(item.number)
                      }
                      className="
                        mt-8
                        w-full
                        bg-[#0B3948]
                        hover:bg-yellow-400
                        hover:text-[#0B3948]
                        text-white
                        font-semibold
                        py-3
                        rounded-xl
                        transition
                        duration-300
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >

                      <Copy size={18} />

                      Copy {item.label}

                    </button>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

    </section>
  );
}

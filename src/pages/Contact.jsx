import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageCircle,
  Globe,
} from "lucide-react";

import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <div className="bg-slate-50">

      {/* =======================================================
                          HERO SECTION
      ======================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#08434B] via-[#0E7490] to-[#14B8A6] text-white">

        {/* Background Effects */}

        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-yellow-400/20 blur-3xl"></div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-36">

          <div className="max-w-4xl mx-auto text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-sm font-semibold border border-white/20">

              <MessageCircle size={18} />

              Contact EduHealth

            </span>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight">

              We're Here To

              <span className="block text-yellow-300">

                Help You

              </span>

            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-200 max-w-3xl mx-auto">

              Whether you're interested in Digital Skills,
              Islamic Education, or Healthcare services,
              our dedicated team is always ready to answer
              your questions and guide you every step of the way.

            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-12">

              <Link
                to="/category"
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Get Started
              </Link>

              <Link
                to="/about"
                className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#08434B] transition-all duration-300"
              >
                Learn More
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =======================================================
                        CONTACT CARDS
      ======================================================== */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-flex rounded-full bg-cyan-100 text-[#08434B] px-5 py-2 font-semibold">

              Contact Information

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Reach Us Anytime

            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">

              Choose your preferred way to connect with us.
              We respond as quickly as possible.

            </p>

          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

            {/* Phone */}

            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center">

              <div className="w-20 h-20 rounded-2xl bg-cyan-100 mx-auto flex items-center justify-center">

                <Phone
                  size={34}
                  className="text-[#08434B]"
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Call Us

              </h3>

              <p className="mt-4 text-slate-600">

                +92 335 0093500

              </p>

              <p className="text-sm text-slate-500 mt-2">

                Mon - Sat (9AM - 8PM)

              </p>

            </div>

            {/* Email */}

            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center">

              <div className="w-20 h-20 rounded-2xl bg-yellow-100 mx-auto flex items-center justify-center">

                <Mail
                  size={34}
                  className="text-yellow-600"
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Email

              </h3>

              <p className="mt-4 text-slate-600 break-all">

                support@eduhealth.com

              </p>

              <p className="text-sm text-slate-500 mt-2">

                24/7 Support

              </p>

            </div>

            {/* Address */}

            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center">

              <div className="w-20 h-20 rounded-2xl bg-green-100 mx-auto flex items-center justify-center">

                <MapPin
                  size={34}
                  className="text-green-600"
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Office

              </h3>

              <p className="mt-4 text-slate-600">

                Multan,

                <br />

                Punjab, Pakistan

              </p>

              <p className="text-sm text-slate-500 mt-2">

                Visit Anytime

              </p>

            </div>

            {/* Working Hours */}

            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center">

              <div className="w-20 h-20 rounded-2xl bg-red-100 mx-auto flex items-center justify-center">

                <Clock
                  size={34}
                  className="text-red-500"
                />

              </div>

              <h3 className="mt-8 text-2xl font-bold">

                Working Hours

              </h3>

              <p className="mt-4 text-slate-600">

                Monday - Saturday

                <br />

                09:00 AM - 08:00 PM

              </p>

              <p className="text-sm text-slate-500 mt-2">

                Sunday Closed

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================================
                        GOOGLE MAP
      ======================================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 text-[#08434B] px-5 py-2 font-semibold">

              <MapPin size={18} />

              Our Location

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Visit Our Office

            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-8">

              We welcome students, patients, and visitors to our office.
              Feel free to stop by during our working hours.

            </p>

          </div>

          <div className="mt-14 overflow-hidden rounded-[32px] shadow-2xl border border-slate-200">

            <iframe
              title="EduHealth Location"
              src="https://www.google.com/maps?q=Multan,Pakistan&output=embed"
              width="100%"
              height="550"
              loading="lazy"
              className="border-0"
            />

          </div>

        </div>

      </section>

      {/* =======================================================
                          FAQ SECTION
      ======================================================== */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center">

            <span className="inline-flex rounded-full bg-yellow-100 text-yellow-700 px-5 py-2 font-semibold">

              Frequently Asked Questions

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black text-slate-900">

              Everything You Need To Know

            </h2>

            <p className="mt-6 text-lg text-slate-600">

              Here are answers to the questions we receive most often.

            </p>

          </div>

          <div className="mt-16 space-y-6">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-bold">

                How can I enroll in a course?

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Click the Register button, complete your information,
                and our admissions team will contact you shortly.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-bold">

                Can I schedule a doctor's appointment online?

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Yes. You can easily book appointments with our qualified
                healthcare professionals directly through the platform.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-bold">

                Are online classes available?

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                Absolutely. Most Digital Skills and Islamic Education
                courses are available online for students worldwide.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-bold">

                How long does it take to receive a reply?

              </h3>

              <p className="mt-5 text-slate-600 leading-8">

                We usually respond within a few hours during business
                hours, and always within one working day.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =======================================================
                          CONTACT STATS
      ======================================================== */}

      <section className="py-8">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

              <h3 className="text-5xl font-black text-[#08434B]">

                15K+

              </h3>

              <p className="mt-4 text-slate-600">

                Students

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

              <h3 className="text-5xl font-black text-[#08434B]">

                200+

              </h3>

              <p className="mt-4 text-slate-600">

                Expert Teachers

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

              <h3 className="text-5xl font-black text-[#08434B]">

                50+

              </h3>

              <p className="mt-4 text-slate-600">

                Healthcare Specialists

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

              <h3 className="text-5xl font-black text-[#08434B]">

                24/7

              </h3>

              <p className="mt-4 text-slate-600">

                Customer Support

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* =======================================================
                        NEWSLETTER
      ======================================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-[32px] bg-gradient-to-r from-[#08434B] via-[#0E7490] to-[#14B8A6] text-white p-10 lg:p-16 shadow-2xl">

            <div className="text-center">

              <span className="inline-flex rounded-full bg-white/10 px-5 py-2 font-semibold">

                Newsletter

              </span>

              <h2 className="mt-6 text-4xl lg:text-5xl font-black">

                Stay Updated

              </h2>

              <p className="mt-6 max-w-2xl mx-auto text-slate-200 leading-8">

                Subscribe to receive updates about new courses,
                healthcare services, webinars, and platform announcements.

              </p>

            </div>

            <form className="mt-12 max-w-3xl mx-auto">

              <div className="flex flex-col md:flex-row gap-4">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl px-6 py-4 text-slate-900 outline-none"
                />

                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
                >
                  Subscribe
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* =======================================================
                      FINAL CTA
      ======================================================== */}

      <section className="py-28 bg-slate-900 text-white relative overflow-hidden">

        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <span className="inline-flex rounded-full bg-cyan-500/20 px-5 py-2 text-cyan-300 font-semibold">

            Join EduHealth Today

          </span>

          <h2 className="mt-8 text-5xl lg:text-6xl font-black leading-tight">

            Your Future Starts Here

          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-300 leading-9">

            Start learning, connect with experienced teachers,
            consult healthcare professionals, and grow with one
            trusted platform.

          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12">

            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
            >
              Register Now
            </Link>

            <Link
              to="/about"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-slate-900 transition"
            >
              Learn More
            </Link>

          </div>

        </div>

      </section>

    </div>

  );

}
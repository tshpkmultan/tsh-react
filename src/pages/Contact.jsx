// src/pages/Contact.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageCircle,
  Globe,
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  HeartPulse,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function Contact() {
  /* =========================================================
      CONTACT FORM STATE
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
      NEWSLETTER STATE
  ========================================================= */

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [newsletterStatus, setNewsletterStatus] = useState({
    type: "",
    message: "",
  });

  const [newsletterLoading, setNewsletterLoading] = useState(false);

  /* =========================================================
      CONTACT FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
      SEND CONTACT FORM
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/tshpk.com@gmail.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,

            _subject: `New Contact Message - ${formData.subject || "TSH Website"}`,

            _template: "table",

            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. Our team will contact you soon.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(
          data?.message || "Unable to send your message."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);

      setFormStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again or contact us directly by email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
      NEWSLETTER SUBMIT
  ========================================================= */

  const handleNewsletter = async (e) => {
    e.preventDefault();

    setNewsletterStatus({
      type: "",
      message: "",
    });

    if (!newsletterEmail.trim()) {
      setNewsletterStatus({
        type: "error",
        message: "Please enter your email address.",
      });

      return;
    }

    setNewsletterLoading(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/tshpk.com@gmail.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            email: newsletterEmail,

            subject: "New TSH Newsletter Subscription",

            message: `A new user subscribed to the TSH newsletter.

Email:
${newsletterEmail}`,

            _subject: "New TSH Newsletter Subscription",

            _template: "table",

            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus({
          type: "success",
          message:
            "Thank you! You have been added to our update list.",
        });

        setNewsletterEmail("");
      } else {
        throw new Error(
          data?.message || "Unable to subscribe."
        );
      }
    } catch (error) {
      console.error("Newsletter error:", error);

      setNewsletterStatus({
        type: "error",
        message:
          "Unable to submit your email. Please try again.",
      });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =======================================================
                          HERO SECTION
      ======================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#08434B] via-[#0E7490] to-[#14B8A6] text-white">

        {/* Background */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur-md">

              <MessageCircle size={18} />

              Contact TSH

            </span>

            <h1 className="mt-8 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">

              We're Here To

              <span className="mt-2 block text-yellow-300">
                Help You
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 lg:text-xl">

              Whether you are interested in education,
              healthcare or practical skills, our team
              is ready to answer your questions and
              guide you toward the right path.

            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                to="/category"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-bold text-[#08434B] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl"
              >

                Explore TSH

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#08434B]"
              >

                <MessageCircle size={20} />

                Send Message

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =======================================================
                       CONTACT INFORMATION
      ======================================================== */}

      <section className="relative py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-[#08434B]">

              Contact Information

            </span>

            <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">

              Let's Stay Connected

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

              Choose the easiest way to reach us. We are here
              to help you with your questions and requests.

            </p>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Phone */}

            <a
              href="tel:+923097667058"
              className="group rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-[#08434B] transition-transform duration-500 group-hover:scale-110">

                <Phone size={28} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Call Us
              </h3>

              <p className="mt-3 font-medium text-slate-600">
                +92 309 7667058
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monday - Saturday
              </p>

            </a>


            {/* Email */}

            <a
              href="mailto:tshpk.com@gmail.com"
              className="group rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200 hover:shadow-2xl"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 transition-transform duration-500 group-hover:scale-110">

                <Mail size={28} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Email Us
              </h3>

              <p className="mt-3 break-all font-medium text-slate-600">
                tshpk.com@gmail.com
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Send us your questions
              </p>

            </a>


            {/* Office */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-transform duration-500 group-hover:scale-110">

                <MapPin size={28} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Office
              </h3>

              <p className="mt-3 text-slate-600">
                Multan,
                <br />
                Punjab, Pakistan
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Visit during working hours
              </p>

            </div>


            {/* Working Hours */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-transform duration-500 group-hover:scale-110">

                <Clock size={28} />

              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Working Hours
              </h3>

              <p className="mt-3 text-slate-600">
                Monday - Saturday
                <br />
                09:00 AM - 08:00 PM
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Sunday Closed
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =======================================================
                       CONTACT FORM
      ======================================================== */}

      <section
        id="contact-form"
        className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-cyan-50 py-20 sm:py-24 lg:py-28"
      >

        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">

            {/* LEFT */}

            <div className="lg:col-span-2">

              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-[#08434B]">

                <Send size={17} />

                Send Us a Message

              </span>

              <h2 className="mt-6 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">

                Have a Question?

                <span className="mt-2 block text-cyan-600">
                  Let's Talk.
                </span>

              </h2>

              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

                Fill out the form and our team will receive
                your message directly by email. We will
                get back to you as soon as possible.

              </p>


              {/* Small Service Cards */}

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">

                    <BookOpen size={21} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Education
                    </h3>

                    <p className="text-sm text-slate-500">
                      Courses and learning support
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

                    <HeartPulse size={21} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Healthcare
                    </h3>

                    <p className="text-sm text-slate-500">
                      Healthcare services and support
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">

                    <Sparkles size={21} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Skills
                    </h3>

                    <p className="text-sm text-slate-500">
                      Practical and digital skills
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT FORM */}

            <div className="lg:col-span-3">

              <form
                onSubmit={handleSubmit}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,.10)] sm:p-8 lg:p-10"
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Name */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                      />

                    </div>

                  </div>


                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                      />

                    </div>

                  </div>


                  {/* Phone */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 309 7667058"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                      />

                    </div>

                  </div>


                  {/* Subject */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Subject
                    </label>

                    <div className="relative">

                      <FileText
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                      />

                    </div>

                  </div>

                </div>


                {/* Message */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                  />

                </div>


                {/* Status */}

                {formStatus.message && (

                  <div
                    className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                      formStatus.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >

                    {formStatus.type === "success" ? (
                      <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                      />
                    )}

                    <span>
                      {formStatus.message}
                    </span>

                  </div>

                )}


                {/* Submit */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#08434B] to-[#0E7490] px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={20} />

                      Send Message

                      <ArrowRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>


                <p className="mt-4 text-center text-xs text-slate-500">

                  Your message will be sent to
                  <span className="font-semibold text-slate-700">
                    {" "}tshpk.com@gmail.com
                  </span>

                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =======================================================
                          GOOGLE MAP
      ======================================================== */}

      <section className="bg-white py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-[#08434B]">

              <MapPin size={18} />

              Our Location

            </span>

            <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">

              Visit Our Office

            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

              We welcome students, patients and visitors
              to our office in Multan.

            </p>

          </div>

          <div className="mt-12 overflow-hidden rounded-[32px] border border-slate-200 shadow-2xl">

            <iframe
              title="TSH Location"
              src="https://www.google.com/maps?q=Multan,Pakistan&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
            />

          </div>

        </div>

      </section>


      {/* =======================================================
                          FAQ SECTION
      ======================================================== */}

      <section className="bg-slate-50 py-20 sm:py-24">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-700">

              Frequently Asked Questions

            </span>

            <h2 className="mt-6 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">

              Everything You Need To Know

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">

              Here are answers to some common questions.

            </p>

          </div>


          <div className="mt-12 space-y-5">

            {/* FAQ 1 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-8">

              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                How can I enroll in a course?
              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                Visit the relevant category, select the service
                or course you are interested in, and follow
                the registration or enrollment process.

              </p>

            </div>


            {/* FAQ 2 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-8">

              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Can I contact the team online?
              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                Yes. You can use the contact form on this page
                and your message will be sent directly to our
                team email.

              </p>

            </div>


            {/* FAQ 3 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-8">

              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Are online services available?
              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                TSH provides online learning and digital services.
                Visit the relevant category to explore the available
                options.

              </p>

            </div>


            {/* FAQ 4 */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-8">

              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">

                How can I get more information?

              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                Send us a message using the form above or email us
                directly at tshpk.com@gmail.com.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =======================================================
                          NEWSLETTER
      ======================================================== */}

      <section className="bg-white py-20 sm:py-24">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#08434B] via-[#0E7490] to-[#14B8A6] p-7 text-white shadow-2xl sm:rounded-[40px] sm:p-10 lg:p-16">

            {/* Glow */}

            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-yellow-400/20 blur-[100px]" />

            <div className="relative z-10 text-center">

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-md">

                <Globe size={17} />

                Stay Connected

              </span>

              <h2 className="mt-6 text-3xl font-black sm:text-4xl lg:text-5xl">

                Stay Updated

              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">

                Receive updates about courses, healthcare services,
                learning opportunities and important TSH announcements.

              </p>

            </div>


            <form
              onSubmit={handleNewsletter}
              className="relative z-10 mx-auto mt-10 max-w-3xl"
            >

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) =>
                    setNewsletterEmail(e.target.value)
                  }
                  required
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 rounded-xl border-0 bg-white px-5 py-4 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
                />

                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-bold text-[#08434B] transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {newsletterLoading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      Subscribe

                      <ArrowRight size={18} />
                    </>
                  )}

                </button>

              </div>


              {newsletterStatus.message && (

                <div
                  className={`mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm ${
                    newsletterStatus.type === "success"
                      ? "bg-green-500/20 text-green-100"
                      : "bg-red-500/20 text-red-100"
                  }`}
                >

                  {newsletterStatus.type === "success" ? (
                    <CheckCircle size={17} />
                  ) : (
                    <AlertCircle size={17} />
                  )}

                  {newsletterStatus.message}

                </div>

              )}

            </form>

          </div>

        </div>

      </section>


      {/* =======================================================
                          FINAL CTA
      ======================================================== */}

      <section className="relative overflow-hidden bg-slate-900 py-24 text-white sm:py-28">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-[110px]" />

        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">

          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-5 py-2.5 text-sm font-semibold text-cyan-300">

            <Sparkles size={17} />

            Your Journey Starts Here

          </span>

          <h2 className="mt-7 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">

            Ready To Take

            <span className="mt-2 block text-yellow-400">
              The Next Step?
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">

            Explore TSH and discover the opportunities
            that match your goals.

          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/category"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-2xl"
            >

              Explore TSH

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

            <a
              href="mailto:tshpk.com@gmail.com"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900"
            >

              <Mail size={20} />

              Email Us

            </a>

          </div>

        </div>

      </section>

    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  AlertTriangle,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-6 py-20">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl w-full">

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="bg-gradient-to-br from-[#08434B] to-[#0E7490] text-white p-12 flex flex-col justify-center">

              <div className="inline-flex h-24 w-24 rounded-full bg-white/10 items-center justify-center">

                <AlertTriangle
                  size={50}
                  className="text-yellow-400"
                />

              </div>

              <h1 className="mt-10 text-7xl font-black">

                404

              </h1>

              <h2 className="mt-6 text-4xl font-bold leading-tight">

                Oops!

                <br />

                Page Not Found

              </h2>

              <p className="mt-8 text-slate-200 leading-8 text-lg">

                The page you are trying to visit doesn't exist,
                may have been moved, or the URL is incorrect.

              </p>

            </div>

            {/* RIGHT */}

            <div className="p-12 flex flex-col justify-center">

              <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold w-fit">

                <Search size={18} />

                Error 404

              </span>

              <h2 className="mt-8 text-4xl font-black text-slate-900">

                We couldn't find
                what you were looking for.

              </h2>

              <p className="mt-8 text-slate-600 leading-8 text-lg">

                Don't worry! You can return to the homepage,
                explore our services or go back to the previous page.

              </p>

              <div className="flex flex-wrap gap-5 mt-12">

                <Link
                  to="/"
                  className="inline-flex items-center gap-3 bg-[#08434B] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0E7490] transition-all duration-300"
                >
                  <Home size={20} />

                  Back To Home
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-3 border-2 border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300"
                >
                  <ArrowLeft size={20} />

                  Go Back
                </button>

              </div>
                            {/* Quick Links */}

              <div className="mt-16">

                <h3 className="text-xl font-bold text-slate-900 mb-6">

                  Popular Pages

                </h3>

                <div className="grid sm:grid-cols-2 gap-4">

                  <Link
                    to="/about"
                    className="rounded-2xl border border-slate-200 p-5 hover:border-cyan-500 hover:shadow-lg transition"
                  >
                    <h4 className="font-bold text-slate-900">

                      About Us

                    </h4>

                    <p className="mt-2 text-sm text-slate-600">

                      Learn about our mission, vision and services.

                    </p>

                  </Link>

                  <Link
                    to="/contact"
                    className="rounded-2xl border border-slate-200 p-5 hover:border-cyan-500 hover:shadow-lg transition"
                  >
                    <h4 className="font-bold text-slate-900">

                      Contact

                    </h4>

                    <p className="mt-2 text-sm text-slate-600">

                      Get in touch with our support team.

                    </p>

                  </Link>

                  <Link
                    to="/login"
                    className="rounded-2xl border border-slate-200 p-5 hover:border-cyan-500 hover:shadow-lg transition"
                  >
                    <h4 className="font-bold text-slate-900">

                      Login

                    </h4>

                    <p className="mt-2 text-sm text-slate-600">

                      Access your student, teacher or doctor portal.

                    </p>

                  </Link>

                  <Link
                    to="/register"
                    className="rounded-2xl border border-slate-200 p-5 hover:border-cyan-500 hover:shadow-lg transition"
                  >
                    <h4 className="font-bold text-slate-900">

                      Register

                    </h4>

                    <p className="mt-2 text-sm text-slate-600">

                      Join EduHealth and start your journey today.

                    </p>

                  </Link>

                </div>

              </div>

              {/* Bottom Note */}

              <div className="mt-14 border-t border-slate-200 pt-8">

                <p className="text-slate-500 text-sm leading-7">

                  If you believe this page should exist, please contact our
                  support team or check that the web address is correct.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Floating Decoration */}

        <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-yellow-400 opacity-80 blur-xl"></div>

        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-cyan-400 opacity-70 blur-xl"></div>

      </div>

    </div>
  );
}
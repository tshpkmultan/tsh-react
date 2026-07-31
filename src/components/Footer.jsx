// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { Mail, Phone } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function Footer({ lang = "en" }) {
  const content = {
    en: {
      desc:
        "Providing top-tier Digital Skills, Islamic Education, and Health Consultations.",

      quick: "Quick Links",
      departments: "Departments",
      contact: "Contact Us",

      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
      ],

      depts: [
        {
          name: "Digital Skills",
          path: "/enrollment-education",
        },
        {
          name: "Islamic Education",
          path: "/enrollment-islamic",
        },
        {
          name: "Health Services",
          path: "/enrollment-health",
        },
      ],

      payment: "Payments verified via screenshot upload.",

      rights: "© 2026 EduHealth Platform. All Rights Reserved.",

      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },

    ur: {
      desc:
        "ڈیجیٹل مہارتیں، اسلامی تعلیم اور ہیلتھ سروسز ایک پلیٹ فارم پر۔",

      quick: "اہم لنکس",
      departments: "شعبہ جات",
      contact: "رابطہ کریں",

      links: [
        { name: "ہوم", path: "/" },
        { name: "ہمارے بارے میں", path: "/about" },
        { name: "ٹیم", path: "/team" },
        { name: "رابطہ", path: "/contact" },
        { name: "لاگ ان", path: "/login" },
      ],

      depts: [
        {
          name: "ڈیجیٹل سکلز",
          path: "/enrollment-education",
        },
        {
          name: "اسلامی تعلیم",
          path: "/enrollment-islamic",
        },
        {
          name: "ہیلتھ",
          path: "/enrollment-health",
        },
      ],

      payment:
        "ادائیگی اسکرین شاٹ کے ذریعے تصدیق کی جاتی ہے۔",

      rights: "© 2026 تمام حقوق محفوظ ہیں",

      privacy: "پرائیویسی",
      terms: "شرائط",
    },

    ar: {
      desc:
        "منصة واحدة لتعلم المهارات والتعليم الإسلامي والخدمات الصحية.",

      quick: "روابط سريعة",
      departments: "الأقسام",
      contact: "اتصل بنا",

      links: [
        { name: "الرئيسية", path: "/" },
        { name: "حول", path: "/about" },
        { name: "الفريق", path: "/team" },
        { name: "اتصل", path: "/contact" },
        { name: "تسجيل الدخول", path: "/login" },
      ],

      depts: [
        {
          name: "المهارات الرقمية",
          path: "/enrollment-education",
        },
        {
          name: "التعليم الإسلامي",
          path: "/enrollment-islamic",
        },
        {
          name: "الخدمات الصحية",
          path: "/enrollment-health",
        },
      ],

      payment:
        "يتم التحقق من الدفع عبر لقطة الشاشة.",

      rights: "© 2026 جميع الحقوق محفوظة",

      privacy: "الخصوصية",
      terms: "الشروط",
    },
  };

  const t = content[lang] || content.en;

  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">

            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="EduHealth"
                  className="h-12 w-12 rounded-lg"
                />

                <h2 className="text-2xl font-bold text-yellow-400">
                  EduHealth
                </h2>
              </div>

              <p className="text-gray-400 mt-4 leading-7">
                {t.desc}
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-5">
                {t.quick}
              </h3>

              <div className="space-y-3">
                {t.links.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block text-gray-400 hover:text-yellow-400 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h3 className="text-lg font-semibold mb-5">
                {t.departments}
              </h3>

              <div className="space-y-3">
                {t.depts.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block text-gray-400 hover:text-yellow-400 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-5">
                {t.contact}
              </h3>

              <a
                href="tel:+923350093500"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
              >
                <Phone size={16} />
                +92 335 0093500
              </a>

              <a
                href="mailto:support@eduhealth.com"
                className="flex items-center gap-2 mt-3 text-gray-400 hover:text-yellow-400 transition"
              >
                <Mail size={16} />
                support@eduhealth.com
              </a>

              <div className="mt-5 rounded-lg bg-gray-900 border border-gray-700 p-4 text-sm text-gray-300">
                ⚠ {t.payment}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>{t.rights}</p>

            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="hover:text-yellow-400 transition"
              >
                {t.privacy}
              </Link>

              <Link
                to="/terms"
                className="hover:text-yellow-400 transition"
              >
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923350093500?text=Hello%20I%20need%20information"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}
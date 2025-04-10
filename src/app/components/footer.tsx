"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const isDark = useSelector((state: RootState) => state.header.isDark);

  return (
    <footer className="w-full bg-gradient-to-b from-transparent to-gray-100 dark:from-transparent dark:to-black/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-right">
          {/* Logo and about section */}
          <div className="md:col-span-1">
            <div className="flex justify-end md:justify-center">
              <Image
                src="/images/masdarName.png"
                alt="Logo"
                width={150}
                height={50}
                className="mb-4"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              نحن ملتزمون بتقديم أفضل الخدمات والمنتجات لعملائنا الكرام
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h3 className="text-DarkPrimary font-bold text-xl mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-DarkPrimary transition-colors duration-300"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-DarkPrimary transition-colors duration-300"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 dark:text-gray-300 hover:text-DarkPrimary transition-colors duration-300"
                >
                  الخدمات
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-DarkPrimary transition-colors duration-300"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-1">
            <h3 className="text-DarkPrimary font-bold text-xl mb-4">
              معلومات الاتصال
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-end gap-2 text-gray-600 dark:text-gray-300">
                <span>info@example.com</span>
                <FaEnvelope className="text-DarkPrimary" />
              </li>
              <li className="flex items-center justify-end gap-2 text-gray-600 dark:text-gray-300">
                <span>+123 456 7890</span>
                <FaPhoneAlt className="text-DarkPrimary" />
              </li>
              <li className="flex items-center justify-end gap-2 text-gray-600 dark:text-gray-300">
                <span>الرياض، المملكة العربية السعودية</span>
                <FaMapMarkerAlt className="text-DarkPrimary" />
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div className="md:col-span-1">
            <h3 className="text-DarkPrimary font-bold text-xl mb-4">
              تواصل معنا
            </h3>
            <div className="flex space-x-4 justify-end">
              <Link
                href="#"
                aria-label="Twitter"
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-DarkPrimary hover:text-white dark:hover:bg-DarkPrimary transition-colors duration-300"
              >
                <FaTwitter className="text-lg" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-DarkPrimary hover:text-white dark:hover:bg-DarkPrimary transition-colors duration-300"
              >
                <FaFacebook className="text-lg" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-DarkPrimary hover:text-white dark:hover:bg-DarkPrimary transition-colors duration-300"
              >
                <FaInstagram className="text-lg" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-DarkPrimary hover:text-white dark:hover:bg-DarkPrimary transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Masdar. جميع الحقوق محفوظة
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-500 dark:text-gray-400 text-sm hover:text-DarkPrimary transition-colors duration-300"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 dark:text-gray-400 text-sm hover:text-DarkPrimary transition-colors duration-300"
            >
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

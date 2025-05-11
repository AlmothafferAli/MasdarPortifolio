"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaTwitter,
  FaFacebook,
  FaInstagram,


  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {

  const socialLinks = [
    {
      href: "https://twitter.com",
      icon: <FaTwitter />,
    },
    {
      href: "https://facebook.com",
      icon: <FaFacebook />,
    },
    {
      href: "https://instagram.com",
      icon: <FaInstagram />,
    },
  ];
  const contactInfo = [
    {
      href: "mailto:info@masdar.com",
      icon: <FaEnvelope />,
    },
    {
      href: "tel:+964770000000",
      icon: <FaPhoneAlt />,
    },
    {
      href: "https://maps.app.goo.gl/12",
      icon: <FaMapMarkerAlt />,
    },
  ];
  const fastLinks = [
    {
      href: "/",
      text: "الرئيسية",
    },
    {
      href: "/about",
      text: "من نحن",
    },
    {
      href: "/services",
      text: "الخدمات",
    },

    {
      href: "/terms",
      text: "الشروط والأحكام",
    },
  ];
  return (
    <footer className="w-full bg-gradient-to-b from-transparent to-gray-100 dark:from-transparent dark:to-black/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1  md:grid-cols-4 gap-10 text-right">
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
              {fastLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-DarkPrimary transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))} 
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-1">
            <h3 className="text-DarkPrimary font-bold text-xl mb-4">
              معلومات الاتصال
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li
                  key={info.href}
                  className="flex items-center justify-end gap-2 text-gray-600 dark:text-gray-300"
                >
                  <span>{info.href}</span>
                  {info.icon}
                </li>
              ))}
            </ul>
          </div>

          {/* Social media */}

          <div className="md:col-span-1">
            <h3 className="text-DarkPrimary font-bold text-xl mb-4">
              تواصل معنا
            </h3>
            <div className="flex space-x-4 justify-end">
              {socialLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-DarkPrimary hover:text-white dark:hover:bg-DarkPrimary transition-colors duration-200"
                >
                  {link.icon}
                </Link>
              ))}
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

import { motion } from "framer-motion";
import React from "react";
import { FaLink } from "react-icons/fa";
import Image from "next/image";

import PrimaryButton from "./EleComponents/PrimaryButton";
import { useRouter } from "next/navigation";

export default function PartnerCard({
  link,
  website,
  name,
  logo,
  children,
  id,
}: {
  link: string;
  website: string;
  name: string;
  logo: string;
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`rounded-2xl p-4 shadow-lg hover:shadow-xl bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent transition-shadow duration-300  max-w-72 min-w-72`}
      dir="rtl"
    >
      <div className="flex flex-col h-full ">
        {/* Image Section */}
        {logo && (
          <div className="relative  h-48 mb-4 rounded-xl overflow-hidden">
            <Image
              src={"http://192.168.77.191:8081/" + logo}
              alt={name || "Partner logo"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                {children}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {name}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 text-sm flex-1">
            {website}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            {link && (
              <a
                href={"/" + link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <FaLink className="w-3 h-3" />
                <span className="text-xs">View Partner</span>
              </a>
            )}
            <PrimaryButton
              content="اقرئ المزيد"
              className="bg-DarkPrimary hover:bg-blue-700 text-white border-0 text-sm px-4 py-3 rounded-xl shadow-lg hover:shadow-blue-300/30 transition-all duration-300 font-bold"
              onClick={() => {
                router.push(`/main/${id}`);
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

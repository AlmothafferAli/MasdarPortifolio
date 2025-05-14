import { motion } from "framer-motion";
import React from "react";
import { FaLink } from "react-icons/fa";
import Image from "next/image";

import PrimaryButton from "./EleComponents/PrimaryButton";
import { useRouter } from "next/navigation";
import { BaseUrl } from "../features/Type/BaseUrl";

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
      className={`rounded-xl p-3 shadow-md hover:shadow-lg bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent transition-all duration-300 w-64 h-64`}
      dir="rtl"
    >
      <div className="flex flex-col h-full">
        {/* Image Section */}
        {logo && (
          <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
              <Image
                src={`${BaseUrl}/${logo}` || ""}
                alt={name || "Partner logo"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="bg-blue-50 p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                {children}
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {name}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 text-xs flex-1">
            {website}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            {link && (
              <a
                href={"/" + link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <FaLink className="w-2.5 h-2.5" />
                <span className="text-xs">View</span>
              </a>
            )}
            <PrimaryButton
              content="اقرئ المزيد"
              className="bg-DarkPrimary hover:bg-blue-700 text-white border-0 text-xs px-3 py-1.5 rounded-lg shadow-md hover:shadow-blue-300/30 transition-all duration-300 font-bold"
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

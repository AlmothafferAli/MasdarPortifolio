import { motion } from "framer-motion";
import React from "react";
import { FaLink } from "react-icons/fa";
import Image from "next/image";

import PrimaryButton from "./EleComponents/PrimaryButton";
import { useRouter } from "next/navigation";
import { BaseUrl } from "../features/Type/BaseUrl";

export default function PartnerCard({
  website,
  name,
  logo,
  children,
  id,
}: {
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
      className="group relative rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent transition-all duration-300 w-[240px] sm:w-72 h-[240px] sm:h-80 overflow-hidden"
      dir="rtl"
    >
      <div className="flex flex-col h-full">
        {/* Image Section */}
        {logo && (
          <div className="relative h-28 sm:h-40 mb-2 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden">
            <Image
              src={`${BaseUrl}/${logo}` || ""}
              alt={name || "Partner logo"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 flex flex-col px-2">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-gray-100">
                {name}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <FaLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="text-xs sm:text-sm font-medium">View</span>
              </a>
            )}
            <PrimaryButton
              content="اقرئ المزيد"
              className="bg-DarkPrimary hover:bg-blue-700 text-white border-0 text-xs sm:text-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md hover:shadow-blue-300/30 transition-all duration-300 font-bold"
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

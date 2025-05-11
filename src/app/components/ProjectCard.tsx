import { motion } from "framer-motion";
import PrimaryButton from "./EleComponents/PrimaryButton";
import React from "react";
import { IProjectCardProps } from "@/app/features/Type/props";
import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  image,
  buttonName,
  className,
  buttonClassName,
}: IProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={"http://192.168.77.191:8081/" + image}
            alt={title ?? ""}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-base mb-6 flex-grow">
            {description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <PrimaryButton
              content={buttonName}
              className={`text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 ${
                buttonClassName ?? ""
              }`}
            />
            <motion.div
              whileHover={{ x: 5 }}
              className="text-blue-600 dark:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

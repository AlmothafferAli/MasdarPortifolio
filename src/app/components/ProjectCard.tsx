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
  buttonClassName,
  color,
}: IProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="h-full max-w-[320px] mx-auto sm:max-w-none"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={"http://192.168.77.191:8081/" + image}
            alt={title ?? ""}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
        </div>

        <div 
          className={`p-4 sm:p-6 md:p-8 flex flex-col flex-grow border-4 border-solid relative rounded-b-2xl`} 
          style={{ borderColor: color }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 tracking-tight">
            {title}
          </h3>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-8 flex-grow">
            {description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <PrimaryButton
              content={buttonName}
              className={`text-sm sm:text-base text-DarkPrimary dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 transform hover:translate-x-1 ${
                buttonClassName ?? ""
              }`}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

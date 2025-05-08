import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
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
    <motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{
          once: true,
          margin: "-100px 0px -100px 0px",
          amount: 0.2,
        }}
        whileHover={{ y: -10 }}
        className={` rounded-4xl p-8 lg:p-10 shadow-xl h-[30rem] prespective overflow-hidden relative group ${
          className ?? "bg-gradient-to-br from-blue-500 to-blue-700"
        }`}
      >
        <div className="h-full flex flex-col justify-between relative z-10">
          <div>
            <div className="flex justify-end">
              <div className="bg-white/20 p-2 rounded-full shadow-inner backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <Image
                  src={"http://192.168.77.191:8081/" + image}
                  alt={title ? title : ""}
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white text-right mt-8 mb-4 drop-shadow-md">
              {title}
            </h3>
            <p className="text-white/90 text-xl mt-4 text-right leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex justify-start mt-8">
            <PrimaryButton
              content={buttonName}
              className={`bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300
              ${buttonClassName ?? ""}
              }`}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

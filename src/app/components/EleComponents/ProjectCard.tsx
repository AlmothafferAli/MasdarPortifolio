import { motion, Variants } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import React from "react";
import { IProjectCardProps } from "@/app/features/Type/props";

export default function ProjectCard({
  title,
  description,
  image,
  link,
  className,
  children,
  buttonClassName,
  variants,
  index,
}: IProjectCardProps) {
  // Default animation variants if none provided
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: index ? index * 0.1 : 0,
      },
    },
  };

  // Button hover animation
  const buttonVariants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: { scale: 0.98 },
  };

  // Background blob animation
  const blobVariants: Variants = {
    rest: { scale: 1, opacity: 0.2 },
    hover: {
      scale: 1.3,
      opacity: 0.4,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  // Icon animation
  const iconVariants: Variants = {
    rest: { rotateY: 0 },
    hover: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      whileHover="hover"
      initial="rest"
      viewport={{
        once: true,
        margin: "-100px 0px -100px 0px",
        amount: 0.2,
      }}
      className={` rounded-3xl p-8 lg:p-10 shadow-xl h-[30rem] overflow-hidden relative group ${
        className ?? "bg-gradient-to-br from-blue-500 to-blue-700"
      }`}
    >
      <motion.div
        className="absolute top-0 right-0 left-0 bottom-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } },
        }}
      />

      <div className="h-full flex flex-col justify-between relative z-10">
        <div>
          <motion.div
            className="flex justify-end"
            variants={{
              rest: { y: 0 },
              hover: { y: -5, transition: { duration: 0.4, ease: "easeOut" } },
            }}
          >
            <motion.div
              className="bg-white/20 p-4 rounded-full shadow-inner backdrop-blur-sm"
              variants={iconVariants}
            >
              {children}
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-3xl font-bold text-white text-right mt-8 mb-4"
            variants={{
              rest: { x: 0 },
              hover: { x: -5, transition: { duration: 0.4 } },
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-white/90 text-xl mt-4 text-right leading-relaxed"
            variants={{
              rest: { opacity: 0.9 },
              hover: { opacity: 1, transition: { duration: 0.4 } },
            }}
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          className="flex justify-start mt-8"
          variants={{
            rest: { y: 0 },
            hover: { y: -8, transition: { duration: 0.5, ease: "easeOut" } },
          }}
        >
          <motion.div variants={buttonVariants}>
            <PrimaryButton
              content={link}
              className={`${
                buttonClassName ?? ""
              }bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300
              }`}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={blobVariants}
        className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
      />

      <motion.div
        variants={blobVariants}
        className="absolute -top-8 -right-8 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"
      />
    </motion.div>
  );
}

import { motion } from "framer-motion";
import React from "react";
import PrimaryButton from "./EleComponents/PrimaryButton";
import SecondaryButton from "./EleComponents/SecondaryButton";
import Image from "next/image";

export default function MainFirst() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Float animation for image
  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center w-full dark:bg-darkSecondary bg-gradient-to-br from-gray-50 to-gray-100 dark:from-darkSecondary dark:to-black md:pt-32 pb-16 overflow-visible">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16 lg:py-24 relative"
      >
        {/* Background decorations */}
        <motion.div
          className="absolute top-0 right-[10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl dark:bg-blue-600/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-teal-300/10 rounded-full blur-3xl dark:bg-teal-600/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 lg:gap-20 relative">
          <motion.div
            variants={imageVariants}
            animate={floatAnimation}
            className="md:w-1/2"
          >
            <Image
              src="/images/logo.png"
              width={600}
              height={600}
              alt="logo"
              className="max-w-full h-auto"
              priority
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            className="md:w-1/2 flex flex-col text-right space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="font-bold text-DarkPrimary dark:text-white text-5xl md:text-6xl lg:text-7xl tracking-tight"
            >
              مصدر{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-lightTextPrimary dark:text-DarkPrimary bg-gradient-to-r from-DarkPrimary via-blue-500 to-blue-600 dark:from-DarkPrimary dark:via-blue-400 dark:to-blue-500 bg-clip-text text-transparent bg-size-200"
              >
                للتطوير{" "}
              </motion.span>
              {""}
              الرقمي
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              المصدر للتطوير الرقمي هو منصة تعليمية تم تطويرها بواسطة أفضل
              المبرمجين في العراق
            </motion.p>

            <motion.div
              variants={buttonVariants}
              className="flex justify-start md:justify-end items-center space-x-5 pt-6"
            >
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <PrimaryButton
                  content="اقرئ المزيد"
                  className="bg-DarkPrimary hover:bg-blue-700 text-white border-0 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-300/30 transition-all duration-300 font-bold"
                />
              </motion.div>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <SecondaryButton
                  content="ابدأ الان"
                  className="text-lg text-DarkPrimary dark:text-white px-8 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-bold"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

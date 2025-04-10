import { motion } from "framer-motion";
import React from "react";
    import PrimaryButton from "./EleComponents/PrimaryButton";
import ProjectCard from "./EleComponents/ProjectCard";

export default function Projects() {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Background decoration animations
  const bgDecorationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.6,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 lg:py-32 w-full bg-gray-50 dark:bg-darkSecondary overflow-visible relative">
      {/* Background decorations */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px 0px" }}
        variants={bgDecorationVariants}
        className="absolute top-20 right-[5%] w-80 h-80 bg-blue-400/5 rounded-full blur-3xl dark:bg-blue-600/5 z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px 0px" }}
        variants={bgDecorationVariants}
        className="absolute bottom-40 left-[8%] w-96 h-96 bg-purple-400/5 rounded-full blur-3xl dark:bg-purple-600/5 z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px 0px" }}
        variants={sectionVariants}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-right mb-16">
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-DarkPrimary dark:text-white inline-block relative"
          >
            مشاريعنا
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5,
              }}
              viewport={{ once: true }}
              className="absolute -bottom-3 right-0 h-1 bg-DarkPrimary"
            ></motion.span>
          </motion.h2>
        </div>

        <motion.div
          variants={cardContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* برنامج إدارة العقارات */}
          <ProjectCard
            title="برنامج إدارة العقارات"
            description="نظام متكامل لإدارة العقارات والممتلكات بكفاءة عالية. يشمل إدارة الإيجارات، المبيعات، الصيانة والمزيد."
            image="/images/projects/property-management.jpg"
            link="اكتشف المزيد"
            className="bg-gradient-to-br from-blue-500 to-blue-700"
            buttonClassName="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  duration: 0.8,
                },
              },
            }}
            index={0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </ProjectCard>

          {/* متجر الكتروني */}
          <ProjectCard
            title="متجر الكتروني"
            description="متجر إلكتروني متكامل مع أنظمة الدفع والشحن وإدارة المخزون والتسويق الإلكتروني."
            image="/images/projects/ecommerce.jpg"
            link="اكتشف المزيد"
            className="bg-gradient-to-br from-purple-500 to-purple-700"
            buttonClassName="bg-white text-purple-700 hover:bg-purple-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  duration: 0.8,
                  delay: 0.1,
                },
              },
            }}
            index={1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </ProjectCard>

          {/* نظام إدارة المشاريع */}
          <ProjectCard
            title="نظام إدارة المشاريع"
            description="برنامج متطور لإدارة المشاريع وتتبع المهام وإدارة الفرق وتحليل الأداء وتقارير الإنجاز."
            image="/images/projects/project-management.jpg"
            link="اكتشف المزيد"
            className="bg-gradient-to-br from-green-500 to-green-700"
            buttonClassName="bg-white text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  duration: 0.8,
                  delay: 0.2,
                },
              },
            }}
            index={2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </ProjectCard>

          {/* نظام المحاسبة */}
          <ProjectCard
            title="نظام المحاسبة"
            description="منظومة محاسبية كاملة للشركات تشمل الفواتير والمصروفات والإيرادات والتقارير المالية والضرائب."
            image="/images/projects/accounting.jpg"
            link="اكتشف المزيد"
            className="bg-gradient-to-br from-amber-500 to-amber-700"
            buttonClassName="bg-white text-orange-400 hover:bg-amber-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  duration: 0.8,
                  delay: 0.3,
                },
              },
            }}
            index={3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </ProjectCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import PrimaryButton from "./EleComponents/PrimaryButton";
import SecondaryButton from "./EleComponents/SecondaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
import { Link } from "react-scroll";
import { useGetCompanyQuery } from "../features/Api/CompanyApi";
import { BaseUrl } from "../features/Type/BaseUrl";
import ImageWithLoader from "./ImageWithLoader";
export default function MainFirst() {
  
  const company = useSelector((state: RootState) => state.company.UCompany);
  const { data: companyData, isLoading } = useGetCompanyQuery();
  const [index, setIndex] = useState(0);

  const words = useMemo(() => companyData?.words ?? [], [companyData]);
  const currentImage = useMemo(() => words[index], [words, index]);
  const backgroundImage = useMemo(() => `${BaseUrl}${currentImage}`, [currentImage]);
  console.log("backgroundImage",backgroundImage);
  useEffect(() => {
    if (!words.length) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words]);

  if (isLoading) {
    return (
      <section className="min-h-screen select-none flex items-center justify-center w-full dark:bg-darkSecondary bg-gradient-to-br bg-[#f7f9fa] dark:from-darkSecondary dark:to-black md:pt-24 pb-16 overflow-visible">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 lg:gap-20">
            <div className="md:w-1/2">
              <div className="w-full h-[600px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            </div>
            <div className="md:w-1/2 flex flex-col text-right space-y-8">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen select-none flex items-center justify-center w-full dark:bg-darkSecondary bg-gradient-to-br bg-[#f7f9fa] dark:from-darkSecondary dark:to-black md:pt-24 pb-16 overflow-visible">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 lg:py-24"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
             <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mt-4 relative ">
              {backgroundImage!=BaseUrl+"undefined" ? (
              <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute inset-0 w-full h-full">
                <defs>
                  <mask id="logo-mask">
                    <image
                      href="/images/iconWhite.png"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </mask>
                </defs>
                <AnimatePresence mode="sync">
                
                  <motion.image
                    href={backgroundImage}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    mask="url(#logo-mask)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                    key={backgroundImage}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </AnimatePresence>
              </svg>
              ) : (
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative ">
                  <ImageWithLoader src="/images/iconBlue.png" alt="Logo" width={500} height={500} className="object-cover" />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex flex-col text-right space-y-8"
          >
            <h1 className="font-bold text-DarkPrimary dark:text-white text-5xl md:text-6xl lg:text-7xl tracking-tight">
              <span className="text-lightTextPrimary dark:text-DarkPrimary bg-gradient-to-r from-DarkPrimary to-blue-600 dark:from-DarkPrimary dark:to-blue-400 bg-clip-text text-transparent">
                {company?.name || "Loading..."}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {company?.description || "Loading..."}
            </p>

            <div className="flex justify-start md:justify-end items-center space-x-5 pt-6">
              <Link
                to="services"
                smooth={true}
                duration={320}
                style={{ margin: "0 10px", cursor: "pointer" }}
              >
                <PrimaryButton
                  content="اقرئ المزيد"
                  className="bg-DarkPrimary hover:bg-blue-700 text-white border-0 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-300/30 transition-all duration-300 font-bold"
                />
              </Link>
              <SecondaryButton
                content="ابدأ الان"
                className="text-lg text-DarkPrimary dark:text-white px-8 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-bold"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

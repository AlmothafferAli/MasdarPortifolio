"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

import { useGetCompanyQuery } from "@/app/features/Api/CompanyApi";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
import ImageWithLoader from "@/app/components/ImageWithLoader";

export default function FetchCompany() {
  const company = useSelector((state: RootState) => state.company.UCompany);
  const { data: companyData, isLoading } = useGetCompanyQuery();
  const [index, setIndex] = useState(0);

  const words = useMemo(() => companyData?.words ?? [], [companyData]);
  const currentImage = useMemo(() => words[index], [words, index]);

  useEffect(() => {
    if (!words.length) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <section className="h-full w-full select-none flex items-center justify-center overflow-visible">
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
            <div className="relative w-full aspect-square max-w-[500px] mx-auto overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-12 h-12 border-4 border-DarkPrimary border-t-transparent rounded-full animate-spin"
                  />
                </div>
              ) : (
                <AnimatePresence initial={false} mode="sync">
                  {currentImage && (
                    <motion.div
                      key={currentImage}
                      initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                        scale: 1.2,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(10px)",
                        scale: 1.2,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.5,
                      }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={`${BaseUrl}/${currentImage}`}
                        width={600}
                        height={600}
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              <div className="absolute inset-0 w-full h-full">
                <ImageWithLoader
                  src={`/images/iconT.png`}
                  width={600}
                  height={600}
                  alt="logo"
                  className="w-full h-full "
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex flex-col text-right space-y-8"
          >
            <h1 className="font-bold text-DarkPrimary text-5xl md:text-6xl lg:text-7xl tracking-tight">
              <span className="text-lightTextPrimary bg-gradient-to-r from-DarkPrimary to-blue-600 bg-clip-text text-transparent">
                {company.name}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              {company.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

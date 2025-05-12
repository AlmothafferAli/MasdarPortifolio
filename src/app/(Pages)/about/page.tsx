"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
import { useGetCompanyQuery } from "@/app/features/Api/CompanyApi";
import Services from "@/app/components/Services";
import Partners from "@/app/components/partners";
import { useRouter } from "next/navigation";
import { useGetEmployeesQuery } from "@/app/features/Api/EmployeeApi";
export default function About() {
  const { data: companyData } = useGetCompanyQuery();
  const router = useRouter();
  const about = useMemo(() => companyData?.about, [companyData]);
  const aboutImage = useMemo(() => companyData?.aboutImage, [companyData]);
  const { data: employees } = useGetEmployeesQuery({ pageNumber: 1, pageSize: 10 });
  const workers = useMemo(() => employees?.data, [employees]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-[#374151]">
      <div className="container mx-auto px-4 py-24 space-y-32">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            من نحن
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-[600px] overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={`${BaseUrl}${aboutImage}`}
                alt="About"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-6 text-end">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-DarkPrimary to-blue-600 bg-clip-text text-transparent">
                لمحة عن مصدر
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {about}
              </p>
              <PrimaryButton
                content="تواصل معنا"
                className="bg-DarkPrimary text-white hover:opacity-90 transition-all"
                onClick={() => router.push("/contact")}
              />
            </div>
          </div>
        </motion.div>

        <Services />
        
        
        
        
        
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            فريق العمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workers?.map((worker, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={`${BaseUrl}${worker.employeeImage}`}
                    alt={worker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {worker.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {worker.employeeRole}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-12"
        >
          <Partners />
          </motion.div>
      </div>
    </div>
  );
}

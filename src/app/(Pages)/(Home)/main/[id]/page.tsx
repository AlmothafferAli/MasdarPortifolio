"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useGetPartnerByIdQuery } from "../../../../features/Api/partnersApi";
import { useParams } from "next/navigation";
import { useGetAllPServicesQuery } from "../../../../features/Api/PServiceApi";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
export default function PartnerPage() {
  const { id } = useParams();
  const { data: partnerData } = useGetPartnerByIdQuery(id as string);
  const partner = partnerData;
  const { data: services } = useGetAllPServicesQuery(id as string);

  return (
    <div
      className="w-full min-h-screen bg-gray-50 dark:bg-darkSecondary flex flex-col items-center px-4 md:px-8 lg:px-32 py-8 gap-8"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold dark:text-[#fdfdfd]">شركائنا</h1>
      </div>

      {/* Partner Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent rounded-lg p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/4 aspect-square">
            <Image
              src={BaseUrl + partner?.logo}
              alt={partner?.name || "partner logo"}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-[#fdfdfd]">
              {partner?.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-[#dfdfdf]">
              {partner?.introduction}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold dark:text-[#fdfdfd]">
          خدماتنا
        </h1>

        {services?.data?.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="w-full bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 aspect-square">
                <Image
                  src={BaseUrl + service.image}
                  alt={service.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="md:col-span-9 flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-bold dark:text-[#fdfdfd]">
                  {service.name}
                </h2>
                <p className="text-lg text-gray-500 dark:text-[#dfdfdf]">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";


import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useGetAllServicesQuery } from "@/app/features/Api/ServicesApi";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
import { IService, PageResponse } from "@/app/features/Type/Interfaces";
import  ButtonTheme  from "@/app/components/EleComponents/ButtonTheme";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { tokenUtils } from "@/app/Utils/TokenUtils";
export default function ProductPage({

}) {
  const Admin = tokenUtils.getUserRole() === "Admin";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { id } = useParams();
  const { data: serviceData } = useGetAllServicesQuery({pageNumber:1,pageSize:10});
  const service = (serviceData as PageResponse<IService>)?.data ?? [];
  const serviceDetails = service.find((p) => p.id === id);
 const serviceLists = {
    benefits: [serviceDetails?.benefits],
    features: [serviceDetails?.features],
  }  
  // Use the id from params to get the product details

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-[#374151]"
      dir="rtl"
    >
      <div className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              {serviceDetails?.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              {serviceDetails?.description}
            </p>
            <div className="pt-4">
              <PrimaryButton className="h-14 px-8 text-lg bg-DarkPrimary text-amber-50 rounded-xl hover:opacity-90 transition-all">
              {serviceDetails?.price}
              </PrimaryButton>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={`${BaseUrl}${serviceDetails?.image}`}
              alt={serviceDetails?.name || ""}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-16 border-none shadow-lg bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent rounded-2xl">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 ">
              نبذة عن التطبيق
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200">
              {serviceDetails?.summary}config/config
            </p>
          </div>
        </div>

        {/* Features and Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 ">
          <div className="border-none shadow-lg bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent rounded-2xl">
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                المميزات
              </h2>
              <ul className="space-y-4">
                {serviceLists.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full  text-green-600 dark:text-green-300 flex items-center justify-center ">
                      ✓
                    </span>
                    <span className="text-lg text-gray-700 dark:text-gray-200">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-none shadow-lg bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent rounded-2xl">
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                الفوائد
              </h2>
              <ul className="space-y-4">
                {serviceLists.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full  text-amber-600 dark:text-amber-300 flex items-center justify-center ">
                      ★
                    </span>
                    <span className="text-lg text-gray-700 dark:text-gray-200">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {serviceDetails?.link && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              شاهد الفيديو التوضيحي
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div
                  className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                    <PlayCircle className="w-16 h-16 text-DarkPrimary" />
                  </div>
                </div>
              ) : null}
              {isVideoPlaying ? (
                <iframe
                  src={serviceDetails?.link}
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  title="Product Video"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : (
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Video thumbnail"
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            استخدم الخدمة الان
          </h2>
          <PrimaryButton className="h-16 px-10 text-xl bg-DarkPrimary text-amber-50 rounded-xl hover:opacity-90 transition-all">
            استخدم الخدمة الان
          </PrimaryButton>
        </div>
      </div>
      {Admin&&(
      <ButtonTheme
        className="z-[99999] transform hover:rotate-12 transition-transform duration-300 absolute top-2 right-2 md:top-4 md:right-4"
        onClick={() => {

        }}
        >
         تعديل التفاصيل
        </ButtonTheme>
      )}
    </div>
  );
}

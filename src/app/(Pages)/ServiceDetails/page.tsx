"use client";

import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductPage({

}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const product = {
    id: "1",
    name: "برمجني",
    discription: "برنامج يوفر اقل متطلبات التي تساعد في صنع تطبيق الخ ...",
    summary:
      "هذا التطبيق هو تطبيق ذو متطلبات قليله تساعد المبرمجين في انشاء برامج فعاله باستخدام مكاتب باك فرونت اكسبريس نص طويل اكثر تماما يراد انجاز افلات تنصيب احتماء",
    Featurse: ["سريع", "منضبط", "يعمل جيدا"],
    benefits: ["سريع", "منضبط", "يعمل جيدا"],
    price: "50 الف دينار",
    Video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };

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
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              {product.discription}
            </p>
            <div className="pt-4">
              <PrimaryButton className="h-14 px-8 text-lg bg-DarkPrimary text-amber-50 rounded-xl hover:opacity-90 transition-all">
                احصل عليه الآن {product.price && `- ${product.price}`}
              </PrimaryButton>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt={product.name}
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
              {product.summary}
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
                {product.Featurse.map((feature, index) => (
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
                {product.benefits.map((benefit, index) => (
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
        {product.Video && (
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
                  src={product.Video}
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
            جاهز للبدء؟
          </h2>
          <PrimaryButton className="h-16 px-10 text-xl bg-DarkPrimary text-amber-50 rounded-xl hover:opacity-90 transition-all">
            احصل عليه الآن
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

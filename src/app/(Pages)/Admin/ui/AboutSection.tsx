import React from 'react';
import Image from 'next/image';
import { BaseUrl } from '@/app/features/Type/BaseUrl';

interface AboutSectionProps {
  about: string;
  aboutImage: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, aboutImage }) => {
  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-800">لمحة عن الشركة</h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-2xl text-gray-700 leading-relaxed">{about}</p>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={`${BaseUrl}${aboutImage}`}
            alt="about"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 
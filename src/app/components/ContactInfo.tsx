import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <FaPhone className="text-2xl text-DarkPrimary" />,
      title: "اتصل بنا",
      details: ["+966 12 345 6789", "+966 12 345 6780"],
    },
    {
      icon: <FaEnvelope className="text-2xl text-DarkPrimary" />,
      title: "البريد الإلكتروني",
      details: ["info@masdar.com", "support@masdar.com"],
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-DarkPrimary" />,
      title: "العنوان",
      details: ["العراق، النجف", "شارع السلام"],
    },
    {
      icon: <FaClock className="text-2xl text-DarkPrimary" />,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً", "الجمعة: عطلة"],
    },
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900/30 dark:via-gray-900/20 dark:to-black/20 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800/80 dark:via-gray-800/70 dark:to-gray-900/80 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-DarkPrimary/10 dark:bg-gray-700/50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {item.title}
                </h3>
                <div className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className="text-gray-600 dark:text-gray-300/90 text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 
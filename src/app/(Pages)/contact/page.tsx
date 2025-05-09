"use client";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ContactPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const FAQ = [
    {
      question: "ما هي أسعار الخدمات؟",
      answer:
        "يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف الموجود في الصفحة.",
    },
    {
      question: "هل مصدر يقدم برامج مخصصة للشركات؟",
      answer:
        "نعم، نقدم برامج مخصصة للشركات والمؤسسات. يمكنك التواصل معنا لمناقشة الخدمات المخصصة التي نقدمها.",
    },
    {
      question: "ما هي أسعار الخدمات؟",
      answer:
        "يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف الموجود في الصفحة.",
    },
  ];

  const handleAccordionClick = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div
      className="w-full min-h-screen pt-28 bg-gray-50 gap-16 dark:bg-darkSecondary flex flex-col items-start justify-start px-4 md:px-32 py-12"
      dir="rtl"
    >
      <div className="header w-full ">
        <h1 className="text-4xl font-bold dark:text-[#fdfdfd] text-center">
          تواصل معنا
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12">
        <div className="FAQ  bg-DarkPrimary/80 dark:bg-darkPrimary  transition-shadow duration-300  p-8 rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-2xl font-bold text-white dark:text-[#fdfdfd]  mb-8">
            أسألة متداولة
          </h1>
          <div className="accordion space-y-4">
            {FAQ.map((item, index) => (
              <div
                className="accordion-item border-b border-gray-200 dark:border-gray-800"
                key={index}
              >
                <div
                  className="accordion-item-header flex flex-row justify-between items-center p-4 cursor-pointer hover:bg-DarkPrimary/10 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                  onClick={() => handleAccordionClick(index)}
                >
                  <h2 className="font-medium text-white dark:text-[#fdfdfd] hover:text-darkPrimary/40 dark:hover:text-DarkPrimary">
                    {item.question}
                  </h2>
                  <button className="accordion-item-header-button text-white dark:text-gray-400 hover:text-DarkPrimary/40 transition-colors duration-300">
                    {activeAccordion === index ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>
                <div
                  className={` overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="p-4 text-white dark:text-gray-300 hover:text-[#8be4f2] transition-colors duration-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form  bg-gradient-to-tl from-DarkPrimary/5 dark:from-darkPrimary dark:to-darkPrimary to-transparent transition-shadow duration-300  p-8 rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-2xl font-bold dark:text-[#fdfdfd] mb-8">
            تواصل معنا
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg  focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg  focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg  focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all resize-none"
                required
              />
            </div>

            <PrimaryButton
              type="submit"
              className="w-full bg-DarkPrimary text-white  font-medium py-3 px-6 rounded-lg transition-all duration-300 "
            >
              إرسال
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}

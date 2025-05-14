"use client";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import ContactInfo from "@/app/components/ContactInfo";
import { useGetAllFAQsQuery } from "@/app/features/Api/FAQApi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store"; 
export default function ContactPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const company = useSelector((state: RootState) => state.company.UCompany);
  const { data: faqs, isLoading, error } = useGetAllFAQsQuery({ pageSize: 10, pageNumber: 1,companyId:company.id });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const data ={
    phoneNumber:formData.phone,
    message:formData.name+"\n" +formData.subject+"\n" +formData.message,
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen pt-20 md:pt-28 bg-gray-50 gap-8 md:gap-16 dark:bg-darkSecondary flex flex-col items-center justify-start px-4 sm:px-6 md:px-16 lg:px-32 py-8 md:py-12"
      dir="rtl"
    >
      <motion.div variants={itemVariants} className="header w-full ">
        <h1 className="text-3xl md:text-4xl font-bold dark:text-[#fdfdfd] text-center">
          تواصل معنا
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-12">
        <motion.div variants={itemVariants} className="FAQ bg-DarkPrimary/80 transition-shadow duration-300 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-xl md:text-2xl font-bold text-white dark:text-[#fdfdfd] mb-4 md:mb-8">
            أسألة متداولة
          </h1>
          <div className="accordion space-y-4">
            {isLoading && <div>جاري تحميل البيانات...</div>}
            {error && <div>حدث خطأ</div>}
            {faqs?.data?.map((item, index) => (
              <div
                className="accordion-item border-b border-gray-200 dark:border-gray-800"
                key={index}
              >
                <div
                  className="accordion-item-header flex flex-row justify-between items-center p-3 sm:p-4 cursor-pointer hover:bg-DarkPrimary/10 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                  onClick={() => handleAccordionClick(index)}
                >
                  <h2 className="font-medium text-sm sm:text-base text-white dark:text-[#fdfdfd] hover:text-darkPrimary/40 dark:hover:text-DarkPrimary">
                    {item.question}
                  </h2>
                  <button className="accordion-item-header-button text-white dark:text-gray-400 hover:text-DarkPrimary/40 transition-colors duration-300 text-sm sm:text-base">
                    {activeAccordion === index ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="p-3 sm:p-4 text-sm sm:text-base text-white dark:text-gray-300 hover:text-[#8be4f2] transition-colors duration-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="form bg-gradient-to-tl from-DarkPrimary/5 dark:from-darkPrimary dark:to-darkPrimary to-transparent transition-shadow duration-300 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-xl md:text-2xl font-bold dark:text-[#fdfdfd] mb-4 md:mb-8">
            تواصل معنا
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2"
              >
رقم الهاتف
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2"
              >
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-DarkPrimary dark:bg-gray-700 dark:text-white transition-all resize-none"
                required
              />
            </div>

            <PrimaryButton
              type="submit"
              className="w-full bg-DarkPrimary text-white text-sm sm:text-base font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:bg-DarkPrimary/90"
            >
              إرسال
            </PrimaryButton>
          </form>
        </motion.div>
      </div>
      <motion.div variants={itemVariants}>
        <ContactInfo />
      </motion.div>
    </motion.div>
  );
}

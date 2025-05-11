import { useGetAllServicesQuery } from "../features/Api/ServicesApi";
import { BaseUrl } from "../features/Type/BaseUrl";
import { IService, PageResponse } from "../features/Type/Interfaces";
import ServicesCard from "../(Pages)/Admin/ui/ServicesCard";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Services() {
    const { data: servicesData, isLoading, error } = useGetAllServicesQuery();
    const services =servicesData?.data ?? [];
    console.log("services", services);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500">
                <p>عذراً، حدث خطأ أثناء تحميل الخدمات</p>
            </div>
        );
    }

    return (
        <section className="py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent p-12 rounded-2xl shadow-xl"
            >
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
                >
                    خدماتنا
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                        >
                            <ServicesCard 
                                id={service.id}
                                title={service.name}
                                description={service.description}
                                image={`${BaseUrl}${service.image}`}
                                summary={service.summary}
                                benefits={service.benefits}
                                features={service.features}
                                price={service.price.toString}
                                link={service.link}
                        />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}


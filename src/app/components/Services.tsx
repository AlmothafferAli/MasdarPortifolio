import { useGetAllServicesQuery } from "../features/Api/ServicesApi";
import { BaseUrl } from "../features/Type/BaseUrl";
import { IService, PageResponse } from "../features/Type/Interfaces";
import ServicesCard from "../(Pages)/Admin/ui/ServicesCard";
import { motion } from "framer-motion";

// Example services data
const exampleServices = [
    {
        id: "1",
        name: "تطوير المواقع الإلكترونية",
        description: "تصميم وتطوير مواقع إلكترونية احترافية مع واجهة مستخدم عصرية",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        summary: "خدمة تطوير مواقع احترافية",
        benefits: ["تصميم عصري", "تجربة مستخدم سلسة", "أداء عالي"],
        features: ["متجاوب", "سريع", "آمن"],
        price: "1000",
        link: "/services/web-development"
    },
    {
        id: "2",
        name: "تطبيقات الجوال",
        description: "تطوير تطبيقات جوال متكاملة لأنظمة iOS و Android",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        summary: "تطوير تطبيقات جوال",
        benefits: ["أداء عالي", "واجهة مستخدم سهلة", "دعم كامل"],
        features: ["متعدد المنصات", "سريع", "آمن"],
        price: "2000",
        link: "/services/mobile-apps"
    },
    {
        id: "3",
        name: "تصميم الهوية البصرية",
        description: "تصميم هوية بصرية متكاملة لعلامتك التجارية",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        summary: "تصميم هوية بصرية",
        benefits: ["تصميم احترافي", "هوية متكاملة", "تناسق في العلامة التجارية"],
        features: ["شعار", "ألوان", "خطوط"],
        price: "500",
        link: "/services/branding"
    }
];

export default function Services() {
    const { data: servicesData, isLoading, error } = useGetAllServicesQuery();
    const services = servicesData?.data && servicesData.data.length > 0 ? servicesData.data : exampleServices;

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-[400px]">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="text-center p-8 text-red-500">
    //             <p>عذراً، حدث خطأ أثناء تحميل الخدمات</p>
    //         </div>
    //     );
    // }

    return (
        <section className="py-16 md:py-24 w-full" id="services">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="container mx-auto px-4"
                dir="rtl"
            >
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        خدماتنا
                    </motion.h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        نقدم مجموعة متكاملة من الخدمات التقنية المتطورة لمساعدتك في تحقيق أهدافك
                    </p>
                </div>

                <div className="relative">
                    <div className="flex overflow-x-auto gap-2 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide px-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="flex-none w-[300px] md:w-[400px] snap-start"
                                initial={{ opacity: 0 }}
                                whileInView={{
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 1
                                    }
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <ServicesCard
                                    id={service.id}
                                    title={service.name}
                                    description={service.description}
                                    image={service.image}
                                    summary={service.summary}
                                    benefits={Array.isArray(service.benefits) ? service.benefits.join(', ') : service.benefits}
                                    features={Array.isArray(service.features) ? service.features.join(', ') : service.features}
                                    price={ service.price}
                                    link={service.link}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                        عرض جميع الخدمات
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}


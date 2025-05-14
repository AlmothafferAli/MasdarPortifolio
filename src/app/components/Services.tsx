import { useGetAllServicesQuery } from "../features/Api/ServicesApi";
import { motion } from "framer-motion";
import PrimaryButton from "../components/EleComponents/PrimaryButton";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";


export default function Services() {
    const company = useSelector((state: RootState) => state.company.UCompany);
    const { data: servicesData, isLoading } = useGetAllServicesQuery({ pageNumber: 1, pageSize: 10,companyId:company.id });
    const services = servicesData?.data

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }


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
                    {services && services.length > 0 ? (
              services.map((service, index) => (
                <motion.div 
                  key={index} 
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
                  <ProjectCard
                    title={service.name}
                    description={service.description}
                    image={service.image}
                    buttonName="عرض التفاصيل"
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-xl text-gray-500 ">
                  لا توجد خدمات متاحة حالياً
                </p>
              </div>
            )}                    </div>
                </div>
                {services && services.length > 0 ? (
                <div className="mt-16 text-center">
                   <PrimaryButton content="عرض المزيد" className="bg-DarkPrimary text-white hover:opacity-90 transition-all" />
                </div>
                ) : ""}
            </motion.div>
        </section>
    );
}


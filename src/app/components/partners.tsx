import { motion } from "framer-motion";
import { IPartner } from "../features/Type/Interfaces";
import { PageResponse } from "../features/Type/Interfaces";
import { useGetAllPartnersQuery } from "../features/Api/partnersApi";
import PartnerCard from "./partnercard";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";

export default function Partners() {
  const company = useSelector((state: RootState) => state.company.UCompany);
  const {
    data: partnersData,
    isLoading,
    error,
  } = useGetAllPartnersQuery(
    { pageNumber: 1, pageSize: 10, companyId: company?.id || "" },
    {
      skip: !company?.id,
    }
  );

  // Ensure partners is always an array
  const partners = (partnersData as PageResponse<IPartner>)?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !partners.length) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>عذراً، حدث خطأ أثناء تحميل الشركاء</p>
      </div>
    );
  }

  return (
    <section
      className="py-12 md:py-16 w-full bg-white dark:bg-gray-900"
      id="partners"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            عملاؤنا
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-base text-gray-600 dark:text-gray-300"
          >
            نفتخر بشراكتنا مع مجموعة من أبرز الشركات والمؤسسات
          </motion.p>
        </div>

        <div className="relative  w-full max-w-6xl overflow-hidden mx-auto ">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>

          {partners.length > 0 && (
            <div className="w-full py-6 overflow-hidden partners-container">
              <motion.div
                className="flex w-max gap-4 md:gap-12 cursor-grab active:cursor-grabbing"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  repeat: 0,
                  duration: partners.length * 2,
                  ease: "easeOut",
                }}
                whileHover={{ animationPlayState: "paused" }}
                onAnimationComplete={() => {
                  const container = document.querySelector(
                    ".partners-container"
                  );
                  if (container) {
                    container.classList.add(
                      "overflow-x-auto",
                      "scrollbar-hide"
                    );
                    container.classList.remove("overflow-hidden");
                  }
                }}
              >
                {partners.map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="mx-6 shrink-0">
                    <PartnerCard
                      website={partner.website}
                      name={partner.name}
                      logo={partner.logo}
                      id={partner.id}
                    >
                      <></>
                    </PartnerCard>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

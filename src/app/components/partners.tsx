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
  const { data: partnersData, isLoading, error } = useGetAllPartnersQuery({ pageNumber: 1, pageSize: 10,companyId:company.id });
  const partners = (partnersData as PageResponse<IPartner>)?.data ?? [];
  


  
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
        <p>عذراً، حدث خطأ أثناء تحميل الشركاء</p>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 w-full" id="partners">
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
            عملاؤنا
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            نفتخر بشراكتنا مع مجموعة من أبرز الشركات والمؤسسات
          </p>
        </div>

        <div className="relative w-7/12 mx-auto max-w-[90rem]">
        <Marquee
  speed={100}
  gradient={false}
  pauseOnHover={true}
  pauseOnClick={true}
  delay={0}
  play={true}
  direction="right"
>
  {partners.map((partner, index) => (
    <div key={partner.id}>
      <PartnerCard
        link={partner.website}
        website={partner.website}
        name={partner.name}
        logo={partner.logo}
        id={partner.id}
        children={<></>}

      />
    </div>
  ))}
</Marquee>         </div>
      </motion.div>
    </section>
  );
}

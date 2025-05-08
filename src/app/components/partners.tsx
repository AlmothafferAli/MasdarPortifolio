import { motion } from "framer-motion";
import  { IPartnerRequest } from "../features/Type/Interfaces";
import { PageResponse } from "../features/Type/Interfaces";
import { useGetAllPartnersQuery } from "../features/Api/partnersApi";
import PartnerCard from "./partnercard";
import { FaLink } from "react-icons/fa";

export default function Partners() {
  const { data: partnersData } = useGetAllPartnersQuery();
  const partners = (partnersData as PageResponse<IPartnerRequest>)?.data ?? [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="space-y-12 "
    >
      <h2 className="text-3xl font-bold text-white text-center">عملاؤنا</h2>

      <div className="w-full pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full max-w-7xl mx-auto">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              id={partner.id}
              link={partner.website}
              website={partner.website}
              name={partner.name}
              logo={partner.logo}
            >
              <FaLink className="w-4 h-4" />
            </PartnerCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

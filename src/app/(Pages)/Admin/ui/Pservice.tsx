"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPartnerId } from "@/app/features/appSlice/partnerSlice";
import { motion } from "framer-motion";
import { usePservice } from "@/app/hooks/usePservice";
import { useGetPServicesQuery } from "@/app/features/Api/PServiceApi";
import { RootState } from "@/app/features/Store";
import CreatePservice from "../forms/CreatePservice";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
import {
  setEditedPservice,
  setIsEditingPservice,
  setSelectedPservice,
  setSelectedPserviceId,
} from "@/app/features/appSlice/PserviceSlice";
import UpdatePService from "./UpdatePService";
const PService = () => {
  const [isAddingPservice, setIsAddingPservice] = useState(false);
  const { isEditingPservice } = useSelector(
    (state: RootState) => state.pservice
  );
  const dispatch = useDispatch();
  const selectedPartnerId = useSelector(
    (state: RootState) => state.partner.selectedPartnerId
  );
  const selectedPserviceId = useSelector(
    (state: RootState) => state.pservice.selectedPserviceId
  );
  const selectedPservice = useSelector(
    (state: RootState) => state.pservice.selectedPservice
  );
  if (!selectedPartnerId) return null;
  const { data, isLoading, error } = useGetPServicesQuery(selectedPartnerId!, {
    skip: !selectedPartnerId,
  });

  return (
    <div
      className="fixed inset-0 flex justify-end bg-black/50 backdrop-blur-sm z-50"
      onClick={() => {
        !isEditingPservice && dispatch(setSelectedPartnerId(""));
      }}
    >
      <div
        className="w-full md:w-[80%] lg:w-[65%] h-full bg-gray-50 dark:bg-darkSecondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="mb-6">
              <PrimaryButton
                onClick={() => {
                  setIsAddingPservice(true);
                }}
              >
                إضافة خدمة جديدة
              </PrimaryButton>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-[#fdfdfd]">
              خدمات الشريك
            </h1>

            <button
              onClick={() => dispatch(setSelectedPartnerId(""))}
              className="text-gray-500 hover:text-gray-700 dark:text-[#dfdfdf] text-xl md:text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
            {data?.data?.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-2xl p-4 sm:p-6 md:p-8 lg:px-16 shadow-lg hover:shadow-xl w-full bg-gradient-to-br from-DarkPrimary/5 dark:from-[#343434] dark:to-[#0f0f0f] to-transparent transition-shadow duration-300 dark:text-[#fdfdfd] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
              >
                <div className="partnerCardImage md:col-span-3 h-48 md:h-auto">
                  <Image
                    src={BaseUrl + service.image}
                    alt={service.name}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="intodection flex flex-col gap-3 md:gap-4 md:col-span-9">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-[#fdfdfd]">
                    {service.name}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-[#dfdfdf]">
                    {service.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4">
                    <PrimaryButton
                      onClick={() => {
                        dispatch(setSelectedPserviceId(service.id));
                        dispatch(setSelectedPservice(service));
                        dispatch(setIsEditingPservice(true));
                      }}
                    >
                      تعديل الخدمة
                    </PrimaryButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {isAddingPservice && (
        <CreatePservice setIsAddPservice={setIsAddingPservice} />
      )}
      {isEditingPservice && selectedPserviceId && selectedPservice && (
        <UpdatePService />
      )}
    </div>
  );
};

export default PService;

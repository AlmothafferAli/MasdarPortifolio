import { motion } from "framer-motion";
import React, { useState } from "react";
import { IProjectCardProps } from "@/app/features/Type/props";
import { FaEdit, FaTrash, FaLink } from "react-icons/fa";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import Image from "next/image";
import {
  setSelectedService,
  setSelectedserviceId,
} from "@/app/features/appSlice/ServiceSlice";
import useServices from "@/app/hooks/useServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
import UpdateServices from "./UpdateServices";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/app/features/Type/BaseUrl";
interface ServiceAdminProps extends IProjectCardProps {
  id: string;
  summary: string;
  benefits: string;
  features: string;
  price: string;
  link: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export default function ServiceAdmin({
  id,
  title,
  isAdmin,
  description,
  summary,
  benefits,
  features,
  price,
  link,
  image,
  buttonName,
  className,
  children,
  buttonClassName,
}: ServiceAdminProps) {
  const dispatch = useDispatch();
  const { deleteService } = useServices();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedServiceId, setDeletedServiceId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedServiceId } = useSelector(
    (state: RootState) => state.service
  );
  const router = useRouter();
  return (
    deletedServiceId !== id && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-4 shadow-lg w-[400px] h-[450px] hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 ${
          className ?? ""
        }`}
        dir="rtl"
      >
        <div className="flex flex-col h-full">
          {/* Image Section */}
          {image && (
            <div className="relative w-full h-48 mb-2 rounded-xl overflow-hidden group">
              <Image
                src={BaseUrl+image}
                alt={title || "Project image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>  
          )}

          {/* Content Section */}
          <div className="flex-1 flex flex-col space-y-1.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {title}
                </h3>
              </div>
              {isAdmin && (
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      dispatch(setSelectedserviceId(id));
                      dispatch(
                        setSelectedService({
                          name: title || "",
                          description: description || "",
                          image: image || "",
                          summary: summary || "",
                          benefits: benefits || "",
                          features: features || "",
                          price: price || "",
                          link: link || "",
                          files:  [],
                        })
                      );
                      setIsEditing(true);
                    }}
                    className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      dispatch(setSelectedserviceId(id));
                      setIsDeleting(true);
                    }}
                  >
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 flex-1">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
              {link && (
                <a
                  href={"/" + link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <FaLink className="w-3.5 h-3.5" />
                  <span className="text-xs">View Service</span>
                </a>
              )}
              <PrimaryButton
                content={"عرض التفاصيل"}
                className={`text-xs px-3 py-1.5 rounded-lg ${
                  buttonClassName ?? "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                }`}
                onClick={() => {
                  dispatch(setSelectedserviceId(id));
                  dispatch(
                    setSelectedService({
                      name: title || "",
                      description: description || "",
                      image: image || "",
                      summary: summary || "",
                      benefits: benefits || "",
                      features: features || "",
                      price: price || "",
                      link: link || "",
                      files: [],
                    })
                  );
                  router.push(`/main/ServiceDetails/${id}`);
                }}
              />
            </div>
            {isDeleting && id === selectedServiceId && (
              <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h1 className="text-xl mb-4 text-gray-900 dark:text-gray-100">
                    هل أنت متأكد أنك تريد حذف هذه الخدمة؟
                  </h1>
                  <div className="flex justify-end gap-2">
                    <PrimaryButton
                      onClick={() => {
                        setIsDeleting(false);
                      }}
                    >
                      الغاء
                    </PrimaryButton>
                    <PrimaryButton
                      className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                      onClick={async () => {
                        await deleteService(id);
                        setDeletedServiceId(id);
                        dispatch(setSelectedserviceId(""));
                        setIsDeleting(false);
                      }}
                    >
                      حذف
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedServiceId && isEditing && <UpdateServices />}
      </motion.div>
    )
  );
}

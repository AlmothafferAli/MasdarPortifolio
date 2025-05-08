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

interface ServiceAdminProps extends IProjectCardProps {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export default function ServiceAdmin({
  id,
  title,
  isAdmin,
  description,
  image,
  buttonName,
  className,
  children,
  buttonClassName,
  link,
}: ServiceAdminProps) {
  const dispatch = useDispatch();
  const { deleteService } = useServices();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedServiceId, setDeletedServiceId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedServiceId } = useSelector(
    (state: RootState) => state.service
  );
  console.log("http://192.168.77.191:8081/" + image);
  return (
    deletedServiceId !== id && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 shadow-lg max-w-[400px] hover:shadow-xl transition-shadow duration-300 bg-white ${
          className ?? ""
        }`}
      >
        <div className="flex flex-col h-full min-h-[400px]">
          {/* Image Section */}
          {image && (
            <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden group">
              <Image
                src={"http://192.168.77.191:8081/" + image}
                alt={title || "Project image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  {children}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {title}
                </h3>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      dispatch(setSelectedserviceId(id));
                      dispatch(
                        setSelectedService({
                          name: title || "",
                          description: description || "",
                          image: image || "",
                          files: [],
                        })
                      );
                      setIsEditing(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

                  <button
                    className="text-red-500"
                    onClick={() => {
                      dispatch(setSelectedserviceId(id));
                      setIsDeleting(true);
                    }}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-base leading-relaxed line-clamp-3 flex-1">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              {link && (
                <a
                  href={"/" + link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaLink className="w-4 h-4" />
                  <span className="text-sm">View Service</span>
                </a>
              )}
              <PrimaryButton
                content={buttonName}
                className={`text-sm px-4 py-2 rounded-lg ${
                  buttonClassName ?? "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              />
            </div>
            {isDeleting && id === selectedServiceId && (
              <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <h1 className="text-xl mb-4">
                    Are you sure you want to delete this service?
                  </h1>
                  <div className="flex justify-end gap-2">
                    <PrimaryButton
                      onClick={() => {
                        setIsDeleting(false);
                      }}
                    >
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton
                      className="bg-red-500"
                      onClick={async () => {
                        await deleteService(id);
                        setDeletedServiceId(id);
                        dispatch(setSelectedserviceId(""));
                        setIsDeleting(false);
                      }}
                    >
                      Delete
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

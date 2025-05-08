import { motion } from "framer-motion";
import React, { useState } from "react";
import { IProjectCardProps } from "@/app/features/Type/props";
import { FaEdit, FaTrash, FaLink, FaServicestack } from "react-icons/fa";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
import { usePartners } from "@/app/hooks/usePartners";
import {
  setSelectedPartnerId,
  setSelectedPartner,
} from "@/app/features/appSlice/partnerSlice";
import UpdatePartners from "./updatePartners";
import PService from "./Pservice";

interface PartnerAdminProps extends IProjectCardProps {
  id: string;
  name: string;
  logo: string;
  website: string;
  introduction: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PartnerAdmin({
  id,
  name,
  logo,
  website,
  introduction,
  buttonName,
  className,
  children,
  buttonClassName,
  link,
}: PartnerAdminProps) {
  const dispatch = useDispatch();
  const { deletePartner } = usePartners();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletedPartnerId, setDeletedPartnerId] = useState<string | null>(null);
  const { selectedPartnerId } = useSelector(
    (state: RootState) => state.partner
  );
  const [isServices, setIsServices] = useState(false);

  console.log("http://192.168.77.191:8081/" + logo);
  return (
    deletedPartnerId !== id && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white ${
          className ?? ""
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Image Section */}
          {logo && (
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden group">
              <Image
                src={"http://192.168.77.191:8081/" + logo}
                alt={name || "Partner logo"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  {children}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              </div>
              <div className="flex gap-2">
                {
                  <button
                    onClick={() => {
                      dispatch(setSelectedPartnerId(id));
                      setIsEditing(true);
                      dispatch(
                        setSelectedPartner({
                          name: name,
                          logo: logo,
                          website: website,
                          introduction: introduction,
                        })
                      );
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                }

                <button
                  className="text-red-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    dispatch(setSelectedPartnerId(id));
                    setIsDeleting(true);
                  }}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    dispatch(setSelectedPartnerId(id));
                    setIsServices(true);
                  }}
                  title="Services"
                >
                  <FaServicestack className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-3 flex-1">{website}</p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              {link && (
                <a
                  href={"/" + link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaLink className="w-4 h-4" />
                  <span className="text-sm">View Partner</span>
                </a>
              )}
              <PrimaryButton
                content={buttonName}
                className={`text-sm px-4 py-2 rounded-lg ${
                  buttonClassName ?? "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              />
            </div>
            {isDeleting && id === selectedPartnerId && (
              <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <h1 className="text-xl mb-4">
                    Are you sure you want to delete this partner?
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
                        await deletePartner(id);
                        setDeletedPartnerId(id);
                        dispatch(setSelectedPartnerId(""));
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
        {selectedPartnerId && isEditing && <UpdatePartners />}
        {isServices && selectedPartnerId === id && !isEditing && <PService />}
      </motion.div>
    )
  );
}

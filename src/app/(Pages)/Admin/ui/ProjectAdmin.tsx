import { motion } from "framer-motion";
import React, { useState } from "react";
import { IProjectCardProps } from "@/app/features/Type/props";
import { FaEdit, FaTrash, FaLink } from "react-icons/fa";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

import Image from "next/image";
import {
  setSelectedProjectId,
  setSelectedProject,
} from "@/app/features/appSlice/projectSlice";
import { useProjects } from "@/app/hooks/useProjects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
import UpdateProjects from "./UpdateProjects";

interface ProjectAdminCardProps extends IProjectCardProps {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProjectAdminCard({
  id,
  title,
  description,
  image,
  logo,
  buttonName,
  className,
  children,
  buttonClassName,

  link,
}: ProjectAdminCardProps) {
  const dispatch = useDispatch();
  const { deleteProject } = useProjects();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletedProjectId, setDeletedProjectId] = useState<string | null>(null);
  const { selectedProjectId } = useSelector(
    (state: RootState) => state.project
  );
  const { editedProjectId, editedProject } = useSelector(
    (state: RootState) => state.project
  );
  const project =
    id === editedProjectId
      ? {
          name: editedProject.name,
          description: editedProject.description,
          image: editedProject.image,
          logo: editedProject.logo,
          images: editedProject.images,
        }
      : {
          name: title ?? "",
          description: description ?? "",
          image: image ?? "",
          logo: logo ?? "",
          files: [],
        };

  console.log("http://192.168.77.191:8081/" + image);
  return (
    deletedProjectId !== id && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white  ${
          className ?? ""
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Image Section */}
          {image && (
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden group">
              <Image
                src={"http://192.168.77.191:8081/" + project.image}
                alt={project.name || "Project image"}
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
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.name}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    dispatch(setSelectedProjectId(id));
                    setIsEditing(true);
                    dispatch(
                      setSelectedProject({
                        name: project.name,
                        description: project.description,
                        image: project.image,
                        logo: project.logo,
                        images: project.images ?? [],
                      })
                    );
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Edit"
                >
                  <FaEdit className="w-4 h-4" />
                </button>

                <button
                  className="text-red-500"
                  onClick={() => {
                    dispatch(setSelectedProjectId(id));
                    setIsDeleting(true);
                  }}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
              {project.description}
            </p>

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
                  <span className="text-sm">View Project</span>
                </a>
              )}
              <PrimaryButton
                content={buttonName}
                className={`text-sm px-4 py-2 rounded-lg ${
                  buttonClassName ??
                  "bg-DarkPrimary text-white hover:bg-DarkPrimary/80"
                }`}
              />
            </div>
            {isDeleting && id === selectedProjectId && (
              <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <h1 className="text-xl mb-4">
                    Are you sure you want to delete this project?
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
                        await deleteProject(id);
                        setDeletedProjectId(id);

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
        {selectedProjectId && isEditing && !isDeleting && <UpdateProjects />}
      </motion.div>
    )
  );
}

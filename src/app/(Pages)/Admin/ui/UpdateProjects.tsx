import { useProjects } from "@/app/hooks/useProjects";
import { useState, useEffect, ChangeEvent } from "react";
import { IProjectUpdateRequest } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { toast } from "react-toastify";
import { useUpdateProjectMutation } from "@/app/features/Api/projectsApi";

import { useFile } from "@/app/hooks/useFile";
import {
  setSelectedProjectId,
  setEditedProject,
  setEditedIDProject,
} from "@/app/features/appSlice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

export default function UpdateProjects() {
  const dispatch = useDispatch();
  const { projects } = useProjects();

  const [project, setProject] = useState<IProjectUpdateRequest | null>(null);
  const { handleUpload } = useFile();
  const selectedProjectId = useSelector(
    (state: RootState) => state.project.selectedProjectId
  );
  const [update] = useUpdateProjectMutation();

  useEffect(() => {
    if (projects?.data && selectedProjectId) {
      const foundProject = projects.data.find(
        (p) => p.id === selectedProjectId
      );
      if (foundProject) {
        setProject({
          description: foundProject.description,
          image: foundProject.image,
          logo: foundProject.logo,
          name: foundProject.name,
          images: [],
        });
      }
    }
  }, [projects, selectedProjectId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!project) return;

    try {
      const response = await update({ project, id: selectedProjectId });
      console.log(response);

      dispatch(setEditedProject(project));
      dispatch(setEditedIDProject(selectedProjectId));

      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  if (!project) {
    return <div></div>;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        dispatch(setSelectedProjectId(""));
      }}
      dir="rtl"
    >
      <div
        className="w-10/12 md:w-5/12 bg-white rounded-xl shadow-2xl p-8 mx-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تحديث المشروع</h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المشروع
            </label>
            <PrimaryInput
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <PrimaryInput
              type="text"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة المشروع
            </label>
            <PrimaryInput
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشعار
            </label>
            <PrimaryInput
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <PrimaryButton
              type="submit"
              content="تحديث"
              className="bg-DarkPrimary text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

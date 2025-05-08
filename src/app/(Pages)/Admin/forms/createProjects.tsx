import { IProjectRequest } from "@/app/features/Type/Interfaces";
import { useState, ChangeEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useFile } from "@/app/hooks/useFile";
import { toast } from "react-toastify";
import { useAddProjectMutation } from "@/app/features/Api/projectsApi";

export default function CreateProjects({
  setIsAddProject,
}: {
  setIsAddProject: (isAddProject: boolean) => void;
}) {
  const { handleUpload } = useFile();
  const [project, setProject] = useState<IProjectRequest>({
    name: "",
    description: "",
    image: "",
    logo: "",
    images: [""],
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  });
  const [addProject, { isLoading }] = useAddProjectMutation();

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "logo" | "image"
  ) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const url = await handleUpload(e);
      setProject((prev) => ({ ...prev, [field]: url }));
    } catch (error) {
      console.error(error);
      toast.error(`Failed to upload ${field}`);
    }
  };

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await addProject(project).unwrap();
      toast.success("Project created successfully");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  }

  return (
    <>
      <form
        onSubmit={handleCreateProject}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsAddProject(false);
        }}
      >
        <div
          className="w-10/12 md:w-5/12  md:max-h-[80vh] bg-white rounded-xl shadow-2xl p-8 mx-4 overflow-y-auto"
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              إنشاء مشروع جديد
            </h1>
            <p className="text-gray-600 mt-2">
              املأ التفاصيل أدناه لإنشاء مشروعك
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المشروع *
                </label>
                <PrimaryInput
                  type="text"
                  value={project.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setProject({ ...project, name: e.target.value })
                  }
                  placeholder="أدخل اسم المشروع"
                  className="w-full text-right"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شعار المشروع
                </label>
                <PrimaryInput
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFileUpload(e, "logo")
                  }
                  className="w-full text-right"
                  accept="image/*"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف *
              </label>
              <PrimaryInput
                type="text"
                value={project.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setProject({ ...project, description: e.target.value })
                }
                placeholder="أدخل وصف المشروع"
                className="w-full text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة الغلاف
              </label>
              <PrimaryInput
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFileUpload(e, "image")
                }
                className="w-full text-right"
                accept="image/*"
              />
            </div>

            <div className="pt-6">
              <PrimaryButton
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء المشروع"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

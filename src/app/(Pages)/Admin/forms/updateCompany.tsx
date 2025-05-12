import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import { setUCompany } from "@/app/features/appSlice/companySlices";
import { RootState } from "@/app/features/Store";
import {
  ICompanyRequest,
} from "@/app/features/Type/Interfaces";
import useCompany from "@/app/hooks/useCompany";
import { useFile } from "@/app/hooks/useFile";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdateCompany({
  setIsEditMain,
}: {
  setIsEditMain: (isEditMain: boolean) => void;
}) {
  const { updateCompany } = useCompany();
  const { handleUpload } = useFile();
  const company = useSelector((state: RootState) => state.company.UCompany);
  const dispatch = useDispatch();
  const [upCompany, setUpCompany] = useState<ICompanyRequest>({
    name: company.name,
    description: company.description,
    words: company.words,
    about: company.about,
    aboutImage: company.aboutImage,
  });
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          const fileList = dataTransfer.files;
          const event = {
            target: { files: fileList },
          } as ChangeEvent<HTMLInputElement>;
          return await handleUpload(event);
        })
      );

      setUpCompany({
        ...upCompany,
        words: [...upCompany.words, ...uploadedUrls],
      });
    } catch (error) {
      console.error(error);
      toast.error(`Failed to upload files`);
    }
  };

  async function handleUpdateCompany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      updateCompany(company.id, upCompany);
      dispatch(setUCompany(upCompany));
      toast.success("Company updated successfully");
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company");
    }
  }

  return (
    <form onSubmit={handleUpdateCompany}>
      <div
        onClick={() => setIsEditMain(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        dir="rtl"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl p-8 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">تحديث الشركة </h1>
            <p className="mt-2 text-gray-600">تحديث المعلومات الشركة</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الشركة
              </label>
              <PrimaryInput
                type="text"
                value={upCompany.name}
                onChange={(e) =>
                  setUpCompany({ ...upCompany, name: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف
              </label>
              <PrimaryInput
                type="text"
                value={upCompany.description}
                onChange={(e) =>
                  setUpCompany({ ...upCompany, description: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رفع الملفات المرفقة
              </label>
              <PrimaryInput
                type="file"
                multiple
                onChange={(e) => {
                  handleFileUpload(e);
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <PrimaryButton
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              تحديث الشركة
            </PrimaryButton>
          </div>
        </div>
      </div>
    </form>
  );
}

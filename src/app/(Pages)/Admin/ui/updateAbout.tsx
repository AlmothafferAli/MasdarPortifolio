import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import { setCompany } from "@/app/features/appSlice/companySlices";
import { ICompanyResponse } from "@/app/features/Type/Interfaces";
import useCompany from "@/app/hooks/useCompany";
import { useFile } from "@/app/hooks/useFile";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function UpdateAbout({
  setIsEditAbout,
  company,
}: {
  setIsEditAbout: (isEditAbout: boolean) => void;
  company: ICompanyResponse;
}) {
  const [upCompany, setUpCompany] = useState<ICompanyResponse>(company);
  const { updateCompany } = useCompany();
  const dispatch = useDispatch();
  const { handleUpload } = useFile();

  const updateCompanyData = async () => {
    const companyData = await updateCompany(
      "08dd88e3-7289-4462-88d6-16d91e81fa0d",
      {
        name: upCompany.name,
        description: upCompany.description,
        words: upCompany.words,
        about: upCompany.about,
        aboutImage: upCompany.aboutImage,
      }
    );
    console.log(upCompany);
    console.log(companyData);
    if (companyData) {
      dispatch(setCompany(companyData));
    }
  };

  return (
    <div
      onClick={() => setIsEditAbout(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      dir="rtl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            تحديث لمحة عن الشركة{" "}
          </h1>
          <p className="mt-2 text-gray-600">تحديث المعلومات المتعلقة بالشركة</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              لمحة عن الشركة
            </label>
            <PrimaryInput
              type="text"
              value={upCompany.about}
              onChange={(e) =>
                setUpCompany({ ...upCompany, about: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رفع الصورة المرفقة
            </label>
            <PrimaryInput
              type="file"
              onChange={async (e) => {
                const url = await handleUpload(e);
                setUpCompany({
                  ...upCompany,
                  aboutImage: url,
                });
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            onClick={() => {
              updateCompanyData();
              setIsEditAbout(false);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            تحديث المعلومات
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

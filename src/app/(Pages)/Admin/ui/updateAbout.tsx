import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import { setUCompany } from "@/app/features/appSlice/companySlices";
import { RootState } from "@/app/features/Store";
import { ICompanyResponse } from "@/app/features/Type/Interfaces";
import useCompany from "@/app/hooks/useCompany";
import { useFile } from "@/app/hooks/useFile";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdateAbout() {
  const company = useSelector((state: RootState) => state.company.UCompany);

  const [upCompany, setUpCompany] = useState<ICompanyResponse>(company);
  const { updateCompany } = useCompany();
  const dispatch = useDispatch();
  const { handleUpload } = useFile();

  useEffect(() => {
    console.log("Updated company state:", upCompany);
  }, [upCompany]);
  const usehandleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleUpload(e);
      setUpCompany((prev) => {
        const updated = { ...prev, aboutImage: url };
        console.log("Updated company with image:", updated);
        return updated;
      });
    } catch (error) {
      toast.error("في حالة وجود خطأ في الصورة يرجى التحقق منها");
    }
  };
  const updateCompanyData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.table(upCompany);
      
      const companyData = await updateCompany(company.id, upCompany);
      console.table(companyData);
      if (companyData) {
        dispatch(setUCompany(companyData));
        toast.success("تم تحديث المعلومات بنجاح");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  };
  useEffect(() => {
    console.log("upCompany changed:", upCompany);
  }, [upCompany]);

  return (
    <form
      onSubmit={updateCompanyData}
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
            <div className="space-y-2">
              <PrimaryInput
                type="file"
                onChange={usehandleFile}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            تحديث المعلومات
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}

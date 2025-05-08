import { useState, ChangeEvent } from "react";

import { IServiceUpdateRequest } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { toast } from "react-toastify";
import { useFile } from "@/app/hooks/useFile";
import useServices from "@/app/hooks/useServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
import { setSelectedserviceId } from "@/app/features/appSlice/ServiceSlice";

export default function UpdateServices() {
  const { selectedService, selectedServiceId } = useSelector(
    (state: RootState) => state.service
  );
  const [serviceUpdate, setServiceUpdate] = useState<IServiceUpdateRequest>({
    ...selectedService,
    files: [],
  });
  const { handleUpload } = useFile();
  const { updateService } = useServices();

  console.log("Initial service data:", { selectedService });

  const handleServiceUpdate = async () => {
    try {
      console.log("Attempting to update service with data:", {
        serviceId: selectedServiceId,
        serviceUpdate,
      });

      await updateService(selectedServiceId, serviceUpdate);
      console.log(serviceUpdate);
      console.log(selectedServiceId);
      toast.success("تم تحديث الخدمة بنجاح");
    } catch (error) {
      console.error("Error updating service:", {
        error,
        serviceId: selectedServiceId,
        serviceUpdate,
      });
      toast.error("فشل تحديث الخدمة");
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      console.log("Attempting file upload");
      await handleUpload(e);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("فشل رفع الملف");
    }
  };
  const dispatch = useDispatch();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        dispatch(setSelectedserviceId(""));
      }}
      dir="rtl"
    >
      <div
        className="w-10/12 md:w-5/12 bg-white rounded-xl shadow-2xl p-8 mx-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تحديث الخدمة</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleServiceUpdate();
            dispatch(setSelectedserviceId(""));
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الخدمة
            </label>
            <PrimaryInput
              type="text"
              value={serviceUpdate.name}
              onChange={(e) => {
                console.log("Service name changed:", e.target.value);
                setServiceUpdate({
                  ...serviceUpdate,
                  name: e.target.value,
                });
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <PrimaryInput
              type="text"
              value={serviceUpdate.description}
              onChange={(e) => {
                console.log("Service description changed:", e.target.value);
                setServiceUpdate({
                  ...serviceUpdate,
                  description: e.target.value,
                });
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة الخدمة
            </label>
            <PrimaryInput
              type="file"
              value={serviceUpdate.image}
              onChange={handleFileUpload}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الملفات
            </label>
            <PrimaryInput
              type="file"
              onChange={handleFileUpload}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <PrimaryButton
              type="button"
              content="تحديث"
              className="bg-DarkPrimary text-white"
              onClick={handleServiceUpdate}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

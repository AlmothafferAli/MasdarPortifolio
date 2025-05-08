import { ChangeEvent, useState } from "react";
import { IPartnerDto } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

import { usePartners } from "@/app/hooks/usePartners";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

import { setSelectedPartnerId } from "@/app/features/appSlice/partnerSlice";
import { useDispatch } from "react-redux";
import { useFile } from "@/app/hooks/useFile";
export default function UpdatePartners() {
  // x  const [project, setProject] = useState<IProjectUpdateRequest | null>(null);

  const { selectedPartnerId } = useSelector(
    (state: RootState) => state.partner
  );

  const { updatePartner } = usePartners();
  const { selectedPartner } = useSelector((state: RootState) => state.partner);

  const [partnerUpdate, setPartnerUpdate] =
    useState<IPartnerDto>(selectedPartner);

  const dispatch = useDispatch();
  const { handleUpload } = useFile();
  const [image, setImage] = useState<string | null>(partnerUpdate.logo);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleUpload(e);
    setImage(url);
  };
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePartner(partnerUpdate, selectedPartnerId);
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        dispatch(setSelectedPartnerId(""));
      }}
      dir="rtl"
    >
      <div
        className="w-10/12 md:w-5/12 bg-white rounded-xl shadow-2xl p-8 mx-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تحديث الشريك</h1>
        <form
          onSubmit={(e) => {
            handleUpdate(e);
            dispatch(setSelectedPartnerId(""));
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الشريك
            </label>
            <PrimaryInput
              type="text"
              value={partnerUpdate.name}
              onChange={(e) => {
                setPartnerUpdate({ ...partnerUpdate, name: e.target.value });
                console.log("partner", partnerUpdate);
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الشعار
            </label>
            <PrimaryInput
              type="file"
              onChange={(e) => {
                handleFileUpload(e);
                setPartnerUpdate({ ...partnerUpdate, logo: image || "" });
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الموقع
            </label>
            <PrimaryInput
              type="text"
              value={partnerUpdate.website}
              onChange={(e) => {
                setPartnerUpdate({ ...partnerUpdate, website: e.target.value });
                console.log("partner", partnerUpdate);
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المقدمة
            </label>
            <PrimaryInput
              type="text"
              value={partnerUpdate.introduction}
              onChange={(e) => {
                setPartnerUpdate({
                  ...partnerUpdate,
                  introduction: e.target.value,
                });
                console.log("partner", partnerUpdate);
              }}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <PrimaryButton
              content="تحديث"
              type="submit"
              className="bg-DarkPrimary text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

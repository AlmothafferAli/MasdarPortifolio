import { ChangeEvent, useState } from "react";
import { IPserviceResponse } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

import { usePservice } from "@/app/hooks/usePservice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

import {
  setSelectedPservice,
  setSelectedPserviceId,
  setIsEditingPservice,
} from "@/app/features/appSlice/PserviceSlice";
import { useDispatch } from "react-redux";
import { useFile } from "@/app/hooks/useFile";
export default function UpdatePService() {
  // x  const [project, setProject] = useState<IProjectUpdateRequest | null>(null);

  const { selectedPserviceId } = useSelector(
    (state: RootState) => state.pservice
  );

  const { updatePservice } = usePservice();
  const { selectedPservice } = useSelector(
    (state: RootState) => state.pservice
  );

  const [pserviceUpdate, setPserviceUpdate] =
    useState<IPserviceResponse>(selectedPservice);

  const dispatch = useDispatch();
  const { handleUpload } = useFile();
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleUpload(e);
    setPserviceUpdate({ ...pserviceUpdate, image: url });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePservice(pserviceUpdate, selectedPserviceId);
    dispatch(setSelectedPserviceId(""));
    dispatch(setSelectedPservice({} as IPserviceResponse));
    dispatch(setIsEditingPservice(false));
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        dispatch(setSelectedPserviceId(""));
        dispatch(setSelectedPservice({} as IPserviceResponse));
        dispatch(setIsEditingPservice(false));
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
            dispatch(setSelectedPserviceId(""));
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الخدمة
            </label>
            <PrimaryInput
              type="text"
              value={pserviceUpdate.name}
              onChange={(e) => {
                setPserviceUpdate({ ...pserviceUpdate, name: e.target.value });
                console.log("pservice", pserviceUpdate);
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
              value={pserviceUpdate.description}
              onChange={(e) => {
                setPserviceUpdate({
                  ...pserviceUpdate,
                  description: e.target.value,
                });
                console.log("pservice", pserviceUpdate);
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصورة
            </label>
            <PrimaryInput
              type="file"
              onChange={(e) => {
                handleFileUpload(e);
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

import { useState } from "react";
import { IFAQ } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

import { useDispatch } from "react-redux";
import { useFAQ } from "@/app/hooks/useFAQ";
import { setSelectedFAQId } from "@/app/features/appSlice/FAQSlice";
export default function UpdateFAQ() {
  // x  const [project, setProject] = useState<IProjectUpdateRequest | null>(null);

  const { selectedFAQId } = useSelector(
    (state: RootState) => state.faq
  );
  const { updateFAQ ,isUpdatingFAQ} = useFAQ();

  const { selectedFAQ } = useSelector(
    (state: RootState) => state.faq
  );
  console.log("selectedFAQ", selectedFAQ);
  console.log("selectedFAQId", selectedFAQId);

  const [faqUpdate, setFaqUpdate] =
    useState<IFAQ>(selectedFAQ);
  console.log("faqUpdate", faqUpdate);
  const dispatch = useDispatch();
  
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateFAQ(faqUpdate, selectedFAQId);
      dispatch(setSelectedFAQId(""));
    } catch (error) {
      console.error("Failed to update FAQ:", error);
    }
  };
  if (isUpdatingFAQ) {
    return  <div
    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
    onClick={() => {
      dispatch(setSelectedFAQId(""));
    }}
    dir="rtl"
  >
    <div className="w-10/12 md:w-5/12 bg-white rounded-xl shadow-2xl p-8 mx-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">جاري التحديث...</h1>
    </div>
  </div>;
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        if (!isUpdatingFAQ) {
          dispatch(setSelectedFAQId(""));
        }
      }}
      dir="rtl"
    >
      <div
        className="w-10/12 md:w-5/12 bg-white rounded-xl shadow-2xl p-8 mx-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تحديث الموظف</h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              السؤال
            </label>
            <PrimaryInput
              type="text"
              value={faqUpdate.question}
              onChange={(e) => {
                setFaqUpdate({ ...faqUpdate, question: e.target.value });
                console.log("faq", faqUpdate.question);
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الجواب
            </label>
            <PrimaryInput
              type="text"
              value={faqUpdate.answer}
              onChange={(e) => {
                setFaqUpdate({ ...faqUpdate, answer: e.target.value });
                console.log("faq", faqUpdate.answer);
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

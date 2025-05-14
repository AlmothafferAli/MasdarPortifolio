import { useState, ChangeEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { IFAQ } from "@/app/features/Type/Interfaces";
import { useFAQ } from "@/app/hooks/useFAQ";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
export default function CreateFAQ({
  setIsAddFAQ,
}: {
  setIsAddFAQ: (isAddFAQ: boolean) => void;
}) {
  const company = useSelector((state: RootState) => state.company.UCompany);
  const [faq, setFaq] = useState<IFAQ>(
    {
      question: "",
      answer: "",
      companyId: company?.id || "",
  });
  const { createFAQ, isAddingFAQ } = useFAQ();

  const handleCreateFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createFAQ(faq);
  };

  return (
    <>
      <form
        onSubmit={handleCreateFAQ}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsAddFAQ(false);
        }}
      >
        <div
          className="w-10/12 md:w-5/12  md:max-h-[80vh] bg-white rounded-xl shadow-2xl p-8 mx-4 overflow-y-auto"
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              إنشاء سؤال جديد
            </h1>
            <p className="text-gray-600 mt-2">
              املأ التفاصيل أدناه لإنشاء سؤال جديد
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السؤال *
                </label>
                <PrimaryInput
                  type="text"
                  value={faq?.question}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFaq({ ...faq, question: e.target.value })
                  }
                  placeholder="أدخل السؤال"
                  className="w-full text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الجواب *
                </label>
                <PrimaryInput
                  type="text"
                  value={faq.answer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFaq({ ...faq, answer: e.target.value })
                  }
                  placeholder="أدخل الجواب"
                  className="w-full text-right"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <PrimaryButton
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isAddingFAQ}
                type="submit"
              >
                {isAddingFAQ ? "جاري الإنشاء..." : "إنشاء السؤال"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

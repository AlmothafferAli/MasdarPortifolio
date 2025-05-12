import { useState, ChangeEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useFile } from "@/app/hooks/useFile";
import { toast } from "react-toastify";
import {
  IPServiceDto,
} from "@/app/features/Type/Interfaces";
import { usePservice } from "@/app/hooks/usePservice";
import { RootState } from "@/app/features/Store";
import { useSelector } from "react-redux";
export default function CreatePservice({
  setIsAddPservice,
}: {
  setIsAddPservice: (isAddPservice: boolean) => void;
}) {
  const { createPservice } = usePservice();
  const { handleUpload } = useFile();
  const selectedPartnerId = useSelector(
    (state: RootState) => state.partner.selectedPartnerId
  );
  const [pservice, setPservice] = useState<IPServiceDto>({
    name: "",
    description: "",
    image: "",
    partnerId: selectedPartnerId,
  });

  const [isLoading] = useState(false);

  const handleCreatePservice = async () => {
    createPservice(pservice);
  };
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "logo" | "image"
  ) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const url = await handleUpload(e);
      setPservice((prev) => ({
        ...prev,
        [field]: url,
      }));
    } catch (error) {
      console.error(error);
      toast.error(`Failed to upload ${field}`);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsAddPservice(false);
        }}
      >
        <div
          className="w-10/12 md:w-5/12  md:max-h-[80vh] bg-white rounded-xl shadow-2xl p-8 mx-4 overflow-y-auto"
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              إنشاء خدمة جديدة
            </h1>
            <p className="text-gray-600 mt-2">
              املأ التفاصيل أدناه لإنشاء خدمة جديدة
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الخدمة *
                </label>
                <PrimaryInput
                  type="text"
                  value={pservice.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPservice({ ...pservice, name: e.target.value })
                  }
                  placeholder="أدخل اسم الخدمة"
                  className="w-full text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقدمة الخدمة
                </label>
                <PrimaryInput
                  type="text"
                  value={pservice.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPservice({ ...pservice, description: e.target.value })
                  }
                  placeholder="أدخل المقدمة"
                  className="w-full text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الشريك
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
            </div>

            <div className="pt-6">
              <PrimaryButton
                onClick={handleCreatePservice}
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الخدمة"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

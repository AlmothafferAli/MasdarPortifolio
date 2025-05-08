import { useState, ChangeEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useFile } from "@/app/hooks/useFile";
import { toast } from "react-toastify";
import { usePartners } from "@/app/hooks/usePartners";
import { IPartnersCreateRequest } from "@/app/features/Type/Interfaces";
export default function CreatePartners({
  setIsAddPartner,
}: {
  setIsAddPartner: (isAddPartner: boolean) => void;
}) {
  const { createPartner } = usePartners();
  const { handleUpload } = useFile();
  const [partner, setPartner] = useState<IPartnersCreateRequest>({
    name: "",
    logo: "",
    website: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
    introduction: "",
  });
  const [isLoading] = useState(false);

  const handleCreatePartner = async () => {
    if (!partner?.logo) {
      toast.error("Please upload both logo and image");
      return;
    }

    createPartner(partner);
  };
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "logo" | "image"
  ) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const url = await handleUpload(e);
      setPartner((prev) => ({
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
          setIsAddPartner(false);
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
              املأ التفاصيل أدناه لإنشاء شريك جديد
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الشريك *
                </label>
                <PrimaryInput
                  type="text"
                  value={partner.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPartner({ ...partner, name: e.target.value })
                  }
                  placeholder="أدخل اسم الشريك"
                  className="w-full text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقدمة الشريك
                </label>
                <PrimaryInput
                  type="text"
                  value={partner.introduction}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPartner({ ...partner, introduction: e.target.value })
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
                    handleFileUpload(e, "logo")
                  }
                  className="w-full text-right"
                  accept="image/*"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الموقع الإلكتروني *
              </label>
              <PrimaryInput
                type="text"
                value={partner.website}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPartner({ ...partner, website: e.target.value })
                }
                placeholder="أدخل الموقع الإلكتروني"
                className="w-full text-right"
                required
              />
            </div>

            <div className="pt-6">
              <PrimaryButton
                onClick={handleCreatePartner}
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الشريك"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

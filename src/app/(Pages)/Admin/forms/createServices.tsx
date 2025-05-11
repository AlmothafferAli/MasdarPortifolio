import { IServiceRequest } from "@/app/features/Type/Interfaces";
import { useState, ChangeEvent, FormEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useFile } from "@/app/hooks/useFile";

import useServices from "@/app/hooks/useServices";

export default function CreateServices({
  setIsAddService,
}: {
  setIsAddService: (isAddService: boolean) => void;
}) {
  const { createService } = useServices();
  const { handleUpload } = useFile();
  const [service, setService] = useState<IServiceRequest>({
    name: "",
    description: "",
    image: "",
    files: [""],
    summary: "",
    benefits: "",
    features: "",
    price: "",
    link: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  });
  const [isLoading] = useState(false);
  const handleCreateService = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createService(service);

      console.log(response);
    } catch (error) {
      console.log(service);
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleCreateService(e)}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsAddService(false);
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
                  value={service.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setService({ ...service, name: e.target.value })
                  }
                  placeholder="أدخل اسم الخدمة"
                  className="w-full text-right"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الخدمة
                </label>
                <PrimaryInput
                  type="file"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    const image = await handleUpload(e);
                    setService({ ...service, image: image });
                  }}
                  className="w-full text-right"
                  accept="image/*"
                />
              </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف *
              </label>
              <PrimaryInput
                type="text"
                value={service.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setService({ ...service, description: e.target.value })
                }
                placeholder="أدخل وصف الخدمة"
                className="w-full text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الملخص
              </label>
              <PrimaryInput
                type="text"
                value={service.summary}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setService({ ...service, summary: e.target.value })
                }
                placeholder="أدخل الملخص"
                className="w-full text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الفوائد
              </label>
              <PrimaryInput
                type="text"
                value={service.benefits}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setService({ ...service, benefits: e.target.value })
                }
                placeholder="أدخل الفوائد"
                className="w-full text-right"
              />
            </div>  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المزايا
              </label>
              <PrimaryInput
                type="text"
                value={service.features}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setService({ ...service, features: e.target.value })
                }
                placeholder="أدخل المزايا"
                className="w-full text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                السعر
              </label>
              <PrimaryInput
                type="text"
                value={service.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setService({ ...service, price: e.target.value })
                }
                placeholder="أدخل السعر"
                className="w-full text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرابط
              </label>
              <PrimaryInput
                type="url"
                value={service.link}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const url = e.target.value;
                  setService({ ...service, link: url });
                }}
                placeholder="https://example.com"
                className="w-full text-right"
              />
            </div>


                
            <div className="pt-6">
              <PrimaryButton
                type="submit"
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الخدمة"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

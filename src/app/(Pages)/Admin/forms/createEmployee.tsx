import { useState, ChangeEvent } from "react";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { useFile } from "@/app/hooks/useFile";
import { toast } from "react-toastify";
import { useEmployee } from "@/app/hooks/useEmployee";
import { IEmployeeDto } from "@/app/features/Type/Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";
export default function CreateEmployee({
  setIsAddEmployee,
}: {
  setIsAddEmployee: (isAddEmployee: boolean) => void;
}) {
  const { handleUpload } = useFile();
  const company = useSelector((state: RootState) => state.company.UCompany);
  const [employee, setEmployee] = useState<IEmployeeDto>({
    name: "",
    description: "",
    employeeRole: "",
    employeeImage: "",
    companyId: company.id,
  });
  const { createEmployee, isLoading} = useEmployee();

  const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createEmployee(employee);
  };
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: "employeeImage"
  ) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const url = await handleUpload(e);
      setEmployee((prev) => ({
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
      <form
        onSubmit={handleCreateEmployee}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsAddEmployee(false);
        }}
      >
        <div
          className="w-10/12 md:w-5/12  md:max-h-[80vh] bg-white rounded-xl shadow-2xl p-8 mx-4 overflow-y-auto"
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              إنشاء موظف جديد
            </h1>
            <p className="text-gray-600 mt-2">
              املأ التفاصيل أدناه لإنشاء موظف جديد
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الموظف *
                </label>
                <PrimaryInput
                  type="text"
                  value={employee.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                  placeholder="أدخل اسم الموظف"
                  className="w-full text-right"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الموظف *
                </label>
                <PrimaryInput
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFileUpload(e, "employeeImage")
                  }
                  className="w-full text-right"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوظيفة *
              </label>
              <PrimaryInput
                type="text"
                value={employee.employeeRole}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmployee({ ...employee, employeeRole: e.target.value })
                }
                placeholder="أدخل الوظيفة"
                className="w-full text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوصف *
              </label>
              <PrimaryInput
                type="text"
                value={employee.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmployee({ ...employee, description: e.target.value })
                }
                placeholder="أدخل وصف الموظف"
                className="w-full text-right"
                required
              />
            </div>

            <div className="pt-6">
              <PrimaryButton
                className="w-full py-3 bg-DarkPrimary text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "جاري الإنشاء..." : "إنشاء الموظف"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

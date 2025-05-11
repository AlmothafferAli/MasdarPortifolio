import { ChangeEvent, useState } from "react";
import { IEmployeeDto, IPartnerDto } from "@/app/features/Type/Interfaces";
import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import { toast } from "react-toastify";

import { usePartners } from "@/app/hooks/usePartners";
import { useSelector } from "react-redux";
import { RootState } from "@/app/features/Store";

import { useUpdatePartnerMutation } from "@/app/features/Api/partnersApi";
import { setSelectedPartnerId } from "@/app/features/appSlice/partnerSlice";
import { useDispatch } from "react-redux";
import { useEmployee } from "@/app/hooks/useEmployee";
import { useFile } from "@/app/hooks/useFile";
import { setSelectedEmployeeId } from "@/app/features/appSlice/EmployeeSlice";
export default function UpdateEmployee() {
  // x  const [project, setProject] = useState<IProjectUpdateRequest | null>(null);

  const { selectedEmployeeId } = useSelector(
    (state: RootState) => state.employee
  );
  const { updateEmployee } = useEmployee();

  const { selectedEmployee } = useSelector(
    (state: RootState) => state.employee
  );
  console.log("selectedEmployee", selectedEmployee);
  console.log("selectedEmployeeId", selectedEmployeeId);

  const [employeeUpdate, setEmployeeUpdate] =
    useState<IEmployeeDto>(selectedEmployee);
  console.log("employeeUpdate", employeeUpdate);
  const dispatch = useDispatch();
  const { handleUpload } = useFile();
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleUpload(e);
    setEmployeeUpdate({ ...employeeUpdate, employeeImage: url });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateEmployee(employeeUpdate, selectedEmployeeId);
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 "
      onClick={() => {
        dispatch(setSelectedEmployeeId(""));
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
          onSubmit={(e) => {
            handleUpdate(e);
            dispatch(setSelectedEmployeeId(""));
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الموظف
            </label>
            <PrimaryInput
              type="text"
              value={employeeUpdate.name}
              onChange={(e) => {
                setEmployeeUpdate({ ...employeeUpdate, name: e.target.value });
                console.log("employee", employeeUpdate.name);
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوظيفة
            </label>
            <PrimaryInput
              type="text"
              value={employeeUpdate.employeeRole}
              onChange={(e) => {
                setEmployeeUpdate({
                  ...employeeUpdate,
                  employeeRole: e.target.value,
                });
                console.log("employee", employeeUpdate.employeeRole);
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
              value={employeeUpdate.description}
              onChange={(e) => {
                setEmployeeUpdate({
                  ...employeeUpdate,
                  description: e.target.value,
                });
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

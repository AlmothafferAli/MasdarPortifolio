import { toast } from "react-toastify";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../features/Api/EmployeeApi";
import { useGetEmployeesQuery } from "../features/Api/EmployeeApi";
import { IPServiceDto, IPserviceResponse } from "../features/Type/Interfaces";
import {
  useDeletePserviceMutation,
  useUpdatePserviceMutation,
  useAddPserviceMutation,
  useGetPServicesQuery,
} from "../features/Api/PServiceApi";

export const usePservice = () => {
  const [addPservice, { isLoading: isAddingPservice }] =
    useAddPserviceMutation();
  const [updatePserviceMutation, { isLoading: isUpdatingPservice }] =
    useUpdatePserviceMutation();
  const [deletePserviceMutation, { isLoading: isDeletingPservice }] =
    useDeletePserviceMutation();
  const handleError = (error: any) => {
    console.table(error);
    toast.error(
      `${
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to create pservice"
      }`
    );
  };
  const createPservice = async (pservice: IPServiceDto) => {
    if (!pservice.name || !pservice.description || !pservice.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addPservice(pservice).unwrap();
      toast.success("خدمة إضافية جديدة تم إنشاؤها بنجاح");
    } catch (error) {
      handleError(error);
    }
  };
  const updatePservice = async (pservice: IPserviceResponse, id: string) => {
    try {
      const response = await updatePserviceMutation({
        pservice,
        id,
      }).unwrap();
      toast.success("تم تحديث الخدمة بنجاح");
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  const deletePservice = async (id: string) => {
    try {
      const response = await deletePserviceMutation(id).unwrap();
      toast.success("تم حذف الخدمة بنجاح");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };

  return {
    isAddingPservice,
    createPservice,
    isUpdatingPservice,
    updatePservice,
    isDeletingPservice,
    deletePservice,
  };
};

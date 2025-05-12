import { toast } from "react-toastify";

import { IPServiceDto, IPserviceResponse } from "../features/Type/Interfaces";
import {
  useDeletePserviceMutation,
  useUpdatePserviceMutation,
  useAddPserviceMutation,
} from "../features/Api/PServiceApi";
import { handleError } from "./useHandleError";
export const usePservice = () => {
  const [addPservice, { isLoading: isAddingPservice }] =
    useAddPserviceMutation();
  const [updatePserviceMutation, { isLoading: isUpdatingPservice }] =
    useUpdatePserviceMutation();
  const [deletePserviceMutation, { isLoading: isDeletingPservice }] =
    useDeletePserviceMutation();
  const createPservice = async (pservice: IPServiceDto) => {
    if (!pservice.name || !pservice.description || !pservice.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addPservice(pservice).unwrap();
      toast.success("خدمة إضافية جديدة تم إنشاؤها بنجاح");
    } catch (error) {
      handleError(error as { data?: { message?: string } });
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
      handleError(error as { data?: { message?: string } });
    }
  };
  const deletePservice = async (id: string) => {
    try {
      const response = await deletePserviceMutation(id).unwrap();
      toast.success("تم حذف الخدمة بنجاح");
      return response;
    } catch (error) {
      handleError(error as { data?: { message?: string } });
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

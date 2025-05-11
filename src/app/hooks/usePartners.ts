import { toast } from "react-toastify";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../features/Api/EmployeeApi";
import { useGetAllPartnersQuery } from "../features/Api/partnersApi";
import {
  IPartner,
  IPartnerDto,
  IPartnersCreateRequest,
} from "../features/Type/Interfaces";
import { useCreatePartnerMutation } from "../features/Api/partnersApi";
import { useUpdatePartnerMutation } from "../features/Api/partnersApi";
import { useDeletePartnerMutation } from "../features/Api/partnersApi";

export const usePartners = () => {
  const { data, isLoading, error } = useGetAllPartnersQuery();
  const [addPartner, { isLoading: isAddingPartner }] =
    useCreatePartnerMutation();
  const [updatePartnerMutation, { isLoading: isUpdatingPartner }] =
    useUpdatePartnerMutation();
  const [deletePartnerMutation, { isLoading: isDeletingPartner }] =
    useDeletePartnerMutation();
  const handleError = (error: any) => {
    console.table(error);
    toast.error(
      `${
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to create partner"
      }`
    );
  };
  const createPartner = async (partner: IPartnersCreateRequest) => {
    if (
      !partner.name ||
      !partner.introduction ||
      !partner.website ||
      !partner.logo
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addPartner(partner).unwrap();
      toast.success("Partner created successfully");
    } catch (error) {
      handleError(error);
    }
  };
  const updatePartner = async (partner: IPartnerDto, id: string) => {
    try {
      const response = await updatePartnerMutation({ partner, id }).unwrap();
      toast.success("Partner updated successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };
  const deletePartner = async (id: string) => {
    try {
      const response = await deletePartnerMutation(id).unwrap();
      toast.success("Partner deleted successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error);
    }
  };

  return {
    data,
    isLoading,
    error,
    isAddingPartner,
    createPartner,
    isUpdatingPartner,
    updatePartner,
    isDeletingPartner,
    deletePartner,
  };
};

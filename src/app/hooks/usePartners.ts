import { toast } from "react-toastify";
import { useGetAllPartnersQuery } from "../features/Api/partnersApi";
import {
  IPartnerDto,
  IPartnersCreateRequest,
} from "../features/Type/Interfaces";
import { useCreatePartnerMutation } from "../features/Api/partnersApi";
import { useUpdatePartnerMutation } from "../features/Api/partnersApi";
import { useDeletePartnerMutation } from "../features/Api/partnersApi";
import { handleError } from "./useHandleError";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";

export const usePartners = () => {
  const company = useSelector((state: RootState) => state.company.UCompany);
  const { data, isLoading, error } = useGetAllPartnersQuery(
    { pageNumber: 1, pageSize: 10, companyId: company.id },
    {
      skip: !company?.id,
    }
  );
  const [addPartner, { isLoading: isAddingPartner }] =
    useCreatePartnerMutation();
  const [updatePartnerMutation, { isLoading: isUpdatingPartner }] =
    useUpdatePartnerMutation();
  const [deletePartnerMutation, { isLoading: isDeletingPartner }] =
    useDeletePartnerMutation();
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
      console.log("partner" + partner);
      await addPartner(partner).unwrap();
      toast.success("Partner created successfully");
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } });
    }
  };
  const updatePartner = async (partner: IPartnerDto, id: string) => {
    try {
      const response = await updatePartnerMutation({ partner, id }).unwrap();
      toast.success("Partner updated successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
    }
  };
  const deletePartner = async (id: string) => {
    try {
      const response = await deletePartnerMutation(id).unwrap();
      toast.success("Partner deleted successfully");
      return response;
    } catch (error) {
      console.table(error);
      handleError(error as { data?: { message?: string } });
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

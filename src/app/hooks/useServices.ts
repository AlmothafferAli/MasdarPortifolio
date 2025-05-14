import {
  useGetAllServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../features/Api/ServicesApi";
import { setDeletedServiceId } from "../features/appSlice/ServiceSlice";
import {
  IService,
  IServiceRequest,
  IServiceUpdateRequest,
} from "../features/Type/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../features/Store";
export default function useServices() {
  const dispatch = useDispatch();
  const company = useSelector((state: RootState) => state.company.UCompany);
  const [addService] = useAddServiceMutation();
  const [deleteServiceMutation] = useDeleteServiceMutation();
  const [updateServiceMutation] = useUpdateServiceMutation();
  const { data, isLoading, error } = useGetAllServicesQuery(
    {
      pageNumber: 1,
      pageSize: 10,
      companyId: company.id,
    },
    {
      skip: !company?.id,
    }
  );

  const createService = async (service: IServiceRequest) => {
    try {
      const response = await addService(service).unwrap();
      return response;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  };

  const getAllServices = async (): Promise<IService[] | undefined> => {
    try {
      if (!data?.data) return undefined;
      return data.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return undefined;
    }
  };

  const deleteService = async (id: string): Promise<void> => {
    try {
      await deleteServiceMutation(id);
      toast.success("Service deleted successfully");
      dispatch(setDeletedServiceId(id));
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  };
  const updateService = async (
    id: string,
    service: IServiceUpdateRequest
  ): Promise<void> => {
    try {
      await updateServiceMutation({ service, id });
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };

  return {
    createService,
    getAllServices,
    data: data?.data ?? [],
    isLoading,
    error,
    deleteService,
    updateService,
  };
}

import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../features/Api/CompanyApi";
import { ICompanyRequest } from "../features/Type/Interfaces";

export default function useCompany() {
  const { data, isLoading, error } = useGetCompanyQuery();
  const [updateCompanyMutation] = useUpdateCompanyMutation();

 
  const updateCompany = async (
    id: string,
    company: ICompanyRequest
  ): Promise<ICompanyRequest | undefined> => {
    try {
      const response = await updateCompanyMutation({
        id,
        update: company,
      });
      return response.data;
    } catch (error) {
      console.table(error);
    }
  };

  return { data, isLoading, error, updateCompany };
}

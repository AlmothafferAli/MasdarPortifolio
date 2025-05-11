import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiUrl, BaseUrl,  Update, Add, CompanyUrl, Get } from "../Type/BaseUrl";
import { ICompanyRequest, ICompanyResponse } from "../Type/Interfaces";

export const CompanyApi = createApi({
  reducerPath: "CompanyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + CompanyUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCompany: builder.query<ICompanyResponse, void>({
      query: () => ({
        url: Get,
        method: "GET",
      }),
    }),
    addCompany: builder.mutation<ICompanyResponse, ICompanyRequest>({
      query: (company) => ({
        url: Add,
        method: "POST",
        body: company,
      }),
    }),
    updateCompany: builder.mutation<
      ICompanyResponse,
      { update: ICompanyRequest; id: string }
    >({
      query: ({ update, id }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: update,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCompanyQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
} = CompanyApi;

// Export the API slice for store configuration
export default CompanyApi;

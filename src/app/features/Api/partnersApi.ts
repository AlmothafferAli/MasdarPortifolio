import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IPartnerDto,
  IPartnerResponse,
  IPartnersCreateRequest,
  IPartnerUpdateRequest,
  PageResponse,
} from "../Type/Interfaces";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseUrl,
  Add,
  GetAll,
  Delete,
  Update,
  PartnerUrl,
  ApiUrl,
} from "../Type/BaseUrl";
export const partnersApi = createApi({
  reducerPath: "partnersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + PartnerUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPartners: builder.query<
      IPartnerDto,
      "08dd88e3-7289-4462-88d6-16d91e81fa0d"
    >({
      query: () => ({
          url: GetAll,
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
        },
      }),
    }),
    createPartner: builder.mutation<IPartnerResponse, IPartnersCreateRequest>({
      query: (partner) => ({
        url: Add,
        method: "POST",
        body: partner,
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d ",
        },
      }),
    }),
    GetAllPartners: builder.query<PageResponse<IPartnerDto>, { pageNumber: number, pageSize: number }>({
      query: ({ pageNumber, pageSize }) => ({
        url: GetAll,
        method: "GET",
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      }),
    }),
    deletePartner: builder.mutation<IPartnerResponse, string>({
      query: (id) => ({
        url: Delete + "/" + id,
        method: "DELETE",
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
        },
      }),
    }),
    updatePartner: builder.mutation<
      IPartnerResponse,
      { partner: IPartnerUpdateRequest; id: string }
    >({
      query: ({ partner, id }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: partner,
      }),
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useUpdatePartnerMutation,
} = partnersApi;

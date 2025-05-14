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
      PageResponse<IPartnerDto>,
      { pageNumber: number, pageSize: number,companyId:string }
    >({
      query: ({ pageNumber, pageSize,companyId }) => ({
          url: GetAll,
        params: {
          companyId:companyId,
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      }),
    }),
    createPartner: builder.mutation<IPartnerResponse, IPartnersCreateRequest>({
      query: (partner) => ({
        url: Add,
        method: "POST",
        body: partner,
       
      }),
    }),
    deletePartner: builder.mutation<IPartnerResponse, string>({
      query: (id) => ({
        url: Delete + "/" + id,
        method: "DELETE",
          
      }),
    }),
    getPartnerById: builder.query<IPartnerResponse, string>({
      query: (id) => ({
        url:"Get/" + id,
        method: "GET",
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
  useGetPartnerByIdQuery,
} = partnersApi;

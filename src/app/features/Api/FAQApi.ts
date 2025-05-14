
import { ApiUrl, BaseUrl, FAQUrl } from "../Type/BaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFAQ, IFAQDto, IFAQUpdateRequest, PageResponse } from "../Type/Interfaces";
import {
  GetAll,
  Delete,
  Update,
  Add,
} from "../Type/BaseUrl";

export const FAQApi = createApi({
  reducerPath: "FAQApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + FAQUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllFAQs: builder.query<PageResponse<IFAQUpdateRequest>, { pageSize: number, pageNumber: number,companyId:string }>({
      query: ({ pageSize, pageNumber,companyId }) => ({
        url: GetAll,
        method: "GET",
        params: {
            PageSize: pageSize,
            PageNumber: pageNumber,
            companyId: companyId,
        },
      }),
    }),
    addFAQ: builder.mutation<IFAQDto,IFAQ>({
      query: (faq) => ({
        url: Add,
        method: "POST",
        body: faq,
      }),
    }),
    deleteFAQ: builder.mutation<IFAQ, string>({
      query: (id) => ({
        url: `${Delete}/${id}`,
        method: "DELETE",
      }),
    }),
    updateFAQ: builder.mutation<
      IFAQ,
      { id: string; faq: IFAQDto }
      >({

      query: ({ id, faq }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: faq,
      }),
    }),
  }),
});

export const {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useUpdateFAQMutation,
  useGetAllFAQsQuery,
} = FAQApi;

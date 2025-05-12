import { ApiUrl, BaseUrl, PServiceUrl } from "../Type/BaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IEmployee,
  IPService,
  IPServiceDto,
  PageResponse,
  IPserviceResponse,
} from "../Type/Interfaces";
import { GetAll, Delete, Update, Add } from "../Type/BaseUrl";

export const PServiceApi = createApi({
  reducerPath: "PServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + PServiceUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPServices: builder.query<PageResponse<IPService>, string>({
      query: (partnerId) => ({
        url: GetAll,
        method: "GET",
        params: {
          partnerId: partnerId,
        },
      }),
    }),
    addPservice: builder.mutation<IPserviceResponse, IPServiceDto>({
      query: (pservice) => ({
        url: Add,
        method: "POST",
        body: pservice,
      }),
    }),
    deletePservice: builder.mutation<IPService, string>({
      query: (id) => ({
        url: `${Delete}/${id}`,
        method: "DELETE",
      }),
    }),
    updatePservice: builder.mutation<
      IEmployee,
      { id: string; pservice: IPserviceResponse }
    >({
      query: ({ id, pservice }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: pservice,
      }),
    }),
  }),
});

export const {
  useGetAllPServicesQuery,
  useAddPserviceMutation,
  useDeletePserviceMutation,
  useUpdatePserviceMutation,
} = PServiceApi;

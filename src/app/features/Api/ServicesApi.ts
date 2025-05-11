import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseUrl,
  ServiceUrl,
  GetAll,
  Delete,
  Update,
  ApiUrl,
  Add,
} from "../Type/BaseUrl";
import {
  IService,
  IServiceRequest,
  PageResponse,
  IServiceUpdateRequest,
  IServiceDto,
} from "../Type/Interfaces";

// Custom error handler for the base query

export const ServicesApi = createApi({
  reducerPath: "ServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + ServiceUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addService: builder.mutation<IServiceDto, IServiceRequest>({
      query: (service) => ({
        url: Add,
        method: "POST",
        body: service,
      }),
    }),
    getAllServices: builder.query<PageResponse<IService>, void>({
      query: () => ({
        url: GetAll,
        method: "GET",
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
        },
      }),
    }),
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `${Delete}/${id}`,
        method: "DELETE",
      }),
    }),
    UpdateService: builder.mutation<
      IServiceRequest,
      { service: IServiceUpdateRequest; id: string }
    >({
      query: ({ service, id }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: service,
      }),
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = ServicesApi;

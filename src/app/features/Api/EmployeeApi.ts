import { ApiUrl, BaseUrl, EmployeeUrl } from "../Type/BaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmployee, IEmployeeDto, PageResponse } from "../Type/Interfaces";
import {
  GetAll,
  Delete,
  Update,
  Add,
} from "../Type/BaseUrl";

export const EmployeeApi = createApi({
  reducerPath: "EmployeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + EmployeeUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<PageResponse<IEmployee>, void>({
      query: () => ({
        url: GetAll,
        method: "GET",
        params: {
          companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
        },
      }),
    }),
    addEmployee: builder.mutation<IEmployee, IEmployeeDto>({
      query: (employee) => ({
        url: Add,
        method: "POST",
        body: employee,
      }),
    }),
    deleteEmployee: builder.mutation<IEmployee, string>({
      query: (id) => ({
        url: `${Delete}/${id}`,
        method: "DELETE",
      }),
    }),
    updateEmployee: builder.mutation<
      IEmployee,
      { id: string; employee: IEmployeeDto }
      >({

      query: ({ id, employee }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: employee,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = EmployeeApi;

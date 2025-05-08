import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAuthResponse,
  ICompanyRequest,
  ICompanyResponse,
  ILoginRequest,
  IRegisterRequest,
} from "@/app/features/Type/Interfaces";
import { BaseUrl, CompanyUrl, LoginUrl, ApiUrl } from "@/app/features/Type/BaseUrl";
export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + "Auth",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (credentials: ILoginRequest) => ({
        url: LoginUrl,
        method: "POST",
        body: credentials,
      }),
    }),
    AddCompany: builder.mutation<ICompanyResponse, ICompanyRequest>({
      query: (credentials) => ({
        url: CompanyUrl,
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<IAuthResponse, IRegisterRequest>({
      query: (registerData) => ({
        url: "/register",
        method: "POST",
        body: registerData,
      }),
    }),
    registerAdmin: builder.mutation<IAuthResponse, IRegisterRequest>({
      query: (registerData) => ({
        url: "/Admin",
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRegisterAdminMutation,
} = UserApi;

import { ApiUrl, BaseUrl, UltraMsgUrl } from "../Type/BaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUltraMsg } from "../Type/Interfaces";
export const UltraMsgApi = createApi({
  reducerPath: "UltraMsgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    sendUltraMsg: builder.mutation<string, IUltraMsg>({
      query: (ultraMsg) => ({
        url: UltraMsgUrl,
        method: "POST",
        body: ultraMsg,
      }),
    }),
  }),
});

export const { useSendUltraMsgMutation } = UltraMsgApi;

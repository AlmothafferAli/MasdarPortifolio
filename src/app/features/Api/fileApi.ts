import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl, ApiUrl } from "../Type/BaseUrl";

export const fileApi = createApi({
  reducerPath: "fileApi",

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
    uploadFile: builder.mutation<string, File[]>({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        return {
          url: "File/Upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;

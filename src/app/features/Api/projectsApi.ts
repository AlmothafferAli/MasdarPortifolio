import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseUrl,
  ProjectUrl,
  GetAll,
  Delete,
  Update,
  Add,
  ApiUrl,
} from "../Type/BaseUrl";
import {
  IProject,
  IProjectRequest,
  IProjectResponse,
  PageResponse,
  IProjectUpdateRequest,
} from "../Type/Interfaces";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl + ApiUrl + ProjectUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addProject: builder.mutation<IProjectResponse, IProjectRequest>({
      query: (project) => ({
        url: Add,
        method: "POST",
        body: project,
      }),
    }),
    GetAllProjects: builder.query<
      PageResponse<IProject>,
      { pageNumber: number; pageSize: number,companyId:string }
    >({
      query: ({ pageSize, pageNumber,companyId }) => ({
        url: GetAll,
        method: "GET",
        params: {
          companyId: companyId,
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      }),
    }),
    DeleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `${Delete}/${id}`,
        method: "DELETE",
        
      }),
    }),

    UpdateProject: builder.mutation<
      IProjectResponse,
      { project: IProjectUpdateRequest; id: string }
    >({
      query: ({ project, id }) => ({
        url: `${Update}/${id}`,
        method: "PUT",
        body: project,
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;

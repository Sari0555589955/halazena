import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


export const categoriesApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", sessionStorage.getItem("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/category/getAll`,
      providesTags: ["category"],
    }),
    getAllSubCategories: builder.query({
      query: (categoryId) => `/category/getAllSub/${categoryId}`,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useLazyGetAllSubCategoriesQuery } =
  categoriesApi;

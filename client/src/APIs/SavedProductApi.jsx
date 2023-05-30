import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


export const savedProductsApi = createApi({
  reducerPath: "SavedProduct",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      return headers.set("Authorization", sessionStorage.getItem("token"));
    },
  }),
  tagTypes: ["SavedProduct"],
  endpoints: (builder) => ({
    //  SavedProductS ENDPOINTS =>
    getAllSavedProducts: builder.query({
      query: () => `/savedProduct/getAll/`,
      providesTags: ["SavedProduct"],
    }),

    addToSavedProduct: builder.mutation({
      query: (product) => ({
        url: `/savedProduct/add`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["SavedProduct"],
    }),
    deleteSavedProduct: builder.mutation({
      query: (id) => ({
        url: `/savedProduct/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedProduct"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddToSavedProductMutation,
  useLazyGetAllSavedProductsQuery,
  useGetAllSavedProductsQuery,
  useDeleteSavedProductMutation,
} = savedProductsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const ProductsApi = createApi({
  reducerPath: "Product",
  keepUnusedDataFor: 0,
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", sessionStorage.getItem("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => `/product/getAll/${query ? query : ""}`,
      providesTags: ["Product"],
    }),
    getAllProductsBySubId: builder.query({
      query: (parameter) => `/product/getAll?sub=${parameter}`,
      providesTags: ["Product"],
    }),
    getMostSellingProducts: builder.query({
      query: () => `/product/getMostSelling/`,
      providesTags: ["Product"],
    }),
    getMostNewiestProducts: builder.query({
      query: () => `/product/getNewiest/`,
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/product/getById/${id}`,
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, product }) => ({
        url: `/product/update/${productId}`,
        body: product,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    addRating: builder.mutation({
      query: ({ productId, rating }) => ({
        url: `/product/addRating/${productId}`,
        body: { rating },
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetSingleProductQuery,
  useLazyGetAllProductsBySubIdQuery,
  useGetAllProductsQuery,
  useGetMostSellingProductsQuery,
  useGetMostNewiestProductsQuery,
  useLazyGetAllProductsQuery,
  useLazyGetSingleProductQuery,
  useUpdateProductMutation,
  useAddRatingMutation,
} = ProductsApi;

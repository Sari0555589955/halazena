import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


const cartApi = createApi({
  reducerPath: "Cart",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", sessionStorage.getItem("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => `/cart/getAllByUser`,
      providesTags: ["Cart"],
    }),
    updateQuantity: builder.mutation({
      query: (payload) => ({
        url: `/cart/updateQuantity`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (cart) => ({
        url: "/cart/add",
        body: cart,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/deleteAllByUser",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// export const { useGetAllCartsQuery, useLazyGetAllCartsQuery, useUpdateQuantityMutation } = cartApi;

// }),
// });

export const {
  useGetAllCartsQuery,
  useLazyGetAllCartsQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useUpdateQuantityMutation,
  useClearCartMutation,
} = cartApi;
export default cartApi;

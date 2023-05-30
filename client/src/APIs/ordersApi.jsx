import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


const ordersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) =>
      headers.set("Authorization", sessionStorage.getItem("token")),
  }),
  reducerPath: "order",
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => "/order/getOrdersByUser",
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (payload) => ({
        url: `/order/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const { useGetUserOrdersQuery, useAddOrderMutation } = ordersApi;
export default ordersApi;

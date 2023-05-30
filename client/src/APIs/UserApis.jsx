import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

export const userApi = createApi({
  reducerPath: "APIs",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", sessionStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    //  LOGIN ENDPOINTS =>
    login: builder.mutation({
      query: (user) => ({
        url: `/user/login`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "PUT",
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: `/user/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => `/user/me`,
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, values }) => ({
        url: `/user/update/${userId}`,
        method: "PUT",
        body: values,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useLazyGetMeQuery,
} = userApi;

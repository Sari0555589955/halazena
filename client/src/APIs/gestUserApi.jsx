import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


const guestUserApi = createApi({
  reducerPath: "Guest",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    createGuestUser: builder.query({
      query: () => `/createGuestUser`,
      providesTags: ["Guest"],
    }),
  }),
});
export const { useLazyCreateGuestUserQuery } = guestUserApi;
export default guestUserApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";


const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (payload) => ({
        url: `/contact/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useContactMutation } = contactsApi;
export default contactsApi;

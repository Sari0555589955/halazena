import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../components/service";

const privacyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: "privacy",
  tagTypes: ["Privacy"],
  endpoints: (builder) => ({
    getAllPrivcay: builder.query({
      query: () => `/section/getAll?type=privacy`,
      providesTags: ["Privacy"],
    }),
  }),
});
export const { useGetAllPrivcayQuery } = privacyApi;
export default privacyApi;

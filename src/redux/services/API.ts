// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// all apis
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["getProducts"],
  endpoints: (builder) => ({
    // get Products api
    getBlogs: builder.query({
      query: (filter) => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["getProducts"],
    }),
  }),
});

export const {
  useGetBlogsQuery
} = baseApi;

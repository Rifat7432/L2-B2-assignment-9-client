import { baseApi } from "@/redux/services/API";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/login",
          method: "POST",
          body: user,
        };
      },
    }),
    signUp: builder.mutation({
      query: (user) => {
        return {
          url: "/register",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;

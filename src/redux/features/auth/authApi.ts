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
    getProfile: builder.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (updateData) => {
        return {
          url: "/profile",
          method: "PUT",
          body: updateData,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (authData) => {
        return {
          url: "/change-password",
          method: "POST",
          body: authData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;

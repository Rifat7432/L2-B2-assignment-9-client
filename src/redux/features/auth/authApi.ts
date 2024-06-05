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
      invalidatesTags: ["getUser"],
    }),
    signUp: builder.mutation({
      query: (user) => {
        return {
          url: "/register",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    makeAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/register-admin/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["getUser"],
    }),
    removeUser: builder.mutation({
      query: (id) => {
        return {
          url: `/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/all-profile",
          method: "GET",
        };
      },
      providesTags: ["getUser"],
    }),
    updateProfile: builder.mutation({
      query: (updateData) => {
        return {
          url: "/profile",
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    changePassword: builder.mutation({
      query: (authData) => {
        return {
          url: "/change-password",
          method: "POST",
          body: authData,
        };
      },
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useRemoveUserMutation,
} = authApi;

import { baseApi } from "@/redux/services/API";

const adoptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdoptedPets: builder.query({
      query: (id) => {
        return {
          url: `/adoption-requests-pets/${id}`,
          method: "GET",
        };
      },
    }),
    getAllUnapprovedAdoptedRequest: builder.query({
      query: (id) => {
        return {
          url: `/adoption-requests-unapproved/${id}`,
          method: "GET",
        };
      },
    }),
    createAdoptRequest: builder.mutation({
      query: (requestData) => {
        return {
          url: `/adoption-request`,
          method: "POST",
          body: requestData,
        };
      },
    }),
  }),
});

export const {
  useGetAllAdoptedPetsQuery,
  useCreateAdoptRequestMutation,
  useGetAllUnapprovedAdoptedRequestQuery,
} = adoptApi;

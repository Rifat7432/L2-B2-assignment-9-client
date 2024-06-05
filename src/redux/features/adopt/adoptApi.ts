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
      providesTags: ["getAdoptionRequest"],
    }),
    getAllAdoptionRequest: builder.query({
      query: () => {
        return {
          url: "adoption-requests",
          method: "GET",
        };
      },
      providesTags: ["getAdoptionRequest"],
    }),
    getAllUnapprovedAdoptedRequest: builder.query({
      query: (id) => {
        return {
          url: `/adoption-requests-unapproved/${id}`,
          method: "GET",
        };
      },
      providesTags: ["getAdoptionRequest"],
    }),
    createAdoptRequest: builder.mutation({
      query: (requestData) => {
        return {
          url: `/adoption-request`,
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["getAdoptionRequest"],
    }),
    updateRequestStatus: builder.mutation({
      query: (requestData) => {
        return {
          url: `/adoption-requests/${requestData.id}`,
          method: "PUT",
          body: requestData.status,
        };
      },
      invalidatesTags: ["getAdoptionRequest"],
    }),
  }),
});

export const {
  useGetAllAdoptedPetsQuery,
  useCreateAdoptRequestMutation,
  useGetAllUnapprovedAdoptedRequestQuery,
  useGetAllAdoptionRequestQuery,
  useUpdateRequestStatusMutation,
} = adoptApi;

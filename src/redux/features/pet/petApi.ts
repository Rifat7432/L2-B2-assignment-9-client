import { baseApi } from "@/redux/services/API";

const petApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPets: builder.query({
      query: (filter) => {
        return {
          url: "/pets",
          method: "GET",
          params: filter,
        };
      },
      providesTags: ["getPets"],
    }),
    createPet: builder.mutation({
      query: (petData) => {
        return {
          url: "/pets",
          method: "POST",
          body: petData,
        };
      },
      invalidatesTags: ["getPets"],
    }),
    updatePet: builder.mutation({
      query: (petData) => {
        return {
          url: `/pets/${petData.id}`,
          method: "PUT",
          body: petData.updateData,
        };
      },
      invalidatesTags: ["getPets"],
    }),
    deletePet: builder.mutation({
      query: (id) => {
        return {
          url: `/pet/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getPets"],
    }),
    getPet: builder.query({
      query: (id) => {
        return {
          url: `/pet/${id}`,
          method: "GET",
        };
      },
      providesTags: ["getPets"],
    }),
  }),
});

export const {
  useGetAllPetsQuery,
  useGetPetQuery,
  useCreatePetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petApi;

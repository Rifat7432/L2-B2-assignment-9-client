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
    }),
    getPet: builder.query({
      query: (id) => {
        return {
          url: `/pet/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllPetsQuery, useGetPetQuery } = petApi;

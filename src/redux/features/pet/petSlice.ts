import { TPet } from "@/globalInterface/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TQuery = {
  gender?: string;
  species?: string;
  size?: string;
  searchTerm?: string;
};
type TValue = {
  value: TPet[];
  all: TPet[];
  querys: TQuery;
};
const initialState: TValue = {
  value: [],
  all: [],
  querys: {},
};
// product slice
export const petSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storPetsData: (state, actions: PayloadAction<TPet[]>) => {
      state.value = actions.payload;
    },
    storPetsAllData: (state, actions: PayloadAction<TPet[]>) => {
      state.all = actions.payload;
    },
    setQuery: (state, actions) => {
      state.querys = actions.payload;
    },
  },
});
export const { storPetsData, storPetsAllData, setQuery } = petSlice.actions;
export default petSlice.reducer;

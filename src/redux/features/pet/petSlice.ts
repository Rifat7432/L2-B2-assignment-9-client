import { TPet } from "@/globalInterface/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TQuery = {
  gender?: string;
  special?: string;
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
    storProductsData: (state, actions: PayloadAction<TPet[]>) => {
      state.value = actions.payload;
    },
    storProductsAllData: (state, actions: PayloadAction<TPet[]>) => {
      state.all = actions.payload;
    },
    setQuery: (state, actions) => {
      state.querys = actions.payload;
    },
  },
});
export const { storProductsData, storProductsAllData, setQuery } =
  petSlice.actions;
export default petSlice.reducer;

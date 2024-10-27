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
  otherQuery: TQuery;
};
const initialState: TValue = {
  value: [],
  all: [],
  querys: {},
  otherQuery:{}
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
    setOtherQuery: (state, actions) => {
      state.otherQuery = actions.payload;
    },
  },
});
export const { storPetsData, storPetsAllData, setQuery ,setOtherQuery} = petSlice.actions;
export default petSlice.reducer;

import { TPet } from "@/globalInterface/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TValue = {
  allUserAdoptData: TPet[];
  allAdoptData: TPet[];
};
const initialState: TValue = {
  allUserAdoptData: [],
  allAdoptData: [],
};
// product slice
export const adoptSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storAllUserAdoptData: (state, actions: PayloadAction<TPet[]>) => {
      state.allUserAdoptData = actions.payload;
    },
    storAllAdoptData: (state, actions: PayloadAction<TPet[]>) => {
      state.allAdoptData = actions.payload;
    },
  },
});
export const { storAllUserAdoptData, storAllAdoptData } = adoptSlice.actions;
export default adoptSlice.reducer;

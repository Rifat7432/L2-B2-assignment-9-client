import { TAdopt } from "@/globalInterface/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TValue = {
  allUserAdoptData: TAdopt[];
  allAdoptData: TAdopt[];
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
    storAllUserAdoptData: (state, actions: PayloadAction<TAdopt[]>) => {
      state.allUserAdoptData = actions.payload;
    },
    storAllAdoptData: (state, actions: PayloadAction<TAdopt[]>) => {
      state.allAdoptData = actions.payload;
    },
  },
});
export const { storAllUserAdoptData, storAllAdoptData } = adoptSlice.actions;
export default adoptSlice.reducer;

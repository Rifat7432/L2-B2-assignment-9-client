import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  user: null;
  token: string | null;
  verify: boolean;
  loading: boolean;
};

const initialState: TInitialState = {
  user: null,
  token: null,
  verify: false,
  loading: false,
};
// authentication slice
export const authSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storUserData: (state, actions) => {
      state.user = actions.payload;
    },
    storToken: (state, actions) => {
      state.token = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    isVerify: (state, actions) => {
      state.verify = actions.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});
export const { storToken, storUserData, setLoading, isVerify, logOut } =
  authSlice.actions;
export default authSlice.reducer;

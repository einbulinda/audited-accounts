import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business: {},
};

export const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    createProfile: (state, payload) => {
      state.business = payload;
    },
  },
});

export const { createProfile } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;

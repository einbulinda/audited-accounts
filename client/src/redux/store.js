import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import companyProfileSlice from "./slices/companyProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    companyProfile: companyProfileSlice,
  },
});

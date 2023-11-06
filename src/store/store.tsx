import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import votPatientReducers from "../features/votPatients/votPatientSlice";


export const store = configureStore({
  reducer: {
    auth: authReducers,
    votPatientState: votPatientReducers
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

  
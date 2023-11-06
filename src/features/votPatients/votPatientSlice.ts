import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPatient } from "../patients/patientModel";
import { AxiosError } from "axios";
import { addPatient, getVotPatient } from "./votPatientApi";
import { notifySuccess } from "../../utils/toast";

export interface VOTPatientState {
  patients: IPatient[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}
const initialState: VOTPatientState = {
  patients: [],
  loading: "idle",
  error: "",
};

export const getVotPatientList = createAsyncThunk(
  "patient/getVotPatientList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getVotPatient();
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message !== ""
        ) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const saveVOTPatient = createAsyncThunk(
  "patient/saveVOTPatient",
  async (patient: IPatient, { rejectWithValue }) => {
    try {
      const obj = { ...patient, vot: patient.vot == "Yes" ? true : false };
      const { data } = await addPatient(obj);
      notifySuccess(data.response.message);
      return patient;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message !== ""
        ) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
      else {
        return rejectWithValue(error.message);
      }
    }
  }
);



const votPatientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveVOTPatient.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(saveVOTPatient.fulfilled, (state, action) => {
      state.patients = [...state.patients, action.payload as IPatient];
      state.loading = "succeeded";
    });
    builder.addCase(saveVOTPatient.rejected, (state, action) => {
      state.error = action.error.message!;
      state.loading = "failed";
    });
    builder.addCase(getVotPatientList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getVotPatientList.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getVotPatientList.rejected, (state, action) => {
      state.error = action.error.message!;
      state.loading = "failed";
    });
  },
});

export default votPatientsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "./authApi";
import { notify } from "../../utils/toast";
import { AxiosError } from "axios";

export interface AuthState {
  isAuthenticated: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}

interface LoginUser {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated:  sessionStorage.getItem('isAuthenticated') === 'true' ? true : false,
  loading: 'idle',
  error: ""
}

export const authenticated = createAsyncThunk(
  "auth/login",
  async ({ username, password, }: LoginUser, { rejectWithValue }) => {
    try {
      const { data } = await loginApi({username, password});
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("token", data.data.token);
      sessionStorage.setItem("userid", data.data.userid);
    } catch (error) {
      if (error instanceof AxiosError)  {
        if (error.response && error.response.data && error.response.data.message !== "") {
          notify(error.response.data.message);
          return rejectWithValue(error.response.data.message);
        } else {
          notify(error.message);
          return rejectWithValue(error.message);
        }
       
      }
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
        sessionStorage.clear();
        state.isAuthenticated = false;
        state.loading = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authenticated.pending, (state) => {
        state.loading = 'pending';
    }),
    builder.addCase(authenticated.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = 'succeeded';
    }),
    builder.addCase(authenticated.rejected, (state) => {
      console.log('heaasdfsadf')
      state.isAuthenticated = false;
      state.error = 'Login failed';
      state.loading = 'failed';
    })
  }
});

export const getPostsStatus = (state: AuthState) => state.isAuthenticated;

export const { logout } = authSlice.actions;

export default authSlice.reducer;

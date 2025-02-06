import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

export const login = createAsyncThunk(
  'user/login',
  async (body: any) => {
    localStorage.setItem("isAuthenticated", "true");
    const response = await axios.post<any>('/api/auth/login', body);
    return response.data;
  }
);

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(login.pending, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
      })
  },
});

export const { setAuth, logout } = userReducer.actions;
export default userReducer.reducer;

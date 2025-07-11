import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  registerSuccess: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : undefined,
};

export const login = createAsyncThunk("user/login", async (body: any) => {
  localStorage.setItem("isAuthenticated", "true");
  const response = await axiosClient.post<any>("/api/auth/login-admin", body);
  return response.data;
});

export const register = createAsyncThunk("user/register", async (body: any) => {
  const response = await axiosClient.post<any>("/api/auth/register", body);
  return response.data;
});

export const chatBot = createAsyncThunk("user/chat_bot", async (body: any) => {
  const response = await axiosClient.post<any>("/api/chatbot", body);
  return response.data;
});

export const getUserInfo = createAsyncThunk(
  "user/userInfo",
  async (body: any) => {
    localStorage.setItem("isAuthenticated", "true");
    const response = await axiosClient.post<any>("/api/auth/user-info", body);
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
      state.userInfo = undefined;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userInfo");
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
      .addCase(register.fulfilled, (state, action) => {
        state.registerSuccess = true;
      })
      .addCase(register.pending, (state, action) => {
        state.registerSuccess = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerSuccess = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.userInfo = undefined;
        localStorage.removeItem("userInfo");
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.userInfo = undefined;
        localStorage.removeItem("userInfo");
      });
  },
});

export const { setAuth, logout } = userReducer.actions;
export default userReducer.reducer;

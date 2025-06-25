import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listPayment: [],
  totalPayment: 0,
  payment: undefined as any,
};

const apiSearchPayment = "/api/payment/search-payment";
const apiGetDetailPayemnt = "/api/payment/get-detail-payment";

export const searchPayment = createAsyncThunk(
  "payment/searchPayment",
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchPayment}?${query}`;
    const response = await axiosClient.post<any>(requestUrl, bodyRep);
    return response;
  }
);

export const getDetailPayemnt = createAsyncThunk(
  "payment/getDetailPayemnt",
  async (id: string) => {
    const requestUrl = `${apiGetDetailPayemnt}/${id}`;
    const response = await axiosClient.get<any>(requestUrl);
    return response;
  }
);

const paymentReducer = createSlice({
  name: "paymentReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.payment = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPayment.fulfilled, (state, action) => {
        state.listPayment = action.payload.data;
        state.totalPayment = action.payload.headers
          ? parseInt(action.payload.headers["x-total-count"], 10) || 0
          : 0;
      })
      .addCase(getDetailPayemnt.fulfilled, (state, action) => {
        state.payment = action.payload.data;
      });
  },
});

export const { resetState } = paymentReducer.actions;

export default paymentReducer.reducer;

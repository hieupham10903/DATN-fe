import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit/react";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listWarehouse: [],
  totalWarehouse: 0,
  warehouse: undefined,
  updateSuccess: false,
};

const apiSearchWarehouse = "/api/search-warehouse";
const apiCreateWarehouse = "/api/create-warehouse";
const apiUpdateWarehouse = "/api/update-warehouse";
const apiDeleteWarehouse = "/api/delete-warehouse";

export const searchWarehouse = createAsyncThunk(
  "warehouse/searchWarehouse",
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchWarehouse}?${query}`;
    const response = await axiosClient.post<any>(requestUrl, bodyRep);
    return response;
  }
);

export const createWarehouse = createAsyncThunk(
  "warehouse/createWarehouse",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreateWarehouse, body);
    return response;
  }
);

export const updateWarehouse = createAsyncThunk(
  "warehouse/updateWarehouse",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiUpdateWarehouse, body);
    return response;
  }
);

export const deleteWarehouse = createAsyncThunk(
  "warehouse/deleteWarehouse",
  async (id: string) => {
    const response = await axiosClient.post<any>(
      `${apiDeleteWarehouse}?id=${id}`
    );
    return response;
  }
);

const warehouseReducer = createSlice({
  name: "warehouseReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.updateSuccess = false;
      state.warehouse = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWarehouse.fulfilled, (state, action) => {
        state.listWarehouse = action.payload.data;
        state.totalWarehouse = action.payload.headers
          ? parseInt(action.payload.headers["x-total-count"], 10) || 0
          : 0;
      })
      .addMatcher(
        isFulfilled(createWarehouse, updateWarehouse, deleteWarehouse),
        (state) => {
          state.updateSuccess = true;
        }
      )
      .addMatcher(
        isPending(createWarehouse, updateWarehouse, deleteWarehouse),
        (state) => {
          state.updateSuccess = false;
        }
      )
      .addMatcher(
        isRejected(createWarehouse, updateWarehouse, deleteWarehouse),
        (state) => {
          state.updateSuccess = false;
        }
      );
  },
});

export const { resetState } = warehouseReducer.actions;

export default warehouseReducer.reducer;

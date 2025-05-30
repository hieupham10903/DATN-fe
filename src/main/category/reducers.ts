import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit/react";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listCategory: [],
  totalCategory: 0,
  category: undefined,
  updateSuccess: false,
};

const apiSearchCategory = "/api/search-category";
const apiCreateCategory = "/api/create-category";
const apiUpdateCategory = "/api/update-category";
const apiDeleteCategory = "/api/delete-category";

export const searchCategory = createAsyncThunk(
  "category/searchCategory",
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchCategory}?${query}`;
    const response = await axiosClient.post<any>(requestUrl, bodyRep);
    return response;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreateCategory, body);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiUpdateCategory, body);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string) => {
    const response = await axiosClient.get<any>(
      `${apiDeleteCategory}?id=${id}`
    );
    return response;
  }
);

const categoryReducer = createSlice({
  name: "categoryReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.updateSuccess = false;
      state.category = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.listCategory = action.payload.data;
        state.totalCategory = action.payload.headers
          ? parseInt(action.payload.headers["x-total-count"], 10) || 0
          : 0;
      })
      .addMatcher(
        isFulfilled(createCategory, updateCategory, deleteCategory),
        (state) => {
          state.updateSuccess = true;
        }
      )
      .addMatcher(
        isPending(createCategory, updateCategory, deleteCategory),
        (state) => {
          state.updateSuccess = false;
        }
      )
      .addMatcher(
        isRejected(createCategory, updateCategory, deleteCategory),
        (state) => {
          state.updateSuccess = false;
        }
      );
  },
});

export const { resetState } = categoryReducer.actions;

export default categoryReducer.reducer;

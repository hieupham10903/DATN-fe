import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listEmployee: [],
  totalEmployee: 0,
  employee: undefined as any,
  error: null,
  updateSuccess: false,
};

const apiSearchEmployee = "/api/search-employee";
const apiCreateEmployee = "/api/create-employee";
const apiUpdateEmployee = "/api/update-employee";
const apiDeleteEmployee = "/api/delete-employee";
const apiGetDetailEmployee = "/api/get-employee-by-id";

export const searchEmployee = createAsyncThunk(
  "employee/searchEmployee",
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchEmployee}?${query}`;
    const response = await axiosClient.post<any>(requestUrl, bodyRep);
    return response;
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreateEmployee, body);
    return response;
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiUpdateEmployee, body);
    return response;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: string) => {
    const response = await axiosClient.post<any>(
      `${apiDeleteEmployee}?id=${id}`
    );
    return response;
  }
);

export const getDetailEmployee = createAsyncThunk(
  "employee/getDetailEmployee",
  async (id: string) => {
    const response = await axiosClient.post<any>(
      `${apiGetDetailEmployee}?id=${id}`
    );
    return response;
  }
);

const employeeReducer = createSlice({
  name: "employeeReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.listEmployee = action.payload.data;
        state.totalEmployee = action.payload.headers
          ? parseInt(action.payload.headers["x-total-count"], 10) || 0
          : 0;
      })
      .addCase(getDetailEmployee.fulfilled, (state, action) => {
        state.employee = action.payload.data;
      })
      .addMatcher(
        isFulfilled(createEmployee, updateEmployee, deleteEmployee),
        (state) => {
          state.updateSuccess = true;
        }
      )
      .addMatcher(
        isPending(createEmployee, updateEmployee, deleteEmployee),
        (state) => {
          state.updateSuccess = false;
        }
      )
      .addMatcher(
        isRejected(createEmployee, updateEmployee, deleteEmployee),
        (state) => {
          state.updateSuccess = false;
        }
      );
  },
});

export default employeeReducer.reducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "http://localhost:8080/api";

const initialState = {
  listEmployee: [],
  totalEmployee: 0,
  employee: undefined,
  loading: false,
  error: null,
};

const apiSearchEmployee = '/api/search-employee';

export const searchEmployee = createAsyncThunk(
  'employee/searchEmployee',
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchEmployee}?${query}`;
    const response = await axios.post<any>(requestUrl, bodyRep);
    return response;
  });

export const getEmployeeById = createAsyncThunk(
  'employee/getEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/get-employee-by-id`, { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create-employee`, employee);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/update-employee`, employee);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeReducer = createSlice({
  name: 'employeeReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.listEmployee = action.payload.data;
        state.totalEmployee = action.payload.headers
          ? parseInt(action.payload.headers['x-total-count'], 10) || 0
          : 0;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
  },
});

export default employeeReducer.reducer;

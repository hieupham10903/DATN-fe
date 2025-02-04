import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "http://localhost:8080/api";

const initialState = {
  employees: [],
  employee: undefined,
  loading: false,
  error: null,
};

export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async () => {
    const response = await axios.post('/api/get-all-employee');  
    return response.data;
  }
);

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
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
  },
});

export default employeeReducer.reducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "http://localhost:8080/api";

const initialState = {
  listEmployee: [],
  totalEmployee: 0,
  employee: undefined,
  error: null,
  updateSuccess : false,
};

const apiSearchEmployee = '/api/search-employee';
const apiCreateEmployee = '/api/create-employee';

export const searchEmployee = createAsyncThunk(
  'employee/searchEmployee',
  async ({ query, bodyRep }: any) => {
    const requestUrl = `${apiSearchEmployee}?${query}`;
    const response = await axios.post<any>(requestUrl, bodyRep);
    return response;
  });

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (body : any) => {
    const response = await axios.post<any>(apiCreateEmployee, body);
    return response;
  });

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
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.updateSuccess = true;
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.updateSuccess = false;
      })
  },
});

export default employeeReducer.reducer;

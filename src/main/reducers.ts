import employeeReducer from '../main/employee/reducers.ts'; 
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../main/employee/reducers.ts";
import userReducer from "../main/login/reducers.ts";
import productReducer from "../main/product/reducers.ts";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

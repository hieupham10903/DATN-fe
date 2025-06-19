import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../main/category/reducers.ts";
import employeeReducer from "../main/employee/reducers.ts";
import userReducer from "../main/login/reducers.ts";
import paymentReducer from "../main/payment/reducers.ts";
import productReducer from "../main/product/reducers.ts";
import warehouseReducer from "../main/warehouse/reducers.ts";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    warehouse: warehouseReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

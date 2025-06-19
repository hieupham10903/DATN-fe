import { Provider } from "react-redux";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./main/category/category-list.tsx";
import EmployeeList from "./main/employee/employee-list.tsx";
import HomePage from "./main/home/homepage.tsx";
import UserHook from "./main/login/index.ts";
import Login from "./main/login/login-form.tsx";
import PaymentList from "./main/payment/payment-list.tsx";
import ProductList from "./main/product/product-list.tsx";
import { store } from "./main/reducers.ts";
import WarehouseList from "./main/warehouse/warehouse-list.tsx";
import MainLayout from "./MainLayout.js";
import "./styles.scss";

const App = () => {
  const { isAuthenticated, userInfo } = UserHook();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated || !userInfo) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const AdminRoute = ({ children, userInfo }) => {
  if (!userInfo || userInfo.role !== "ADMIN") {
    toast.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }
  return children;
};

  const MainLayoutWrapper = () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayoutWrapper />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />

            <Route
              path="/employee-list"
              element={
                <AdminRoute userInfo={userInfo}>
                  <EmployeeList />
                </AdminRoute>
              }
            />

            <Route path="/product-list" element={<ProductList />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/warehouse-list" element={<WarehouseList />} />
            <Route path="/payment-list" element={<PaymentList />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
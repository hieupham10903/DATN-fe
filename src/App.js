import { Provider } from "react-redux";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./main/category/category-list.tsx";
import EmployeeList from "./main/employee/employee-list.tsx";
import HomePage from "./main/home/homepage.tsx";
import UserHook from "./main/login/index.ts";
import Login from "./main/login/login-form.tsx";
import ProductList from "./main/product/product-list.tsx";
import { store } from "./main/reducers.ts";
import MainLayout from "./MainLayout.js";
import "./styles.scss";

const App = () => {
  const { isAuthenticated } = UserHook();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
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
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/category-list" element={<CategoryList />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
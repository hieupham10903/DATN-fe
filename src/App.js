import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./main/reducers.ts";
import EmployeeList from "./main/employee/employee-list.tsx";
import HomePage from "./main/home/homepage.tsx";
import MainLayout from "./MainLayout.js";
import "./styles.scss";
import UserHook from "./main/login/index.ts";
import Login from "./main/login/login-form.tsx";

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
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
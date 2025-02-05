import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./main/reducers.ts";
import EmployeeList from "./main/employee/employee-list.tsx";
import HomePage from "./main/home/homepage.tsx";
import MainLayout from "./MainLayout.js";
import "./styles.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employee-list" element={<EmployeeList />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;

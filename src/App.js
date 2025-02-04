import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './main/reducers.ts';
import EmployeeList from './main/employee/employee-list.tsx';
import HomePage from './main/home/homepage.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

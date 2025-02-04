import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Trang chủ</h1>
      <Link to="/employee-list">
        <button>Đi đến danh sách nhân viên</button>
      </Link>
    </div>
  );
};

export default HomePage;

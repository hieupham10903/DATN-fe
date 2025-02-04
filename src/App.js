import React from 'react';
import './App.css';
import { Button, DatePicker } from 'antd';

function App() {
  return (
    <div className="App">
      <h1>React with Ant Design</h1>
      <Button type="primary">Click me</Button>
      <DatePicker />
    </div>
  );
}

export default App;

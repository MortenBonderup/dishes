import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ResultPage from './pages/ResultPage';
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;

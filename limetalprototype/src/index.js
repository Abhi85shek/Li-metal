import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {RecoilRoot} from "recoil";
import App from './App';
import AddService from './Pages/AddService';
import AllProducts from './Pages/AllProducts';
import Suppliers from './Pages/Suppliers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/createOrder" element={<AddService />} />
      <Route path="/supplier" element={<Suppliers />} />
      <Route path='/allProducts' element={<AllProducts />} />
    </Routes>
  </BrowserRouter>
  </RecoilRoot>
  </React.StrictMode>
);



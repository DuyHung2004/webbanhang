import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/users/homePage';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import './style/style.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <RouterCustom/>
      <ToastContainer autoClose={2000} position="top-right" />
  </BrowserRouter>
);
import { CssBaseline } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Auth from "./pages/auth";
import Home from './pages/home/Home';


function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className='app'>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={isAuth ? <Home /> : <Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
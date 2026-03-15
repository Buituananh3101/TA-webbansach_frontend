import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/navbar';
import Footer from './layouts/header-footer/footer';
import HomePage from './layouts/homepage-components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';


function App() {

  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />

        <Routes>
          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/about' element={<About/>}/>

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

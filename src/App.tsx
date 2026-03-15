import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/navbar';
import Footer from './layouts/header-footer/footer';
import HomePage from './layouts/homepage-components/HomePage';
import { BrowserRouter } from 'react-router-dom';


function App() {

  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');


  return (
    <div className="App">
      <BrowserRouter/>
      <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem}/>
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>
      <Footer/>
      
    </div>
  );
}

export default App;

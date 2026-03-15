import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/navbar';
import Footer from './layouts/header-footer/footer';
import HomePage from './layouts/homepage-components/HomePage';


function App() {

  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');


  return (
    <div className="App">

      <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem}/>
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>
      <Footer/>
      
    </div>
  );
}

export default App;

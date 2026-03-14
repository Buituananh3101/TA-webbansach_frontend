import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/navbar';
import Footer from './layouts/header-footer/footer';
import HomePage from './layouts/homepage-components/HomePage';
import { layToanBoSach } from './api/SachAPI';
import DanhSachSanPham from './layouts/product/DanhSachSanPham';

function App() {

  layToanBoSach().then().catch();


  return (
    <div className="App">

      <Navbar/>
      <HomePage/>
      <Footer/>
      
    </div>
  );
}

export default App;

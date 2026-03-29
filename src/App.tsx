import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/navbar';
import Footer from './layouts/header-footer/footer';
import HomePage from './layouts/homepage-components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTIetSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import SachForm from './layouts/admin/SachForm';
import SachForm_Admin from './layouts/admin/SachForm';
import XoaSach_Admin from './layouts/admin/XoaSach'; //123
import SuaSach_Admin from './layouts/admin/SuaSach'; //123


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
          <Route path='/sach/:maSach' element={<ChiTIetSanPham />} />
          <Route path='/dang-ky' element={<DangKyNguoiDung />} />
          <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
          <Route path='/dang-nhap' element={<DangNhap />} />
          <Route path='/test' element={<Test />} />
          <Route path='/admin/sach-form' element={<SachForm_Admin />} />
          <Route path='/admin/xoa-sach' element={<XoaSach_Admin />} /> {/*//123XoaSach*/}
          <Route path='/admin/sua-sach' element={<SuaSach_Admin />} /> {/*//123SuaSach*/}

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

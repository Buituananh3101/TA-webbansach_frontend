import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps{
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string)=>void;
}

function Navbar({tuKhoaTimKiem, setTuKhoaTimKiem}: NavbarProps) {
    
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');


    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>)=>{ // Khi nhập
        setTuKhoaTamThoi(e.target.value);
    }
    const handleSearch = () => { //khi click chuột
        setTuKhoaTimKiem(tuKhoaTamThoi);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
            <div className="container-fluid px-4">
                {/* Logo / Brand */}
                <Link className="navbar-brand fs-4 me-4" to="/">Bookstore</Link>

                {/* Nút Toggle (Sẽ luôn nằm gọn ở bên phải nhờ container-fluid) */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* BỌC TẤT CẢ VÀO TRONG COLLAPSE */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    {/* Các menu bên trái */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center text-lg-start">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/0">Tất cả</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/1">Tiểu thuyết</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/2">Sách giáo khoa</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/3">Sách giáo </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/4">Sách </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/5">Sách </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/6">Sách </NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Chính sách đổi trả</a></li>
                                <li><a className="dropdown-item" href="#">Phương thức thanh toán</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">Về Bookstore</NavLink>
                        </li>
                    </ul>

                    {/* Tìm kiếm (Thêm mb-3 trên mobile, mb-lg-0 trên PC) */}
                    <div className="d-flex mb-3 mb-lg-0 me-lg-4">
                        <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tuKhoaTamThoi} />
                        <button className="btn btn-outline-success" type="button" onClick={handleSearch}><Search/></button>
                    </div>

                    {/* Biểu tượng giỏ hàng & đăng nhập (Gộp chung để nằm ngang trên mobile) */}
                    <ul className="navbar-nav d-flex flex-row justify-content-center justify-content-lg-end gap-4">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-shopping-cart fs-5"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dang-nhap">
                                <i className="fas fa-user fs-5"></i>
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
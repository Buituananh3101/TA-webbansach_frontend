import React, { ChangeEvent, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { layTongSoLuongGioHang } from "../../utils/GioHangUtils"; //123GioHang

interface NavbarProps{
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string)=>void;
}

function Navbar({tuKhoaTimKiem, setTuKhoaTimKiem}: NavbarProps) {
    
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const [daDangNhap, setDaDangNhap] = useState(false);
    const [tenDangNhap, setTenDangNhap] = useState('');
    const navigate = useNavigate();

    //123GioHang - State và listener giỏ hàng
    const [tongSoLuong, setTongSoLuong] = useState(0);
    useEffect(() => {
        setTongSoLuong(layTongSoLuongGioHang());
        const handleGioHangThayDoi = () => setTongSoLuong(layTongSoLuongGioHang());
        window.addEventListener("gioHangUpdated", handleGioHangThayDoi);
        return () => window.removeEventListener("gioHangUpdated", handleGioHangThayDoi);
    }, []);

    // Kiểm tra trạng thái đăng nhập từ token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                // Kiểm tra token còn hạn không
                if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                    setDaDangNhap(true);
                    setTenDangNhap(decoded.sub || 'Tài khoản');
                } else {
                    // Token hết hạn → tự xóa
                    localStorage.removeItem("token");
                }
            } catch {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const handleDangXuat = () => {
        localStorage.removeItem("token");
        setDaDangNhap(false);
        setTenDangNhap('');
        navigate('/dang-nhap');
    };

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
                                <li><NavLink className="dropdown-item" to="/0">Tất cả sách</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/1">Lập trình & CNTT</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/2">Lịch sử - Chính trị</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/3">Ngoại ngữ</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/4">Giáo trình Đại học </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/5">Tuấn Anh làm sao ạ </NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/chinh-sach-doi-tra">Chính sách đổi trả</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/phuong-thuc-thanh-toan">Phương thức thanh toán</NavLink></li>
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

                    {/* Giỏ hàng & Tài khoản */}
                    <ul className="navbar-nav d-flex flex-row justify-content-center justify-content-lg-end align-items-center gap-3">
                        <li className="nav-item">
                            {/* //123GioHang */}
                            <NavLink className="nav-link position-relative" to="/gio-hang" style={{ marginTop: '5px' }}>
                                <i className="fas fa-shopping-cart fs-5"></i>
                                {tongSoLuong > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                                        {tongSoLuong}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                        {daDangNhap ? (
                            /* Dropdown tài khoản khi đã đăng nhập */
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-user-circle fs-5"></i>
                                    <span className="d-none d-lg-inline" style={{ fontSize: '0.9rem' }}>{tenDangNhap}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <span className="dropdown-item-text text-muted small">
                                            Xin chào, <strong>{tenDangNhap}</strong>!
                                        </span>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger fw-semibold" onClick={handleDangXuat}>
                                            <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            /* Nút đăng nhập khi chưa đăng nhập */
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dang-nhap">
                                    <i className="fas fa-user fs-5"></i>
                                </NavLink>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
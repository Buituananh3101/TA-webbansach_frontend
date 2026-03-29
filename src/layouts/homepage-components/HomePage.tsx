import React, { useEffect, useState } from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface HomePageProps{
    tuKhoaTimKiem: string;
}


function HomePage({tuKhoaTimKiem}: HomePageProps){

    const {maTheLoai} = useParams();
    let maTheLoaiNumber=0;

    try{
        maTheLoaiNumber = parseInt(maTheLoai+'');//object->string->int // NaN
    }catch(error){
        maTheLoaiNumber=0;
        console.error(error);
    }
    if(Number.isNaN(maTheLoaiNumber)){
        maTheLoaiNumber=0;
    }

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setIsAdmin(decoded.isAdmin);
            } catch (error) {
                console.error("Lỗi JWT:", error);
            }
        }
    }, []);

    return(
        <div style={{ paddingBottom: isAdmin ? '2rem' : '0' }}>
            <Carousel/>
            <Banner/>
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber}/>

            {/* Admin Controls - KHU VỰC CUỐI TRANG CHỦ */}
            {isAdmin && (
                <div className="container mt-4 mb-5 p-4 bg-warning bg-opacity-10 border border-warning rounded-4 shadow-sm" style={{ zIndex: 10 }}>
                    <div className="text-center mb-4">
                        <h4 className="text-warning-emphasis mb-1"><i className="bi bi-shield-lock-fill me-2"></i>Quản lí</h4>
                        <div className="text-muted small">User đừng nhìn thấy, User đừng nhìn thấy, User đừng nhìn thấy .</div>
                    </div>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button className="btn btn-outline-success fw-bold px-4 py-2 rounded-pill shadow-sm" onClick={() => navigate('/admin/sach-form')}>
                            <i className="bi bi-plus-circle me-2"></i>Thêm Sách Mới
                        </button>
                        <button className="btn btn-warning text-dark fw-bold px-4 py-2 rounded-pill shadow-sm" onClick={() => navigate('/admin/sua-sach')}>
                            <i className="bi bi-pencil-square me-2"></i>Quản lý Sửa thông tin Sách
                        </button>
                        <button className="btn btn-outline-danger fw-bold px-4 py-2 rounded-pill shadow-sm" onClick={() => navigate('/admin/xoa-sach')}>
                            <i className="bi bi-trash me-2"></i>Quản lý Xóa Sách
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage;
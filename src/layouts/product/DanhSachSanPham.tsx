import React, { useEffect, useState } from "react";
import SachModel from "../../model/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { Pagination } from "../utils/pagination";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
}

function DanhSachSanPham({ tuKhoaTimKiem }: DanhSachSanPhamProps) {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    // THÊM MỚI Ở ĐÂY: Reset về trang 1 mỗi khi đổi từ khóa tìm kiếm
    useEffect(() => {
        setTrangHienTai(1);
    }, [tuKhoaTimKiem]);

    useEffect(() => {
        if (tuKhoaTimKiem.trim() === '') {
            layToanBoSach(trangHienTai - 1).then( 
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                }
            );
        } else {
            // SỬA Ở ĐÂY: Truyền thêm (trangHienTai - 1) vào hàm timKiemSach
            timKiemSach(tuKhoaTimKiem, trangHienTai - 1).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                }
            );
        }

    }, [trangHienTai, tuKhoaTimKiem] 
    )

    const phanTrang = (trangMoi: number) => setTrangHienTai(trangMoi);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        )
    }

    if (danhSachQuyenSach.length === 0) {
        return (
            <div className="container">
                <div className="row mt-4 mb-4 text-center">
                    <h1>:v Sách bạn cần chúng tôi không có</h1>
                </div>
            </div>
        );
    }

    return (

        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map(sach => (
                        <SachProps key={sach.maSach} sach={sach} />
                    ))
                }
            </div>
            <Pagination trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
}

export default DanhSachSanPham;
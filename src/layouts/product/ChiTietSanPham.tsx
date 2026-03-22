import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parse } from "path";
import SachModel from "../../model/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import DinhDangSo from "../utils/DinhDangSo";

const ChiTietSanPham: React.FC = () => {

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Lấy mã sách từ URL 

    const { maSach } = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber)) maSachNumber = 0;
    } catch (error) {
        maSachNumber = 0;
        console.error("Error", error);
    }

    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Nút số lượng

    const [soLuong, setSoLuong] = useState(1);
    const tangSoLuong = () => {
        const soLuonghienTai = sach?.soLuong ?? 0;
        if (soLuong < soLuonghienTai) {
            setSoLuong(soLuong + 1);
        }
    }
    const giamSoLuong = () => { if (soLuong > 1) setSoLuong(soLuong - 1); }
    const handleSoLuongThayDoi = (event: React.ChangeEvent<HTMLInputElement>) => {
        const giaTri = parseInt(event.target.value);
        const soLuongToiDa = sach?.soLuong ?? 0;

        if (!isNaN(giaTri) && giaTri >= 1 && giaTri <= soLuongToiDa) {
            setSoLuong(giaTri);
        } else if (giaTri > soLuongToiDa) {
            setSoLuong(soLuongToiDa);
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Mua ngay & thêm vào giỏ hàng

    const handleMuaNgay = () => {
    }

    const handleThemVaoGioHang = () => {
    }


    //-----------------------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        laySachTheoMaSach(maSachNumber)
            .then(
                (sach) => {
                    setSach(sach);
                    setDangTaiDuLieu(false);
                }
            )
            .catch(
                (error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                }
            );
    }, [maSach]
    )


    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Bắt lỗi

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

    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        )
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------
    return (
        <div className="container text-start">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber} />
                </div>
                <div className="col-8">
                    <div className="row text-start">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach}
                            </h1>
                            <h4>
                                {renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
                            </h4>
                            <h4>
                                {DinhDangSo(sach.giaBan ? sach.giaBan : 0)} đ
                            </h4>
                            <hr />
                            <div dangerouslySetInnerHTML={{ __html: (sach.thongTinChiTiet + '') }} />

                            <hr />
                        </div>
                        <div className="col-4">
                            {/* PHẦN ĐẶT HÀNG */}
                            <div>
                                <div className="mb-2">Số lượng</div>
                                <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
                                    <button className="btn btn-outline-secondary" onClick={giamSoLuong}>-</button>
                                    <input className="form-control text-center" value={soLuong} onChange={handleSoLuongThayDoi} />
                                    <button className="btn btn-outline-secondary" onClick={tangSoLuong}>+</button>
                                </div>
                                {
                                    sach.giaBan && (
                                        <div className="mt-2">
                                            <div>Tạm tính</div>
                                            <strong style={{ fontSize: '24px' }}>{DinhDangSo(soLuong * sach.giaBan)} đ</strong>
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-danger" type="button" onClick={handleMuaNgay}>Mua ngay</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={handleThemVaoGioHang}>
                                        <i className="fas fa-shopping-cart me-2"></i>Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                {/* PHẦN REVIEW */}
                <DanhGiaSanPham maSach={maSachNumber} />
            </div>
        </div>
    );
    

}
export default ChiTietSanPham;
import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parse } from "path";
import SachModel from "../../model/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";

const ChiTietSanPham: React.FC = () => {

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

    return (
        <div className="container text-start">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber}/>
                </div>
                <div className="col-8">
                    <div className="row text-start">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach}
                            </h1>
                            <h4>
                                {sach.trungBinhXepHang}
                            </h4>
                            <h4>
                                {sach.giaBan}
                            </h4>
                            <hr />
                                <div dangerouslySetInnerHTML={{__html:(sach.+'')}}/>
                                
                            <hr />
                        </div>
                        <div className="col-4">
                            PHẦN ĐẶT HÀNG
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                {/* PHẦN REVIEW */}
                <DanhGiaSanPham maSach={maSachNumber}/>
            </div>
        </div>
    );


}
export default ChiTietSanPham;
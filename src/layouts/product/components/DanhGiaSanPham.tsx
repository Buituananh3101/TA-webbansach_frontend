import React, { useEffect, useState } from "react";
import SachModel from "../../../model/SachModel";
import HinhAnhModel from "../../../model/HinhAnhModel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/SuDanhGiaAPI";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SuDanhGiaModel from "../../../model/SuDanhGiaModel";

interface DanhGiaSanPham {
    maSach: number;
}


const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;


    const [danhSachDanhGia, setDanhSachDanhGia] = useState<SuDanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSachDanhGia => {
                setDanhSachDanhGia(danhSachDanhGia);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            }
        );
    }, [] // Chỉ gọi một lần
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


    return (
        <div className="container">
            <h2>Đánh giá sản phẩm</h2>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="row" >
                        <div className="col-4 text-end">
                            <h3>{danhGia.diemXepHang}</h3>
                        </div>
                        <div className="col-8 text-start">
                            <p>{danhGia.nhanXet}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default DanhGiaSanPham;   
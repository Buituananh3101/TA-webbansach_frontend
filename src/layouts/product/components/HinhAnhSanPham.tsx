import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../../model/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // css cho carousel 


interface HinhAnhSanPham {
    maSach: number;
}


const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;


    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            danhSach => {
                setDanhSachAnh(danhSach);
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
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showThumbs={true} useKeyboardArrows={true} infiniteLoop={true} autoPlay={true}>
                    {
                        danhSachAnh.map((hinhAnh, index)=>(
                            <div key={index}>
                                <img src={hinhAnh.duLieuAnh} alt={hinhAnh.tenHinhAnh} style={{maxWidth: "250px"}} />
                            </div>
                        ))
                    }
                </Carousel>

            </div>
        </div>
    );
}

export default HinhAnhSanPham;   
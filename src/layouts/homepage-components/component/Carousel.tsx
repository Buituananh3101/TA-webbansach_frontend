import React, { useEffect, useState } from "react";
import SachModel from "../../../model/SachModel";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay3SachMoiNhat().then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);
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

    // Đề phòng trường hợp API trả về mảng rỗng
    if (!danhSachQuyenSach || danhSachQuyenSach.length === 0) {
        return <div>Không có dữ liệu sách.</div>;
    }

    return (
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                {/* Item 1 */}
                <div className="carousel-item active" data-bs-interval="10000">
                    <CarouselItem key={0} sach={danhSachQuyenSach[0]} />
                </div>
                
                {/* Item 2 */}
                <div className="carousel-item">
                    <CarouselItem key={1} sach={danhSachQuyenSach[1]} />
                </div>

                {/* Item 3 */}
                <div className="carousel-item">
                    <CarouselItem key={2} sach={danhSachQuyenSach[2]} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel;
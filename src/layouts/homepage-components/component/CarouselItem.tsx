import React, { useEffect, useState } from "react";
    import SachModel from "../../../model/SachModel";
    import HinhAnhModel from "../../../model/HinhAnhModel";
    import { lay1AnhCuaMotSach } from "../../../api/HinhAnhAPI";

    interface CarouselItemInterface{
        sach: SachModel;
    }

    const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

        const maSach: number= props.sach.maSach; 

        const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
        const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
        const [baoLoi,setBaoLoi] = useState<string | null>(null);

        useEffect(() => {
            lay1AnhCuaMotSach(maSach).then(
                hinhAnhData => {
                    setDanhSachAnh(hinhAnhData);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                }
            );
            }, []
        )


        if(dangTaiDuLieu){
            return(
                <div>  
                    <h1>Đang tải dữ liệu</h1>
                </div>
            )
        }

        if(baoLoi){
            return(
                <div>
                    <h1>Gặp lỗi: {baoLoi}</h1>
                </div>
            )
        }

        let duLieuAnh: string = "";
        if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
            duLieuAnh = danhSachAnh[0].duLieuAnh;
        }

        return (
            <div className="row align-items-center py-5" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Lớp nền mờ sử dụng chính ảnh của sách */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${duLieuAnh})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(50px) brightness(0.7)',
                    zIndex: -1
                }}></div>

                <div className="col-5 text-center">
                    <img src={duLieuAnh} className="float-end shadow-lg" alt={props.sach.tenSach} style={{ height: '250px', borderRadius: '8px' }} />
                </div>
                <div className="col-7 text-white">
                    <h5 className="display-6">{props.sach.tenSach}</h5>
                    <p className="lead">{props.sach.moTa}</p>
                </div>
            </div>
        )
    }

    export default CarouselItem;
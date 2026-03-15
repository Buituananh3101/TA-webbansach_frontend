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
            <div className="row align-items-center">
                <div className="col-5 text-center">
                    <img src={duLieuAnh} className="float-end" alt="..." style={{ height: '250px' }} />
                </div>
                <div className="col-7">
                    <h5>{props.sach.tenSach}</h5>
                    <p>{props.sach.moTa}</p>
                </div>
            </div>
        )
    }

    export default CarouselItem;
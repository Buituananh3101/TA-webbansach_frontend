import React, { useEffect, useState } from "react";
import SachModel from "../../model/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach } from "../../api/SachAPI";


const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setdanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi,setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoSach().then(
            sachData => {
                setdanhSachQuyenSach(sachData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            }
        );
        },[] // Chỉ gọi một lần
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

    return (

        <div className="container">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map(sach => (
                        <SachProps key={sach.maSach} sach={sach} />
                    ))
                }
            </div>
        </div>
    );
}

export default DanhSachSanPham;
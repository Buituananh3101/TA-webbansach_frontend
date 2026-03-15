import React, { useEffect, useState } from "react";
import SachModel from "../../model/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach } from "../../api/SachAPI";
import { Pagination } from "../utils/pagination";


const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi,setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(() => {
        layToanBoSach(trangHienTai-1).then( // Chúng ta đi từ 1, spring đi từ 0
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
        },[trangHienTai] // Chỉ gọi một lần
    )

    const phanTrang=(trangMoi: number)=>setTrangHienTai(trangMoi);


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
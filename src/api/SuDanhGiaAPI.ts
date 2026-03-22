import React  from "react";

import { my_request } from "./Request";
import SuDanhGiaModel from "../model/SuDanhGiaModel";

//--------------------------------------------------------------------------------------------------------------------------------------

export async function layDanhGiaCuaMotSach(duongDan:string): Promise<SuDanhGiaModel[]>{
    const ketQua:SuDanhGiaModel[]=[];

    // Gọi phương thức request
    const response= await my_request(duongDan)
   
    // Lấy ra json sach
    const responseData = response._embedded.suDanhGias;

    // Lấy từng quyển sách
    for(const key in responseData){
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,
            // maNguoiDung: responseData[key].maNguoiDung,
            // maSach: responseData[key].maSach,
            // maNguoiDung: 0,
            // maSach: 0,
        });
    }

    return ketQua;
}

//--------------------------------------------------------------------------------------------------------------------------------------

export async function layToanBoDanhGiaCuaMotSach(maSach:number): Promise<SuDanhGiaModel[]> {
    const ketQua:SuDanhGiaModel[]=[];
    const duongDan:string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;
    return layDanhGiaCuaMotSach(duongDan);
}

//--------------------------------------------------------------------------------------------------------------------------------------

export async function lay1DanhGiaCuaMotSach(maSach:number): Promise<SuDanhGiaModel[]> {
    const ketQua:SuDanhGiaModel[]=[];
    const duongDan:string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia,asc&page=0&size=1`;
    return layDanhGiaCuaMotSach(duongDan);
}

//--------------------------------------------------------------------------------------------------------------------------------------

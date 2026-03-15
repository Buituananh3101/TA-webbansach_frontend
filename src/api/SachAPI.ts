import React  from "react";

import SachModel from "../model/SachModel";
import { my_request } from "./Request";


/**
 * Hàm lấy danh sách toàn bộ sách từ API
 * 
 * export: Cho phép các file khác có thể import và sử dụng hàm này.
 * async: Khai báo hàm bất đồng bộ (vì việc gọi API cần thời gian chờ phản hồi).
 * Promise<SachModel[]>: Kiểu dữ liệu trả về là một "Lời hứa" sẽ trả về một mảng các đối tượng SachModel.
 */
async function laySach(duongDan:string): Promise<SachModel[]>{
    const ketQua:SachModel[]=[];

    // Gọi phương thức request
    const response= await my_request(duongDan)
   
    // Lấy ra json sach
    const responseData = response._embedded.saches;

    // Lấy từng quyển sách
    for(const key in responseData){
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            tenTacGia: responseData[key].tenTacGia,
            isbn: responseData[key].isbn,
            moTa: responseData[key].moTa,
            giaNiemYet: responseData[key].giaNiemYet,
            giaBan: responseData[key].giaBan,
            soLuong: responseData[key].soLuong,
            trungBinhXepHang: responseData[key].trungBinhXepHang
        });
    }

    return ketQua;
}


export async function layToanBoSach(): Promise<SachModel[]> {
    const duongDan:string = 'http://localhost:8080/sach?sort=maSach,desc';
    return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<SachModel[]> {
    const duongDan:string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    return laySach(duongDan);
}


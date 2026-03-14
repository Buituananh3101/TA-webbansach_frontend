import React  from "react";

import SachModel from "../model/SachModel";

// async: chờ cho đến khi data được phẩn hồi về thì thôi
async function request(duongDan:string) {
    // Truy vấn đến duongDan
    // fetch(duongDan): Gửi một yêu cầu (request) đến đường dẫn để lấy dữ liệu.
    // await: Tạm dừng việc thực thi hàm cho đến khi yêu cầu hoàn tất và nhận được phản hồi (response).
    const response = await fetch(duongDan); // truy cập đường dẫn và lấy thông tin về

    // Nếu bị lỗi
    if(!response.ok){
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

    // Lấy thành công
    // response.json(): Chuyển đổi phản hồi nhận được từ định dạng thô sang định dạng JSON (đối tượng JavaScript).
    // await: Đợi quá trình chuyển đổi dữ liệu hoàn tất.
    // const data = await response.json();
    const data = response.json();
    return data;

}

/**
 * Hàm lấy danh sách toàn bộ sách từ API
 * 
 * export: Cho phép các file khác có thể import và sử dụng hàm này.
 * async: Khai báo hàm bất đồng bộ (vì việc gọi API cần thời gian chờ phản hồi).
 * Promise<SachModel[]>: Kiểu dữ liệu trả về là một "Lời hứa" sẽ trả về một mảng các đối tượng SachModel.
 */
export async function layToanBoSach(): Promise<SachModel[]> {
    const ketQua:SachModel[]=[];

    // Xác định endpoint
    const duongDan:string = 'http://localhost:8080/sach';

    // Gọi phương thức request
    const response= await request(duongDan)
   
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
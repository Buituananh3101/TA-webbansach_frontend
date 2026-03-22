import React from "react";

import SachModel from "../model/SachModel";
import { my_request } from "./Request";

interface KetQuaInterface {
  ketQua: SachModel[];
  tongSoTrang: number;
  tongSoSach: number;
}
//--------------------------------------------------------------------------------------------------------------------------------------

/**
 * Hàm lấy danh sách toàn bộ sách từ API
 *
 * export: Cho phép các file khác có thể import và sử dụng hàm này.
 * async: Khai báo hàm bất đồng bộ (vì việc gọi API cần thời gian chờ phản hồi).
 * Promise<SachModel[]>: Kiểu dữ liệu trả về là một "Lời hứa" sẽ trả về một mảng các đối tượng SachModel.
 */
async function laySach(duongDan: string): Promise<KetQuaInterface> {
  const ketQua: SachModel[] = [];

  // Gọi phương thức request
  const response = await my_request(duongDan);

  // Lấy ra json sach
  const responseData = response._embedded.saches;

  // Lấy thông tin trang
  const tongSoTrang: number = response.page.totalPages;
  const tongSoSach: number = response.page.totalElements;

  // Lấy từng quyển sách
  for (const key in responseData) {
    ketQua.push({
      maSach: responseData[key].maSach,
      tenSach: responseData[key].tenSach,
      tenTacGia: responseData[key].tenTacGia,
      isbn: responseData[key].isbn,
      moTa: responseData[key].moTa,
      giaNiemYet: responseData[key].giaNiemYet,
      giaBan: responseData[key].giaBan,
      soLuong: responseData[key].soLuong,
      trungBinhXepHang: responseData[key].trungBinhXepHang,
    });
  }

  return { ketQua: ketQua, tongSoTrang: tongSoTrang, tongSoSach: tongSoSach };
}

//--------------------------------------------------------------------------------------------------------------------------------------

export async function layToanBoSach(
  trangHienTai: number,
): Promise<KetQuaInterface> {
  const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;
  return laySach(duongDan);
}

//--------------------------------------------------------------------------------------------------------------------------------------

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
  const duongDan: string =
    "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";
  return laySach(duongDan);
}

//--------------------------------------------------------------------------------------------------------------------------------------

// export async function timKiemSach(tuKhoaTimKiem: string, trangHienTai:number): Promise<KetQuaInterface> {
//     let duongDan:string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;
//     if(tuKhoaTimKiem!==''){
//     duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=${trangHienTai}&tenSach=${tuKhoaTimKiem}`;    }
//     return laySach(duongDan);
// }

//--------------------------------------------------------------------------------------------------------------------------------------

export async function timKiemSach(
  tuKhoaTimKiem: string,
  maTheLoai: number,
  trangHienTai: number,
): Promise<KetQuaInterface> {
  let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;

  if (tuKhoaTimKiem !== "" && maTheLoai == 0) {

    duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=${trangHienTai}&tenSach=${tuKhoaTimKiem}`;
  
  } else if (tuKhoaTimKiem === "" && maTheLoai > 0) {

    duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=${trangHienTai}&maTheLoai=${maTheLoai}`;
  
  } else if (tuKhoaTimKiem !== "" && maTheLoai > 0) {

    duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=${trangHienTai}&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`;
  
  }
  return laySach(duongDan);
}

//--------------------------------------------------------------------------------------------------------------------------------------

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null>{

  const duongDan: string = `http://localhost:8080/sach/${maSach}`;

  try {

    const response = await fetch(duongDan);


    if(!response.ok){
      throw new Error("Găp lỗi trong quá trình gọi API lấy sách");
    }

    const sachData = await response.json();

    if (sachData) {
      return {
        maSach: sachData.maSach,
        tenSach: sachData.tenSach,
        tenTacGia: sachData.tenTacGia,
        isbn: sachData.isbn,
        moTa: sachData.moTa,
        giaNiemYet: sachData.giaNiemYet,
        giaBan: sachData.giaBan,
        soLuong: sachData.soLuong,
        trungBinhXepHang: sachData.trungBinhXepHang,
      };

    } else {
      throw new Error("Sách không tồn tại");
    }

  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
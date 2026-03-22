import { execPath } from "process";

class SachModel{
    maSach: number;
    tenSach?: string; // ? là có thể null
    tenTacGia?: string;
    isbn?: string;
    moTa?: string;
    giaNiemYet?: number;
    giaBan?: number;
    soLuong?: number;
    trungBinhXepHang?: number;
    thongTinChiTiet?: string;


    constructor(
        maSach: number,
        tenSach?: string,
        tenTacGia?: string,
        isbn?: string,
        moTa?: string,
        giaNiemYet?: number,
        giaBan?: number,
        soLuong?: number,
        trungBinhXepHang?: number,
        thongTinChiTiet?: string
    ) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.tenTacGia = tenTacGia;
        this.isbn = isbn;
        this.moTa = moTa;
        this.giaNiemYet = giaNiemYet;
        this.giaBan = giaBan;
        this.soLuong = soLuong;
        this.trungBinhXepHang = trungBinhXepHang;
        this.thongTinChiTiet = thongTinChiTiet;
    }

}

export default SachModel;
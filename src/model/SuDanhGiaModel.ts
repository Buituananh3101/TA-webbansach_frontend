class SuDanhGiaModel{
    maDanhGia: number;
    diemXepHang?: number;
    nhanXet?: string;
    maNguoiDung?: number;
    maSach?: number;

    constructor(
        maDanhGia: number,
        diemXepHang?: number,
        nhanXet?: string,
        maNguoiDung?: number,
        maSach?: number
    ) {
        this.maDanhGia = maDanhGia;
        this.diemXepHang = diemXepHang;
        this.nhanXet = nhanXet;
        this.maNguoiDung = maNguoiDung;
        this.maSach = maSach;
    }



}


export default SuDanhGiaModel;
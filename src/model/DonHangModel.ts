class DonHangModel {
    maDonHang: number;
    ngayTao?: string;
    diaChiNhanHang?: string;
    tongTien?: number;
    tongTienChoPhep?: number;
    chiPhiGiaoHang?: number;
    chiPhiThanhToan?: number;

    constructor(
        maDonHang: number,
        ngayTao?: string,
        diaChiNhanHang?: string,
        tongTien?: number,
        tongTienChoPhep?: number,
        chiPhiGiaoHang?: number,
        chiPhiThanhToan?: number
    ) {
        this.maDonHang = maDonHang;
        this.ngayTao = ngayTao;
        this.diaChiNhanHang = diaChiNhanHang;
        this.tongTien = tongTien;
        this.tongTienChoPhep = tongTienChoPhep;
        this.chiPhiGiaoHang = chiPhiGiaoHang;
        this.chiPhiThanhToan = chiPhiThanhToan;
    }

}

export default DonHangModel;
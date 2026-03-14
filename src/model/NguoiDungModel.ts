class NguoiDungModel{
    maNguoiDung: number;
    hoDem?: string;
    ten?: string;
    tenDangNhap?: string;
    matKhau?: string;
    gioiTinh?: string;
    email?: string;
    soDienThoai?: string;
    diaChiGiaoHang?: string;
    diaChiThanhToan?: string;

    constructor(
        maNguoiDung: number,
        hoDem?: string,
        ten?: string,
        tenDangNhap?: string,
        matKhau?: string,
        gioiTinh?: string,
        email?: string,
        soDienThoai?: string,
        diaChiGiaoHang?: string,
        diaChiThanhToan?: string
    ) {
        this.maNguoiDung = maNguoiDung;
        this.hoDem = hoDem;
        this.ten = ten;
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.gioiTinh = gioiTinh;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.diaChiThanhToan = diaChiThanhToan;
    }



}


export default NguoiDungModel;
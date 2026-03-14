class HinhThucGiaoHangModel{
    maHinhThucGiaoHang: number;
    tenHinhThucGiaoHang?: string;
    chiPhiGiaoHang?: number;
    moTa?: string;

    constructor(
        maHinhThucGiaoHang: number,
        tenHinhThucGiaoHang?: string,
        chiPhiGiaoHang?: number,
        moTa?: string
    ) {
        this.maHinhThucGiaoHang = maHinhThucGiaoHang;
        this.tenHinhThucGiaoHang = tenHinhThucGiaoHang;
        this.chiPhiGiaoHang = chiPhiGiaoHang;
        this.moTa = moTa;
    }



}


export default HinhThucGiaoHangModel;
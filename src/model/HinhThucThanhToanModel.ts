class HinhThucThanhToanModel{
    maHinhThucThanhToan: number;
    tenHinhThucThanhToan?: string;
    chiPhiThanhToan?: number;
    moTa?: string;

    constructor(
        maHinhThucThanhToan: number,
        tenHinhThucThanhToan?: string,
        chiPhiThanhToan?: number,
        moTa?: string
    ) {
        this.maHinhThucThanhToan = maHinhThucThanhToan;
        this.tenHinhThucThanhToan = tenHinhThucThanhToan;
        this.chiPhiThanhToan = chiPhiThanhToan;
        this.moTa = moTa;
    }



}


export default HinhThucThanhToanModel;
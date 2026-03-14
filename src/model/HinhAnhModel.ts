class HinhAnhModel{
    maHinhAnh: number;
    tenHinhAnh?: string;
    laIcon?: boolean;
    duongDan?: string;
    dulieuAnh?: string;

    constructor(maHinhAnh: number, tenHinhAnh?: string, laIcon?: boolean, duongDan?: string, dulieuAnh?: string) {
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.laIcon = laIcon;
        this.duongDan = duongDan;
        this.dulieuAnh = dulieuAnh;
    }


}


export default HinhAnhModel;
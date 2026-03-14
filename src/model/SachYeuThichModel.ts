class SachYeuThichModel{
    maSachYeuThich: number;
    maNguoiDung?: number;
    maSach?: number;

    constructor(maSachYeuThich: number, maNguoiDung?: number, maSach?: number) {
        this.maSachYeuThich = maSachYeuThich;
        this.maNguoiDung = maNguoiDung;
        this.maSach = maSach;
    }



}


export default SachYeuThichModel;
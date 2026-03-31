import SachModel from "../model/SachModel";

//123GioHang - Tạo utils quản lý giỏ hàng bằng LocalStorage
export interface CartItem {
    sach: SachModel;
    soLuong: number;
}

export function layGioHang(): CartItem[] {
    const data = localStorage.getItem("gioHang");
    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }
    return [];
}

export function luuGioHang(gioHang: CartItem[]) {
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
    // Phát sự kiện để cập nhật icon giỏ hàng trên Navbar
    window.dispatchEvent(new Event("gioHangUpdated"));
}

export function themVaoGioHang(sach: SachModel, soLuong: number) {
    const gioHang = layGioHang();
    const isExist = gioHang.find((item) => item.sach.maSach === sach.maSach);

    if (isExist) {
        // Cộng thêm số lượng nếu sách đã có
        isExist.soLuong += soLuong;
        
        // Cản nếu thêm quá giới hạn tồn kho
        const kho = isExist.sach.soLuong || 99;
        if(isExist.soLuong > kho) {
            isExist.soLuong = kho;
        }
    } else {
        gioHang.push({ sach, soLuong });
    }

    luuGioHang(gioHang);
}

export function capNhatSoLuong(maSach: number, soLuongMoi: number) {
    const gioHang = layGioHang();
    const item = gioHang.find((item) => item.sach.maSach === maSach);
    
    if (item) {
        item.soLuong = soLuongMoi;
        luuGioHang(gioHang);
    }
}

export function xoaKhoiGioHang(maSach: number) {
    let gioHang = layGioHang();
    gioHang = gioHang.filter((item) => item.sach.maSach !== maSach);
    luuGioHang(gioHang);
}

export function layTongSoLuongGioHang(): number {
    const gioHang = layGioHang();
    return gioHang.reduce((total, item) => total + item.soLuong, 0);
}

export function layTongTienGioHang(): number {
    const gioHang = layGioHang();
    return gioHang.reduce((total, item) => total + (item.sach.giaBan || 0) * item.soLuong, 0);
}

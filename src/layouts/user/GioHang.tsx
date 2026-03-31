import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem, layGioHang, capNhatSoLuong, xoaKhoiGioHang } from "../../utils/GioHangUtils"; //123GioHang
import DinhDangSo from "../utils/DinhDangSo";
import { layToanBoAnhCuaMotSach } from "../../api/HinhAnhAPI"; //123GioHang

const styles = `
  .cart-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8f9fa;
      min-height: calc(100vh - 100px);
      padding: 40px 0;
  }
  .cart-header {
      font-weight: 700;
      color: #333;
      margin-bottom: 30px;
      border-bottom: 2px solid #3498db;
      display: inline-block;
      padding-bottom: 10px;
  }
  .cart-item-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.2s;
  }
  .cart-item-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  }
  .cart-img {
      width: 100px;
      height: 140px;
      object-fit: contain; /* 123GioHang - Hiển thị full ảnh không bị cắt */
      border-radius: 8px;
  }
  .checkbox-custom {
      width: 20px;
      height: 20px;
      cursor: pointer;
  }
  .cart-item-info {
      flex: 1;
  }
  .cart-item-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 8px;
  }
  .cart-item-price {
      color: #e74c3c;
      font-weight: 600;
  }
  .qty-control {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 15px;
  }
  .qty-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #ced4da;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      transition: all 0.2s;
  }
  .qty-btn:hover {
      background: #e9ecef;
  }
  .btn-remove {
      color: #e74c3c;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 10px;
  }
  .btn-remove:hover {
      color: #c0392b;
  }
  .summary-card {
      background: #fff;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      position: sticky;
      top: 20px;
  }
  .summary-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
  }
  .checkout-btn {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      background: #e74c3c;
      color: white;
      font-weight: bold;
      border: none;
      margin-top: 20px;
      transition: background 0.2s;
  }
  .checkout-btn:hover {
      background: #c0392b;
  }
`;

//123GioHang - Component tiện ích hiển thị 1 ảnh full
const CartImage = ({ maSach }: { maSach: number }) => {
    const [imgUrl, setImgUrl] = useState<string>("");
    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(danhSach => {
            if (danhSach && danhSach.length > 0) {
                setImgUrl(danhSach[0].duLieuAnh || "");
            }
        }).catch(err => console.log(err));
    }, [maSach]);
    
    return <img src={imgUrl || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} className="cart-img" alt="Product" />;
}

const GioHang = () => {
    const [gioHang, setGioHang] = useState<CartItem[]>([]);
    
    //123GioHang - State xử lý checkbox chọn hàng
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // Load dữ liệu khi vào trang
    useEffect(() => {
        const cart = layGioHang();
        setGioHang(cart);
        // Tự động tích chọn tất cả khi mới vô
        setSelectedItems(cart.map(item => item.sach.maSach));
    }, []);

    const loadGioHang = () => {
        const cart = layGioHang();
        setGioHang(cart);
        // Loại bỏ những item đã bị xóa khỏi lựa chọn
        setSelectedItems(prev => prev.filter(id => cart.some(i => i.sach.maSach === id)));
    };

    const handleTang = (maSach: number, soLuongHienTai: number, kho: number) => {
        if (soLuongHienTai < kho) {
            capNhatSoLuong(maSach, soLuongHienTai + 1);
            loadGioHang();
        }
    };

    const handleGiam = (maSach: number, soLuongHienTai: number) => {
        if (soLuongHienTai > 1) {
            capNhatSoLuong(maSach, soLuongHienTai - 1);
            loadGioHang();
        }
    };

    const handleXoa = (maSach: number) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (confirmDelete) {
            xoaKhoiGioHang(maSach);
            loadGioHang();
        }
    };

    //123GioHang - Logic tự tính toán tiền dựa trên các mặt hàng đang được tích checkbox
    const handleToggleSelect = (maSach: number) => {
        setSelectedItems(prev => prev.includes(maSach) ? prev.filter(id => id !== maSach) : [...prev, maSach]);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(gioHang.map(i => i.sach.maSach));
        } else {
            setSelectedItems([]);
        }
    };

    const calculatedTongTien = gioHang.filter(i => selectedItems.includes(i.sach.maSach)).reduce((sum, item) => sum + (item.sach.giaBan || 0) * item.soLuong, 0);
    const calculatedTongSoLuong = gioHang.filter(i => selectedItems.includes(i.sach.maSach)).reduce((sum, item) => sum + item.soLuong, 0);


    if (gioHang.length === 0) {
        return (
            <div className="container text-center py-5">
                <style>{styles}</style>
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" style={{ width: '150px', marginBottom: '20px', opacity: 0.5 }} />
                <h3>Giỏ hàng của bạn đang trống!</h3>
                <p className="text-muted">Hãy quay lại trang chủ để chọn mọt vài cuốn sách nhé.</p>
                <Link to="/" className="btn btn-primary mt-3 px-4 py-2 rounded-pill">Tiếp tục mua hàng</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <style>{styles}</style>
            <div className="container">
                <h2 className="cart-header"><i className="fas fa-shopping-cart me-2"></i>Giỏ Hàng Của Bạn</h2>
                
                <div className="row">
                    {/* Danh sách sản phẩm */}
                    <div className="col-lg-8">
                        {/* 123GioHang - Chọn tất cả */}
                        <div className="mb-3 px-2 d-flex align-items-center">
                            <input type="checkbox" className="checkbox-custom me-2" checked={selectedItems.length === gioHang.length && gioHang.length > 0} onChange={handleSelectAll} id="selectAll"/>
                            <label htmlFor="selectAll" className="fw-bold" style={{cursor: 'pointer'}}>Chọn tất cả ({gioHang.length} sản phẩm)</label>
                        </div>

                        {gioHang.map((item) => {
                            const isSelected = selectedItems.includes(item.sach.maSach);
                            return (
                                <div className="cart-item-card" key={item.sach.maSach} style={{ border: isSelected ? '1px solid #3498db' : '1px solid transparent' }}>
                                    <input type="checkbox" className="checkbox-custom" checked={isSelected} onChange={() => handleToggleSelect(item.sach.maSach)} />
                                    <div style={{ width: '100px', height: '140px', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                                        <CartImage maSach={item.sach.maSach} />
                                    </div>
                                    <div className="cart-item-info">
                                        <Link to={`/sach/${item.sach.maSach}`} style={{ textDecoration: 'none' }}>
                                            <h4 className="cart-item-title">{item.sach.tenSach}</h4>
                                        </Link>
                                        <p className="cart-item-price">{DinhDangSo(item.sach.giaBan || 0)} đ</p>
                                        
                                        <div className="qty-control">
                                            <button className="qty-btn" onClick={() => handleGiam(item.sach.maSach, item.soLuong)}>−</button>
                                            <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.soLuong}</span>
                                            <button className="qty-btn" onClick={() => handleTang(item.sach.maSach, item.soLuong, item.sach.soLuong || 99)}>+</button>
                                            <span className="ms-3 text-muted" style={{ fontSize: '0.85rem' }}>Kho: {item.sach.soLuong}</span>
                                        </div>
                                    </div>
                                    <button className="btn-remove" onClick={() => handleXoa(item.sach.maSach)} title="Xóa">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Bảng giá tóm tắt */}
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="summary-card">
                            <h4 className="summary-title">Tóm tắt đơn hàng</h4>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Tổng số lượng (đã chọn):</span>
                                <span>{calculatedTongSoLuong} cuốn</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Tạm tính (chưa tính phí ship):</span>
                                <span>{DinhDangSo(calculatedTongTien)} đ</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4 mt-3">
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Thành Tiền:</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>{DinhDangSo(calculatedTongTien)} đ</span>
                            </div>
                            <button className="checkout-btn" onClick={() => alert('Chức năng thanh toán sẽ được tích hợp với Database tại đây!')}>
                                TIẾN HÀNH THANH TOÁN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GioHang;

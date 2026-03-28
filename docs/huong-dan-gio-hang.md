# Hướng Dẫn Thêm Chức Năng Giỏ Hàng

> **Dự án:** webbansach_frontend (React + TypeScript)  
> **Điều kiện:** Backend & CSDL đã sẵn sàng, các model hiện tại đã có

---

## 📋 Tổng Quan

Chức năng giỏ hàng sẽ bao gồm:

1. **Model** `GioHangItem` – đại diện cho 1 dòng sản phẩm trong giỏ
2. **Context** `GioHangContext` – lưu trữ trạng thái giỏ hàng toàn cục (global state)
3. **API** `GioHangAPI` – giao tiếp với backend (thêm, xoá, lấy giỏ hàng)
4. **Component** `GioHang.tsx` – trang hiển thị giỏ hàng
5. **Tích hợp** vào `ChiTietSanPham.tsx` và `App.tsx`

---

## Bước 1 – Tạo Model `GioHangItem`

> **File mới:** `src/model/GioHangItem.ts`

Model này đại diện cho **1 dòng trong giỏ hàng** của người dùng, kết hợp thông tin từ `SachModel` và `ChiTietDonHangModel` đã có.

```typescript
// src/model/GioHangItem.ts
import SachModel from "./SachModel";

class GioHangItem {
    sach: SachModel;       // Thông tin sách (tên, giá, ảnh...)
    soLuong: number;       // Số lượng người dùng muốn mua

    constructor(sach: SachModel, soLuong: number) {
        this.sach = sach;
        this.soLuong = soLuong;
    }

    // Tính tổng tiền của dòng này
    tinhThanhTien(): number {
        return (this.sach.giaBan ?? 0) * this.soLuong;
    }
}

export default GioHangItem;
```

> **Lưu ý:** Dùng `SachModel` đã có sẵn (`maSach`, `tenSach`, `giaBan`, `soLuong`...) để tránh tạo model trùng lặp.

---

## Bước 2 – Tạo Context Giỏ Hàng (Global State)

> **File mới:** `src/layouts/utils/GioHangContext.tsx`

Dùng React Context API để chia sẻ dữ liệu giỏ hàng xuyên suốt toàn bộ ứng dụng mà không cần truyền props qua nhiều tầng.

```typescript
// src/layouts/utils/GioHangContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import GioHangItem from "../../model/GioHangItem";
import SachModel from "../../model/SachModel";

// Định nghĩa kiểu dữ liệu của Context
interface GioHangContextType {
    gioHang: GioHangItem[];
    themVaoGioHang: (sach: SachModel, soLuong: number) => void;
    xoaKhoiGioHang: (maSach: number) => void;
    capNhatSoLuong: (maSach: number, soLuong: number) => void;
    xoaGioHang: () => void;
    tongSoLuong: number;
    tongTien: number;
}

// Tạo Context
const GioHangContext = createContext<GioHangContextType | undefined>(undefined);

// Provider – bọc quanh toàn bộ App
export const GioHangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gioHang, setGioHang] = useState<GioHangItem[]>([]);

    // Thêm sách vào giỏ (nếu đã có thì cộng dồn số lượng)
    const themVaoGioHang = (sach: SachModel, soLuong: number) => {
        setGioHang((prev) => {
            const itemExist = prev.find((item) => item.sach.maSach === sach.maSach);
            if (itemExist) {
                return prev.map((item) =>
                    item.sach.maSach === sach.maSach
                        ? { ...item, soLuong: item.soLuong + soLuong }
                        : item
                );
            }
            return [...prev, { sach, soLuong }];
        });
    };

    // Xoá 1 sản phẩm khỏi giỏ
    const xoaKhoiGioHang = (maSach: number) => {
        setGioHang((prev) => prev.filter((item) => item.sach.maSach !== maSach));
    };

    // Cập nhật số lượng của 1 sản phẩm
    const capNhatSoLuong = (maSach: number, soLuong: number) => {
        setGioHang((prev) =>
            prev.map((item) =>
                item.sach.maSach === maSach ? { ...item, soLuong } : item
            )
        );
    };

    // Xoá toàn bộ giỏ hàng
    const xoaGioHang = () => setGioHang([]);

    // Tính tổng số lượng và tổng tiền
    const tongSoLuong = gioHang.reduce((sum, item) => sum + item.soLuong, 0);
    const tongTien = gioHang.reduce(
        (sum, item) => sum + (item.sach.giaBan ?? 0) * item.soLuong,
        0
    );

    return (
        <GioHangContext.Provider
            value={{ gioHang, themVaoGioHang, xoaKhoiGioHang, capNhatSoLuong, xoaGioHang, tongSoLuong, tongTien }}
        >
            {children}
        </GioHangContext.Provider>
    );
};

// Hook tiện dụng để dùng Context
export const useGioHang = (): GioHangContextType => {
    const context = useContext(GioHangContext);
    if (!context) {
        throw new Error("useGioHang phải được dùng bên trong GioHangProvider");
    }
    return context;
};

export default GioHangContext;
```

---

## Bước 3 – Tích Hợp Provider Vào `App.tsx`

Bọc `GioHangProvider` quanh toàn bộ ứng dụng để mọi component đều dùng được giỏ hàng.

```diff
// src/App.tsx
+ import { GioHangProvider } from './layouts/utils/GioHangContext';

  function App() {
    return (
      <div className="App">
+       <GioHangProvider>
          <BrowserRouter>
            <Navbar ... />
            <Routes>
              ...
+             <Route path='/gio-hang' element={<GioHang />} />
            </Routes>
            <Footer />
          </BrowserRouter>
+       </GioHangProvider>
      </div>
    );
  }
```

> **Import thêm:** `import GioHang from './layouts/product/GioHang';`

---

## Bước 4 – Tạo Trang Giỏ Hàng `GioHang.tsx`

> **File mới:** `src/layouts/product/GioHang.tsx`

```typescript
// src/layouts/product/GioHang.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useGioHang } from "../utils/GioHangContext";
import DinhDangSo from "../utils/DinhDangSo";

const GioHang: React.FC = () => {
    const { gioHang, xoaKhoiGioHang, capNhatSoLuong, tongTien } = useGioHang();

    if (gioHang.length === 0) {
        return (
            <div className="container text-center mt-5">
                <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                <h3>Giỏ hàng của bạn đang trống</h3>
                <Link to="/" className="btn btn-danger mt-3">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                <i className="fas fa-shopping-cart me-2"></i>Giỏ hàng của bạn
            </h2>
            <div className="row">
                {/* Danh sách sản phẩm */}
                <div className="col-8">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gioHang.map((item) => (
                                <tr key={item.sach.maSach}>
                                    <td>
                                        <Link to={`/sach/${item.sach.maSach}`}>
                                            {item.sach.tenSach}
                                        </Link>
                                    </td>
                                    <td>{DinhDangSo(item.sach.giaBan ?? 0)} đ</td>
                                    <td style={{ width: "140px" }}>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    item.soLuong > 1
                                                        ? capNhatSoLuong(item.sach.maSach, item.soLuong - 1)
                                                        : xoaKhoiGioHang(item.sach.maSach)
                                                }
                                            >-</button>
                                            <input
                                                className="form-control form-control-sm text-center"
                                                value={item.soLuong}
                                                readOnly
                                            />
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    capNhatSoLuong(item.sach.maSach, item.soLuong + 1)
                                                }
                                            >+</button>
                                        </div>
                                    </td>
                                    <td>{DinhDangSo((item.sach.giaBan ?? 0) * item.soLuong)} đ</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => xoaKhoiGioHang(item.sach.maSach)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div className="col-4">
                    <div className="card p-3">
                        <h5>Tóm tắt đơn hàng</h5>
                        <hr />
                        <div className="d-flex justify-content-between mb-2">
                            <span>Tổng tiền hàng:</span>
                            <strong>{DinhDangSo(tongTien)} đ</strong>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-3">
                            <strong>Tổng cộng:</strong>
                            <strong className="text-danger" style={{ fontSize: "20px" }}>
                                {DinhDangSo(tongTien)} đ
                            </strong>
                        </div>
                        <button className="btn btn-danger w-100">
                            Tiến hành đặt hàng
                        </button>
                        <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GioHang;
```

---

## Bước 5 – Kết Nối Nút "Thêm Vào Giỏ Hàng" Trong `ChiTietSanPham.tsx`

Hàm `handleThemVaoGioHang` hiện đang để trống. Hãy cập nhật như sau:

```diff
// src/layouts/product/ChiTietSanPham.tsx
+ import { useGioHang } from "../utils/GioHangContext";

  const ChiTietSanPham: React.FC = () => {
      // ... code hiện tại ...
+     const { themVaoGioHang } = useGioHang();

      const handleThemVaoGioHang = () => {
-         // (để trống)
+         if (sach) {
+             themVaoGioHang(sach, soLuong);
+             alert(`Đã thêm "${sach.tenSach}" vào giỏ hàng!`);
+         }
      };

      const handleMuaNgay = () => {
+         if (sach) {
+             themVaoGioHang(sach, soLuong);
+             // Điều hướng sang trang giỏ hàng
+             // (dùng useNavigate nếu cần)
+         }
      };
```

> **Import thêm** nếu muốn dùng `useNavigate`:
> ```typescript
> import { useNavigate } from "react-router-dom";
> const navigate = useNavigate();
> // Rồi gọi: navigate('/gio-hang');
> ```

---

## Bước 6 – Hiển Thị Số Lượng Giỏ Hàng Trên Navbar

Cập nhật `Navbar` để hiển thị badge số lượng sản phẩm trong giỏ.

```typescript
// Trong file navbar.tsx (hoặc tương tự)
import { useGioHang } from "../utils/GioHangContext";
import { Link } from "react-router-dom";

// Bên trong component Navbar:
const { tongSoLuong } = useGioHang();

// Trong JSX:
<Link to="/gio-hang" className="nav-link position-relative">
    <i className="fas fa-shopping-cart fa-lg"></i>
    {tongSoLuong > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {tongSoLuong}
        </span>
    )}
</Link>
```

---

## Bước 7 (Tuỳ chọn) – Lưu Giỏ Hàng Vào `localStorage`

Để giỏ hàng không bị mất khi F5, thêm logic đọc/ghi `localStorage` vào `GioHangContext`:

```typescript
// Trong GioHangProvider, thay:
const [gioHang, setGioHang] = useState<GioHangItem[]>([]);

// Bằng:
const [gioHang, setGioHang] = useState<GioHangItem[]>(() => {
    const saved = localStorage.getItem("gioHang");
    return saved ? JSON.parse(saved) : [];
});

// Thêm useEffect để lưu mỗi khi gioHang thay đổi:
useEffect(() => {
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
}, [gioHang]);
```

---

## 📁 Tóm Tắt Các File Cần Tạo / Chỉnh Sửa

| File | Hành động | Mô tả |
|---|---|---|
| `src/model/GioHangItem.ts` | **Tạo mới** | Model item giỏ hàng |
| `src/layouts/utils/GioHangContext.tsx` | **Tạo mới** | Context & Provider quản lý giỏ hàng |
| `src/layouts/product/GioHang.tsx` | **Tạo mới** | Trang hiển thị giỏ hàng |
| `src/App.tsx` | **Chỉnh sửa** | Bọc `GioHangProvider`, thêm route `/gio-hang` |
| `src/layouts/product/ChiTietSanPham.tsx` | **Chỉnh sửa** | Kết nối nút "Thêm vào giỏ hàng" |
| `src/layouts/header-footer/navbar.tsx` | **Chỉnh sửa** | Hiển thị badge số lượng giỏ hàng |

---

## 🔄 Luồng Dữ Liệu

```
[ChiTietSanPham]
    |-- Click "Thêm vào giỏ" --> themVaoGioHang(sach, soLuong)
                                        |
                             [GioHangContext] <--(useGioHang)-- [Navbar] badge
                                        |
                             [GioHang.tsx] hiển thị danh sách + tổng tiền
```

---

## ✅ Kiểm Tra

Sau khi hoàn thành, thử các trường hợp sau:

- [ ] Vào trang chi tiết sách → nhấn **"Thêm vào giỏ hàng"** → badge navbar tăng lên
- [ ] Thêm cùng 1 sách 2 lần → giỏ hàng gộp số lượng thay vì tạo dòng mới
- [ ] Vào `/gio-hang` → thấy danh sách sản phẩm và tổng tiền đúng
- [ ] Nhấn `+` / `-` trong giỏ hàng → số lượng và tổng tiền cập nhật
- [ ] Nhấn 🗑️ → xoá sản phẩm khỏi giỏ
- [ ] (Nếu dùng localStorage) F5 → giỏ hàng vẫn còn

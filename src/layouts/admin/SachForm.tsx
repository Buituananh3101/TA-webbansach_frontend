import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";

const SachForm: React.FC = () => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        isbn: '',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    });

    const [danhSachAnh, setDanhSachAnh] = useState<string[]>([]); 

    // Chức năng xử lý thay đổi file ảnh và chuyển sang Base64
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const base64Promises = files.map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = error => reject(error);
                });
            });
            try {
                const base64Images = await Promise.all(base64Promises);
                setDanhSachAnh(base64Images);
            } catch (error) {
                console.error("Lỗi đọc file ảnh:", error);
            }
        }
    };

    // Chức năng xử lý gửi form (Thêm sách và ảnh)
    const handleSubmit = async (event: FormEvent) => {
        // Lưu thông tin sách cơ bản
        event.preventDefault();
        const token = localStorage.getItem('token'); // 
        try {
            const response = await fetch("http://localhost:8080/sach", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sach)
            });

            if (response.ok) {
                // Lưu danh sách hình ảnh sau khi tạo sách thành công
                try {
                    const sachData = await response.json();
                    const maSachMoi = sachData.maSach;

                    if (danhSachAnh.length > 0 && maSachMoi) {
                        for (const anhBase64 of danhSachAnh) {
                            const hinhAnhPayload = {
                                tenHinAnh: sach.tenSach,
                                laIcon: false,
                                duongDan: "",
                                duLieuAnh: anhBase64,
                                sach: `http://localhost:8080/sach/${maSachMoi}`
                            };
                            await fetch("http://localhost:8080/hinh-anh", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify(hinhAnhPayload)
                            });
                        }
                    }
                    setDanhSachAnh([]);
                } catch (err) {
                    console.error("Lỗi khi upload ảnh:", err);
                }

                // Reset form sau khi thành công
                alert("Thêm sách thành công :)");
                setSach({
                    maSach: 0,
                    tenSach: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    isbn: '',
                    moTa: '',
                    soLuong: 0,
                    tenTacGia: '',
                    trungBinhXepHang: 0,
                });
            } else {
                alert("Lỗi khi thêm sách :(");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg border-0 rounded-3">
                <div className="card-header bg-dark text-white py-3">
                    <h3 className="card-title mb-0 text-center text-uppercase fw-bold">Quản Lý Thông Tin Sách</h3>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" id='maSach' value={sach.maSach} />

                        <div className="row g-3">
                            <div className="col-md-12 d-flex align-items-center mb-3">
                                <label htmlFor="tenSach" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Tên Sách</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={sach.tenSach}
                                    onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                                    required
                                    placeholder="Nhập tên sách..."
                                />
                            </div>

                            <div className="col-md-6 d-flex align-items-center mb-3">
                                <label htmlFor="giaBan" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Giá Bán</label>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={sach.giaBan}
                                        onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
                                        required
                                    />
                                    <span className="input-group-text">VNĐ</span>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex align-items-center mb-3">
                                <label htmlFor="giaNiemYet" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Giá Niêm Yết</label>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={sach.giaNiemYet}
                                        onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
                                        required
                                    />
                                    <span className="input-group-text">VNĐ</span>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex align-items-center mb-3">
                                <label htmlFor="isbn" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>ISBN</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={sach.isbn}
                                    onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-md-6 d-flex align-items-center mb-3">
                                <label htmlFor="soLuong" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Số Lượng</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={sach.soLuong}
                                    onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
                                    required
                                />
                            </div>

                            <div className="col-md-12 d-flex align-items-center mb-3">
                                <label htmlFor="tenTacGia" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Tên Tác Giả</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={sach.tenTacGia}
                                    onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-12 d-flex align-items-start mb-3">
                                <label htmlFor="moTa" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Mô Tả</label>
                                <textarea
                                    className="form-control"
                                    value={sach.moTa}
                                    onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                                    rows={4}
                                    placeholder="Mô tả nội dung sách..."
                                />
                            </div>

                            {/* Input chọn file ảnh */}
                            <div className="col-12 d-flex align-items-center mb-3">
                                <label htmlFor="hinhAnh" className="form-label fw-bold me-3" style={{ minWidth: '120px' }}>Hình Ảnh</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-success btn-lg px-5 shadow-sm" type="submit">
                                <i className="bi bi-save me-2"></i>Lưu Thông Tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;
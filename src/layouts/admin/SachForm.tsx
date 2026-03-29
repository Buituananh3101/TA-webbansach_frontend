import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";

const SachForm: React.FC = () => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        isbn:'',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    });

    const handleSubmit = async (event: FormEvent) => {
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
                <div className="card-header bg-primary text-white py-3">
                    <h3 className="card-title mb-0 text-center">Quản Lý Thông Tin Sách</h3>
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
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-primary btn-lg px-5 shadow-sm" type="submit">
                                <i className="bi bi-save me-2"></i>Lưu Sách
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SachForm_Admin =  RequireAdmin(SachForm);
export default SachForm_Admin;
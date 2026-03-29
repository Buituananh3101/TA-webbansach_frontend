//123
import React, { FormEvent, useEffect, useState } from "react";
import RequireAdmin from "./RequireAdmin";

//123 - Interface kết quả tìm kiếm sách
interface SachTimKiem {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    giaBan: number;
    soLuong: number;
}

const XoaSach: React.FC = () => {

    //123 - State danh sách sách đang hiển thị
    const [danhSachSach, setDanhSachSach] = useState<SachTimKiem[]>([]);

    //123 - State phân trang
    const [trangHienTai, setTrangHienTai] = useState<number>(0);
    const [tongSoTrang, setTongSoTrang] = useState<number>(0);
    const [tongSoSach, setTongSoSach] = useState<number>(0);

    //123 - State loading / thông báo
    const [dangTai, setDangTai] = useState(false);
    const [thongBao, setThongBao] = useState<{ loai: "success" | "danger" | ""; noi: string }>({ loai: "", noi: "" });

    //123 - State tìm kiếm
    const [timKiemId, setTimKiemId] = useState<string>("");
    const [timKiemTen, setTimKiemTen] = useState<string>("");
    const [dangTimKiem, setDangTimKiem] = useState(false);
    const [dangTim, setDangTim] = useState(false);

    //123 - Tải danh sách sách theo trang (chế độ mặc định)
    const taiDanhSachSach = async (trang: number) => {
        setDangTai(true);
        setThongBao({ loai: "", noi: "" });
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:8080/sach?sort=maSach,desc&size=10&page=${trang}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!response.ok) throw new Error("Lỗi tải danh sách");
            const data = await response.json();
            const items = data._embedded?.saches || [];
            setDanhSachSach(items.map((s: any) => ({
                maSach: s.maSach, tenSach: s.tenSach,
                tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong,
            })));
            setTongSoTrang(data.page.totalPages);
            setTongSoSach(data.page.totalElements);
        } catch (err) {
            setThongBao({ loai: "danger", noi: "Không thể tải danh sách sách." });
        } finally {
            setDangTai(false);
        }
    };

    //123 - Tự động tải khi vào trang hoặc đổi trang
    useEffect(() => {
        if (!dangTimKiem) taiDanhSachSach(trangHienTai);
    }, [trangHienTai, dangTimKiem]); //123

    //123 - Tìm theo ID
    const handleTimKiemTheoId = async (e: FormEvent) => {
        e.preventDefault();
        setThongBao({ loai: "", noi: "" });
        const id = parseInt(timKiemId);
        if (isNaN(id) || id <= 0) {
            setThongBao({ loai: "danger", noi: "Vui lòng nhập ID hợp lệ." });
            return;
        }
        setDangTim(true);
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/sach/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) {
                setDanhSachSach([]);
                setThongBao({ loai: "danger", noi: `❌ Không tìm thấy sách có ID: ${id}.` });
                setDangTimKiem(true);
                return;
            }
            const data = await response.json();
            setDanhSachSach([{ maSach: data.maSach, tenSach: data.tenSach, tenTacGia: data.tenTacGia, giaBan: data.giaBan, soLuong: data.soLuong }]);
            setTongSoTrang(1); setTongSoSach(1);
            setDangTimKiem(true);
        } catch {
            setThongBao({ loai: "danger", noi: "❌ Lỗi khi tìm kiếm theo ID." });
        } finally {
            setDangTim(false);
        }
    };

    //123 - Tìm theo tên (chứa 1 phần)
    const handleTimKiemTheoTen = async (e: FormEvent) => {
        e.preventDefault();
        setThongBao({ loai: "", noi: "" });
        if (!timKiemTen.trim()) {
            setDangTimKiem(false);
            setTrangHienTai(0);
            return;
        }
        setDangTim(true);
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${encodeURIComponent(timKiemTen)}&sort=maSach,desc&size=100&page=0`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!response.ok) throw new Error();
            const data = await response.json();
            const items = data._embedded?.saches || [];
            if (items.length === 0) {
                setDanhSachSach([]);
                setThongBao({ loai: "danger", noi: `❌ Không tìm thấy sách nào có tên chứa "${timKiemTen}".` });
            } else {
                setDanhSachSach(items.map((s: any) => ({ maSach: s.maSach, tenSach: s.tenSach, tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong })));
                setTongSoSach(items.length);
            }
            setTongSoTrang(1);
            setDangTimKiem(true);
        } catch {
            setThongBao({ loai: "danger", noi: "❌ Lỗi khi tìm kiếm theo tên." });
        } finally {
            setDangTim(false);
        }
    };

    //123 - Xóa bộ lọc, về danh sách đầy đủ
    const handleXoaLoc = () => {
        setTimKiemId("");
        setTimKiemTen("");
        setDangTimKiem(false);
        setTrangHienTai(0);
        setThongBao({ loai: "", noi: "" });
    };

    //123 - Hàm xóa sách theo maSach
    const handleXoa = async (maSach: number, tenSach: string) => {
        const xacNhan = window.confirm(`Bạn có chắc chắn muốn xóa sách:\n"${tenSach}" (ID: ${maSach})?\n\nHành động này không thể hoàn tác!`);
        if (!xacNhan) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/sach/${maSach}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok || response.status === 204) {
                setThongBao({ loai: "success", noi: `Đã xóa sách "${tenSach}" (ID: ${maSach}) thành công!` });
                setDanhSachSach((prev) => prev.filter((s) => s.maSach !== maSach));
                setTongSoSach((prev) => prev - 1);
            } else {
                setThongBao({ loai: "danger", noi: `❌ Xóa thất bại! Server trả về lỗi ${response.status}.` });
            }
        } catch (err) {
            setThongBao({ loai: "danger", noi: "❌ Đã xảy ra lỗi khi xóa sách." });
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg border-0 rounded-3">
                {/* Header */}
                <div className="card-header bg-danger text-white py-3">
                    <h3 className="card-title mb-0 text-center">
                        <i className="bi bi-trash3 me-2"></i>Quản Lý Xóa Sách (Admin)
                    </h3>
                </div>

                <div className="card-body p-4">
                    {/* //123 - Thanh tìm kiếm theo ID và theo tên */}
                    <div className="row g-2 mb-3">
                        <div className="col-md-5">
                            <form onSubmit={handleTimKiemTheoId} className="d-flex gap-2">
                                <input
                                    className="form-control form-control-sm"
                                    type="number"
                                    min="1"
                                    placeholder="Tìm theo ID sách..."
                                    value={timKiemId}
                                    onChange={(e) => { setTimKiemId(e.target.value); setTimKiemTen(""); }}
                                />
                                <button className="btn btn-outline-primary btn-sm px-3" type="submit" disabled={dangTim || !timKiemId}>
                                    {dangTim ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-search"></i>}
                                </button>
                            </form>
                        </div>
                        <div className="col-md-5">
                            <form onSubmit={handleTimKiemTheoTen} className="d-flex gap-2">
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="Tìm theo tên sách..."
                                    value={timKiemTen}
                                    onChange={(e) => { setTimKiemTen(e.target.value); setTimKiemId(""); }}
                                />
                                <button className="btn btn-outline-primary btn-sm px-3" type="submit" disabled={dangTim || !timKiemTen}>
                                    {dangTim ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-search"></i>}
                                </button>
                            </form>
                        </div>
                        <div className="col-md-2">
                            {dangTimKiem && (
                                <button className="btn btn-outline-secondary btn-sm w-100" onClick={handleXoaLoc}>
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>Hiện tất cả
                                </button>
                            )}
                        </div>
                    </div>
                    {/* //123 - Thanh tìm kiếm */}

                    {/* //123 - Thanh trạng thái */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">
                            {dangTimKiem
                                ? <><i className="bi bi-funnel-fill text-primary me-1"></i>Tìm được: <strong>{tongSoSach}</strong> sách</>
                                : <><i className="bi bi-list-ul text-secondary me-1"></i>Tổng cộng: <strong>{tongSoSach}</strong> sách | Trang <strong>{trangHienTai + 1}</strong> / <strong>{tongSoTrang || 1}</strong></>
                            }
                        </span>
                    </div>

                    {/* //123 - Thông báo */}
                    {thongBao.noi && (
                        <div className={`alert alert-${thongBao.loai} alert-dismissible fade show shadow-sm d-flex align-items-center`} role="alert">
                            <i className={`bi ${thongBao.loai === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                            <div>{thongBao.noi}</div>
                            <button type="button" className="btn-close" onClick={() => setThongBao({ loai: "", noi: "" })}></button>
                        </div>
                    )}

                    {/* //123 - Bảng danh sách sách */}
                    {dangTai ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" role="status"></div>
                            <p className="mt-2 text-muted">Đang tải danh sách sách...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th style={{ width: "70px" }}>ID</th>
                                        <th>Tên Sách</th>
                                        <th>Tác Giả</th>
                                        <th style={{ width: "130px" }}>Giá Bán</th>
                                        <th style={{ width: "90px" }}>Số Lượng</th>
                                        <th style={{ width: "100px" }} className="text-center">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {danhSachSach.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center text-muted py-4">
                                                <i className="bi bi-inbox fs-3 d-block mb-2"></i>Không có sách nào.
                                            </td>
                                        </tr>
                                    ) : (
                                        danhSachSach.map((sach) => (
                                            <tr key={sach.maSach}>
                                                <td><span className="badge bg-secondary">{sach.maSach}</span></td>
                                                <td>{sach.tenSach}</td>
                                                <td>{sach.tenTacGia}</td>
                                                <td>{sach.giaBan?.toLocaleString("vi-VN")} VNĐ</td>
                                                <td className="text-center">{sach.soLuong}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleXoa(sach.maSach, sach.tenSach)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* //123 - Phân trang (chỉ hiện khi không ở chế độ tìm kiếm) */}
                    {!dangTimKiem && tongSoTrang > 1 && (
                        <nav className="mt-3">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => setTrangHienTai(0)}>
                                    <button className="page-link">Trang đầu</button>
                                </li>
                                {
                                    Array.from({ length: tongSoTrang }, (_, i) => i + 1).map(trang => {
                                        if (trang >= trangHienTai - 1 && trang <= trangHienTai + 3) {
                                            return (
                                                <li
                                                    key={trang}
                                                    className={"page-item " + (trangHienTai + 1 === trang ? "active" : "")}
                                                    onClick={() => setTrangHienTai(trang - 1)}
                                                >
                                                    <button className="page-link">
                                                        {trang}
                                                    </button>
                                                </li>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                                <li className="page-item" onClick={() => setTrangHienTai(tongSoTrang - 1)}>
                                    <button className="page-link">Trang cuối</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

//123 - Bọc bằng RequireAdmin để chỉ admin mới truy cập được
const XoaSach_Admin = RequireAdmin(XoaSach);
export default XoaSach_Admin;
//123

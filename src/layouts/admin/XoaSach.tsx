//123XoaTamThoi
import React, { FormEvent, useEffect, useState } from "react";
import RequireAdmin from "./RequireAdmin";

// 123XoaTamThoi - Interface sách hiển thị trong bảng
interface SachHienThi {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    giaBan: number;
    soLuong: number;
    daXoa?: boolean;
}

// 123XoaTamThoi - Hai tab: sách hiện có và thùng rác
type TabHienThi = "hien-co" | "thung-rac";

const XoaSach: React.FC = () => {

    // 123XoaTamThoi - Tab đang chọn
    const [tabHienTai, setTabHienTai] = useState<TabHienThi>("hien-co");

    // 123XoaTamThoi - State dữ liệu
    const [danhSachSach, setDanhSachSach] = useState<SachHienThi[]>([]);
    const [trangHienTai, setTrangHienTai] = useState<number>(0);
    const [tongSoTrang, setTongSoTrang] = useState<number>(0);
    const [tongSoSach, setTongSoSach] = useState<number>(0);

    // 123XoaTamThoi - Loading / thông báo
    const [dangTai, setDangTai] = useState(false);
    const [thongBao, setThongBao] = useState<{ loai: "success" | "danger" | "warning" | ""; noi: string }>({ loai: "", noi: "" });

    // 123XoaTamThoi - Tìm kiếm
    const [timKiemId, setTimKiemId] = useState<string>("");
    const [timKiemTen, setTimKiemTen] = useState<string>("");
    const [dangTimKiem, setDangTimKiem] = useState(false);
    const [dangTim, setDangTim] = useState(false);

    const taiDanhSachSach = async (trang: number, tab: TabHienThi) => {
        setDangTai(true);
        setThongBao({ loai: "", noi: "" });
        setDanhSachSach([]); // 123XoaTamThoi - Xóa data cũ, tránh hiển thị stale data khi load thất bại
        const token = localStorage.getItem("token");
        try {
            let url = "";
            if (tab === "hien-co") {
                // 123XoaTamThoi - lấy sách chưa bị xóa (da_xoa = false/null)
                url = `http://localhost:8080/sach/search/findByDaXoaFalseOrDaXoaIsNull?sort=maSach,desc&size=10&page=${trang}`;
            } else {
                // 123XoaTamThoi - lấy thùng rác (da_xoa = true)
                url = `http://localhost:8080/admin/sach/da-xoa?page=${trang}&size=10`;
            }

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Lỗi tải dữ liệu");
            const data = await response.json();

            let items: SachHienThi[] = [];
            let totalPages = 0;
            let totalElements = 0;

            if (tab === "hien-co") {
                items = (data._embedded?.saches || []).map((s: any) => ({
                    maSach: s.maSach, tenSach: s.tenSach,
                    tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong, daXoa: s.daXoa,
                }));
                totalPages = data.page?.totalPages || 0;
                totalElements = data.page?.totalElements || 0;
            } else {
                // 123XoaTamThoi - endpoint /sach/da-xoa trả về định dạng khác
                items = (data.content || []).map((s: any) => ({
                    maSach: s.maSach, tenSach: s.tenSach,
                    tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong, daXoa: s.daXoa,
                }));
                totalPages = data.totalPages || 0;
                totalElements = data.totalElements || 0;
            }

            setDanhSachSach(items);
            setTongSoTrang(totalPages);
            setTongSoSach(totalElements);
        } catch {
            setThongBao({ loai: "danger", noi: "Không thể tải danh sách sách." });
        } finally {
            setDangTai(false);
        }
    };

    // 123XoaTamThoi - Reload khi đổi tab hoặc trang
    useEffect(() => {
        if (!dangTimKiem) {
            taiDanhSachSach(trangHienTai, tabHienTai);
        }
    }, [trangHienTai, tabHienTai, dangTimKiem]);

    // 123XoaTamThoi - Đổi tab: reset trang và tìm kiếm
    const handleDoiTab = (tab: TabHienThi) => {
        setTabHienTai(tab);
        setTrangHienTai(0);
        setDangTimKiem(false);
        setTimKiemId("");
        setTimKiemTen("");
        setThongBao({ loai: "", noi: "" });
    };

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
                setThongBao({ loai: "danger", noi: `Không tìm thấy sách có ID: ${id}.` });
                setDangTimKiem(true);
                return;
            }
            const data = await response.json();
            const sach: SachHienThi = {
                maSach: data.maSach, tenSach: data.tenSach,
                tenTacGia: data.tenTacGia, giaBan: data.giaBan,
                soLuong: data.soLuong, daXoa: data.daXoa,
            };

            // 123XoaTamThoi - Kiểm tra sách có phù hợp với tab đang xem không
            const daXoa = data.daXoa === true;
            if (tabHienTai === "hien-co" && daXoa) {
                setDanhSachSach([]);
                setThongBao({ loai: "warning", noi: `Sách ID ${id} đang trong Thùng rác, không hiển thị ở tab này.` });
                setDangTimKiem(true);
                return;
            }
            if (tabHienTai === "thung-rac" && !daXoa) {
                setDanhSachSach([]);
                setThongBao({ loai: "warning", noi: `Sách ID ${id} chưa bị xóa, hãy tìm ở tab "Sách hiện có".` });
                setDangTimKiem(true);
                return;
            }

            setDanhSachSach([sach]);
            setTongSoTrang(1); setTongSoSach(1);
            setDangTimKiem(true);
        } catch {
            setThongBao({ loai: "danger", noi: "Lỗi khi tìm kiếm theo ID." });
        } finally {
            setDangTim(false);
        }
    };

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
            let url = "";
            if (tabHienTai === "hien-co") {
                // 123XoaTamThoi - Tìm theo tên trong sách chưa bị xóa
                // Dùng endpoint search cũ rồi lọc client-side (đơn giản, ít data)
                url = `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${encodeURIComponent(timKiemTen)}&sort=maSach,desc&size=100&page=0`;
            } else {
                // 123XoaTamThoi - Tìm theo tên trong thùng rác
                url = `http://localhost:8080/admin/sach/da-xoa?tenSach=${encodeURIComponent(timKiemTen)}&page=0&size=100`;
            }

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error();
            const data = await response.json();

            let items: SachHienThi[] = [];
            if (tabHienTai === "hien-co") {
                const all = data._embedded?.saches || [];
                // 123XoaTamThoi - lọc bỏ sách đã xóa tạm thời
                items = all
                    .filter((s: any) => !s.daXoa)
                    .map((s: any) => ({
                        maSach: s.maSach, tenSach: s.tenSach,
                        tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong, daXoa: s.daXoa,
                    }));
            } else {
                items = (data.content || []).map((s: any) => ({
                    maSach: s.maSach, tenSach: s.tenSach,
                    tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong, daXoa: s.daXoa,
                }));
            }

            if (items.length === 0) {
                setDanhSachSach([]);
                setThongBao({ loai: "danger", noi: `Không tìm thấy sách nào có tên chứa "${timKiemTen}".` });
            } else {
                setDanhSachSach(items);
                setTongSoSach(items.length);
            }
            setTongSoTrang(1);
            setDangTimKiem(true);
        } catch {
            setThongBao({ loai: "danger", noi: "Lỗi khi tìm kiếm theo tên." });
        } finally {
            setDangTim(false);
        }
    };

    // 123XoaTamThoi - Xóa bộ lọc, về danh sách đầy đủ
    const handleXoaLoc = () => {
        setTimKiemId("");
        setTimKiemTen("");
        setDangTimKiem(false);
        setTrangHienTai(0);
        setThongBao({ loai: "", noi: "" });
    };

    const handleXoaTamThoi = async (maSach: number, tenSach: string) => {
        const xacNhan = window.confirm(
            `Bạn có chắc muốn xóa tạm thời sách:\n"${tenSach}" (ID: ${maSach})?\n\nSách sẽ vào Thùng rác và có thể khôi phục lại.`
        );
        if (!xacNhan) return;

        const token = localStorage.getItem("token");
        try {
            // 123XoaTamThoi - gọi PATCH /admin/sach/{id}/xoa-tam-thoi
            const response = await fetch(`http://localhost:8080/admin/sach/${maSach}/xoa-tam-thoi`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                setThongBao({ loai: "success", noi: `🗑️ Đã xóa tạm thời "${tenSach}" vào Thùng rác!` });
                setDanhSachSach((prev) => prev.filter((s) => s.maSach !== maSach));
                setTongSoSach((prev) => prev - 1);
            } else {
                setThongBao({ loai: "danger", noi: `Xóa tạm thời thất bại! Lỗi ${response.status}.` });
            }
        } catch {
            setThongBao({ loai: "danger", noi: "Lỗi kết nối khi xóa tạm thời." });
        }
    };

    const handleKhoiPhuc = async (maSach: number, tenSach: string) => {
        const xacNhan = window.confirm(
            `Khôi phục sách:\n"${tenSach}" (ID: ${maSach})?\n\nSách sẽ xuất hiện lại trong cửa hàng.`
        );
        if (!xacNhan) return;

        const token = localStorage.getItem("token");
        try {
            // 123XoaTamThoi - gọi PATCH /admin/sach/{id}/khoi-phuc
            const response = await fetch(`http://localhost:8080/admin/sach/${maSach}/khoi-phuc`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                setThongBao({ loai: "success", noi: `Đã khôi phục "${tenSach}" thành công!` });
                setDanhSachSach((prev) => prev.filter((s) => s.maSach !== maSach));
                setTongSoSach((prev) => prev - 1);
            } else {
                setThongBao({ loai: "danger", noi: `Khôi phục thất bại! Lỗi ${response.status}.` });
            }
        } catch {
            setThongBao({ loai: "danger", noi: "Lỗi kết nối khi khôi phục." });
        }
    };

    const handleXoaVinhVien = async (maSach: number, tenSach: string) => {
        const xacNhan = window.confirm(
            `XÓA VĨNH VIỄN sách:\n"${tenSach}" (ID: ${maSach})?\n\nHành động này KHÔNG THỂ hoàn tác!`
        );
        if (!xacNhan) return;

        const token = localStorage.getItem("token");
        try {
            // 123XoaTamThoi - DELETE xóa hẳn khỏi DB (dùng Spring Data REST DELETE)
            const response = await fetch(`http://localhost:8080/sach/${maSach}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok || response.status === 204) {
                setThongBao({ loai: "success", noi: `Đã xóa vĩnh viễn "${tenSach}" khỏi hệ thống!` });
                setDanhSachSach((prev) => prev.filter((s) => s.maSach !== maSach));
                setTongSoSach((prev) => prev - 1);
            } else {
                setThongBao({ loai: "danger", noi: `Xóa vĩnh viễn thất bại! Lỗi ${response.status}.` });
            }
        } catch {
            setThongBao({ loai: "danger", noi: "Lỗi kết nối khi xóa vĩnh viễn." });
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg border-0 rounded-3">

                {/* Header */}
                <div className="card-header py-3" style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)" }}>
                    <h3 className="card-title mb-0 text-center text-white">
                        <i className="bi bi-trash3 me-2"></i>Quản Lý Xóa Sách (Admin)
                    </h3>
                </div>

                {/* 123XoaTamThoi - Tab switcher */}
                <div className="card-header bg-white border-bottom p-0">
                    <ul className="nav nav-tabs border-0">
                        <li className="nav-item">
                            <button
                                id="tab-hien-co"
                                className={`nav-link border-0 px-4 py-3 fw-semibold ${tabHienTai === "hien-co" ? "active text-danger border-bottom border-danger border-3" : "text-secondary"}`}
                                onClick={() => handleDoiTab("hien-co")}
                            >
                                <i className="bi bi-book me-2"></i>
                                Sách hiện có
                                {tabHienTai === "hien-co" && tongSoSach > 0 && (
                                    <span className="badge bg-danger ms-2">{tongSoSach}</span>
                                )}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                id="tab-thung-rac"
                                className={`nav-link border-0 px-4 py-3 fw-semibold ${tabHienTai === "thung-rac" ? "active text-warning border-bottom border-warning border-3" : "text-secondary"}`}
                                onClick={() => handleDoiTab("thung-rac")}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Thùng rác
                                {tabHienTai === "thung-rac" && tongSoSach > 0 && (
                                    <span className="badge bg-warning text-dark ms-2">{tongSoSach}</span>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="card-body p-4">

                    {/* 123XoaTamThoi - Banner mô tả tab đang chọn */}
                    {tabHienTai === "thung-rac" && (
                        <div className="alert alert-warning d-flex align-items-center mb-3 py-2" role="alert">
                            <i className="bi bi-info-circle-fill me-2"></i>
                            <div className="small">
                                <strong>Thùng rác:</strong> Sách đã xóa tạm thời. Bạn có thể <strong>Khôi phục</strong> hoặc <strong>Xóa vĩnh viễn</strong>.
                            </div>
                        </div>
                    )}

                    {/* 123XoaTamThoi - Thanh tìm kiếm */}
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

                    {/* 123XoaTamThoi - Thanh trạng thái */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">
                            {dangTimKiem
                                ? <><i className="bi bi-funnel-fill text-primary me-1"></i>Tìm được: <strong>{tongSoSach}</strong> sách</>
                                : <><i className="bi bi-list-ul text-secondary me-1"></i>Tổng cộng: <strong>{tongSoSach}</strong> sách | Trang <strong>{trangHienTai + 1}</strong> / <strong>{tongSoTrang || 1}</strong></>
                            }
                        </span>
                    </div>

                    {/* 123XoaTamThoi - Thông báo */}
                    {thongBao.noi && (
                        <div className={`alert alert-${thongBao.loai} alert-dismissible fade show shadow-sm d-flex align-items-center`} role="alert">
                            <i className={`bi ${thongBao.loai === "success" ? "bi-check-circle-fill" : thongBao.loai === "warning" ? "bi-exclamation-triangle-fill" : "bi-x-circle-fill"} me-2`}></i>
                            <div>{thongBao.noi}</div>
                            <button type="button" className="btn-close" onClick={() => setThongBao({ loai: "", noi: "" })}></button>
                        </div>
                    )}

                    {/* 123XoaTamThoi - Bảng danh sách */}
                    {dangTai ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" role="status"></div>
                            <p className="mt-2 text-muted">Đang tải danh sách sách...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className={tabHienTai === "hien-co" ? "table-dark" : "table-warning"}>
                                    <tr>
                                        <th style={{ width: "70px" }}>ID</th>
                                        <th>Tên Sách</th>
                                        <th>Tác Giả</th>
                                        <th style={{ width: "130px" }}>Giá Bán</th>
                                        <th style={{ width: "90px" }}>Số Lượng</th>
                                        {/* 123XoaTamThoi - Cột hành động khác nhau theo tab */}
                                        {tabHienTai === "hien-co" ? (
                                            <th style={{ width: "140px" }} className="text-center">Xóa</th>
                                        ) : (
                                            <th style={{ width: "220px" }} className="text-center">Hành động</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {danhSachSach.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center text-muted py-4">
                                                <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                                                {tabHienTai === "thung-rac" ? "Thùng rác trống." : "Không có sách nào."}
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
                                                    {tabHienTai === "hien-co" ? (
                                                        // 123XoaTamThoi - Nút xóa tạm thời
                                                        <button
                                                            id={`btn-xoa-tam-thoi-${sach.maSach}`}
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => handleXoaTamThoi(sach.maSach, sach.tenSach)}
                                                        >
                                                            <i className="bi bi-archive me-1"></i>Xóa
                                                        </button>
                                                    ) : (
                                                        // 123XoaTamThoi - Nút khôi phục + xóa vĩnh viễn
                                                        <div className="d-flex gap-1 justify-content-center">
                                                            <button
                                                                id={`btn-khoi-phuc-${sach.maSach}`}
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => handleKhoiPhuc(sach.maSach, sach.tenSach)}
                                                                title="Khôi phục sách"
                                                            >
                                                                <i className="bi bi-arrow-counterclockwise me-1"></i>Khôi phục
                                                            </button>
                                                            <button
                                                                id={`btn-xoa-vinh-vien-${sach.maSach}`}
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleXoaVinhVien(sach.maSach, sach.tenSach)}
                                                                title="Xóa vĩnh viễn khỏi hệ thống"
                                                            >
                                                                <i className="bi bi-trash me-1"></i>Xóa vĩnh viễn
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 123XoaTamThoi - Phân trang */}
                    {!dangTimKiem && tongSoTrang > 1 && (
                        <nav className="mt-3">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => setTrangHienTai(0)}>
                                    <button className="page-link">Trang đầu</button>
                                </li>
                                {Array.from({ length: tongSoTrang }, (_, i) => i + 1).map(trang => {
                                    if (trang >= trangHienTai - 1 && trang <= trangHienTai + 3) {
                                        return (
                                            <li
                                                key={trang}
                                                className={"page-item " + (trangHienTai + 1 === trang ? "active" : "")}
                                                onClick={() => setTrangHienTai(trang - 1)}
                                            >
                                                <button className="page-link">{trang}</button>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
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

// 123XoaTamThoi - Bọc bằng RequireAdmin để chỉ admin mới truy cập được
const XoaSach_Admin = RequireAdmin(XoaSach);
export default XoaSach_Admin;
//123XoaTamThoi

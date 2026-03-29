//123SuaSach
import React, { FormEvent, useEffect, useRef, useState } from "react";
import RequireAdmin from "./RequireAdmin";

//123SuaSach - Interface sách trong danh sách tìm kiếm
interface SachTimKiem {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    giaBan: number;
    soLuong: number;
}

//123SuaSach - Interface ảnh hiện có của sách
interface HinhAnhHienCo {
    maHinhAnh: number;
    tenHinAnh: string;
    laIcon: boolean;
    duLieuAnh: string;
    duongDan: string;
}

//123SuaSach - Interface form sửa sách
interface SachSua {
    maSach: number;
    tenSach: string;
    tenTacGia: string;
    isbn: string;
    moTa: string;
    giaNiemYet: number;
    giaBan: number;
    soLuong: number;
    trungBinhXepHang: number;
}

const sachRong: SachSua = {
    maSach: 0, tenSach: "", tenTacGia: "", isbn: "",
    moTa: "", giaNiemYet: 0, giaBan: 0, soLuong: 0, trungBinhXepHang: 0,
};

const SuaSach: React.FC = () => {
    //123SuaSach - State danh sách sách hiển thị
    const [danhSachSach, setDanhSachSach] = useState<SachTimKiem[]>([]);
    const [trangHienTai, setTrangHienTai] = useState<number>(0);
    const [tongSoTrang, setTongSoTrang] = useState<number>(0);
    const [tongSoSach, setTongSoSach] = useState<number>(0);
    const [dangTai, setDangTai] = useState(false);

    //123SuaSach - State tìm kiếm
    const [timKiemId, setTimKiemId] = useState<string>("");
    const [timKiemTen, setTimKiemTen] = useState<string>("");
    const [dangTimKiem, setDangTimKiem] = useState(false);
    const [dangTim, setDangTim] = useState(false);

    //123SuaSach - State form sửa
    const [sachDangSua, setSachDangSua] = useState<SachSua | null>(null);
    const [danhSachAnhHienCo, setDanhSachAnhHienCo] = useState<HinhAnhHienCo[]>([]);
    const [danhSachAnhMoi, setDanhSachAnhMoi] = useState<string[]>([]);
    const [dangLuuSua, setDangLuuSua] = useState(false);

    //123SuaSach - Thông báo
    const [thongBao, setThongBao] = useState<{ loai: "success" | "danger" | ""; noi: string }>({ loai: "", noi: "" });

    //123SuaSach - Ref để cuộn xuống form khi chọn Sửa
    const formSuaRef = useRef<HTMLDivElement>(null);

    // ————— LOAD DANH SÁCH —————

    //123SuaSach - Tải toàn bộ sách theo trang
    const taiDanhSachSach = async (trang: number) => {
        setDangTai(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/sach?sort=maSach,desc&size=10&page=${trang}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            const items = data._embedded?.saches || [];
            setDanhSachSach(items.map((s: any) => ({ maSach: s.maSach, tenSach: s.tenSach, tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong })));
            setTongSoTrang(data.page.totalPages);
            setTongSoSach(data.page.totalElements);
        } catch {
            setThongBao({ loai: "danger", noi: "Không thể tải danh sách sách." });
        } finally {
            setDangTai(false);
        }
    };

    //123SuaSach - Tự động tải khi vào trang hoặc đổi trang
    useEffect(() => {
        if (!dangTimKiem) taiDanhSachSach(trangHienTai);
    }, [trangHienTai, dangTimKiem]); //123SuaSach

    // ————— TÌM KIẾM —————

    //123SuaSach - Tìm theo ID
    const handleTimKiemTheoId = async (e: FormEvent) => {
        e.preventDefault();
        setThongBao({ loai: "", noi: "" });
        const id = parseInt(timKiemId);
        if (isNaN(id) || id <= 0) { setThongBao({ loai: "danger", noi: "Vui lòng nhập ID hợp lệ." }); return; }
        setDangTim(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/sach/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) { setDanhSachSach([]); setThongBao({ loai: "danger", noi: `Không tìm thấy sách ID: ${id}.` }); setDangTimKiem(true); return; }
            const data = await res.json();
            setDanhSachSach([{ maSach: data.maSach, tenSach: data.tenSach, tenTacGia: data.tenTacGia, giaBan: data.giaBan, soLuong: data.soLuong }]);
            setTongSoTrang(1); setTongSoSach(1); setDangTimKiem(true);
        } catch { setThongBao({ loai: "danger", noi: ":< Lỗi khi tìm theo ID." }); }
        finally { setDangTim(false); }
    };

    //123SuaSach - Tìm theo tên (chứa 1 phần)
    const handleTimKiemTheoTen = async (e: FormEvent) => {
        e.preventDefault();
        setThongBao({ loai: "", noi: "" });
        if (!timKiemTen.trim()) { setDangTimKiem(false); setTrangHienTai(0); return; }
        setDangTim(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(
                `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${encodeURIComponent(timKiemTen)}&sort=maSach,desc&size=100&page=0`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) throw new Error();
            const data = await res.json();
            const items = data._embedded?.saches || [];
            if (items.length === 0) {
                setDanhSachSach([]); setThongBao({ loai: "danger", noi: `:< Không tìm thấy sách nào có tên chứa "${timKiemTen}".` });
            } else {
                setDanhSachSach(items.map((s: any) => ({ maSach: s.maSach, tenSach: s.tenSach, tenTacGia: s.tenTacGia, giaBan: s.giaBan, soLuong: s.soLuong })));
                setTongSoSach(items.length);
            }
            setTongSoTrang(1); setDangTimKiem(true);
        } catch { setThongBao({ loai: "danger", noi: ":< Lỗi khi tìm theo tên." }); }
        finally { setDangTim(false); }
    };

    //123SuaSach - Về danh sách đầy đủ
    const handleXoaLoc = () => {
        setTimKiemId(""); setTimKiemTen(""); setDangTimKiem(false); setTrangHienTai(0); setThongBao({ loai: "", noi: "" });
    };

    // ————— CHỌN SÁCH ĐỂ SỬA —————

    //123SuaSach - Tải ảnh hiện có của sách
    const taiAnhHienCo = async (maSach: number) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/sach/${maSach}/danhSachHinhAnh`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) return;
            const data = await res.json();
            const items: HinhAnhHienCo[] = (data._embedded?.hinhAnhs || []).map((h: any) => ({
                maHinhAnh: h.maHinhAnh,
                tenHinAnh: h.tenHinAnh,
                laIcon: h.laIcon,
                duLieuAnh: h.duLieuAnh,
                duongDan: h.duongDan,
            }));
            setDanhSachAnhHienCo(items);
        } catch { console.error("Lỗi tải ảnh hiện có"); }
    };

    //123SuaSach - Khi bấm nút Sửa trên 1 dòng
    const handleChonSuaSach = async (maSach: number) => {
        setThongBao({ loai: "", noi: "" });
        setDanhSachAnhMoi([]);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/sach/${maSach}`, { headers: { Authorization: `Bearer ${token}` } });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setSachDangSua({
                maSach: data.maSach, tenSach: data.tenSach, tenTacGia: data.tenTacGia,
                isbn: data.ISBN || "", moTa: data.moTa || "",
                giaNiemYet: data.giaNiemYet, giaBan: data.giaBan,
                soLuong: data.soLuong, trungBinhXepHang: data.trungBinhXepHang,
            });
            await taiAnhHienCo(maSach);
            setTimeout(() => formSuaRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch { setThongBao({ loai: "danger", noi: ":< Không thể tải thông tin sách." }); }
    };

    // ————— XỬ LÝ ẢNH —————

    //123SuaSach - Đọc ảnh mới chọn sang Base64
    const handleAnhMoiChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const base64List = await Promise.all(files.map(file => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        })));
        setDanhSachAnhMoi(base64List);
    };

    //123SuaSach - Xóa ảnh hiện có khỏi DB
    const handleXoaAnhHienCo = async (maHinhAnh: number) => {
        if (!window.confirm(`Xóa ảnh này khỏi sách? Không thể hoàn tác!`)) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/hinh-anh/${maHinhAnh}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
            if (res.ok || res.status === 204) {
                setDanhSachAnhHienCo(prev => prev.filter(h => h.maHinhAnh !== maHinhAnh));
            } else { alert(`:< Xóa ảnh thất bại (${res.status})`); }
        } catch { alert(":< Lỗi khi xóa ảnh."); }
    };

    // ————— LƯU SỬA —————

    //123SuaSach - Submit sửa sách: PATCH thông tin + POST ảnh mới
    const handleSubmitSua = async (e: FormEvent) => {
        e.preventDefault();
        if (!sachDangSua) return;
        setDangLuuSua(true);
        setThongBao({ loai: "", noi: "" });
        const token = localStorage.getItem("token");

        try {
            //123SuaSach - Cập nhật thông tin sách bằng PATCH
            const payload = {
                tenSach: sachDangSua.tenSach,
                tenTacGia: sachDangSua.tenTacGia,
                isbn: sachDangSua.isbn,
                moTa: sachDangSua.moTa,
                giaNiemYet: sachDangSua.giaNiemYet,
                giaBan: sachDangSua.giaBan,
                soLuong: sachDangSua.soLuong,
                trungBinhXepHang: sachDangSua.trungBinhXepHang,
            };
            const resPatch = await fetch(`http://localhost:8080/sach/${sachDangSua.maSach}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            if (!resPatch.ok) throw new Error(`PATCH thất bại: ${resPatch.status}`);

            //123SuaSach - Upload ảnh mới (nếu có)
            if (danhSachAnhMoi.length > 0) {
                for (const anhBase64 of danhSachAnhMoi) {
                    await fetch("http://localhost:8080/hinh-anh", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                        body: JSON.stringify({
                            tenHinAnh: sachDangSua.tenSach,
                            laIcon: false,
                            duongDan: "",
                            duLieuAnh: anhBase64,
                            sach: `http://localhost:8080/sach/${sachDangSua.maSach}`,
                        }),
                    });
                }
                setDanhSachAnhMoi([]);
                await taiAnhHienCo(sachDangSua.maSach); //123SuaSach - Reload ảnh sau khi upload
            }

            setThongBao({ loai: "success", noi: `:) Cập nhật sách "${sachDangSua.tenSach}" thành công!` });

            //123SuaSach - Cập nhật lại dòng trong bảng danh sách
            setDanhSachSach(prev => prev.map(s =>
                s.maSach === sachDangSua.maSach
                    ? { ...s, tenSach: sachDangSua.tenSach, tenTacGia: sachDangSua.tenTacGia, giaBan: sachDangSua.giaBan, soLuong: sachDangSua.soLuong }
                    : s
            ));
        } catch (err: any) {
            setThongBao({ loai: "danger", noi: `:< Cập nhật thất bại: ${err.message}` });
        } finally {
            setDangLuuSua(false);
        }
    };

    // ————— RENDER —————

    return (
        <div className="container mt-5 mb-5">

            {/* //123SuaSach - Card danh sách tìm kiếm */}
            <div className="card shadow-lg border-0 rounded-3 mb-4">
                <div className="card-header bg-warning text-dark py-3">
                    <h3 className="card-title mb-0 text-center">
                        <i className="bi bi-pencil-square me-2"></i>Sửa Sách (Admin)
                    </h3>
                </div>

                <div className="card-body p-4">
                    {/* //123SuaSach - Thông báo */}
                    {thongBao.noi && (
                        <div className={`alert alert-${thongBao.loai} alert-dismissible fade show`} role="alert">
                            {thongBao.noi}
                            <button type="button" className="btn-close" onClick={() => setThongBao({ loai: "", noi: "" })}></button>
                        </div>
                    )}

                    {/* //123SuaSach - 2 thanh tìm kiếm song song */}
                    <div className="row g-2 mb-3">
                        <div className="col-md-5">
                            <form onSubmit={handleTimKiemTheoId} className="d-flex gap-2">
                                <input
                                    className="form-control form-control-sm"
                                    type="number" min="1"
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

                    {/* //123SuaSach - Thanh trạng thái */}
                    <div className="mb-2">
                        <span className="text-muted small">
                            {dangTimKiem
                                ? <><i className="bi bi-funnel-fill text-primary me-1"></i>Tìm được: <strong>{tongSoSach}</strong> sách</>
                                : <><i className="bi bi-list-ul text-secondary me-1"></i>Tổng cộng: <strong>{tongSoSach}</strong> sách | Trang <strong>{trangHienTai + 1}</strong> / <strong>{tongSoTrang || 1}</strong></>
                            }
                        </span>
                    </div>

                    {/* //123SuaSach - Bảng danh sách */}
                    {dangTai ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-warning"></div>
                            <p className="mt-2 text-muted">Đang tải...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th style={{ width: "60px" }}>ID</th>
                                        <th>Tên Sách</th>
                                        <th>Tác Giả</th>
                                        <th style={{ width: "130px" }}>Giá Bán</th>
                                        <th style={{ width: "90px" }}>Số Lượng</th>
                                        <th style={{ width: "90px" }} className="text-center">Sửa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {danhSachSach.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center text-muted py-4"><i className="bi bi-inbox fs-3 d-block mb-2"></i>Không có sách nào.</td></tr>
                                    ) : (
                                        danhSachSach.map((sach) => (
                                            <tr key={sach.maSach} className={sachDangSua?.maSach === sach.maSach ? "table-warning" : ""}>
                                                <td><span className="badge bg-secondary">{sach.maSach}</span></td>
                                                <td>{sach.tenSach}</td>
                                                <td>{sach.tenTacGia}</td>
                                                <td>{sach.giaBan?.toLocaleString("vi-VN")} VNĐ</td>
                                                <td className="text-center">{sach.soLuong}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-warning btn-sm" onClick={() => handleChonSuaSach(sach.maSach)}>
                                                        <i className="bi bi-pencil me-1"></i>Sửa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* //123SuaSach - Phân trang */}
                    {!dangTimKiem && tongSoTrang > 1 && (
                        <nav className="mt-3">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => setTrangHienTai(0)}>
                                    <button className="page-link">Trang đầu</button>
                                </li>
                                {Array.from({ length: tongSoTrang }, (_, i) => i + 1).map(trang => {
                                    if (trang >= trangHienTai - 1 && trang <= trangHienTai + 3) {
                                        return (
                                            <li key={trang} className={`page-item ${trangHienTai + 1 === trang ? "active" : ""}`} onClick={() => setTrangHienTai(trang - 1)}>
                                                <button className="page-link">{trang}</button>
                                            </li>
                                        );
                                    } return null;
                                })}
                                <li className="page-item" onClick={() => setTrangHienTai(tongSoTrang - 1)}>
                                    <button className="page-link">Trang cuối</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>

            {/* //123SuaSach - Card form sửa (chỉ hiện khi đã chọn sách) */}
            {sachDangSua && (
                <div className="card shadow-lg border-0 rounded-3" ref={formSuaRef}>
                    <div className="card-header bg-warning text-dark py-3 d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            <i className="bi bi-pencil-square me-2"></i>
                            Đang sửa: <strong>{sachDangSua.tenSach}</strong> (ID: {sachDangSua.maSach})
                        </h4>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => { setSachDangSua(null); setDanhSachAnhHienCo([]); }}>
                            <i className="bi bi-x-lg"></i> Đóng
                        </button>
                    </div>

                    <div className="card-body p-4">
                        <form onSubmit={handleSubmitSua}>
                            <div className="row g-3">

                                {/* //123SuaSach - Tên sách */}
                                <div className="col-md-12 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Tên Sách</label>
                                    <input className="form-control" type="text" value={sachDangSua.tenSach} required
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, tenSach: e.target.value })} />
                                </div>

                                {/* //123SuaSach - Tên tác giả */}
                                <div className="col-md-12 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Tên Tác Giả</label>
                                    <input className="form-control" type="text" value={sachDangSua.tenTacGia} required
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, tenTacGia: e.target.value })} />
                                </div>

                                {/* //123SuaSach - ISBN */}
                                <div className="col-md-6 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>ISBN</label>
                                    <input className="form-control" type="text" value={sachDangSua.isbn}
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, isbn: e.target.value })} />
                                </div>

                                {/* //123SuaSach - Số lượng */}
                                <div className="col-md-6 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Số Lượng</label>
                                    <input className="form-control" type="number" value={sachDangSua.soLuong} required
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, soLuong: parseInt(e.target.value) })} />
                                </div>

                                {/* //123SuaSach - Giá bán */}
                                <div className="col-md-6 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Giá Bán</label>
                                    <div className="input-group">
                                        <input className="form-control" type="number" value={sachDangSua.giaBan} required
                                            onChange={(e) => setSachDangSua({ ...sachDangSua, giaBan: parseFloat(e.target.value) })} />
                                        <span className="input-group-text">VNĐ</span>
                                    </div>
                                </div>

                                {/* //123SuaSach - Giá niêm yết */}
                                <div className="col-md-6 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Giá Niêm Yết</label>
                                    <div className="input-group">
                                        <input className="form-control" type="number" value={sachDangSua.giaNiemYet} required
                                            onChange={(e) => setSachDangSua({ ...sachDangSua, giaNiemYet: parseFloat(e.target.value) })} />
                                        <span className="input-group-text">VNĐ</span>
                                    </div>
                                </div>

                                {/* //123SuaSach - Trung bình xếp hạng */}
                                <div className="col-md-6 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Xếp Hạng TB</label>
                                    <input className="form-control" type="number" min="0" max="5" step="0.1" value={sachDangSua.trungBinhXepHang}
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, trungBinhXepHang: parseFloat(e.target.value) })} />
                                </div>

                                {/* //123SuaSach - Mô tả */}
                                <div className="col-12 d-flex align-items-start mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Mô Tả</label>
                                    <textarea className="form-control" rows={4} value={sachDangSua.moTa}
                                        onChange={(e) => setSachDangSua({ ...sachDangSua, moTa: e.target.value })} />
                                </div>

                                {/* //123SuaSach - Ảnh hiện có */}
                                <div className="col-12 mb-2">
                                    <label className="form-label fw-bold">Ảnh Hiện Có ({danhSachAnhHienCo.length} ảnh)</label>
                                    {danhSachAnhHienCo.length === 0 ? (
                                        <p className="text-muted small">Sách này chưa có ảnh nào.</p>
                                    ) : (
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {danhSachAnhHienCo.map((anh) => (
                                                <div key={anh.maHinhAnh} className="border rounded p-1 position-relative" style={{ width: "110px" }}>
                                                    {anh.duLieuAnh ? (
                                                        <img src={anh.duLieuAnh} alt={anh.tenHinAnh} style={{ width: "100px", height: "100px", objectFit: "cover" }} className="rounded" />
                                                    ) : (
                                                        <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{ width: "100px", height: "100px" }}>
                                                            <i className="bi bi-image text-muted fs-3"></i>
                                                        </div>
                                                    )}
                                                    <div className="text-center mt-1" style={{ fontSize: "11px" }}>
                                                        {anh.laIcon ? <span className="badge bg-primary">Icon</span> : <span className="badge bg-secondary">Ảnh</span>}
                                                        <span className="text-muted d-block">ID: {anh.maHinhAnh}</span>
                                                    </div>
                                                    <button type="button" className="btn btn-danger btn-sm w-100 mt-1" style={{ fontSize: "11px" }}
                                                        onClick={() => handleXoaAnhHienCo(anh.maHinhAnh)}>
                                                        <i className="bi bi-trash"></i> Xóa
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* //123SuaSach - Thêm ảnh mới */}
                                <div className="col-12 d-flex align-items-center mb-2">
                                    <label className="form-label fw-bold me-3" style={{ minWidth: "130px" }}>Thêm Ảnh Mới</label>
                                    <input className="form-control" type="file" multiple accept="image/*"
                                        onChange={handleAnhMoiChange} />
                                </div>
                                {danhSachAnhMoi.length > 0 && (
                                    <div className="col-12">
                                        <p className="text-success small mb-1"><i className="bi bi-check-circle me-1"></i>Đã chọn {danhSachAnhMoi.length} ảnh mới, sẽ được upload khi bấm Lưu.</p>
                                        <div className="d-flex flex-wrap gap-2">
                                            {danhSachAnhMoi.map((src, i) => (
                                                <img key={i} src={src} alt={`preview-${i}`} style={{ width: "80px", height: "80px", objectFit: "cover" }} className="rounded border" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* //123SuaSach - Nút lưu */}
                            <div className="text-center mt-4">
                                <button className="btn btn-warning btn-lg px-5 shadow-sm" type="submit" disabled={dangLuuSua}>
                                    {dangLuuSua
                                        ? <><span className="spinner-border spinner-border-sm me-2"></span>Đang lưu...</>
                                        : <><i className="bi bi-save me-2"></i>Lưu Thay Đổi</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

//123SuaSach - Bọc bằng RequireAdmin
const SuaSach_Admin = RequireAdmin(SuaSach);
export default SuaSach_Admin;
//123SuaSach

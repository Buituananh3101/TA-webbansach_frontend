import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parse } from "path";
import SachModel from "../../model/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import DinhDangSo from "../utils/DinhDangSo";
import { FastAverageColor } from 'fast-average-color';
import { themVaoGioHang } from "../../utils/GioHangUtils"; //123GioHang

/* =====================================================================
   CSS-in-JS styles — nhúng trực tiếp để không cần file .css riêng
   ===================================================================== */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream: #faf7f2;
    --ink: #1a1208;
    --accent: #c0392b;
    --accent-light: #e8473a;
    --gold: #d4a843;
    --muted: #7a6e62;
    --border: rgba(26,18,8,0.10);
    --card-bg: rgba(255,255,255,0.72);
    --shadow-sm: 0 2px 12px rgba(26,18,8,0.07);
    --shadow-lg: 0 20px 60px rgba(26,18,8,0.14);
    --radius: 18px;
    --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  /* ---- Page wrapper ---- */
  .cdsp-page {
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    transition: background 0.7s ease;
    position: relative;
    overflow-x: hidden;
  }

  /* Grain overlay */
  .cdsp-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  /* ---- Breadcrumb ---- */
  .cdsp-breadcrumb {
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.04em;
    padding: 1.5rem 0 0;
    position: relative;
    z-index: 1;
  }
  .cdsp-breadcrumb a {
    color: var(--muted);
    text-decoration: none;
  }
  .cdsp-breadcrumb a:hover { color: var(--accent); }
  .cdsp-breadcrumb span { margin: 0 0.4rem; opacity: 0.4; }

  /* ---- Main product section ---- */
  .cdsp-main {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 3rem;
    padding: 2.5rem 0 3rem;
    align-items: start;
  }

  /* ---- Image column ---- */
  .cdsp-image-col {
    position: sticky;
    top: 2rem;
  }
  .cdsp-image-card {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2.5rem;
    box-shadow: var(--shadow-lg);
    transition: transform var(--transition), box-shadow var(--transition);
    position: relative;
    overflow: hidden;
  }
  .cdsp-image-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
    pointer-events: none;
  }
  .cdsp-image-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 80px rgba(26,18,8,0.20);
  }

  /* ---- Info column ---- */
  .cdsp-info-col {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Badge thể loại */
  .cdsp-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(192,57,43,0.08);
    border: 1px solid rgba(192,57,43,0.18);
    border-radius: 100px;
    padding: 0.3rem 0.9rem;
    margin-bottom: 1rem;
    width: fit-content;
  }

  /* Tên sách */
  .cdsp-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3vw, 2.6rem);
    font-weight: 700;
    line-height: 1.2;
    color: var(--ink);
    margin: 0 0 0.8rem;
    letter-spacing: -0.01em;
  }

  /* Rating row */
  .cdsp-rating-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
    font-size: 0.88rem;
    color: var(--muted);
  }
  .cdsp-stars { color: var(--gold); font-size: 1rem; letter-spacing: 1px; }

  /* Giá */
  .cdsp-price-block {
    margin-bottom: 1.4rem;
  }
  .cdsp-price-label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.2rem;
  }
  .cdsp-price {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--accent);
    line-height: 1;
  }
  .cdsp-price sup { font-size: 1rem; vertical-align: super; }

  /* Divider */
  .cdsp-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 1.4rem 0;
  }

  /* Mô tả sản phẩm */
  .cdsp-description {
    font-size: 0.93rem;
    line-height: 1.8;
    color: #4a3f33;
    margin-bottom: 0;
  }
  .cdsp-description p { margin: 0 0 0.8rem; }

  /* ---- Order box ---- */
  .cdsp-order-box {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.6rem;
    box-shadow: var(--shadow-sm);
    margin-top: 1.6rem;
  }

  .cdsp-qty-label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.6rem;
    font-weight: 500;
  }

  /* Quantity control */
  .cdsp-qty-control {
    display: flex;
    align-items: center;
    gap: 0;
    width: fit-content;
    border: 1.5px solid var(--border);
    border-radius: 100px;
    overflow: hidden;
    background: white;
  }
  .cdsp-qty-btn {
    background: none;
    border: none;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    color: var(--ink);
    transition: background var(--transition), color var(--transition);
  }
  .cdsp-qty-btn:hover { background: var(--ink); color: white; }
  .cdsp-qty-input {
    width: 48px;
    border: none;
    border-left: 1.5px solid var(--border);
    border-right: 1.5px solid var(--border);
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--ink);
    padding: 0;
    height: 38px;
    outline: none;
    background: white;
  }

  /* Tạm tính */
  .cdsp-subtotal {
    margin: 1.2rem 0 1.4rem;
    padding: 1rem 1.2rem;
    background: rgba(212,168,67,0.07);
    border: 1px solid rgba(212,168,67,0.2);
    border-radius: 12px;
  }
  .cdsp-subtotal-label {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.2rem;
  }
  .cdsp-subtotal-price {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  /* Buttons */
  .cdsp-btn-primary {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: none;
    border-radius: 100px;
    background: var(--accent);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
    position: relative;
    overflow: hidden;
  }
  .cdsp-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  }
  .cdsp-btn-primary:hover {
    background: var(--accent-light);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.30);
  }
  .cdsp-btn-primary:active { transform: translateY(0); }

  .cdsp-btn-secondary {
    width: 100%;
    padding: 0.85rem 1.5rem;
    border: 1.5px solid var(--accent);
    border-radius: 100px;
    background: transparent;
    color: var(--accent);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.7rem;
  }
  .cdsp-btn-secondary:hover {
    background: var(--accent);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(192,57,43,0.20);
  }
  .cdsp-btn-secondary svg { width: 16px; height: 16px; }

  /* ---- Review section ---- */
  .cdsp-review-section {
    position: relative;
    z-index: 1;
    padding-bottom: 4rem;
  }
  .cdsp-review-header {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .cdsp-review-header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ---- Loading & Error states ---- */
  .cdsp-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    flex-direction: column;
    gap: 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--muted);
  }
  .cdsp-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ---- Responsive ---- */
  @media (max-width: 960px) {
    .cdsp-main { grid-template-columns: 1fr; gap: 2rem; }
    .cdsp-image-col { position: static; }
  }
  @media (max-width: 600px) {
    .cdsp-title { font-size: 1.6rem; }
    .cdsp-price { font-size: 1.5rem; }
  }

  /* Fade-in animation */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cdsp-fade { animation: fadeUp 0.55s ease both; }
  .cdsp-fade-delay-1 { animation-delay: 0.08s; }
  .cdsp-fade-delay-2 { animation-delay: 0.16s; }
  .cdsp-fade-delay-3 { animation-delay: 0.24s; }
`;

const ChiTietSanPham: React.FC = () => {

  // Cuộn lên đầu trang thật mượt mà khi vừa vào
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  //-----------------------------------------------------------------------------------------------------------------------------------------
  // Lấy mã sách từ URL 

  const { maSach } = useParams();

  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + '');
    if (Number.isNaN(maSachNumber)) maSachNumber = 0;
  } catch (error) {
    maSachNumber = 0;
    console.error("Error", error);
  }

  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [bgColor, setBgColor] = useState<string>("var(--cream, #faf7f2)");

  //-----------------------------------------------------------------------------------------------------------------------------------------
  // Nút số lượng

  const [soLuong, setSoLuong] = useState(1);
  const tangSoLuong = () => {
    const soLuonghienTai = sach?.soLuong ?? 0;
    if (soLuong < soLuonghienTai) {
      setSoLuong(soLuong + 1);
    }
  }
  const giamSoLuong = () => { if (soLuong > 1) setSoLuong(soLuong - 1); }
  const handleSoLuongThayDoi = (event: React.ChangeEvent<HTMLInputElement>) => {
    const giaTri = parseInt(event.target.value);
    const soLuongToiDa = sach?.soLuong ?? 0;

    if (!isNaN(giaTri) && giaTri >= 1 && giaTri <= soLuongToiDa) {
      setSoLuong(giaTri);
    } else if (giaTri > soLuongToiDa) {
      setSoLuong(soLuongToiDa);
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------
  // Mua ngay & thêm vào giỏ hàng

  const handleMuaNgay = () => {
  }

  const handleThemVaoGioHang = () => {
    //123GioHang
    if (sach) {
      themVaoGioHang(sach, soLuong);
      alert("Đã thêm " + sach.tenSach + " vào giỏ hàng!");
    }
  }


  //-----------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    laySachTheoMaSach(maSachNumber)
      .then(
        (sach) => {
          setSach(sach);
          setDangTaiDuLieu(false);
        }
      )
      .catch(
        (error) => {
          setBaoLoi(error.message);
          setDangTaiDuLieu(false);
        }
      );
  }, [maSach]
  )

  // Hiệu ứng lấy màu trung bình từ ảnh bìa (giống Spotify)
  useEffect(() => {
    if (sach) {
      const fac = new FastAverageColor();

      // SỬA Ở ĐÂY: Thêm " img" để lấy đúng thẻ hình ảnh bên trong thẻ div
      const imgElement = document.querySelector(".img-main-sach img") as HTMLImageElement;

      if (imgElement) {
        // Đảm bảo ảnh load xong hoặc cho phép crossOrigin nếu cần
        imgElement.crossOrigin = "Anonymous";

        fac.getColorAsync(imgElement)
          .then((color: any) => { // SỬA LỖI TS7006: Thêm ': any' cho biến color
            // Tạo gradient từ màu lấy được sang trắng/xám nhạt
            setBgColor(`linear-gradient(180deg, ${color.rgba} 0%, rgba(250,247,242,1) 40%)`);
          })
          .catch((e: any) => console.error("Lỗi lấy màu nền:", e)); // SỬA LỖI TS7006: Thêm ': any' cho biến e
      }
    }
  }, [sach, dangTaiDuLieu]);


  //-----------------------------------------------------------------------------------------------------------------------------------------
  // Bắt lỗi

  if (dangTaiDuLieu) {
    return (
      <>
        <style>{styles}</style>
        <div className="cdsp-state">
          <div className="cdsp-spinner"></div>
          <span>Đang tải sách...</span>
        </div>
      </>
    )
  }

  if (baoLoi) {
    return (
      <>
        <style>{styles}</style>
        <div className="cdsp-state">
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <span>Gặp lỗi: {baoLoi}</span>
        </div>
      </>
    )
  }

  if (!sach) {
    return (
      <>
        <style>{styles}</style>
        <div className="cdsp-state">
          <span style={{ fontSize: '2.5rem' }}>📚</span>
          <span>Sách không tồn tại</span>
        </div>
      </>
    )
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      {/* Inject styles */}
      <style>{styles}</style>

      <div className="cdsp-page" style={{ background: bgColor }}>
        <div className="container">

          {/* Breadcrumb */}
          <nav className="cdsp-breadcrumb cdsp-fade">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/sach">Sách</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', opacity: 0.7 }}>{sach.tenSach}</span>
          </nav>

          {/* Main product grid */}
          <div className="cdsp-main">

            {/* Cột ảnh */}
            <div className="cdsp-image-col cdsp-fade">
              <div className="cdsp-image-card img-main-sach">
                <HinhAnhSanPham maSach={maSachNumber} />
              </div>
            </div>

            {/* Cột thông tin */}
            <div className="cdsp-info-col">

              {/* Badge thể loại nếu có */}
              <div className="cdsp-badge cdsp-fade cdsp-fade-delay-1">
                📖 Sách
              </div>

              {/* Tên sách */}
              <h1 className="cdsp-title cdsp-fade cdsp-fade-delay-1">
                {sach.tenSach}
              </h1>

              {/* Rating */}
              <div className="cdsp-rating-row cdsp-fade cdsp-fade-delay-1">
                <span className="cdsp-stars">
                  {renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
                </span>
                {sach.trungBinhXepHang && (
                  <span>{sach.trungBinhXepHang.toFixed(1)} / 5.0</span>
                )}
              </div>

              {/* Giá */}
              <div className="cdsp-price-block cdsp-fade cdsp-fade-delay-2">
                <div className="cdsp-price-label">Giá bán</div>
                <div className="cdsp-price">
                  {DinhDangSo(sach.giaBan ? sach.giaBan : 0)}
                  <sup>đ</sup>
                </div>
              </div>

              <hr className="cdsp-divider" />

              {/* Thông tin chi tiết */}
              <div
                className="cdsp-description cdsp-fade cdsp-fade-delay-2"
                dangerouslySetInnerHTML={{ __html: (sach.thongTinChiTiet + '') }}
              />

              <hr className="cdsp-divider" />

              {/* PHẦN ĐẶT HÀNG */}
              <div className="cdsp-order-box cdsp-fade cdsp-fade-delay-3">

                <div className="cdsp-qty-label">Số lượng</div>

                {/* Nút tăng giảm số lượng */}
                <div className="cdsp-qty-control">
                  <button className="cdsp-qty-btn" onClick={giamSoLuong} aria-label="Giảm">−</button>
                  <input
                    className="cdsp-qty-input"
                    value={soLuong}
                    onChange={handleSoLuongThayDoi}
                    type="number"
                    min={1}
                    max={sach.soLuong ?? 99}
                    aria-label="Số lượng"
                  />
                  <button className="cdsp-qty-btn" onClick={tangSoLuong} aria-label="Tăng">+</button>
                </div>

                {/* Tạm tính */}
                {sach.giaBan && (
                  <div className="cdsp-subtotal">
                    <div className="cdsp-subtotal-label">Tạm tính</div>
                    <div className="cdsp-subtotal-price">
                      {DinhDangSo(soLuong * sach.giaBan)} đ
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <button className="cdsp-btn-primary" type="button" onClick={handleMuaNgay}>
                  Mua ngay
                </button>

                <button className="cdsp-btn-secondary" type="button" onClick={handleThemVaoGioHang}>
                  {/* Cart icon SVG */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Thêm vào giỏ hàng
                </button>

              </div>
            </div>
          </div>

          {/* PHẦN REVIEW */}
          <div className="cdsp-review-section">
            <h2 className="cdsp-review-header">Đánh giá sản phẩm</h2>
            <DanhGiaSanPham maSach={maSachNumber} />
          </div>

        </div>
      </div>
    </>
  );


}
export default ChiTietSanPham;
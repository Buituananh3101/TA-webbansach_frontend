import React, { useState } from "react";

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
    --card-bg: rgba(255,255,255,0.80);
    --shadow-sm: 0 2px 12px rgba(26,18,8,0.07);
    --shadow-lg: 0 20px 60px rgba(26,18,8,0.13);
    --radius: 20px;
    --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  /* ---- Page wrapper ---- */
  .cs-page {
    min-height: 100vh;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    position: relative;
    overflow-x: hidden;
  }

  /* Grain texture overlay */
  .cs-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  /* ---- Hero banner ---- */
  .cs-hero {
    position: relative;
    z-index: 1;
    background: var(--ink);
    overflow: hidden;
    padding: 5.5rem 0 4rem;
    text-align: center;
  }
  /* Vầng sáng trang trí */
  .cs-hero::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(192,57,43,0.22) 0%, transparent 65%);
    top: -150px; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .cs-hero::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 65%);
    bottom: -100px; right: 10%;
    pointer-events: none;
  }
  .cs-hero-inner { position: relative; z-index: 1; }
  .cs-hero-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    background: rgba(212,168,67,0.10);
    border: 1px solid rgba(212,168,67,0.25);
    border-radius: 100px;
    padding: 0.3rem 1rem;
    margin-bottom: 1.4rem;
  }
  .cs-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 700;
    color: white;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .cs-hero-title em { font-style: italic; color: var(--gold); }
  .cs-hero-sub {
    font-size: 0.97rem;
    color: rgba(255,255,255,0.50);
    max-width: 480px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }
  /* Thời gian hiệu lực badge */
  .cs-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.40);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px;
    padding: 0.4rem 1rem;
  }
  .cs-hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px #4ade80;
    animation: pulse-dot 2s ease infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ---- Layout chính ---- */
  .cs-layout {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 3rem;
    padding: 3.5rem 0 5rem;
    align-items: start;
  }

  /* ---- Sidebar điều hướng ---- */
  .cs-sidebar {
    position: sticky;
    top: 2rem;
  }
  .cs-nav-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.4rem;
    box-shadow: var(--shadow-sm);
  }
  .cs-nav-label {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
    padding: 0 0.4rem;
    margin-bottom: 0.8rem;
  }
  .cs-nav-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.65rem 0.8rem;
    border-radius: 10px;
    font-size: 0.87rem;
    color: var(--muted);
    cursor: pointer;
    transition: background var(--transition), color var(--transition);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  .cs-nav-item:hover { background: rgba(192,57,43,0.06); color: var(--accent); }
  .cs-nav-item.active { background: rgba(192,57,43,0.08); color: var(--accent); font-weight: 500; }
  .cs-nav-item-icon { width: 18px; text-align: center; font-size: 0.95rem; }

  /* Hotline card */
  .cs-hotline-card {
    background: var(--ink);
    border-radius: var(--radius);
    padding: 1.4rem;
    margin-top: 1.2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cs-hotline-card::before {
    content: '';
    position: absolute;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(192,57,43,0.25) 0%, transparent 70%);
    top: -60px; right: -30px;
    pointer-events: none;
  }
  .cs-hotline-icon {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
    position: relative;
  }
  .cs-hotline-title {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 0.3rem;
  }
  .cs-hotline-number {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--gold);
    margin-bottom: 0.3rem;
  }
  .cs-hotline-hours {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.30);
  }

  /* ---- Nội dung chính ---- */
  .cs-content { display: flex; flex-direction: column; gap: 1.5rem; }

  /* ---- Accordion sections ---- */
  .cs-section {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition);
  }
  .cs-section:hover { box-shadow: var(--shadow-lg); }

  .cs-section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.4rem 1.8rem;
    cursor: pointer;
    user-select: none;
    transition: background var(--transition);
  }
  .cs-section-header:hover { background: rgba(26,18,8,0.02); }

  .cs-section-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .icon-red   { background: rgba(192,57,43,0.10); color: var(--accent); }
  .icon-gold  { background: rgba(212,168,67,0.12); color: var(--gold); }
  .icon-green { background: rgba(74,222,128,0.10); color: #16a34a; }
  .icon-blue  { background: rgba(59,130,246,0.10); color: #2563eb; }

  .cs-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    flex: 1;
  }
  .cs-section-chevron {
    color: var(--muted);
    font-size: 0.8rem;
    transition: transform var(--transition);
    flex-shrink: 0;
  }
  .cs-section-chevron.open { transform: rotate(180deg); }

  .cs-section-body {
    padding: 0 1.8rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease;
  }
  .cs-section-body.open {
    max-height: 1000px;
    padding: 0 1.8rem 1.8rem;
  }

  /* Divider trong body */
  .cs-body-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0 0 1.4rem;
  }

  /* Danh sách điều kiện */
  .cs-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.7rem; }
  .cs-list-item {
    display: flex;
    gap: 0.8rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: #4a3f33;
  }
  .cs-list-dot {
    width: 20px; height: 20px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .dot-green { background: rgba(74,222,128,0.12); color: #16a34a; }
  .dot-red   { background: rgba(192,57,43,0.10);  color: var(--accent); }
  .dot-gold  { background: rgba(212,168,67,0.12); color: #b45309; }

  /* Bảng thời hạn */
  .cs-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.88rem;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    margin-top: 0.5rem;
  }
  .cs-table thead tr { background: var(--ink); }
  .cs-table thead th {
    padding: 0.85rem 1rem;
    font-weight: 500;
    font-size: 0.78rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    text-align: left;
  }
  .cs-table tbody tr { transition: background var(--transition); }
  .cs-table tbody tr:nth-child(even) { background: rgba(26,18,8,0.025); }
  .cs-table tbody tr:hover { background: rgba(192,57,43,0.04); }
  .cs-table tbody td {
    padding: 0.85rem 1rem;
    color: #4a3f33;
    border-top: 1px solid var(--border);
    vertical-align: middle;
  }
  .cs-tag {
    display: inline-block;
    padding: 0.2rem 0.7rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  .tag-green { background: rgba(74,222,128,0.12); color: #15803d; }
  .tag-red   { background: rgba(192,57,43,0.10);  color: var(--accent); }
  .tag-gold  { background: rgba(212,168,67,0.15); color: #92400e; }

  /* Steps quy trình */
  .cs-steps { display: flex; flex-direction: column; gap: 1rem; }
  .cs-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .cs-step-num {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--gold);
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .cs-step-text {}
  .cs-step-title {
    font-weight: 500;
    font-size: 0.92rem;
    color: var(--ink);
    margin-bottom: 0.2rem;
  }
  .cs-step-desc {
    font-size: 0.86rem;
    color: var(--muted);
    line-height: 1.6;
  }
  .cs-step-connector {
    width: 1px;
    height: 16px;
    background: var(--border);
    margin-left: 15px;
  }

  /* Note box */
  .cs-note {
    background: rgba(212,168,67,0.08);
    border: 1px solid rgba(212,168,67,0.22);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    font-size: 0.87rem;
    line-height: 1.65;
    color: #78530a;
    display: flex;
    gap: 0.7rem;
    margin-top: 1rem;
  }
  .cs-note-icon { flex-shrink: 0; font-size: 1rem; margin-top: 1px; }

  /* ---- Fade animations ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cs-fade    { animation: fadeUp 0.55s ease both; }
  .cs-d1      { animation-delay: 0.06s; }
  .cs-d2      { animation-delay: 0.14s; }
  .cs-d3      { animation-delay: 0.22s; }

  /* ---- Responsive ---- */
  @media (max-width: 860px) {
    .cs-layout { grid-template-columns: 1fr; }
    .cs-sidebar { position: static; }
  }
`;

/* =====================================================================
   Dữ liệu các section chính sách
   ===================================================================== */
const sections = [
    {
        id: "dieu-kien",
        icon: "✅",
        iconClass: "icon-green",
        title: "Điều kiện đổi trả",
        content: "dieu-kien",
    },
    {
        id: "thoi-han",
        icon: "⏱",
        iconClass: "icon-gold",
        title: "Thời hạn đổi trả theo loại sản phẩm",
        content: "thoi-han",
    },
    {
        id: "quy-trinh",
        icon: "📋",
        iconClass: "icon-blue",
        title: "Quy trình đổi / trả hàng",
        content: "quy-trinh",
    },
    {
        id: "khong-ap-dung",
        icon: "🚫",
        iconClass: "icon-red",
        title: "Trường hợp không được đổi trả",
        content: "khong-ap-dung",
    },
];

const navItems = [
    { id: "dieu-kien",    label: "Điều kiện đổi trả",   icon: "✅" },
    { id: "thoi-han",     label: "Thời hạn",             icon: "⏱" },
    { id: "quy-trinh",    label: "Quy trình",            icon: "📋" },
    { id: "khong-ap-dung",label: "Không áp dụng",        icon: "🚫" },
];

/* =====================================================================
   Component chính
   ===================================================================== */
function ChinhSachDoiTra() {

    // Trạng thái accordion — section nào đang mở
    const [openSection, setOpenSection] = useState<string>("dieu-kien");

    const toggleSection = (id: string) => {
        setOpenSection(prev => prev === id ? "" : id);
    };

    // Cuộn tới section khi click sidebar
    const scrollTo = (id: string) => {
        setOpenSection(id);
        const el = document.getElementById("cs-sec-" + id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <style>{styles}</style>

            <div className="cs-page">

                {/* ---- Hero banner ---- */}
                <div className="cs-hero">
                    <div className="container cs-hero-inner">
                        <div className="cs-hero-eyebrow cs-fade">✦ Chính sách</div>
                        <h1 className="cs-hero-title cs-fade cs-d1">
                            Chính sách <em>Đổi & Trả</em> hàng
                        </h1>
                        <p className="cs-hero-sub cs-fade cs-d2">
                            Chúng tôi cam kết mang lại trải nghiệm mua sắm an tâm.
                            Mọi yêu cầu đổi trả đều được xử lý nhanh chóng và minh bạch.
                        </p>
                        <div className="cs-hero-badge cs-fade cs-d3">
                            <span className="cs-hero-badge-dot"></span>
                            Chính sách có hiệu lực từ 01/01/2024
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="cs-layout">

                        {/* ---- Sidebar ---- */}
                        <aside className="cs-sidebar cs-fade">
                            <div className="cs-nav-card">
                                <div className="cs-nav-label">Mục lục</div>
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        className={`cs-nav-item ${openSection === item.id ? "active" : ""}`}
                                        onClick={() => scrollTo(item.id)}
                                    >
                                        <span className="cs-nav-item-icon">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Hotline hỗ trợ */}
                            <div className="cs-hotline-card">
                                <div className="cs-hotline-icon">📞</div>
                                <div className="cs-hotline-title">Hỗ trợ đổi trả</div>
                                <div className="cs-hotline-number">1800 xxxx</div>
                                <div className="cs-hotline-hours">Thứ 2 – CN · 8:00 – 22:00</div>
                            </div>
                        </aside>

                        {/* ---- Nội dung ---- */}
                        <main className="cs-content">

                            {/* Section 1: Điều kiện đổi trả */}
                            <div className="cs-section cs-fade cs-d1" id="cs-sec-dieu-kien">
                                <div className="cs-section-header" onClick={() => toggleSection("dieu-kien")}>
                                    <div className="cs-section-icon icon-green">✅</div>
                                    <h2 className="cs-section-title">Điều kiện đổi trả</h2>
                                    <span className={`cs-section-chevron ${openSection === "dieu-kien" ? "open" : ""}`}>▼</span>
                                </div>
                                <div className={`cs-section-body ${openSection === "dieu-kien" ? "open" : ""}`}>
                                    <hr className="cs-body-divider" />

                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.7 }}>
                                        Bookstore chấp nhận đổi trả khi sản phẩm đáp ứng <strong style={{ color: 'var(--ink)' }}>tất cả</strong> các điều kiện sau:
                                    </p>

                                    {/* Điều kiện được chấp nhận */}
                                    <p style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.6rem', fontWeight: 500 }}>
                                        ✅ Được chấp nhận
                                    </p>
                                    <ul className="cs-list" style={{ marginBottom: '1.2rem' }}>
                                        {[
                                            "Sản phẩm còn nguyên vẹn, chưa qua sử dụng, không có dấu hiệu bị rách, nhàu nát, ố vàng.",
                                            "Còn đầy đủ bao bì, nhãn mác, tem niêm phong gốc như khi nhận hàng.",
                                            "Có hóa đơn mua hàng hoặc thông tin đơn hàng trên hệ thống.",
                                            "Yêu cầu gửi trong thời hạn quy định theo từng loại sản phẩm.",
                                            "Sách bị lỗi in: trang bị lặp, trang bị thiếu, chữ mờ không đọc được.",
                                            "Giao sai tựa sách, sai phiên bản so với đơn đặt hàng.",
                                        ].map((text, i) => (
                                            <li key={i} className="cs-list-item">
                                                <span className="cs-list-dot dot-green">✓</span>
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Section 2: Thời hạn */}
                            <div className="cs-section cs-fade cs-d2" id="cs-sec-thoi-han">
                                <div className="cs-section-header" onClick={() => toggleSection("thoi-han")}>
                                    <div className="cs-section-icon icon-gold">⏱</div>
                                    <h2 className="cs-section-title">Thời hạn đổi trả theo loại sản phẩm</h2>
                                    <span className={`cs-section-chevron ${openSection === "thoi-han" ? "open" : ""}`}>▼</span>
                                </div>
                                <div className={`cs-section-body ${openSection === "thoi-han" ? "open" : ""}`}>
                                    <hr className="cs-body-divider" />
                                    <table className="cs-table">
                                        <thead>
                                            <tr>
                                                <th>Loại sản phẩm</th>
                                                <th>Thời hạn đổi</th>
                                                <th>Thời hạn trả</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ["Sách văn học, kỹ năng",   "7 ngày",  "7 ngày",  "green",  "Áp dụng"],
                                                ["Sách giáo khoa, tham khảo", "5 ngày", "5 ngày", "green", "Áp dụng"],
                                                ["Sách ngoại văn nhập khẩu", "7 ngày", "Không",   "gold",  "Chỉ đổi"],
                                                ["Combo / bộ sách",          "7 ngày",  "7 ngày",  "green",  "Áp dụng"],
                                                ["Sách điện tử / PDF",       "Không",   "Không",   "red",    "Không áp dụng"],
                                                ["Quà tặng kèm",             "Không",   "Không",   "red",    "Không áp dụng"],
                                            ].map(([loai, doi, tra, color, label], i) => (
                                                <tr key={i}>
                                                    <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{loai}</td>
                                                    <td>{doi}</td>
                                                    <td>{tra}</td>
                                                    <td><span className={`cs-tag tag-${color}`}>{label}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="cs-note">
                                        <span className="cs-note-icon">💡</span>
                                        <span>Thời hạn được tính từ ngày <strong>khách hàng ký nhận hàng</strong> thành công. Ngày lễ, Tết vẫn tính vào thời gian quy định.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Quy trình */}
                            <div className="cs-section cs-fade cs-d3" id="cs-sec-quy-trinh">
                                <div className="cs-section-header" onClick={() => toggleSection("quy-trinh")}>
                                    <div className="cs-section-icon icon-blue">📋</div>
                                    <h2 className="cs-section-title">Quy trình đổi / trả hàng</h2>
                                    <span className={`cs-section-chevron ${openSection === "quy-trinh" ? "open" : ""}`}>▼</span>
                                </div>
                                <div className={`cs-section-body ${openSection === "quy-trinh" ? "open" : ""}`}>
                                    <hr className="cs-body-divider" />
                                    <div className="cs-steps">
                                        {[
                                            {
                                                num: "1",
                                                title: "Liên hệ yêu cầu đổi / trả",
                                                desc: "Gọi hotline 1800 xxxx hoặc nhắn tin qua email / fanpage trong thời hạn quy định. Cung cấp mã đơn hàng và lý do yêu cầu.",
                                            },
                                            {
                                                num: "2",
                                                title: "Xác nhận & gửi ảnh sản phẩm",
                                                desc: "Nhân viên hỗ trợ sẽ liên hệ xác nhận. Khách hàng gửi ảnh/video sản phẩm lỗi (nếu có) trong vòng 24 giờ.",
                                            },
                                            {
                                                num: "3",
                                                title: "Gửi hàng về kho",
                                                desc: "Đóng gói sản phẩm cẩn thận, ghi rõ mã đơn hàng bên ngoài kiện hàng và gửi về địa chỉ kho chúng tôi cung cấp. Phí ship chiều về do Bookstore chi trả nếu lỗi từ phía chúng tôi.",
                                            },
                                            {
                                                num: "4",
                                                title: "Kiểm tra & xử lý",
                                                desc: "Kho nhận hàng trong 1–2 ngày làm việc. Sau khi kiểm tra, chúng tôi giao sách mới (đổi) hoặc hoàn tiền (trả) trong 3–5 ngày làm việc.",
                                            },
                                            {
                                                num: "5",
                                                title: "Hoàn tất",
                                                desc: "Bạn nhận sách mới hoặc tiền hoàn về tài khoản / ví. Chúng tôi gửi thông báo xác nhận qua email.",
                                            },
                                        ].map((step, i, arr) => (
                                            <React.Fragment key={i}>
                                                <div className="cs-step">
                                                    <div className="cs-step-num">{step.num}</div>
                                                    <div className="cs-step-text">
                                                        <div className="cs-step-title">{step.title}</div>
                                                        <div className="cs-step-desc">{step.desc}</div>
                                                    </div>
                                                </div>
                                                {i < arr.length - 1 && <div className="cs-step-connector" />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Không áp dụng */}
                            <div className="cs-section cs-fade cs-d3" id="cs-sec-khong-ap-dung">
                                <div className="cs-section-header" onClick={() => toggleSection("khong-ap-dung")}>
                                    <div className="cs-section-icon icon-red">🚫</div>
                                    <h2 className="cs-section-title">Trường hợp không được đổi trả</h2>
                                    <span className={`cs-section-chevron ${openSection === "khong-ap-dung" ? "open" : ""}`}>▼</span>
                                </div>
                                <div className={`cs-section-body ${openSection === "khong-ap-dung" ? "open" : ""}`}>
                                    <hr className="cs-body-divider" />
                                    <ul className="cs-list">
                                        {[
                                            "Sản phẩm đã qua sử dụng, có vết bút, gạch chân, ghi chú trong sách.",
                                            "Bị rách bìa, ướt, ố vàng, hư hỏng do lỗi của khách hàng.",
                                            "Tem niêm phong bị mở hoặc đã tháo bao bì.",
                                            "Sách điện tử, file PDF, nội dung số đã kích hoạt.",
                                            "Quà tặng kèm theo đơn hàng khuyến mãi.",
                                            "Yêu cầu đổi trả vượt quá thời hạn quy định.",
                                            "Không có hóa đơn hoặc thông tin đơn hàng xác minh.",
                                            "Sản phẩm thuộc chương trình thanh lý, giảm giá sâu trên 50%.",
                                        ].map((text, i) => (
                                            <li key={i} className="cs-list-item">
                                                <span className="cs-list-dot dot-red">✕</span>
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="cs-note" style={{ marginTop: '1.2rem' }}>
                                        <span className="cs-note-icon">⚠️</span>
                                        <span>Trong trường hợp có tranh chấp, Bookstore có quyền quyết định cuối cùng dựa trên bằng chứng từ cả hai phía và chính sách hiện hành.</span>
                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChinhSachDoiTra;
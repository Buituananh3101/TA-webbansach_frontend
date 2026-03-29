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
    --card-bg: rgba(255,255,255,0.82);
    --shadow-sm: 0 2px 12px rgba(26,18,8,0.07);
    --shadow-lg: 0 20px 60px rgba(26,18,8,0.13);
    --radius: 20px;
    --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  /* ---- Page wrapper ---- */
  .pt-page {
    min-height: 100vh;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    position: relative;
    overflow-x: hidden;
  }

  /* Grain texture */
  .pt-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  /* ---- Hero ---- */
  .pt-hero {
    position: relative;
    z-index: 1;
    background: var(--ink);
    padding: 5.5rem 0 4rem;
    text-align: center;
    overflow: hidden;
  }
  .pt-hero::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(192,57,43,0.20) 0%, transparent 65%);
    top: -200px; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .pt-hero::after {
    content: '';
    position: absolute;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(212,168,67,0.13) 0%, transparent 65%);
    bottom: -100px; left: 8%;
    pointer-events: none;
  }
  .pt-hero-inner { position: relative; z-index: 1; }

  .pt-eyebrow {
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
  .pt-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 700;
    color: white;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .pt-hero-title em { font-style: italic; color: var(--gold); }
  .pt-hero-sub {
    font-size: 0.97rem;
    color: rgba(255,255,255,0.50);
    max-width: 500px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  /* Pill thống kê ngang */
  .pt-hero-pills {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .pt-hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    background: rgba(255,255,255,0.04);
  }
  .pt-hero-pill-icon { font-size: 0.95rem; }

  /* ---- Tabs navigation ---- */
  .pt-tabs-wrap {
    position: relative;
    z-index: 2;
    background: white;
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .pt-tabs {
    display: flex;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .pt-tabs::-webkit-scrollbar { display: none; }
  .pt-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.6rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--muted);
    border: none;
    background: none;
    cursor: pointer;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color var(--transition), border-color var(--transition);
    font-family: 'DM Sans', sans-serif;
  }
  .pt-tab:hover { color: var(--ink); }
  .pt-tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
  .pt-tab-icon { font-size: 1rem; }

  /* ---- Main layout ---- */
  .pt-body {
    position: relative;
    z-index: 1;
    padding: 3rem 0 5rem;
  }

  /* ---- Section title ---- */
  .pt-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
  }
  .pt-section-sub {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0 0 2rem;
    line-height: 1.65;
  }

  /* ---- Payment method cards ---- */
  .pt-methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  }

  .pt-method-card {
    background: var(--card-bg);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 1.6rem;
    cursor: pointer;
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    position: relative;
    overflow: hidden;
  }
  .pt-method-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%);
    pointer-events: none;
  }
  .pt-method-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(192,57,43,0.20);
  }
  .pt-method-card.selected {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(192,57,43,0.10), var(--shadow-sm);
  }

  /* Logo vùng */
  .pt-method-logo {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    position: relative;
  }

  .pt-method-name {
    font-weight: 600;
    font-size: 0.97rem;
    color: var(--ink);
    margin-bottom: 0.3rem;
  }
  .pt-method-desc {
    font-size: 0.83rem;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  /* Tag "phổ biến" */
  .pt-popular-tag {
    position: absolute;
    top: 1rem; right: 1rem;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(192,57,43,0.08);
    border: 1px solid rgba(192,57,43,0.18);
    border-radius: 100px;
    padding: 0.2rem 0.6rem;
  }

  /* Checkmark khi selected */
  .pt-check {
    position: absolute;
    top: 1rem; right: 1rem;
    width: 22px; height: 22px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.7rem;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity var(--transition), transform var(--transition);
  }
  .pt-method-card.selected .pt-check {
    opacity: 1;
    transform: scale(1);
  }

  /* ---- Detail panel (hiện khi chọn phương thức) ---- */
  .pt-detail-panel {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    margin-bottom: 2.5rem;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease, margin 0.3s ease;
  }
  .pt-detail-panel.visible {
    max-height: 600px;
    opacity: 1;
  }
  .pt-detail-inner { padding: 2rem; }
  .pt-detail-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.4rem;
  }
  .pt-detail-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  .pt-detail-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.2rem;
  }
  .pt-detail-sub {
    font-size: 0.83rem;
    color: var(--muted);
    margin: 0;
  }

  /* Steps trong detail */
  .pt-steps { display: flex; flex-direction: column; gap: 0.9rem; }
  .pt-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .pt-step-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--gold);
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 0.82rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .pt-step-text {
    font-size: 0.88rem;
    color: #4a3f33;
    line-height: 1.65;
    padding-top: 3px;
  }
  .pt-step-text strong { color: var(--ink); }

  /* Note trong detail */
  .pt-note {
    background: rgba(212,168,67,0.08);
    border: 1px solid rgba(212,168,67,0.22);
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    font-size: 0.85rem;
    color: #78530a;
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    margin-top: 1.2rem;
  }
  .pt-note-icon { flex-shrink: 0; }

  /* ---- Info boxes hàng dưới ---- */
  .pt-info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  }
  .pt-info-box {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.6rem;
    box-shadow: var(--shadow-sm);
  }
  .pt-info-box-icon {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }
  .pt-info-box-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.5rem;
  }
  .pt-info-box-text {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.65;
    margin: 0;
  }

  /* ---- CTA cuối trang ---- */
  .pt-cta {
    background: var(--ink);
    border-radius: var(--radius);
    padding: 3rem 2.5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }
  .pt-cta::before {
    content: '';
    position: absolute;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(192,57,43,0.20) 0%, transparent 70%);
    top: -120px; right: 60px;
    pointer-events: none;
  }
  .pt-cta-text { position: relative; z-index: 1; }
  .pt-cta-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem;
    line-height: 1.3;
  }
  .pt-cta-sub {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.45);
    margin: 0;
  }
  .pt-cta-action { position: relative; z-index: 1; }
  .pt-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 1.8rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
    box-shadow: 0 8px 24px rgba(192,57,43,0.35);
  }
  .pt-cta-btn:hover {
    background: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(192,57,43,0.45);
  }

  /* ---- Màu icon nền theo loại ---- */
  .bg-blue   { background: rgba(59,130,246,0.10);  color: #2563eb; }
  .bg-green  { background: rgba(74,222,128,0.10);  color: #16a34a; }
  .bg-purple { background: rgba(139,92,246,0.10);  color: #7c3aed; }
  .bg-orange { background: rgba(249,115,22,0.10);  color: #ea580c; }
  .bg-teal   { background: rgba(20,184,166,0.10);  color: #0d9488; }
  .bg-pink   { background: rgba(236,72,153,0.10);  color: #db2777; }
  .bg-red    { background: rgba(192,57,43,0.10);   color: var(--accent); }
  .bg-gold   { background: rgba(212,168,67,0.12);  color: #b45309; }

  /* ---- Fade animations ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pt-fade  { animation: fadeUp 0.55s ease both; }
  .pt-d1    { animation-delay: 0.06s; }
  .pt-d2    { animation-delay: 0.14s; }
  .pt-d3    { animation-delay: 0.22s; }
  .pt-d4    { animation-delay: 0.30s; }

  /* ---- Responsive ---- */
  @media (max-width: 860px) {
    .pt-info-grid { grid-template-columns: 1fr; }
    .pt-cta { grid-template-columns: 1fr; }
    .pt-cta-action { display: flex; justify-content: flex-start; }
  }
  @media (max-width: 600px) {
    .pt-methods-grid { grid-template-columns: 1fr; }
  }
`;

/* =====================================================================
   Dữ liệu phương thức thanh toán
   ===================================================================== */
interface Method {
    id: string;
    icon: string;
    colorClass: string;
    name: string;
    desc: string;
    popular?: boolean;
    steps: string[];
    note?: string;
}

const allMethods: Record<string, Method[]> = {
    "online": [
        {
            id: "momo",
            icon: "💜",
            colorClass: "bg-pink",
            name: "Ví MoMo",
            desc: "Thanh toán nhanh qua ứng dụng MoMo, nhận hoàn tiền xu MoMo.",
            popular: true,
            steps: [
                "Chọn <strong>Ví MoMo</strong> tại trang thanh toán.",
                "Quét mã QR bằng app MoMo hoặc nhập số điện thoại liên kết.",
                "Xác nhận thanh toán bằng mã PIN / vân tay trong app.",
                "Nhận xác nhận đơn hàng qua email trong vòng vài giây.",
            ],
            note: "Áp dụng ưu đãi hoàn tiền khi liên kết tài khoản MoMo lần đầu.",
        },
        {
            id: "zalopay",
            icon: "🔵",
            colorClass: "bg-blue",
            name: "ZaloPay",
            desc: "Thanh toán qua ZaloPay, hỗ trợ liên kết thẻ ATM và thẻ quốc tế.",
            popular: true,
            steps: [
                "Chọn <strong>ZaloPay</strong> tại trang thanh toán.",
                "Đăng nhập tài khoản ZaloPay hoặc quét mã QR.",
                "Xác nhận giao dịch bằng mã OTP hoặc sinh trắc học.",
                "Đơn hàng được xác nhận ngay lập tức.",
            ],
        },
        {
            id: "vnpay",
            icon: "🏦",
            colorClass: "bg-blue",
            name: "VNPay QR",
            desc: "Quét mã VNPay từ hơn 40 ngân hàng và ví điện tử tại Việt Nam.",
            steps: [
                "Chọn <strong>VNPay QR</strong> tại trang thanh toán.",
                "Mở app ngân hàng bất kỳ hỗ trợ VNPay và chọn <strong>Quét QR</strong>.",
                "Quét mã QR hiển thị trên màn hình.",
                "Xác nhận số tiền và hoàn tất giao dịch.",
            ],
            note: "Hỗ trợ hơn 40 ngân hàng nội địa và ví điện tử.",
        },
        {
            id: "shopeepay",
            icon: "🧡",
            colorClass: "bg-orange",
            name: "ShopeePay",
            desc: "Thanh toán qua ShopeePay, tích điểm và nhận voucher Shopee.",
            steps: [
                "Chọn <strong>ShopeePay</strong> và đăng nhập tài khoản Shopee.",
                "Xác nhận số dư ShopeePay đủ để thanh toán.",
                "Nhập mã PIN xác nhận giao dịch.",
                "Đơn hàng xác nhận và điểm thưởng được cộng tự động.",
            ],
        },
    ],
    "card": [
        {
            id: "visa",
            icon: "💳",
            colorClass: "bg-blue",
            name: "Thẻ Visa / Mastercard",
            desc: "Thanh toán bằng thẻ tín dụng / ghi nợ Visa, Mastercard, JCB quốc tế.",
            popular: true,
            steps: [
                "Chọn <strong>Thẻ quốc tế</strong> và nhập số thẻ, ngày hết hạn, CVV.",
                "Nhập tên chủ thẻ đúng như in trên thẻ.",
                "Xác thực 3D Secure qua OTP gửi về số điện thoại đăng ký.",
                "Giao dịch hoàn tất, đơn hàng được xác nhận.",
            ],
            note: "Thông tin thẻ được mã hóa SSL 256-bit. Bookstore không lưu trữ dữ liệu thẻ.",
        },
        {
            id: "atm",
            icon: "🏧",
            colorClass: "bg-green",
            name: "Thẻ ATM nội địa",
            desc: "Thanh toán trực tiếp bằng thẻ ATM có đăng ký Internet Banking.",
            steps: [
                "Chọn <strong>Thẻ ATM / Internet Banking</strong> và chọn ngân hàng.",
                "Đăng nhập Internet Banking của ngân hàng đó.",
                "Xác nhận giao dịch qua OTP hoặc Smart OTP.",
                "Quay lại trang Bookstore, đơn hàng tự động cập nhật.",
            ],
        },
        {
            id: "installment",
            icon: "📅",
            colorClass: "bg-purple",
            name: "Trả góp 0% lãi suất",
            desc: "Mua sách trả góp qua thẻ tín dụng, phân kỳ 3–12 tháng, 0% lãi suất.",
            steps: [
                "Chọn <strong>Trả góp 0%</strong> và chọn số tháng phân kỳ (3 / 6 / 12 tháng).",
                "Nhập thông tin thẻ tín dụng hỗ trợ trả góp.",
                "Xác nhận giao dịch qua OTP ngân hàng.",
                "Hệ thống tự động phân kỳ hàng tháng vào ngày sao kê.",
            ],
            note: "Áp dụng cho đơn hàng từ 500.000đ trở lên. Hỗ trợ: Vietcombank, Techcombank, BIDV, VPBank, MB Bank.",
        },
    ],
    "offline": [
        {
            id: "cod",
            icon: "🚚",
            colorClass: "bg-green",
            name: "Thanh toán khi nhận hàng (COD)",
            desc: "Nhận sách trước, thanh toán tiền mặt trực tiếp cho shipper khi giao.",
            popular: true,
            steps: [
                "Chọn <strong>COD</strong> khi đặt hàng, không cần thông tin thẻ.",
                "Đơn hàng được xác nhận và chuyển xử lý ngay.",
                "Shipper giao sách tận nơi, bạn kiểm tra hàng.",
                "Thanh toán tiền mặt đúng số tiền trên đơn hàng cho shipper.",
            ],
            note: "COD hiện áp dụng trong nội thành Hà Nội, TP.HCM và các tỉnh thành chính. Phí COD: 10.000đ/đơn.",
        },
        {
            id: "bank-transfer",
            icon: "🏦",
            colorClass: "bg-teal",
            name: "Chuyển khoản ngân hàng",
            desc: "Chuyển khoản trực tiếp qua số tài khoản Bookstore, đơn hàng xử lý sau khi xác nhận.",
            steps: [
                "Chọn <strong>Chuyển khoản</strong> và ghi nhớ thông tin tài khoản hiển thị.",
                "Thực hiện chuyển khoản với nội dung: <strong>Mã đơn hàng</strong> của bạn.",
                "Gửi ảnh chụp màn hình biên lai cho Bookstore qua email hoặc hotline.",
                "Đơn hàng được xác nhận và xử lý trong vòng 2 giờ làm việc.",
            ],
            note: "Nội dung chuyển khoản phải ghi đúng mã đơn hàng để hệ thống tự động xác nhận.",
        },
    ],
};

const tabs = [
    { id: "online",  label: "Ví điện tử", icon: "📱" },
    { id: "card",    label: "Thẻ ngân hàng", icon: "💳" },
    { id: "offline", label: "Thanh toán offline", icon: "🏪" },
];

/* =====================================================================
   Component chính
   ===================================================================== */
function PhuongThucThanhToan() {

    // Tab đang chọn
    const [activeTab, setActiveTab] = useState<string>("online");

    // Phương thức đang chọn để xem chi tiết
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const currentMethods = allMethods[activeTab] || [];

    const selectedData = Object.values(allMethods)
        .flat()
        .find(m => m.id === selectedMethod) || null;

    const handleSelectMethod = (id: string) => {
        setSelectedMethod(prev => prev === id ? null : id);
    };

    return (
        <>
            <style>{styles}</style>

            <div className="pt-page">

                {/* ---- Hero ---- */}
                <div className="pt-hero">
                    <div className="container pt-hero-inner">
                        <div className="pt-eyebrow pt-fade">✦ Hướng dẫn thanh toán</div>
                        <h1 className="pt-hero-title pt-fade pt-d1">
                            Phương thức <em>Thanh toán</em>
                        </h1>
                        <p className="pt-hero-sub pt-fade pt-d2">
                            Chúng tôi hỗ trợ đa dạng hình thức thanh toán — nhanh chóng, an toàn và tiện lợi.
                            Chọn phương thức phù hợp nhất với bạn.
                        </p>
                        <div className="pt-hero-pills pt-fade pt-d3">
                            <span className="pt-hero-pill"><span className="pt-hero-pill-icon">🔒</span> Bảo mật SSL 256-bit</span>
                            <span className="pt-hero-pill"><span className="pt-hero-pill-icon">⚡</span> Xác nhận tức thì</span>
                            <span className="pt-hero-pill"><span className="pt-hero-pill-icon">🎁</span> Nhiều ưu đãi hoàn tiền</span>
                        </div>
                    </div>
                </div>

                {/* ---- Tabs ---- */}
                <div className="pt-tabs-wrap">
                    <div className="container">
                        <div className="pt-tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`pt-tab ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setSelectedMethod(null);
                                    }}
                                >
                                    <span className="pt-tab-icon">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---- Body ---- */}
                <div className="pt-body">
                    <div className="container">

                        {/* Tiêu đề section */}
                        <div className="pt-fade">
                            <h2 className="pt-section-title">
                                {tabs.find(t => t.id === activeTab)?.icon}{" "}
                                {tabs.find(t => t.id === activeTab)?.label}
                            </h2>
                            <p className="pt-section-sub">
                                Nhấn vào phương thức để xem hướng dẫn chi tiết từng bước.
                            </p>
                        </div>

                        {/* Cards phương thức */}
                        <div className="pt-methods-grid">
                            {currentMethods.map((method, i) => (
                                <div
                                    key={method.id}
                                    className={`pt-method-card pt-fade ${i === 0 ? "pt-d1" : i === 1 ? "pt-d2" : "pt-d3"} ${selectedMethod === method.id ? "selected" : ""}`}
                                    onClick={() => handleSelectMethod(method.id)}
                                >
                                    {/* Tag phổ biến */}
                                    {method.popular && selectedMethod !== method.id && (
                                        <div className="pt-popular-tag">Phổ biến</div>
                                    )}

                                    {/* Checkmark khi selected */}
                                    <div className="pt-check">✓</div>

                                    <div className={`pt-method-logo ${method.colorClass}`}>
                                        {method.icon}
                                    </div>
                                    <div className="pt-method-name">{method.name}</div>
                                    <p className="pt-method-desc">{method.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Detail panel — hiển thị khi chọn phương thức */}
                        <div className={`pt-detail-panel ${selectedData ? "visible" : ""}`}>
                            {selectedData && (
                                <div className="pt-detail-inner">
                                    <div className="pt-detail-header">
                                        <div className={`pt-detail-icon ${selectedData.colorClass}`}>
                                            {selectedData.icon}
                                        </div>
                                        <div>
                                            <div className="pt-detail-title">Hướng dẫn: {selectedData.name}</div>
                                            <div className="pt-detail-sub">{selectedData.desc}</div>
                                        </div>
                                    </div>

                                    <div className="pt-steps">
                                        {selectedData.steps.map((step, i) => (
                                            <div key={i} className="pt-step">
                                                <div className="pt-step-num">{i + 1}</div>
                                                <div
                                                    className="pt-step-text"
                                                    dangerouslySetInnerHTML={{ __html: step }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {selectedData.note && (
                                        <div className="pt-note">
                                            <span className="pt-note-icon">💡</span>
                                            <span>{selectedData.note}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ---- Info boxes ---- */}
                        <div className="pt-info-grid pt-fade pt-d2">
                            <div className="pt-info-box">
                                <div className="pt-info-box-icon">🔒</div>
                                <div className="pt-info-box-title">Bảo mật tuyệt đối</div>
                                <p className="pt-info-box-text">
                                    Mọi giao dịch đều được mã hóa SSL 256-bit. Bookstore không lưu trữ thông tin thẻ ngân hàng của bạn.
                                </p>
                            </div>
                            <div className="pt-info-box">
                                <div className="pt-info-box-icon">↩️</div>
                                <div className="pt-info-box-title">Hoàn tiền dễ dàng</div>
                                <p className="pt-info-box-text">
                                    Đổi trả hàng thành công, tiền được hoàn về đúng phương thức thanh toán ban đầu trong 3–5 ngày làm việc.
                                </p>
                            </div>
                            <div className="pt-info-box">
                                <div className="pt-info-box-icon">🎁</div>
                                <div className="pt-info-box-title">Ưu đãi độc quyền</div>
                                <p className="pt-info-box-text">
                                    Nhiều mã giảm giá dành riêng cho từng phương thức thanh toán. Kiểm tra trang Khuyến mãi để không bỏ lỡ.
                                </p>
                            </div>
                        </div>

                        {/* ---- CTA ---- */}
                        <div className="pt-cta pt-fade pt-d3">
                            <div className="pt-cta-text">
                                <div className="pt-cta-title">Gặp sự cố khi thanh toán?</div>
                                <p className="pt-cta-sub">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24/7.</p>
                            </div>
                            <div className="pt-cta-action">
                                <button className="pt-cta-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    Liên hệ hỗ trợ
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default PhuongThucThanhToan;
import React from "react";

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
  .ab-page {
    min-height: 100vh;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    position: relative;
    overflow-x: hidden;
  }

  /* Grain texture overlay */
  .ab-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  /* ---- Hero section ---- */
  .ab-hero {
    position: relative;
    z-index: 1;
    padding: 7rem 0 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .ab-hero-text {}

  .ab-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(192,57,43,0.08);
    border: 1px solid rgba(192,57,43,0.18);
    border-radius: 100px;
    padding: 0.3rem 1rem;
    margin-bottom: 1.4rem;
  }

  .ab-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 4vw, 3.4rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0 0 1.4rem;
  }
  .ab-hero-title em {
    font-style: italic;
    color: var(--accent);
  }

  .ab-hero-lead {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--muted);
    margin: 0 0 1rem;
    max-width: 480px;
  }

  .ab-hero-body {
    font-size: 0.93rem;
    line-height: 1.8;
    color: #5a4f43;
    max-width: 480px;
  }

  /* Decorative quote mark */
  .ab-quote-deco {
    font-family: 'Playfair Display', serif;
    font-size: 7rem;
    line-height: 0.6;
    color: rgba(192,57,43,0.10);
    user-select: none;
    margin-bottom: -0.5rem;
  }

  .ab-hero-image {
    position: relative;
  }
  .ab-hero-image img {
    width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    object-fit: cover;
    aspect-ratio: 4/3;
    display: block;
  }

  /* Floating stat pill */
  .ab-stat-pill {
    position: absolute;
    bottom: -1.5rem;
    left: -1.5rem;
    background: white;
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.8rem 1.4rem;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    backdrop-filter: blur(12px);
  }
  .ab-stat-pill-icon {
    font-size: 1.4rem;
  }
  .ab-stat-pill-text {
    display: flex;
    flex-direction: column;
  }
  .ab-stat-pill-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
    color: var(--ink);
  }
  .ab-stat-pill-label {
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.04em;
  }

  /* ---- Divider ---- */
  .ab-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0;
    position: relative;
    z-index: 1;
  }

  /* ---- Values section ---- */
  .ab-values {
    position: relative;
    z-index: 1;
    padding: 5rem 0;
  }

  .ab-section-header {
    text-align: center;
    margin-bottom: 3.5rem;
  }
  .ab-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    margin: 0.4rem 0 0.8rem;
    letter-spacing: -0.01em;
  }
  .ab-section-sub {
    font-size: 0.95rem;
    color: var(--muted);
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Cards grid */
  .ab-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .ab-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem 1.8rem;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    position: relative;
    overflow: hidden;
  }
  .ab-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition);
    border-radius: 0 0 var(--radius) var(--radius);
  }
  .ab-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(192,57,43,0.15);
  }
  .ab-card:hover::before { transform: scaleX(1); }

  .ab-card-icon {
    width: 48px;
    height: 48px;
    background: rgba(192,57,43,0.08);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    font-size: 1.3rem;
    color: var(--accent);
  }
  .ab-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.6rem;
  }
  .ab-card-body {
    font-size: 0.88rem;
    line-height: 1.75;
    color: var(--muted);
    margin: 0;
  }

  /* ---- CTA section ---- */
  .ab-cta {
    position: relative;
    z-index: 1;
    margin-bottom: 5rem;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--ink);
    padding: 4rem 3rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: center;
    box-shadow: var(--shadow-lg);
  }

  /* Decorative circles */
  .ab-cta::before, .ab-cta::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .ab-cta::before {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(192,57,43,0.25) 0%, transparent 70%);
    top: -100px; right: 100px;
  }
  .ab-cta::after {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%);
    bottom: -80px; left: 50px;
  }

  .ab-cta-text { position: relative; z-index: 1; }
  .ab-cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 2.5vw, 2.1rem);
    font-weight: 700;
    color: white;
    margin: 0 0 0.8rem;
    line-height: 1.25;
  }
  .ab-cta-sub {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.55);
    margin: 0;
    line-height: 1.7;
  }

  .ab-cta-action { position: relative; z-index: 1; flex-shrink: 0; }
  .ab-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.95rem 2rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    white-space: nowrap;
    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
    box-shadow: 0 8px 24px rgba(192,57,43,0.35);
  }
  .ab-cta-btn:hover {
    background: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(192,57,43,0.45);
  }
  .ab-cta-btn svg { width: 16px; height: 16px; }

  /* ---- Fade animations ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ab-fade   { animation: fadeUp 0.6s ease both; }
  .ab-d1     { animation-delay: 0.06s; }
  .ab-d2     { animation-delay: 0.14s; }
  .ab-d3     { animation-delay: 0.22s; }
  .ab-d4     { animation-delay: 0.30s; }

  /* ---- Responsive ---- */
  @media (max-width: 900px) {
    .ab-hero   { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 0 3rem; }
    .ab-cards  { grid-template-columns: 1fr; }
    .ab-cta    { grid-template-columns: 1fr; text-align: center; }
    .ab-cta-action { display: flex; justify-content: center; }
    .ab-stat-pill { left: 50%; transform: translateX(-50%); }
  }
`;

function About() {
    return (
        // Nền xanh dương cực nhạt để tạo cảm giác tươi mát, rộng rãi
        <>
            <style>{styles}</style>

            <div className="ab-page">
                <div className="container">

                    {/* Phần 1: Giới thiệu chung */}
                    <div className="ab-hero">
                        <div className="ab-hero-text">
                            <div className="ab-eyebrow ab-fade">✦ Về chúng tôi</div>
                            <div className="ab-quote-deco ab-fade ab-d1">"</div>
                            {/* Tiêu đề màu xanh dương đậm (primary) */}
                            <h1 className="ab-hero-title ab-fade ab-d1">
                                Chào mừng đến với <em>Bookstore</em>
                            </h1>
                            <p className="ab-hero-lead ab-fade ab-d2">
                                Nơi kết nối những tâm hồn yêu sách và lan tỏa tri thức đến mọi người.
                                Chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra một thế giới mới.
                            </p>
                            <p className="ab-hero-body ab-fade ab-d3">
                                Được thành lập từ năm 2024, Bookstore không chỉ là một cửa hàng trực tuyến,
                                mà là một cộng đồng dành cho những người đam mê đọc sách. Chúng tôi cung cấp
                                hàng ngàn đầu sách đa dạng từ văn học, kinh tế đến kỹ năng sống.
                            </p>
                        </div>

                        <div className="ab-hero-image ab-fade ab-d2">
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Về chúng tôi"
                            />
                            {/* Floating stat pill */}
                            <div className="ab-stat-pill ab-fade ab-d4">
                                <span className="ab-stat-pill-icon">📚</span>
                                <div className="ab-stat-pill-text">
                                    <span className="ab-stat-pill-num">10,000+</span>
                                    <span className="ab-stat-pill-label">Đầu sách</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="ab-divider" />

                    {/* Phần 2: Các giá trị / Dịch vụ */}
                    <div className="ab-values">
                        <div className="ab-section-header ab-fade">
                            <div className="ab-eyebrow">✦ Cam kết của chúng tôi</div>
                            <h2 className="ab-section-title">Vì sao chọn Bookstore?</h2>
                            <p className="ab-section-sub">
                                Chúng tôi đặt trải nghiệm của bạn lên hàng đầu — từ lúc chọn sách đến khi sách đến tay.
                            </p>
                        </div>

                        {/* Nền trắng thẻ card, có đường viền dưới màu xanh dương tạo điểm nhấn rất sang */}
                        <div className="ab-cards">
                            <div className="ab-card ab-fade ab-d1">
                                <div className="ab-card-icon">
                                    <i className="fas fa-truck"></i>
                                </div>
                                <h3 className="ab-card-title">Giao hàng nhanh</h3>
                                <p className="ab-card-body">Cam kết giao hàng tận tay bạn trong thời gian ngắn nhất với sự cẩn thận tối đa.</p>
                            </div>

                            <div className="ab-card ab-fade ab-d2">
                                <div className="ab-card-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3 className="ab-card-title">Chất lượng</h3>
                                <p className="ab-card-body">Tất cả sách đều là bản in chính hãng, chất lượng giấy và mực in đạt chuẩn tốt nhất.</p>
                            </div>

                            <div className="ab-card ab-fade ab-d3">
                                <div className="ab-card-icon">
                                    <i className="fas fa-headset"></i>
                                </div>
                                <h3 className="ab-card-title">Hỗ trợ 24/7</h3>
                                <p className="ab-card-body">Đội ngũ tư vấn viên luôn sẵn sàng giải đáp mọi thắc mắc của bạn bất cứ lúc nào.</p>
                            </div>
                        </div>
                    </div>

                    {/* Phần 3: Lời kêu gọi hành động (Call to Action) */}
                    {/* Dùng bg-gradient để màu xanh nổi khối đẹp hơn */}
                    <div className="ab-cta ab-fade">
                        <div className="ab-cta-text">
                            <h2 className="ab-cta-title">Bạn đang tìm kiếm một cuốn sách cụ thể?</h2>
                            <p className="ab-cta-sub">Hãy để chúng tôi giúp bạn tìm thấy người bạn đồng hành tri thức tiếp theo.</p>
                        </div>
                        <div className="ab-cta-action">
                            <button className="ab-cta-btn">
                                {/* Mail icon */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                Liên hệ ngay
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About;
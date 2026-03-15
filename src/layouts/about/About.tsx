import React from "react";

function About() {
    return (
        // Nền xanh dương cực nhạt để tạo cảm giác tươi mát, rộng rãi
        <div className="container-fluid py-5" style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
            <div className="container my-5">
                
                {/* Phần 1: Giới thiệu chung */}
                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        {/* Tiêu đề màu xanh dương đậm (primary) */}
                        <h1 className="display-4 fw-bold text-primary mb-4">Chào mừng đến với Bookstore</h1>
                        <p className="lead text-secondary">
                            Nơi kết nối những tâm hồn yêu sách và lan tỏa tri thức đến mọi người. 
                            Chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra một thế giới mới.
                        </p>
                        <p className="text-secondary">
                            Được thành lập từ năm 2024, Bookstore không chỉ là một cửa hàng trực tuyến, 
                            mà là một cộng đồng dành cho những người đam mê đọc sách. Chúng tôi cung cấp 
                            hàng ngàn đầu sách đa dạng từ văn học, kinh tế đến kỹ năng sống.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <img 
                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Về chúng tôi" 
                            className="img-fluid rounded-4 shadow-lg border border-primary border-opacity-25"
                        />
                    </div>
                </div>

                {/* Phần 2: Các giá trị / Dịch vụ */}
                <div className="row text-center g-4 mb-5">
                    <div className="col-md-4">
                        {/* Nền trắng thẻ card, có đường viền dưới màu xanh dương tạo điểm nhấn rất sang */}
                        <div className="p-4 border-0 rounded-4 h-100 shadow-sm bg-white" style={{ borderBottom: '5px solid #0d6efd' }}>
                            <i className="fas fa-truck fa-3x text-primary mb-3"></i>
                            <h3 className="fw-bold" style={{ color: '#004085' }}>Giao hàng nhanh</h3>
                            <p className="text-muted mb-0">Cam kết giao hàng tận tay bạn trong thời gian ngắn nhất với sự cẩn thận tối đa.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border-0 rounded-4 h-100 shadow-sm bg-white" style={{ borderBottom: '5px solid #0d6efd' }}>
                            <i className="fas fa-check-circle fa-3x text-primary mb-3"></i>
                            <h3 className="fw-bold" style={{ color: '#004085' }}>Chất lượng</h3>
                            <p className="text-muted mb-0">Tất cả sách đều là bản in chính hãng, chất lượng giấy và mực in đạt chuẩn tốt nhất.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-4 border-0 rounded-4 h-100 shadow-sm bg-white" style={{ borderBottom: '5px solid #0d6efd' }}>
                            <i className="fas fa-headset fa-3x text-primary mb-3"></i>
                            <h3 className="fw-bold" style={{ color: '#004085' }}>Hỗ trợ 24/7</h3>
                            <p className="text-muted mb-0">Đội ngũ tư vấn viên luôn sẵn sàng giải đáp mọi thắc mắc của bạn bất cứ lúc nào.</p>
                        </div>
                    </div>
                </div>

                {/* Phần 3: Lời kêu gọi hành động (Call to Action) */}
                {/* Dùng bg-gradient để màu xanh nổi khối đẹp hơn */}
                <div className="bg-primary bg-gradient text-white p-5 rounded-4 text-center shadow-lg">
                    <h2 className="mb-3 fw-bold">Bạn đang tìm kiếm một cuốn sách cụ thể?</h2>
                    <p className="mb-4 fs-5 text-white-50">Hãy để chúng tôi giúp bạn tìm thấy người bạn đồng hành tri thức tiếp theo.</p>
                    <button className="btn btn-light btn-lg px-5 text-primary fw-bold shadow-sm">Liên hệ ngay</button>
                </div>

            </div>
        </div>
    )
}

export default About;
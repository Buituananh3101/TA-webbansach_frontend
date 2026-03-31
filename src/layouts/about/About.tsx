import React from "react";
import RequireAdmin from "../admin/RequireAdmin";

const TrangDonGian: React.FC = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-sm border-0 rounded-3">
                <div className="card-header bg-primary text-white py-3">
                    <h3 className="card-title mb-0 text-center">
                        <i className="bi bi-info-circle me-2"></i>Trang Đơn Giản (Admin)
                    </h3>
                </div>
                <div className="card-body p-5 text-center">
                    <h2 className="text-muted">Chào mừng Admin!</h2>
                    <p className="lead">Đây là một trang nội dung đơn giản dành cho quản trị viên.</p>
                    <hr />
                    <p>Bạn có thể bắt đầu xây dựng các tính năng mới tại đây.</p>
                </div>
            </div>
        </div>
    );
};

export default RequireAdmin(TrangDonGian);
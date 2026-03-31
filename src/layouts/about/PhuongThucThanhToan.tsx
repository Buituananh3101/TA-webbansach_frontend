import React from "react";

const PhuongThucThanhToan: React.FC = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-sm border-0 rounded-3">
                <div className="card-header bg-success text-white py-3">
                    <h3 className="card-title mb-0 text-center">
                        <i className="bi bi-credit-card me-2"></i>Phương Thức Thanh Toán
                    </h3>
                </div>
                <div className="card-body p-5">
                    <h4 className="text-muted mb-4">Các hình thức thanh toán được hỗ trợ:</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><i className="bi bi-cash-stack me-2 text-success"></i>Thanh toán khi nhận hàng (COD)</li>
                        <li className="list-group-item"><i className="bi bi-bank me-2 text-primary"></i>Chuyển khoản ngân hàng</li>
                        <li className="list-group-item"><i className="bi bi-wallet2 me-2 text-warning"></i>Thanh toán qua ví điện tử (Momo, ZaloPay)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PhuongThucThanhToan;
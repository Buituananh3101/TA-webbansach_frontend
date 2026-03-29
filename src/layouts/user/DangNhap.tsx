import React, { useState } from "react";

const DangNhap = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [thongBao, setThongBao] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password,
        };

        fetch("http://localhost:8080/tai-khoan/dang-nhap", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(loginRequest),
        }).then(
            (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác!");
                }
            
            }
        ).then(
            (data) => {
                const {jwt} = data;
                localStorage.setItem("token", jwt);
                setIsSuccess(true);
                setThongBao("Đăng nhập thành công!");
            }
        ).catch((error) => {
            console.error("Đăng nhập thất bại:", error);
            setIsSuccess(false);
            setThongBao(error.message);
        });
           
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mt-5">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Đăng Nhập</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {thongBao && <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>{thongBao}</div>}
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                                        Đăng nhập
                                    </button>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <p>Chưa có tài khoản? <a href="/dang-ky" className="text-decoration-none">Đăng ký ngay</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DangNhap;
import { useState } from "react";

function DangKyNguoiDung() {

    //------------------------------------------------------------------------------------------------------------------------------------
    // Biến trong form

    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState('');
    const [hoDem, setHoDem] = useState('');
    const [ten, setTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauLapLai, setMatKhauLapLai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);



    //------------------------------------------------------------------------------------------------------------------------------------
    // Các biến báo lỗi

    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState('');
    const [errorSoDienThoai, setErrorSoDienThoai] = useState('');
    const [thongBao, setThongBao] = useState('');

    //------------------------------------------------------------------------------------------------------------------------------------
    // Convert file to Base64

    // const getBase64 = (file: File): Promise<string | null> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result ? (reader.result as string).split(',')[1] : null);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };


    //------------------------------------------------------------------------------------------------------------------------------------
    // Handle

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        // Xóa 
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');
        setErrorSoDienThoai('');

        // Trách click liên tục
        e.preventDefault();

        // Kiểm tra các điều kiền và gán kết quả vào biến
        const isTenDangNhapValid = await checkLoiTenDangNhap(tenDangNhap);
        const isEmailValid = await checkLoiEmail(email);
        const isMatKhauValid = checkLoiMatKhau(matKhau);
        const isMatKhauLapLaiValid = checkLoiMatKhauLapLai(matKhauLapLai);
        const isSoDienThoaiValid = checkLoiSoDienThoai(soDienThoai);

        // Kiểm tra tất cả các điều kiện
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid && isSoDienThoaiValid) {

            // const base64Avatar = avatar ? await getBase64(avatar) : null;
            // console.log(base64Avatar);


            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        matKhau: matKhau,
                        gioiTinh: gioiTinh,
                        daKichHoat: 0,
                        maKichHoat: ""
                        // avatar: base64Avatar
                    }),
                });

                if (response.ok) {
                    setThongBao(":) Đăng ký thành công, xem email để kích hoạt tài khoản")
                } else {
                    setThongBao(":( Anh kiểm tra lại thông tin đăng ký giúp emm")
                }

                // const data = await response.json();

            } catch (error) {
                setThongBao(":( Anh kiểm tra lại thông tin đăng ký giúp emmm")

            }
        }

    }



    //------------------------------------------------------------------------------------------------------------------------------------
    // Hàm check
    // Bắt enevnt

    const checkLoiTenDangNhap = async (tenDangNhapValue: string) => {
        setErrorTenDangNhap('');
        if (tenDangNhapValue.trim() === '') {
            setErrorTenDangNhap("Tên đăng nhập không được để trống.");
            return false;
        }

        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhapValue}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại.");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập", error);
            setErrorTenDangNhap("Lỗi kết nối máy chủ.");
            return false;
        }
    }
    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(e.target.value);
        setErrorTenDangNhap('');
        return checkLoiTenDangNhap(e.target.value);
    }
    const checkLoiEmail = async (emailValue: string) => {
        setErrorEmail('');
        const trimmed = emailValue.trim().toLowerCase();

        if (trimmed === '') {
            setErrorEmail("Email không được để trống.");
            return false;
        }
        if (!trimmed.endsWith('@gmail.com')) {
            setErrorEmail("Chỉ chấp nhận địa chỉ Gmail (VD: tenban@gmail.com).");
            return false;
        }
        const localPart = trimmed.slice(0, trimmed.indexOf('@'));
        if (localPart.length < 6 || localPart.length > 30) {
            setErrorEmail("Phần tên Gmail phải có từ 6 đến 30 ký tự.");
            return false;
        }
        if (!/^[a-z0-9.]+$/.test(localPart)) {
            setErrorEmail("Gmail chỉ được dùng chữ thường (a-z), số (0-9) và dấu chấm (.).");
            return false;
        }
        if (localPart.startsWith('.') || localPart.endsWith('.')) {
            setErrorEmail("Gmail không được bắt đầu hoặc kết thúc bằng dấu chấm.");
            return false;
        }
        if (localPart.includes('..')) {
            setErrorEmail("Gmail không được có 2 dấu chấm liên tiếp (..).");
            return false;
        }
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${emailValue}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại.");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Lỗi khi kiểm tra email", error);
            setErrorEmail("Lỗi kết nối máy chủ.");
            return false;
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');
        return checkLoiEmail(e.target.value);
    }
    const checkLoiSoDienThoai = (soDienThoaiValue: string) => {
        setErrorSoDienThoai('');
        if (soDienThoaiValue.trim() === '') {
            setErrorSoDienThoai("Số điện thoại không được để trống.");
            return false;
        }

        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(soDienThoaiValue)) {
            setErrorSoDienThoai("Số điện thoại không đúng định dạng (10 số, bắt đầu bằng 03, 05, 07, 08, 09).");
            return false;
        }
        return true;
    }
    const handleSoDienThoaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoDienThoai(e.target.value);
        setErrorSoDienThoai('');
        return checkLoiSoDienThoai(e.target.value);
    }
    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhau(e.target.value);
        setErrorMatKhau('');
        return checkLoiMatKhau(e.target.value);
    }
    const checkLoiMatKhau = (matKhauValue: string) => {
        setErrorMatKhau('');
        if (matKhauValue.trim() === '') {
            setErrorMatKhau("Mật khẩu không được để trống.");
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(matKhauValue)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
            return false;
        }
        return true;
    }
    const checkLoiMatKhauLapLai = (matKhauLapLaiValue: string) => {
        setErrorMatKhauLapLai('');
        if (matKhauLapLaiValue.trim() === '') {
            setErrorMatKhauLapLai("Vui lòng nhập lại mật khẩu.");
            return false;
        }

        if (matKhauLapLaiValue !== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu nhập lại không khớp.");
            return false;
        }
        return true;
    }
    const handleMatKhauLapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauLapLai(e.target.value);
        setErrorMatKhauLapLai('');
        return checkLoiMatKhauLapLai(e.target.value);
    }

    // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const file = e.target.files[0];
    //         setAvatar(file);
    //     }
    // };



    //------------------------------------------------------------------------------------------------------------------------------------
    // Form

    return (
        <div className="container mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 mt-5">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Đăng Ký Tài Khoản</h2>
                            <form onSubmit={handleSubmit}>
                    {/* Tên đăng nhập */}
                    <div className="mb-3 text-start">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input type="text" className="form-control" id="tenDangNhap" value={tenDangNhap} onChange={handleTenDangNhapChange} />
                        <div className="mt-1" style={{ color: 'red' }}>{errorTenDangNhap}</div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">
                            Gmail <span className="text-muted small">(chỉ chấp nhận @gmail.com)</span>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="vidu@gmail.com"
                        />
                        <div className="mt-1" style={{ color: 'red' }}>{errorEmail}</div>
                    </div>
                    {/* Họ đệm, tên, giới tính */}
                    <div className="row mb-3 text-start">
                        <div className="col-md-4">
                            <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                            <input type="text" className="form-control" id="hoDem" value={hoDem} onChange={(e) => setHoDem(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="ten" className="form-label">Tên</label>
                            <input type="text" className="form-control" id="ten" value={ten} onChange={(e) => setTen(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới tính</label>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gioiTinh" id="nam" value="M" checked={gioiTinh === 'M'} onChange={(e) => setGioiTinh(e.target.value)} />
                                    <label className="form-check-label" htmlFor="nam">Nam</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gioiTinh" id="nu" value="F" checked={gioiTinh === 'F'} onChange={(e) => setGioiTinh(e.target.value)} />
                                    <label className="form-check-label" htmlFor="nu">Nữ</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Số điện thoại */}
                    <div className="mb-3 text-start">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" id="soDienThoai" value={soDienThoai} onChange={handleSoDienThoaiChange} />
                        <div className="mt-1" style={{ color: 'red' }}>{errorSoDienThoai}</div>
                    </div>
                    {/* Mật khẩu */}
                    <div className="mb-3 text-start">
                        <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" id="matKhau" value={matKhau} onChange={handleMatKhauChange} />
                        <div className="mt-1" style={{ color: 'red' }}>{errorMatKhau}</div>
                    </div>
                    {/* Nhập lại mật khẩu */}
                    <div className="mb-3 text-start">
                        <label htmlFor="matKhauLapLai" className="form-label">Nhập lại mật khẩu</label>
                        <input type="password" className="form-control" id="matKhauLapLai" value={matKhauLapLai} onChange={handleMatKhauLapLaiChange} />
                        <div className="mt-1" style={{ color: 'red' }}>{errorMatKhauLapLai}</div>
                    </div>
                    {/* Ảnh đại diện */}
                    {/* <div className="mb-3 text-start">
                        <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                        <input type="file" className="form-control" id="avatar" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                     */}
                     
                                {thongBao && (
                                    <div className={`alert ${thongBao.includes(':)') ? 'alert-success' : 'alert-danger'}`}>
                                        {thongBao}
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <p>Đã có tài khoản? <a href="/dang-nhap" className="text-decoration-none">Đăng nhập ngay</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DangKyNguoiDung;
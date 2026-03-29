import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KichHoatTaiKhoan() {
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState('');

    
    const { email, maKichHoat } = useParams<{ email: string; maKichHoat: string }>();

    useEffect(() => {
        if (email && maKichHoat) {
            thucHienKichHoat(email, maKichHoat);
        }
    }, [email, maKichHoat]);

    const thucHienKichHoat = async (emailParam: string, maKichHoatParam: string) => {
        try {
            const url: string = `http://localhost:8080/tai-khoan/kich-hoat?email=${emailParam}&maKichHoat=${maKichHoatParam}`;
            const response = await fetch(url, {
                method: "GET"
            });
            if (response.ok) {
                setDaKichHoat(true);
            } else {
                const errorText = await response.text();
                setThongBao(errorText);
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt tài khoản", error);
            setThongBao("Lỗi kết nối máy chủ, vui lòng thử lại.");
        }
    }

    return (
        <div className="container">
            <h1>Kích hoạt tài khoản</h1>
            {
                daKichHoat
                    ? (<p>Đã kích hoạt tài khoản thành công, đăng nhập rồi lướt web đi</p>)
                    : (<p>{thongBao}</p>)
            }
        </div>
    )
}

export default KichHoatTaiKhoan;
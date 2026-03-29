import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const userData: any = jwtDecode(token);
                if (userData && userData.sub) {
                    setUsername(userData.sub + "");
                }
            } catch (error) {
                console.error("Token không hợp lệ", error);
            }
        }
    }, []);

    return (
        /* Dùng class của Bootstrap để căn giữa toàn màn hình */
        <div 
            className="vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: 'linear-gradient(-45deg, #1e3c72, #2a5298, #134e5e, #71b280)',
                backgroundSize: '300% 300%',
                animation: 'gradientBG 15s ease infinite'
            }}
        >
            <style>
                {`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                /* CSS phụ trợ để làm hiệu ứng kính mờ vì Bootstrap chưa có sẵn class blur */
                .glass-card {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                /* Hiệu ứng nhấp nhô nhẹ cho icon */
                .hover-float {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                `}
            </style>

            {/* Dùng Card của Bootstrap, bo góc tròn (rounded-5), đổ bóng to (shadow-lg) */}
            <div className="card glass-card rounded-5 shadow-lg text-white text-center p-md-5 p-4 mx-3" style={{ maxWidth: '550px' }}>
                {username ? (
                    <div className="card-body">
                        <div className="display-1 mb-4 hover-float">👋</div>
                        <h1 className="card-title display-5 fw-bold mb-3">
                            Xin chào, <span className="text-info">{username}</span>!
                        </h1>
                        {/* Dùng opacity-75 của Bootstrap để chữ dịu lại */}
                        <p className="card-text fs-5 opacity-75 mb-0">
                            Thật vui khi thấy bạn quay trở lại. Chúc bạn có một ngày làm việc tuyệt vời và tràn đầy cảm hứng nhé! ✨
                        </p>
                    </div>
                ) : (
                    <div className="card-body">
                        <div className="display-1 mb-4 hover-float">🤫</div>
                        <h1 className="card-title display-5 fw-bold mb-3 text-warning">
                            Chưa nhận diện được!
                        </h1>
                        <p className="card-text fs-5 opacity-75 mb-0">
                            Có vẻ như bạn chưa đăng nhập. Hãy đăng nhập để hệ thống có thể gửi lời chào đích danh đến bạn nhé.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;
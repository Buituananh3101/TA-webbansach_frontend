import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayLoad{
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;

}

const RequireAdmin = <P extends object>(WrappedComponent: React.FC<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");
            console.log(token);


            // Chưa đăng nhập
            if (!token){
                navigate("/dang-nhap");
                return;
            }else{
                // Giải mã token
                const decodeToken = jwtDecode(token) as JwtPayLoad;
                console.log(decodeToken);

                // Lấy thông tin cụ thể
                const isAdmin = decodeToken.isAdmin;

                // Kiểm tra
                if(!isAdmin){
                    navigate("/dang-nhap");
                    return;
                }
            }}, [navigate]);

        return <WrappedComponent {...props}/>
    }
    return WithAdminCheck;

}

export default RequireAdmin;
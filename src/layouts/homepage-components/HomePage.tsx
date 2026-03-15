import React from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";
import { useParams } from "react-router-dom";

interface HomePageProps{
    tuKhoaTimKiem: string;
}


function HomePage({tuKhoaTimKiem}: HomePageProps){

    const {maTheLoai} = useParams();
    let maTheLoaiNumber=0;

    try{
        maTheLoaiNumber = parseInt(maTheLoai+'');//object->string->int // NaN
    }catch(error){
        maTheLoaiNumber=0;
        console.error(error);
    }
    if(Number.isNaN(maTheLoaiNumber)){
        maTheLoaiNumber=0;
    }




    return(
        <div>
            <Carousel/>
            <Banner/>
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber}/>
        </div>
    )
}

export default HomePage;
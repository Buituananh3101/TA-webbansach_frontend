import React from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";

interface HomePageProps{
    tuKhoaTimKiem: string;
}


function HomePage({tuKhoaTimKiem}: HomePageProps){
    return(
        <div>
            <Carousel/>
            <Banner/>
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem}/>
        </div>
    )
}

export default HomePage;
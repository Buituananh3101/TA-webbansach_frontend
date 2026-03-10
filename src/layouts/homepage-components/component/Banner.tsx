import React from "react";

function Banner() {
    return (
        <div className="p-5 mb-4 bg-dark text-white">
            <div className="container-fluid py-5 text-center">
                <h1 className="display-5 fw-bold">
                    Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu
                </h1>
                <p className="col-md-8 fs-4 mx-auto">Mary Pope Osborne</p>
                <button className="btn btn-primary btn-lg " type="button">Khám phá sách tại Bookstore</button>
            </div>
        </div>
    );
}

export default Banner;
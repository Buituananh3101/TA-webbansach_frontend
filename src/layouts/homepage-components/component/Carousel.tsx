import React from "react";

function Carousel(){
    return(
        <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={'./../../../images/book/i1.png'}  alt="..." style={{height:'250px'}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/book/i2.png'}  alt="..." style={{height:'250px'}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/book/i3.png'}  alt="..." style={{height:'250px'}} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel;
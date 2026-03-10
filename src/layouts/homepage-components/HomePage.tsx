import React from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
import List from "../product/List";

function HomePage(){
    return(
        <div>
                <Carousel/>
                <Banner/>
                <List/>
        </div>
    )
}

export default HomePage;
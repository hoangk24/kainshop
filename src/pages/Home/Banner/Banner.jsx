import React from "react";
import Slider from "react-slick";
import anh1 from "./anh1.jpg";
import anh2 from "./anhh2.jpg";
import anh3 from "./anh3.jpg";

function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={"banner"}>
      <Slider {...settings}>
        <img src={anh1} alt='' />
        <img src={anh2} alt='' />
        <img src={anh3} alt='' />
      </Slider>
    </div>
  );
}

export default Banner;

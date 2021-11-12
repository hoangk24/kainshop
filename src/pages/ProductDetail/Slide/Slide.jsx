import React from "react";
import Slider from "react-slick";
export default function Slide({ poster }) {
  const settings = {
    dots: true,
    dotsClass: "group-array-image",
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <a>
        <img src={poster[i].url} alt='' />
      </a>
    ),
  };

  const renderImage = poster?.map((item, index) => (
    <div key={index} className='slide-item'>
      <img src={item.url} alt='' />
    </div>
  ));
  return <Slider {...settings}>{renderImage}</Slider>;
}

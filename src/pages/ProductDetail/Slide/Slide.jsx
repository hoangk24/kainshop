import React from "react";
import Slider from "react-slick";
import {
  GlassMagnifier,
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "@africasokoni/react-image-magnifiers";
export default function Slide({ poster }) {
  const optionZoom = { zoomWidth: 200 };
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
      <GlassMagnifier
        magnifierSize={200}
        imageSrc={item.url}
        mouseActivation={MOUSE_ACTIVATION.CLICK}
        touchActivation={TOUCH_ACTIVATION.TAP}
        alwaysInPlace={true}
      />
    </div>
  ));
  return <Slider {...settings}>{renderImage}</Slider>;
}

import React, { useEffect, useState } from "react";
import { productApi } from "../../../api/productApi";
import Slider from "react-slick";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Loading from "../../Loading/Loading";

function NewProduct(props) {
  const [isLoading, setIsLoading] = useState(false);
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [data, setData] = useState([]);
  const renderProduct = data?.map((item, index) => (
    <ProductCard key={index} data={item} />
  ));
  useEffect(async () => {
    setIsLoading(true);
    await productApi.getNewProduct().then((res) => {
      setData(res.data);
    });
    setIsLoading(false);
  }, []);

  return (
    <div className={"newProduct"}>
      <div className='newProduct__content'>
        <h1 style={{ textAlign: "center" }}>Sản phẩm mới nhất</h1>
        <Slider {...settings}>{renderProduct}</Slider>
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}

export default NewProduct;

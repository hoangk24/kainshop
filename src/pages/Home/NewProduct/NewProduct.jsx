import React, {useEffect, useMemo, useState} from "react";
import { productApi } from "../../../api/productApi";
import Slider from "react-slick";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {Result, Skeleton} from "antd";
function NewProduct() {
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
  const [data, setData] = useState(null);
  const [error,setError] = useState((false))
  useEffect( () => {
    const fetch  = async()=>{
      try{
        await productApi.getNewProduct().then((res) => {
          setData(res.data);
        })
      }
      catch (e) {
        setError(true)
      }
    }
  fetch().then();
  }, []);


  const render = useMemo(()=>{
    if(error) return   <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
    />
    if(!data) return  <Skeleton active>
    </Skeleton>
    return  <Slider {...settings}>{data.map((item, index) => (
        <ProductCard key={index} data={item} />
    ))}</Slider>
  },[data])

  return (

    <div className={"newProduct"}>
      <div className='newProduct__content'>
        <h1 style={{ textAlign: "center" }}>Sản phẩm mới nhất</h1>
        {render}
      </div>
    </div>
  );
}

export default NewProduct;

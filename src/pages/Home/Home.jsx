import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import TradeMark from "./TradeMark/TradeMark";
import NewProduct from "./NewProduct/NewProduct";
import ProductList from "./ProductList/ProductList";

function Home(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".sider").classList.remove("activeSider");
  }, []);
  return (
    <div className='home'>
      <Banner />
      <TradeMark />
      <NewProduct />
      <ProductList />
    </div>
  );
}

export default Home;

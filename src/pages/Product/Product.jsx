import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import { productApi } from "../../api/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Col, Row } from "antd";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Product(props) {
  const query = useQuery();
  const category = query.get("category");
  const nsx = query.get("nsx");
  const [isNSX, setIsNSX] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const fetchNSX = async (nsx) => {
    setIsLoading(true);
    await productApi.getProductByNSX(nsx).then((res) => {
      setProductList(res);
      setIsLoading(false);
    });
    setIsLoading(false);
  };
  const fetchCategory = async () => {
    setIsLoading(true);
    await productApi.getProductByCategory(category).then((res) => {
      setProductList(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".sider").classList.remove("activeSider");

    if (category) {
      fetchCategory();
    }
    if (nsx) {
      fetchNSX(nsx);
    }
  }, [nsx, category]);

  const renderCard = productList?.map((item) => (
    <Col lg={6} md={8} sm={12} xs={12}>
      <ProductCard key={item._id} data={item} />
    </Col>
  ));
  return (
    <div className={"product"}>
      <div className={"product__content"}>
        <h1 className='product-heading'>
          Tất cả sản phẩm của{" "}
          {category
            ? category.toUpperCase()
            : nsx.replaceAll("-", " ").toUpperCase()}
        </h1>
        <Row gutter={[16, 16]}>{renderCard}</Row>
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}

export default Product;

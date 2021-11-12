import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "antd";
import { productApi } from "../../../api/productApi";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Loading from "../../Loading/Loading";

function ProductList(props) {
  const [data, setData] = useState({});
  const { limit, page, totalDocuments, totalPage } = data;
  const [isLoading, setIsLoading] = useState(false);
  const renderProduct = data.data?.map((item, index) => (
    <Col key={index} lg={4} sm={12} md={8} xs={12}>
      <ProductCard data={item} />
    </Col>
  ));

  const onchangePage = async (value) => {
    setIsLoading(true);
    await productApi.getProduct(value).then((res) => {
      setData(res);
      // setTimeout(() => {
      setIsLoading(false);
      // }, 1500)
    });
  };

  useEffect(async () => {
    setIsLoading(true);
    await productApi.getProduct(1).then((res) => {
      setData(res);
      // setTimeout(() => {
      setIsLoading(false);
      // }, 1500)
    });
  }, []);

  return (
    <div className={"product-list"}>
      <div className='product-list__content'>
        <h1>Tất cả sản phẩm của shop</h1>
        <Row gutter={[16, 16]}>{renderProduct}</Row>
        <div className={"product-list__pagination"}>
          <Pagination
            defaultCurrent={1}
            current={page}
            pageSize={12}
            total={totalDocuments}
            onChange={(value) => onchangePage(value)}
          />
        </div>
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}

export default ProductList;

import React, { useEffect, useState } from "react";
import { productApi } from "../../../api/productApi";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import Loading from "../../Loading/Loading";

function TradeMark(props) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const renderCategory = category?.map((item, index) => (
    <Col lg={8} sm={8} xs={12} key={index}>
      <div
        className={"trademark-item"}
        onClick={() => history.push(`/product?category=${item.name}`)}
      >
        {item.name}
      </div>
    </Col>
  ));
  useEffect(async () => {
    setIsLoading(true);
    await productApi.getCategory().then((res) => {
      setCategory(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={"trademark"}>
      <div className='trademark__content'>
        <h1 className={"trademark-title"}>Danh mục sản phẩm</h1>
        <Row gutter={[16, 16]}>{renderCategory}</Row>
        {isLoading ? <Loading /> : null}
      </div>
    </div>
  );
}

export default TradeMark;

import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { productApi } from "../../api/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import useQuery from "../../constants/useQuery";
import Loading from "../Loading/Loading";
export default function Search() {
  const query = useQuery();
  const keyword = query.get("keyword");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const renderSearchItem = data?.map((item) => (
    <Col lg={6} md={8} sm={12} xs={12}>
      <ProductCard data={item} />
    </Col>
  ));
  useEffect(async () => {
    setLoading(true);
    await productApi.searchProduct(keyword).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [keyword]);
  return (
    <div className='search' style={{ minHeight: "100vh", padding: "1rem" }}>
      <h1
        className='search__title'
        style={{ textAlign: "center", fontSize: "1.3rem" }}
      >
        Có {data?.length} sản phẩm trùng với từ khóa của bạn: {keyword}
      </h1>
      <Row gutter={[16, 16]}>{renderSearchItem}</Row>
      {loading && <Loading />}
    </div>
  );
}

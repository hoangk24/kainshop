import React from "react";
import { Card } from "antd";
import { useHistory } from "react-router";
import SaleBagde from "../SaleBagde/SaleBagde";

function ProductCard({ data }) {
  const history = useHistory();
  const { _id, price, poster, description, name, discount } = data;
  const { Meta } = Card;
  return (
    <Card
      onClick={() => history.push(`/product-detail/${_id}`)}
      className={"product-card"}
      hoverable
      cover={<img alt='example' src={poster[1].url} />}
    >
      <span className='price' style={{ color: "red", fontWeight: "600" }}>
        {price.toLocaleString("vi-VN")} VNĐ
      </span>
      <Meta
        className='meta'
        title={name}
        description={description.substring(0, 30) + "..."}
      />
      {discount && discount > 0 ? <SaleBagde discount={discount} /> : null}
    </Card>
  );
}

export default ProductCard;

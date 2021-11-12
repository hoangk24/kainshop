import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productApi } from "../../api/productApi";
import Loading from "../Loading/Loading";
import { Breadcrumb, Button, Form, InputNumber, Rate, Select } from "antd";
import Slide from "./Slide/Slide";
import Paragraph from "antd/es/typography/Paragraph";
import UserServices from "../../helper/userLocal";
import { useDispatch } from "react-redux";
import { addCart } from "../../features/userSlice/userSlice";
import ProductComment from "./ProductComment/ProductComment";

export default function ProductDetail() {
  const { Option } = Select;
  const param = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = param;
  const distpatch = useDispatch();
  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".sider").classList.remove("activeSider");
    setIsLoading(true);
    await productApi
      .getProductDetail(id)
      .then((res) => {
        setIsLoading(false);
        setProduct(res);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, [id]);
  const handleSubmit = (values) => {
    const data = {
      _id: product._id,
      name: product.name,
      poster: product.poster[0].url,
      price: product.price,
      total: values.count * product.price,
      ...values,
    };
    distpatch(addCart(data));
  };

  return (
    <div style={{ position: "relative" }} className={"product-detail"}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>Produt Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div className='product-detail__content'>
        <div>
          <Slide poster={product.poster} />
        </div>
        <div className='product-info'>
          <h1>{product.name}</h1>
          <div className='info-more'>
            <div className='rate'>
              <Rate defaultValue={3} />
              <h3>Có 3 đánh giá cho sản phẩm này</h3>
            </div>
            <div>
              <span className='label'>Mã sản phẩm: </span>
              {product._id}
            </div>
            <div>
              <span className='label'>Nhãn giày:</span>
              {product.category}
            </div>
            <div>
              <span className='label'>Nhà sản xuất: </span>
              {product.NSX}
            </div>
            <div>
              <span className='label'>Ngày có mặt trên shop: </span>
              {product.createdAt}
            </div>
            <div>
              <span className='label'>Lần cật nhật sản phẩm của shop: </span>
              {product.updatedAt}
            </div>
          </div>
          <div className='delivery'>
            <h3>Miễn phí vận chuyển toàn quốc</h3>
          </div>
          <Form
            className={"buy-form"}
            layout={"horizontal"}
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
          >
            <h1>Thông tin cần thiết</h1>
            <Form.Item
              label={"Số lượng"}
              name={"count"}
              rules={[
                { required: true, message: "Số lượng không được để trống!" },
              ]}
            >
              <InputNumber min={0} max={20} size={"large"} />
            </Form.Item>
            <Form.Item
              label={"Màu sắc"}
              name={"color"}
              rules={[
                { required: true, message: "Số lượng không được để trống!" },
              ]}
            >
              <Select defaultValue={""} size={"large"}>
                {product.color?.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={"Size"}
              name={"size"}
              rules={[
                { required: true, message: "Số lượng không được để trống!" },
              ]}
            >
              <Select size={"large"}>
                {product.size?.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className='submit-button'>
              <button type='submit'>Thêm vào giỏ hàng</button>
            </div>
          </Form>
        </div>
      </div>
      <div className='product-detail-bottom'>
        <h1>Mô tả sản phẩm</h1>
        <Paragraph>{product.description}</Paragraph>
      </div>
      <div className='product-detail-comment'>
        <ProductComment idProduct={product._id} />
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
}
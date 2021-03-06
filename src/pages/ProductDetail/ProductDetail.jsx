import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productApi } from "../../api/productApi";
import Loading from "../Loading/Loading";
import {
  Breadcrumb,
  Button,
  Form,
  InputNumber,
  message,
  Rate,
  Select, Skeleton,
  Tag,
} from "antd";
import Slide from "./Slide/Slide";
import Paragraph from "antd/es/typography/Paragraph";
import { useDispatch } from "react-redux";
import { addCart } from "../../features/userSlice/userSlice";
import ProductComment from "./ProductComment/ProductComment";
import { cartApi } from "../../api/cartApi";

export default function ProductDetail() {
  const distpatch = useDispatch();
  const { Option } = Select;
  const param = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = param;

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
  const handleSubmit = async (values) => {
    const data = {
      _id: product._id,
      name: product.name,
      poster: product.poster[0].url,
      price: product.price,
      total: values.count * discountFunction(product.price, product.discount),
      ...values,
    };
    await cartApi.checkQuantity(product._id, values.count).then((res) => {
      distpatch(addCart(data));
    });
  };
  const discountFunction = (price, percent) => {
    const discount = (price * percent) / 100;
    return price - discount;
  };
  return (
    <div style={{ position: "relative" }} className={"product-detail"}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>Produt Detail</Breadcrumb.Item>
      </Breadcrumb>

      <div className='product-detail__content'>
        {isLoading? <Skeleton active/>:   <Slide poster={product.poster} />}

        <div className='product-info'>
          <h1>
            {product.name}
            {product.quantity === 0 ? "(???? h???t h??ng)" : null}
          </h1>
          <div className='info-more'>
            <div className='rate'>
              <Rate defaultValue={3} />
              <h3>C?? 3 ????nh gi?? cho s???n ph???m n??y</h3>
            </div>
            <div>
              <span className='label'>M?? s???n ph???m: </span>
              {product._id}
            </div>
            <div>
              <span className='label'>Nh??n gi??y:</span>
              {product.category}
            </div>
            <div>
              <span className='label'>Nh?? s???n xu???t: </span>
              {product.NSX}
            </div>
            <div>
              <span className='label'>Ng??y c?? m???t tr??n shop: </span>
              {product.createdAt}
            </div>
            <div>
              <span className='label'>L???n c???t nh???t s???n ph???m c???a shop: </span>
              {product.updatedAt}
            </div>
            <div>
              <span className='label'>S??? l?????ng t???n trong kho: </span>
              {product.quantity}
            </div>
            <div>
              <span className='label'>Gi?? s???n ph???m </span>
              <b style={{ color: "red" }}>
                {product.price?.toLocaleString("vi-VN")} VN??
              </b>
            </div>
            {product?.discount > 0 ? (
              <div>
                <span className='label'>
                  Gi???m: {product.discount}% ({" "}
                  <b style={{ color: "red", fontSize: 30 }}>
                    {discountFunction(
                      product.price,
                      product.discount
                    ).toLocaleString("vi-VN")}
                    VN??)
                  </b>
                </span>
              </div>
            ) : null}
          </div>
          <div className='delivery'>
            <h3>Mi???n ph?? v???n chuy???n to??n qu???c</h3>
          </div>
          <Form
            className={"buy-form"}
            layout={"horizontal"}
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
          >
            <h1>Th??ng tin c???n thi???t</h1>
            <Form.Item
              label={"S??? l?????ng"}
              name={"count"}
              rules={[
                { required: true, message: "S??? l?????ng kh??ng ???????c ????? tr???ng!" },
              ]}
            >
              <InputNumber min={1} max={product?.quantity} size={"large"} />
            </Form.Item>

            <Form.Item
              label={"M??u s???c"}
              name={"color"}
              rules={[
                { required: true, message: "S??? l?????ng kh??ng ???????c ????? tr???ng!" },
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
                { required: true, message: "S??? l?????ng kh??ng ???????c ????? tr???ng!" },
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
              <button type='submit'>Th??m v??o gi??? h??ng</button>
            </div>
          </Form>
        </div>
      </div>
      <div className='product-detail-bottom'>
        <h1>M?? t??? s???n ph???m</h1>
        <Paragraph>{product.description}</Paragraph>
      </div>

      <div className='product-detail-comment'>
        <ProductComment idProduct={product._id} />
      </div>
    </div>
  );
}

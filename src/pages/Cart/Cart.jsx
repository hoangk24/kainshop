import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Table,
} from "antd";
import UserServices from "../../helper/userLocal";
import { useDispatch, useSelector } from "react-redux";
import { editCount, removeCart } from "../../features/userSlice/userSlice";
import { cartApi } from "../../api/cartApi";
import { order } from "../../features/userSlice/userThunk";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.user.cartLocal);
  const dispatch = useDispatch();
  const handleChangeCount = (_id, count) => {
    const data = {
      _id: _id,
      newCount: count,
    };
    dispatch(editCount(data));
  };
  const sum = () => {
    let total = 0;
    let count = 0;
    cart.forEach((item) => {
      total += item.total;
      count += item.count;
    });
    return [total, count];
  };
  const column = [
    {
      title: "",
      render: (record) => {
        return (
          <>
            <img
              src={record.poster}
              shape={"square"}
              style={{ width: "5rem", height: "5rem" }}
            />
            <div className='hide'>
              <p style={{ fontWeight: "bold" }}>Tên: {record.name}</p>
              <p>Màu:{record.color}</p>
              <p>size: {record.size}</p>
              <p>Giá: {record.price.toLocaleString("vi-VN")}</p>
              <p>Tổng: {record.total.toLocaleString("vi-VN")}</p>
            </div>
          </>
        );
      },
    },
    {
      title: "Tên mặt hàng",
      dataIndex: "name",
      key: "name",
      responsive: ["lg"],
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      responsive: ["lg"],
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
      render: (count, record) => (
        <InputNumber
          min={0}
          max={20}
          defaultValue={count}
          onChange={(value) => handleChangeCount(record._id, value)}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{price.toLocaleString("vi-VN")}VNĐ</div>,
      responsive: ["lg"],
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      key: "total",
      render: (total) => <div>{total.toLocaleString("vi-VN")}VNĐ</div>,
      responsive: ["lg"],
    },
    {
      title: "Thao tác",
      width: 50,
      render: (record) => (
        <Space>
          <Button onClick={() => dispatch(removeCart(record._id))}>Xóa</Button>
        </Space>
      ),
      responsive: ["lg"],
    },
  ];

  const onFinish = async (value) => {
    const sumCart = sum();
    const data = {
      list: cart,
      ...value,
      total: sumCart[0],
      count: sumCart[1],
    };
    dispatch(order(data));
  };
  useEffect(() => {
    document.querySelector(".sider").classList.remove("activeSider");
  }, []);
  if (cart?.length === 0) {
    return (
      <div className='cart-no-cart'>
        <div className='cart-no-cart__content'>
          <h1>Không có sản phẩm nào trong giỏ hàng</h1>
          <p>Hãy tiếp tục mua sắm nào!</p>
          <Link to='/'>Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }
  return (
    <div className={"cart"}>
      <div className='cart__content'>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <div className='cart-body'>
          <h1>Giỏ hàng của bạn</h1>

          <Table
            rowKey={(record) => record._id}
            pagination={false}
            bordered
            dataSource={cart}
            columns={column}
          />
          <Row className='form-description'>
            <Col style={{ padding: "1rem" }} lg={12} md={24}>
              <div style={{ fontWeight: "600" }}>
                Tổng số tiền: {sum()[0].toLocaleString("vi-VN")} VNĐ
              </div>
              <div style={{ fontWeight: "600" }}>Tổng số lượng: {sum()[1]}</div>
            </Col>
            <Col lg={12} md={24}>
              <Form
                style={{ padding: "1rem" }}
                labelCol={{ span: 5 }}
                onFinish={onFinish}
              >
                <Form.Item
                  label={"Địa chỉ nhận"}
                  name='address'
                  rules={[
                    { required: true, message: "Địa chỉ không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={"Số điện thoại"}
                  name='phoneNumber'
                  rules={[
                    { required: true, message: "Địa chỉ không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5 }}>
                  <Button type={"primary"} htmlType={"submit"}>
                    Đặt hàng
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Cart;

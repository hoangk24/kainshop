import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartApi } from "../../../api/cartApi";
import { Steps, Divider, Table, Space, Button, message } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Loading from "../../Loading/Loading";
export default function CartHistory() {
  const user = useSelector((state) => state.user.user);
  const [cart, setCart] = useState([]);
  const { Step } = Steps;
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "poster",
      key: "poster",
      render: (text, record) => (
        <div className='cart-img'>
          <img src={text} style={{ width: 50, height: 50 }} alt='' />
          <div className='info'>
            <p>{record.name}</p>
            <p>Size: {record.size}</p>
            <p>Màu: {record.color}</p>
            <p>Giá: {record.price.toLocaleString("vi-VN")} VNĐ</p>
          </div>
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      responsive: ["lg"],
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      responsive: ["lg"],
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      responsive: ["lg"],
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
      // responsive: ["md"],
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      responsive: ["lg"],
      render: (price) => <span>{price.toLocaleString("vi-VN")} VNĐ</span>,
    },
  ];
  const closeCart = async (id) => {
    await cartApi.closeCart(id).then((res) => {
      setCart(res);
      message.success("Hủy đơn hàng thành công!");
    });
  };
  const renderCart = cart?.map((item) => {
    const { state, list, _id } = item;
    return (
      <div className='' style={{ marginBottom: "2rem" }}>
        <div
          style={{ textAlign: "center", marginBottom: "10px", fontSize: 17 }}
        >
          Ngày đặt hàng:{item.createdAt}
        </div>
        <Steps
          current={state !== -1 ? state + 1 : state}
          size='small'
          responsive
        >
          <Step title='Đặt hàng' disabled={state === -1} />
          <Step
            title='Xác nhận đơn hàng'
            icon={state === 0 ? <LoadingOutlined /> : null}
            disabled={state === -1}
          />
          <Step
            title='Đang giao hàng'
            icon={state === 1 ? <LoadingOutlined /> : null}
            disabled={state === -1}
          />
          <Step
            title='Giao hàng thành công'
            disabled={state === -1 || state < 3}
            icon={<SmileOutlined />}
          />

          {state === -1 && <Step status='error' title='Hủy' />}
        </Steps>
        <Space style={{ marginTop: "1rem" }}>
          <span>
            Địa chỉ nhận hàng: <b>{item.address}</b>
          </span>
          <span>
            Số điện thoại nhận hàng: <b>{item.phoneNumber}</b>{" "}
          </span>
        </Space>
        <Table dataSource={list} columns={columns} pagination={false} />
        <div style={{ textAlign: "right" }}>
          <p>Tổng thanh toán: {item.total.toLocaleString("vi-VN")} VNĐ</p>
          <p>Phí Vận chuyển: 0 VNĐ</p>
          <p>Tổng số lượng: {item.count} (đôi)</p>
          <b>Tổng cộng: {item.total.toLocaleString("vi-VN")} VNĐ</b>
        </div>
        <Button
          onClick={() => closeCart(_id)}
          disabled={state !== 0}
          type='primary'
        >
          Hủy đơn hàng
        </Button>
        <Divider />
      </div>
    );
  });
  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".sider").classList.remove("activeSider");
    const res = await cartApi.getCart();
    setCart(res);
    return () => {};
  }, []);
  return (
    <div className='cart-history'>
      <div className='cart-history__content'>
        <h1>Lịch sử mua hàng của bạn</h1>
        <div className='cart-item'>{renderCart}</div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

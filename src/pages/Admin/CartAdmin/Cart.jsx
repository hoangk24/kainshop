import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Select,
  Spin,
  Space,
  Button,
  Tabs,
  Tag,
  message,
} from "antd";
import { adminApi } from "../../../api/adminApi";
import moment from "moment";
import { useSelector } from "react-redux";
function Cart(props) {
  const [data, setData] = useState([]);
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [loading, setLoading] = useState(false);
  const socketIo = useSelector((state) => state.user.socketIo);
  const column = [
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày mua",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{moment(createdAt).format("hh:mm:ss DD/MM/YYYY ")}</span>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => <span>{`(+84) ${phoneNumber}`}</span>,
    },
    {
      title: "Người dùng",
      dataIndex: "idUser",
      key: "idUser",
      render: (idUser) => <Typography.Link>Xem</Typography.Link>,
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        const { state } = record;
        if (state === -1)
          return (
            <div>
              <Tag color={"red"} size='large'>
                Người dùng huỷ đơn
              </Tag>
              <div>Lý do: Nhà xa</div>
            </div>
          );
        if (state === 2) {
          return (
            <Space>
              <Spin />
              Đang vận chuyển
            </Space>
          );
        }
        if (state === 1)
          return (
            <Space>
              <Spin />
              Đang đợi gói hàng
              <Button onClick={() => changeState(record)}>
                Đã giao vận chuyển
              </Button>
            </Space>
          );

        if (state === 0)
          return (
            <Space>
              <Spin />
              Đang đợi xác nhận
              <Button onClick={() => changeState(record)}>Xác nhận</Button>
            </Space>
          );
      },
    },
  ];
  const changeState = async (value) => {
    const data = {
      idCart: value._id,
      state: value.state + 1,
    };
    setLoading(true);
    await adminApi.changeStateCart(data).then((res) => {
      setData(res);
      setLoading(false);
      message.success("Đã chuyển trạng thái");
    });
  };
  useEffect(async () => {
    await adminApi.getCart().then((res) => {
      console.log(res);
      setData(res);
    });
    return () => {};
  }, []);
  return (
    <div className='cart-container'>
      <Tabs type='card'>
        <TabPane tab='Đã Huỷ' key={4}>
          <Table
            columns={column}
            dataSource={data?.filter((item) => item.state === -1)}
          />
        </TabPane>
        <TabPane tab={"Đợi xác nhận"} key={1}>
          <Table
            columns={column}
            dataSource={data?.filter((item) => item.state === 0)}
          />
        </TabPane>
        <TabPane tab='Đang đợi gói hàng' key={2}>
          <Table
            columns={column}
            dataSource={data?.filter((item) => item.state === 1)}
          />
        </TabPane>
        <TabPane tab='Đang vận chuyển' key={3}>
          <Table
            columns={column}
            dataSource={data?.filter((item) => item.state === 2)}
          />
        </TabPane>

        <TabPane tab='Vận chuyển thành công' key={5}>
          <Table
            columns={column}
            dataSource={data?.filter((item) => item.state === 3)}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Cart;

import React, { useEffect, useState } from "react";
import {
  Tabs,
  List,
  Form,
  Typography,
  Input,
  Button,
  Space,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Address from "../../../AddressSelect/Address";
import { updateInfomation } from "../../../../features/userSlice/userThunk";

const data = [
  "Shop đã update thêm 15 mặt hàng mới",
  "Giảm giá addias stand smith",
  "Ngày 20/11 sắp đến",
  "Giảm mạnh vans",
  "Giảm 10% puma",
];
export default function Info({ user }) {
  const { TabPane } = Tabs;
  const { Text, Link } = Typography;
  const [edit, setEdit] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();
  const hanelChangeName = (value) => {
    dispatch(updateInfomation({ fullName: value }));
  };
  const hanelChangePhone = (value) => {
    dispatch(updateInfomation({ phoneNumber: value }));
  };

  hanelChangePhone;

  const closeEditMode = () => setEdit(false);

  return (
    <Tabs className='info'>
      <TabPane tab='Thông báo' key={1}>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[Thông báo]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </TabPane>
      <TabPane tab='Thông tin cá nhân' key={2}>
        <Form labelCol={{ span: 5 }}>
          <Form.Item label='Họ và tên'>
            <Typography.Text
              editable={{
                onChange: hanelChangeName,
              }}
            >
              {user?.fullName}
            </Typography.Text>
          </Form.Item>
          <Form.Item label='Địa chỉ'>
            {!edit ? (
              <Typography.Text>
                {user.address}
                <EditOutlined onClick={() => setEdit(!edit)} />
              </Typography.Text>
            ) : null}
            {edit ? <Address closeEditMode={closeEditMode} /> : null}
          </Form.Item>
          <Form.Item label='Số điện thoại'>
            <Typography.Text
              editable={{
                onChange: hanelChangePhone,
              }}
            >
              {user?.phoneNumber}
            </Typography.Text>
          </Form.Item>
          <Form.Item label='Email'>
            <Text disabled>{user?.email}</Text>
          </Form.Item>
          <Form.Item label='Xác thực email'>
            <Text type='success'>
              {user?.verified ? "Đã xác thực" : "Chưa xác thực"}
            </Text>
          </Form.Item>
          <Form.Item label='Loại tài khoản'>
            <Text type='success'>
              {user?.role === 1 ? "Quản trị viên" : "Khách hàng"}
            </Text>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
}

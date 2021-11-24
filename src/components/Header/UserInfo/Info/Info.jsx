import React, { useState } from "react";
import { Tabs, List, Form, Typography, Input, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
export default function Info({ user }) {
  const { TabPane } = Tabs;
  const { Text, Link } = Typography;
  const [edit, setEdit] = useState(true);
  return (
    <Tabs className='info'>
      <TabPane tab='Thông báo' key={1}>
        <List bordered />
      </TabPane>
      <TabPane tab='Thông tin cá nhân' key={2}>
        <Form labelCol={{ span: 5 }}>
          <Form.Item label='Họ và tên'>
            {edit ? <Input /> : <Text type='success'>{user?.fullName}</Text>}
          </Form.Item>
          <Form.Item label='Địa chỉ'>
            {edit ? (
              <Input />
            ) : (
              <Text type='success'>{`${user?.address.living}, ${user?.address.ward}, ${user?.address.district}, ${user?.address.city}`}</Text>
            )}
          </Form.Item>
          <Form.Item label='Số điện thoại'>
            {edit ? (
              <Input defaultValue={user?.phoneNumber} />
            ) : (
              <Text type='success'>{user?.phoneNumber}</Text>
            )}
          </Form.Item>

          <Space>
            <Button onClick={() => setEdit(true)}>Sửa</Button>
            <Button onClick={() => setEdit(false)}>Lưu</Button>
          </Space>
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
